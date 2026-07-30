"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { onSplashComplete } from "@/lib/splash-lifecycle";

const INDUSTRIES = [
  "Financial Services",
  "Retail & E-commerce",
  "Healthcare",
  "Manufacturing",
  "Supply Chain",
  "SaaS & Technology",
] as const;

type Industry = (typeof INDUSTRIES)[number];

const INDUSTRY_RESPONSES: Record<Industry, string> = {
  "Financial Services":
    "Fennix unifies portfolio data, revenue streams, and risk metrics across your banking, accounting, and compliance databases—giving you real-time visibility into margin risks and fraud signals without manual reporting.",
  "Retail & E-commerce":
    "Fennix tracks sales velocity, inventory turnover, customer acquisition costs, and social sentiment in real time—alerting you to stockout risks before they impact revenue.",
  Healthcare:
    "Fennix connects patient flow records, care capacity data, and operational cost metrics across your platforms into one layer—helping CFOs and administrators predict capacity bottlenecks and manage resources.",
  Manufacturing:
    "Fennix bridges your ERP, inventory, and supply chain data to monitor production output, track machine downtime, and match plant capacity directly with shifting market demand.",
  "Supply Chain":
    "Fennix links warehouse management systems (WMS), vendor data, and external macroeconomic signals to give end-to-end visibility over lead times, delivery routes, and cost drivers.",
  "SaaS & Technology":
    "Fennix aggregates usage telemetry, churn risks, recurring revenue, and unit economics across your data warehouses into clear executive dashboards.",
};

const WELCOME_MESSAGE = "Hello! Welcome to Fennix 👋";
const WELCOME_SUBTEXT =
  "Select your industry below to see how our AI layer works for you:";
const TYPING_DURATION_MS = 1400;
const WALKTHROUGH_START_DELAY_MS = 650;

const bubblePointerClassName =
  "absolute -left-2 top-[3.75rem] h-4 w-4 rotate-45 border-b border-l border-indigo-400/40 bg-slate-900/92 sm:top-[4.25rem] md:top-[4.75rem]";

function sanitizeSpeechText(text: string) {
  return text
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, "")
    .replace(/Fennix/gi, "Fen-nix")
    .trim();
}

function pickFemaleVoice() {
  if (typeof window === "undefined") return null;

  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((voice) =>
      /female|samantha|zira|jenny|aria|google uk english female|microsoft sonia|victoria|karen|moira|fiona/i.test(
        voice.name,
      ),
    ) ??
    voices.find((voice) => voice.lang.startsWith("en")) ??
    null
  );
}

function speakAssistantMessage({
  text,
  durationMs,
}: {
  text: string;
  durationMs: number;
}) {
  const speechText = sanitizeSpeechText(text);
  if (!speechText || typeof window === "undefined") {
    return Promise.resolve();
  }

  window.speechSynthesis.cancel();

  return new Promise<void>((resolve) => {
    const utterance = new SpeechSynthesisUtterance(speechText);
    const voice = pickFemaleVoice();

    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang ?? "en-US";
    utterance.pitch = 1.08;
    utterance.volume = 1;
    utterance.rate = 0.96;

    let settled = false;
    function finish() {
      if (settled) return;
      settled = true;
      resolve();
    }

    utterance.onend = finish;
    utterance.onerror = finish;

    // Fallback if the browser never fires speech events.
    const fallbackMs = Math.max(durationMs + 900, speechText.length * 70);
    window.setTimeout(finish, fallbackMs);

    window.speechSynthesis.speak(utterance);
  });
}

function getMessageDurationMs(message: string) {
  return Math.max(TYPING_DURATION_MS, message.length * 22);
}

function useTypedMessage({
  message,
  isActive,
  durationMs,
  speakWithTyping = false,
  onSpeechComplete,
}: {
  message: string;
  isActive: boolean;
  durationMs: number;
  speakWithTyping?: boolean;
  onSpeechComplete?: () => void;
}) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!isActive) {
      setDisplayText("");
      return;
    }

    if (!message) {
      setDisplayText("");
      return;
    }

    const safeLength = Math.max(message.length, 1);
    const stepDelay = Math.max(Math.floor(durationMs / safeLength), 16);
    let currentIndex = 0;
    let speechStarted = false;
    let cancelled = false;

    setDisplayText("");

    async function startSpeech() {
      if (speechStarted || cancelled) return;
      speechStarted = true;
      await speakAssistantMessage({ text: message, durationMs });
      if (!cancelled) onSpeechComplete?.();
    }

    const intervalId = window.setInterval(() => {
      currentIndex += 1;
      setDisplayText(message.slice(0, currentIndex));

      if (currentIndex === 1 && speakWithTyping) {
        if (window.speechSynthesis.getVoices().length > 0) {
          void startSpeech();
        } else {
          window.speechSynthesis.addEventListener(
            "voiceschanged",
            () => {
              void startSpeech();
            },
            {
              once: true,
            },
          );
        }
      }

      if (currentIndex >= message.length) window.clearInterval(intervalId);
    }, stepDelay);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      if (speechStarted) window.speechSynthesis.cancel();
    };
  }, [durationMs, isActive, message, onSpeechComplete, speakWithTyping]);

  return displayText;
}

function useWalkthroughReady() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    return onSplashComplete(() => setIsReady(true));
  }, []);

  return isReady;
}

