"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";
import { cn } from "@/lib/utils";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
  /** Keep canvas invisible while still allowing load/warmup */
  visible?: boolean;
  /** Freeze Spline runtime after load (used during splash warmup) */
  paused?: boolean;
}

export function SplineScene({
  scene,
  className,
  visible = true,
  paused = false,
}: SplineSceneProps) {
  const [isReady, setIsReady] = useState(false);
  const appRef = useRef<Application | null>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const app = appRef.current;
    if (!app || !isReady) return;

    if (paused) {
      app.stop();
      return;
    }

    app.play();
  }, [isReady, paused]);

  return (
    <div className={cn("relative h-full w-full", className)}>
      <Suspense fallback={null}>
        <Spline
          scene={scene}
          className={cn(
            "h-full w-full",
            isReady && visible ? "opacity-100" : "opacity-0",
          )}
          onLoad={(app) => {
            appRef.current = app;

            if (pausedRef.current) {
              app.stop();
              // Keep freezing a few frames so auto-play intro can't sneak ahead.
              let frames = 0;
              const freeze = () => {
                if (!pausedRef.current || frames >= 12) return;
                app.stop();
                frames += 1;
                requestAnimationFrame(freeze);
              };
              requestAnimationFrame(freeze);
            }

            setIsReady(true);
          }}
        />
      </Suspense>
    </div>
  );
}
