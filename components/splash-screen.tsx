"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getLenisInstance } from "@/components/scroll/lenis-instance";
import {
  markSplashComplete,
  markSplashExiting,
  resetSplashLifecycle,
} from "@/lib/splash-lifecycle";

const PANEL_COUNT = 8;
const HOLD_MS = 1200;
const PANEL_DURATION = 0.9;
const PANEL_STAGGER = 0.08;

export default function SplashScreen() {
  const [phase, setPhase] = useState<"hold" | "exit" | "done">("hold");
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    resetSplashLifecycle();
    document.documentElement.classList.add("splash-active");
    document.body.style.overflow = "hidden";

    // Landing pages should always open from the top after refresh/restore.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    getLenisInstance()?.scrollTo(0, { immediate: true });
    getLenisInstance()?.stop();

    // Warm Spline JS chunk during logo hold (no WebGL yet).
    void import("@splinetool/react-spline");

    let cancelled = false;
    const holdTimer = window.setTimeout(() => {
      if (cancelled) return;
      setPhase("exit");
      markSplashExiting();
    }, HOLD_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(holdTimer);
    };
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;

    let cancelled = false;
    const totalMs =
      (PANEL_DURATION + (PANEL_COUNT - 1) * PANEL_STAGGER) * 1000 + 80;

    const doneTimer = window.setTimeout(() => {
      if (cancelled) return;
      setPhase("done");
      document.body.style.overflow = "";
      document.documentElement.classList.remove("splash-active");
      getLenisInstance()?.start();
      markSplashComplete();
    }, totalMs);

    return () => {
      cancelled = true;
      window.clearTimeout(doneTimer);
    };
  }, [phase]);

  useEffect(() => {
    return () => {
      // Only unlock if splash is fully finished (avoid Strict Mode flash).
      if (phaseRef.current === "done") {
        document.documentElement.classList.remove("splash-active");
        document.body.style.overflow = "";
      }
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[9999] flex" aria-hidden={phase === "exit"}>
      {Array.from({ length: PANEL_COUNT }, (_, index) => {
        const exitDelay = (PANEL_COUNT - 1 - index) * PANEL_STAGGER;

        return (
          <motion.div
            key={index}
            className="h-full flex-1 origin-right bg-[#01060f]"
            style={{ willChange: "transform" }}
            initial={false}
            animate={{ scaleX: phase === "exit" ? 0 : 1 }}
            transition={
              phase === "exit"
                ? {
                    duration: PANEL_DURATION,
                    delay: exitDelay,
                    ease: [0.83, 0, 0.17, 1],
                  }
                : { duration: 0 }
            }
          />
        );
      })}

      <AnimatePresence>
        {phase === "hold" && (
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/Fennix-BLACK.png"
              alt="Fennix"
              width={160}
              height={48}
              priority
              className="h-10 w-auto brightness-0 invert sm:h-12"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
