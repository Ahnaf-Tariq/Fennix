"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getLenisInstance } from "@/components/scroll/lenis-instance";
import {
  markSplashComplete,
  markSplashExiting,
  resetSplashLifecycle,
} from "@/lib/splash-lifecycle";

const PANEL_COUNT = 8;
const INTRO_MS = 500;
const ZOOM_MS = 1400;
const FADE_MS = 280;
const PANEL_DURATION = 1.05;
const PANEL_STAGGER = 0.13;
const LOGO_TOTAL_MS = INTRO_MS + ZOOM_MS + FADE_MS;

const panelEase = [0.76, 0, 0.14, 1] as const;

type SplashPhase = "hold" | "exit" | "done";

export default function SplashScreen() {
  const [phase, setPhase] = useState<SplashPhase>("hold");
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    resetSplashLifecycle();
    document.documentElement.classList.add("splash-active");
    document.body.style.overflow = "hidden";

    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    getLenisInstance()?.scrollTo(0, { immediate: true });
    getLenisInstance()?.stop();

    void import("@splinetool/react-spline");

    let cancelled = false;
    const exitTimer = window.setTimeout(() => {
      if (cancelled) return;
      setPhase("exit");
      markSplashExiting();
    }, INTRO_MS + ZOOM_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(exitTimer);
    };
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;

    let cancelled = false;
    const totalMs =
      (PANEL_DURATION + (PANEL_COUNT - 1) * PANEL_STAGGER) * 1000 + 120;

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
      if (phaseRef.current === "done") {
        document.documentElement.classList.remove("splash-active");
        document.body.style.overflow = "";
      }
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex overflow-hidden"
      aria-hidden={phase === "exit"}
    >
      <style>{`
        @keyframes fennix-splash-logo {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(0.92);
          }
          18% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
          78% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(3.55);
          }
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(3.8);
          }
        }

        .splash-logo-zoom {
          animation: fennix-splash-logo ${LOGO_TOTAL_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) both;
          transform-origin: center center;
          will-change: transform, opacity;
          backface-visibility: hidden;
          contain: layout paint;
        }

        .splash-logo-img {
          display: block;
          height: 2.5rem;
          width: auto;
          user-select: none;
          pointer-events: none;
          filter: brightness(0) invert(1);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        @media (min-width: 640px) {
          .splash-logo-img {
            height: 3rem;
          }
        }
      `}</style>

      {Array.from({ length: PANEL_COUNT }, (_, index) => {
        const exitDelay = (PANEL_COUNT - 1 - index) * PANEL_STAGGER;
        const isLastPanel = index === PANEL_COUNT - 1;

        return (
          <motion.div
            key={index}
            className="relative h-full flex-1 bg-[#01060f]"
            style={{ willChange: phase === "exit" ? "clip-path, transform" : "auto" }}
            initial={false}
            animate={{
              clipPath:
                phase === "exit"
                  ? "inset(0 100% 0 0)"
                  : "inset(0 0% 0 0)",
              x: phase === "exit" ? "12%" : "0%",
              opacity: phase === "exit" ? 0.92 : 1,
            }}
            transition={
              phase === "exit"
                ? {
                    clipPath: {
                      duration: PANEL_DURATION,
                      delay: exitDelay,
                      ease: panelEase,
                    },
                    x: {
                      duration: PANEL_DURATION,
                      delay: exitDelay,
                      ease: panelEase,
                    },
                    opacity: {
                      duration: PANEL_DURATION * 0.55,
                      delay: exitDelay + PANEL_DURATION * 0.45,
                      ease: "easeOut",
                    },
                  }
                : { duration: 0 }
            }
          >
            {phase === "exit" ? (
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,122,232,0.06)_0%,transparent_38%,rgba(0,0,0,0.35)_100%)]"
              />
            ) : null}
            {!isLastPanel && phase === "exit" ? (
              <div
                aria-hidden
                className="absolute right-0 top-0 h-full w-px bg-white/6"
              />
            ) : null}
          </motion.div>
        );
      })}

      {/* Covers panel seams only during logo — removed before reveal so hero shows through. */}
      {phase === "hold" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] bg-[#01060f]"
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
        <div className="splash-logo-zoom">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Fennix-BLACK.png"
            alt="Fennix"
            width={160}
            height={48}
            draggable={false}
            className="splash-logo-img"
            decoding="sync"
          />
        </div>
      </div>
    </div>
  );
}
