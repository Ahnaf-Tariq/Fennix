"use client";

import { useEffect, useState, type ReactNode } from "react";
import { onSplashComplete } from "@/lib/splash-lifecycle";

interface DeferredAfterSplashProps {
  children: ReactNode;
  delayMs?: number;
}

export function DeferredAfterSplash({
  children,
  delayMs = 600,
}: DeferredAfterSplashProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let timeoutId = 0;
    let idleId = 0;

    const unbind = onSplashComplete(() => {
      const schedule = () => {
        timeoutId = window.setTimeout(() => setIsReady(true), delayMs);
      };

      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(schedule, { timeout: 2000 });
      } else {
        schedule();
      }
    });

    return () => {
      unbind();
      if (idleId && "cancelIdleCallback" in window)
        window.cancelIdleCallback(idleId);
      window.clearTimeout(timeoutId);
    };
  }, [delayMs]);

  if (!isReady) return null;
  return children;
}
