"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const PANEL_COUNT = 8; // fewer, slightly wider panels = more premium/heavy feel
const HOLD_MS = 1200;
const PANEL_DURATION = 0.9;
const PANEL_STAGGER = 0.08;

export default function SplashScreen() {
  const [phase, setPhase] = useState<"hold" | "exit" | "done">("hold");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const holdTimer = window.setTimeout(() => setPhase("exit"), HOLD_MS);
    return () => {
      window.clearTimeout(holdTimer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    const totalMs =
      (PANEL_DURATION + (PANEL_COUNT - 1) * PANEL_STAGGER) * 1000 + 100;
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
      window.__fennixSplashDone = true;
      window.dispatchEvent(new CustomEvent("fennix:splash-complete"));
    }, totalMs);
    return () => window.clearTimeout(doneTimer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[9999] flex" aria-hidden={phase === "exit"}>
      {Array.from({ length: PANEL_COUNT }, (_, index) => {
        // rightmost panel opens first, leftmost opens last -> sweep moves right to left
        const exitDelay = (PANEL_COUNT - 1 - index) * PANEL_STAGGER;

        return (
          <motion.div
            key={index}
            className="h-full flex-1 bg-[#01060f]"
            style={{ transformOrigin: "left center", willChange: "transform" }}
            initial={{ scaleX: 1 }}
            animate={phase === "exit" ? { scaleX: 0 } : { scaleX: 1 }}
            transition={{
              duration: PANEL_DURATION,
              delay: exitDelay,
              ease: [0.83, 0, 0.17, 1], // sharp expo-style ease, feels premium
            }}
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
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
