"use client";

import { useEffect, useRef, useState } from "react";
import { IntelligenceStackVisual } from "@/components/three";
import { getLenisInstance } from "@/components/scroll/lenis-instance";

const PROGRESS_SPEED = 0.00032;
const MAX_STEP_PER_TICK = 0.028;
const SMOOTHING = 0.08;

export default function IntelligenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const touchYRef = useRef<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      const current = smoothProgressRef.current;
      const target = targetProgressRef.current;
      const next = current + (target - current) * SMOOTHING;

      if (Math.abs(next - target) < 0.0004) {
        smoothProgressRef.current = target;
      } else {
        smoothProgressRef.current = next;
      }

      setScrollProgress(smoothProgressRef.current);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function holdSection() {
      const lenis = getLenisInstance();
      const top =
        (lenis?.scroll ?? window.scrollY) +
        section!.getBoundingClientRect().top;
      if (lenis) lenis.scrollTo(top, { immediate: true });
      else window.scrollTo(0, top);
    }

    function setTargetProgress(next: number) {
      targetProgressRef.current = Math.min(1, Math.max(0, next));
      return targetProgressRef.current;
    }

    function handleScrollIntent(deltaY: number) {
      if (Math.abs(deltaY) < 0.35) return false;

      const rect = section!.getBoundingClientRect();
      const progress = targetProgressRef.current;
      const coveringViewport =
        rect.top <= 8 && rect.bottom >= window.innerHeight * 0.85;

      // Scroll down — lock at top until model finishes
      if (deltaY > 0 && progress < 1 && coveringViewport) {
        holdSection();
        const step = Math.min(MAX_STEP_PER_TICK, deltaY * PROGRESS_SPEED);
        setTargetProgress(progress + step);
        return true;
      }

      // Scroll up — reverse model first, then release page
      if (deltaY < 0 && progress > 0 && coveringViewport) {
        holdSection();
        const step = Math.max(-MAX_STEP_PER_TICK, deltaY * PROGRESS_SPEED);
        setTargetProgress(progress + step);
        return true;
      }

      return false;
    }

    function onWheel(event: WheelEvent) {
      if (handleScrollIntent(event.deltaY)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }

    function onTouchStart(event: TouchEvent) {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    }

    function onTouchMove(event: TouchEvent) {
      if (touchYRef.current == null) return;
      const y = event.touches[0]?.clientY ?? touchYRef.current;
      const deltaY = touchYRef.current - y;
      touchYRef.current = y;
      if (handleScrollIntent(deltaY * 2)) event.preventDefault();
    }

    function onTouchEnd() {
      touchYRef.current = null;
    }

    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchstart", onTouchStart, {
      passive: true,
      capture: true,
    });
    window.addEventListener("touchmove", onTouchMove, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchend", onTouchEnd, { capture: true });

    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart, true);
      window.removeEventListener("touchmove", onTouchMove, true);
      window.removeEventListener("touchend", onTouchEnd, true);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div className="flex h-full flex-col">
        <div className="relative z-10 mx-auto w-full max-w-3xl shrink-0 px-4 pt-20 text-center md:pt-24">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Unified intelligence
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-zinc-900 tracking-tight">
            Data layers into{" "}
            <span className="text-primary-gradient">one model</span>
          </h2>
        </div>

        <div className="relative min-h-0 flex-1 px-2 pb-10 pt-20">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[1] h-120 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,#dbeafe_0%,transparent_70%)] opacity-70" />
          <IntelligenceStackVisual
            className="h-full w-full"
            scrollProgress={scrollProgress}
          />
        </div>
      </div>
    </section>
  );
}