export function HeroWalkthrough() {
  const [step, setStep] = useState<"welcome" | "typing" | "response">(
    "welcome",
  );
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(
    null,
  );
  const [isWelcomeSubtextActive, setIsWelcomeSubtextActive] = useState(false);
  const [canStartTyping, setCanStartTyping] = useState(false);
  const [isWelcomeSpeechDone, setIsWelcomeSpeechDone] = useState(false);
  const isSplashDone = useWalkthroughReady();

  const responseMessage = selectedIndustry
    ? INDUSTRY_RESPONSES[selectedIndustry]
    : "";
  const responseDurationMs = getMessageDurationMs(responseMessage);

  useEffect(() => {
    window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    if (!isSplashDone) {
      setCanStartTyping(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCanStartTyping(true);
    }, WALKTHROUGH_START_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isSplashDone]);

  useEffect(() => {
    if (step !== "welcome") setIsWelcomeSpeechDone(false);
  }, [step]);

  const handleWelcomeSpeechComplete = useCallback(() => {
    setIsWelcomeSpeechDone(true);
  }, []);

  const welcomeText = useTypedMessage({
    message: WELCOME_MESSAGE,
    isActive: step === "welcome" && canStartTyping,
    durationMs: TYPING_DURATION_MS,
    speakWithTyping: true,
    onSpeechComplete: handleWelcomeSpeechComplete,
  });
  const welcomeSubtextText = useTypedMessage({
    message: WELCOME_SUBTEXT,
    isActive: step === "welcome" && isWelcomeSubtextActive,
    durationMs: TYPING_DURATION_MS,
    speakWithTyping: true,
  });
  const responseText = useTypedMessage({
    message: responseMessage,
    isActive: step === "response",
    durationMs: responseDurationMs,
    speakWithTyping: true,
  });

  useEffect(() => {
    if (step !== "welcome") {
      setIsWelcomeSubtextActive(false);
      return;
    }

    if (welcomeText !== WELCOME_MESSAGE || !isWelcomeSpeechDone) {
      setIsWelcomeSubtextActive(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsWelcomeSubtextActive(true);
    }, 220);

    return () => window.clearTimeout(timeoutId);
  }, [isWelcomeSpeechDone, step, welcomeText]);

  const handleSelect = (industry: Industry) => {
    window.speechSynthesis.cancel();
    setSelectedIndustry(industry);
    setStep("typing");

    window.setTimeout(() => {
      setStep("response");
    }, TYPING_DURATION_MS);
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col p-4 sm:p-6">
      <div className="grid flex-1 items-start gap-3 sm:gap-4 grid-cols-[minmax(0,1.05fr)_minmax(240px,42%)] sm:grid-cols-[minmax(0,1.1fr)_minmax(330px,38%)] lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,36%)]">
        <div aria-hidden className="min-w-0" />
        <div className="pointer-events-auto relative w-full translate-y-0 lg:-translate-y-4">
          <AnimatePresence mode="wait">
            {step === "welcome" && (
              <motion.div
                key="welcome-bubble"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="relative rounded-2xl border border-indigo-500/30 bg-slate-900/92 p-4 text-white shadow-2xl backdrop-blur-xl sm:p-5"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-indigo-300">
                    <Sparkles className="h-3.5 w-3.5" /> Fennix Assistant
                  </span>
                </div>
                <p className="text-sm font-medium leading-snug text-slate-100 sm:text-base">
                  {welcomeText}
                  {!isWelcomeSubtextActive && (
                    <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-indigo-300/80 align-middle" />
                  )}
                </p>
                <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                  {welcomeSubtextText}
                  {isWelcomeSubtextActive && (
                    <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-indigo-300/80 align-middle" />
                  )}
                </p>
                <div className={bubblePointerClassName} />
              </motion.div>
            )}

            {step === "typing" && (
              <motion.div
                key="typing-bubble"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative mt-10 w-fit rounded-2xl border border-indigo-500/30 bg-slate-900/92 px-5 py-4 text-white shadow-2xl backdrop-blur-xl sm:mt-16 lg:mt-14"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-300 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-300 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-300" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 sm:text-sm">
                    Analyzing {selectedIndustry}
                  </span>
                </div>
                <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-b border-l border-indigo-400/40 bg-slate-900/92" />
              </motion.div>
            )}

            {step === "response" && selectedIndustry && (
              <motion.div
                key="response-bubble"
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative rounded-2xl border border-indigo-500/30 bg-slate-900/92 p-3.5 text-white shadow-2xl backdrop-blur-xl"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-300">
                    {selectedIndustry} Solution
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-200 sm:text-sm">
                  {responseText}
                  <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-indigo-300/80 align-middle" />
                </p>
                <div className={bubblePointerClassName} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {step === "welcome" && canStartTyping && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="pointer-events-auto mt-auto w-fit max-w-xl translate-y-3 self-center sm:translate-y-5"
        >
          <div className="grid grid-cols-3 gap-1.5 rounded-lg border border-white/10 bg-slate-900/40 p-1.5 shadow-lg backdrop-blur-md">
            {INDUSTRIES.map((industry) => (
              <button
                key={industry}
                type="button"
                onClick={() => handleSelect(industry)}
                className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/10 px-2 py-2 text-center text-xs font-medium leading-tight text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:bg-primary-gradient sm:px-2.5 sm:text-xs"
              >
                {industry}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
