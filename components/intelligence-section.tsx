"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IntelligenceStackVisual } from "@/components/three";
import { getLenisInstance } from "@/components/scroll/lenis-instance";
import { SectionTag } from "@/components/ui/section-tag";
import { INTELLIGENCE_LAYERS } from "./three/unified-data-layer-scene";
import { cn } from "@/lib/utils";

/** Exponential progress catch-up (1/sec). Higher = snappier, still smooth. */
const PROGRESS_SMOOTHING = 14;
const STACK_TOP_RATIO = 0.14;
const STACK_BOTTOM_RATIO = 0.86;
const STACK_RIGHT_RATIO = 0.56;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

interface ConnectorPoints {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default function IntelligenceSection() {
  const trackRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const cardHeaderRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const lastFrameTimeRef = useRef<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [connector, setConnector] = useState<ConnectorPoints | null>(null);

  useEffect(() => {
    let rafId = 0;

    const tick = (time: number) => {
      const last = lastFrameTimeRef.current ?? time;
      const dt = Math.min((time - last) / 1000, 1 / 30);
      lastFrameTimeRef.current = time;

      const current = smoothProgressRef.current;
      const target = targetProgressRef.current;
      const factor = 1 - Math.exp(-PROGRESS_SMOOTHING * dt);
      const next =
        Math.abs(target - current) < 0.0004
          ? target
          : current + (target - current) * factor;

      smoothProgressRef.current = next;
      setScrollProgress(next);

      const layerCount = INTELLIGENCE_LAYERS.length;
      // Continuous blend across layers — no discrete switch / Framer queue
      const raw = clamp(next * layerCount, 0, layerCount - 1.0001);
      const i0 = Math.floor(raw);
      const i1 = Math.min(i0 + 1, layerCount - 1);
      const blend = smoothstep(raw - i0);

      for (let i = 0; i < layerCount; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        let opacity = 0;
        let y = 0;
        if (i === i0 && i0 === i1) {
          opacity = 1;
        } else if (i === i0) {
          opacity = 1 - blend;
          y = -10 * blend;
        } else if (i === i1) {
          opacity = blend;
          y = 10 * (1 - blend);
        }

        el.style.opacity = String(opacity);
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
        el.style.zIndex = opacity > 0.5 ? "2" : "1";
        el.style.pointerEvents = opacity > 0.55 ? "auto" : "none";
        el.setAttribute("aria-hidden", opacity > 0.55 ? "false" : "true");
      }

      const grid = gridRef.current;
      const canvasWrap = canvasWrapRef.current;
      const cardHeader = cardHeaderRef.current;

      if (grid && canvasWrap && cardHeader && window.innerWidth >= 1024) {
        const gridRect = grid.getBoundingClientRect();
        const canvasRect = canvasWrap.getBoundingClientRect();
        const headerRect = cardHeader.getBoundingClientRect();

        const continuousIndex = clamp(raw, 0, layerCount - 1);
        const layerFraction =
          (continuousIndex + 0.5) / layerCount;
        const yRatio =
          STACK_TOP_RATIO +
          layerFraction * (STACK_BOTTOM_RATIO - STACK_TOP_RATIO);

        const x1 =
          canvasRect.left -
          gridRect.left +
          canvasRect.width * STACK_RIGHT_RATIO;
        const y1 = canvasRect.top - gridRect.top + canvasRect.height * yRatio;
        const x2 = headerRect.left - gridRect.left;
        const y2 = headerRect.top - gridRect.top + headerRect.height / 2;

        setConnector((prev) => {
          if (
            prev &&
            Math.abs(prev.x1 - x1) < 0.75 &&
            Math.abs(prev.y1 - y1) < 0.75 &&
            Math.abs(prev.x2 - x2) < 0.75 &&
            Math.abs(prev.y2 - y2) < 0.75
          ) {
            return prev;
          }
          return { x1, y1, x2, y2 };
        });
      } else {
        setConnector((prev) => (prev === null ? prev : null));
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      lastFrameTimeRef.current = null;
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function updateProgress() {
      const rect = track!.getBoundingClientRect();
      const trackHeight = track!.offsetHeight;
      const viewport = window.innerHeight;
      const scrollable = Math.max(1, trackHeight - viewport);
      const scrolled = clamp(-rect.top, 0, scrollable);
      targetProgressRef.current = scrolled / scrollable;
    }

    updateProgress();

    const lenis = getLenisInstance();
    const onLenisScroll = () => updateProgress();
    lenis?.on("scroll", onLenisScroll);

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    const bindTimer = window.setInterval(() => {
      const next = getLenisInstance();
      if (!next || next === lenis) return;
      next.on("scroll", onLenisScroll);
      window.clearInterval(bindTimer);
    }, 250);

    return () => {
      window.clearInterval(bindTimer);
      lenis?.off("scroll", onLenisScroll);
      getLenisInstance()?.off("scroll", onLenisScroll);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const pathD = connector
    ? `M ${connector.x1} ${connector.y1} C ${
        connector.x1 + (connector.x2 - connector.x1) * 0.4
      } ${connector.y1}, ${connector.x1 + (connector.x2 - connector.x1) * 0.6} ${
        connector.y2
      }, ${connector.x2} ${connector.y2}`
    : "";

  return (
    <section ref={trackRef} className="relative z-20 h-[260vh] lg:h-[220vh]">
      <div className="sticky top-0 z-20 flex h-screen flex-col overflow-visible">
        <div className="relative z-10 mx-auto w-full max-w-3xl shrink-0 px-4 pt-16 text-center sm:pt-20 md:pt-24">
          <SectionTag>Unified intelligence</SectionTag>
          <h2 className="mb-2 font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl md:text-5xl lg:text-6xl">
            Data layers into{" "}
            <span className="text-primary-gradient">one model</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-cream-muted md:text-base">
            Fennix Decision Intelligence is a platform that helps you make
            better decisions.
          </p>
        </div>

        <div
          ref={gridRef}
          className="relative z-10 grid min-h-0 flex-1 grid-cols-1 items-center gap-2 overflow-visible px-4 pb-6 pt-2 sm:gap-4 sm:pb-8 sm:pt-4 lg:grid-cols-2 lg:gap-8 lg:px-8"
        >
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-120 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(42,122,232,0.18)_0%,transparent_70%)] opacity-70" />

          {connector ? (
            <svg
              className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full lg:block"
              aria-hidden
            >
              <defs>
                <linearGradient
                  id="connectorGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#2a7ae8" stopOpacity="0" />
                  <stop offset="15%" stopColor="#2a7ae8" stopOpacity="0.75" />
                  <stop offset="85%" stopColor="#2a7ae8" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#2a7ae8" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="pulseGradient">
                  <stop offset="0%" stopColor="#e8f2ff" stopOpacity="1" />
                  <stop offset="40%" stopColor="#8fb8f5" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#2a7ae8" stopOpacity="0" />
                </radialGradient>
                <filter
                  id="connectorGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="3.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter
                  id="pulseGlow"
                  x="-150%"
                  y="-150%"
                  width="400%"
                  height="400%"
                >
                  <feGaussianBlur stdDeviation="2.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d={pathD}
                stroke="url(#connectorGradient)"
                strokeWidth={2.5}
                fill="none"
                filter="url(#connectorGlow)"
                opacity={0.55}
              />
              <path
                d={pathD}
                stroke="url(#connectorGradient)"
                strokeWidth={1.25}
                fill="none"
              />
              <motion.path
                d={pathD}
                stroke="#8fb8f5"
                strokeWidth={1.25}
                fill="none"
                strokeDasharray="4 14"
                animate={{ strokeDashoffset: [0, -72] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              />

              {[0, 0.5, 1, 1.5].map((delay) => (
                <circle
                  key={delay}
                  r={3.2}
                  fill="url(#pulseGradient)"
                  filter="url(#pulseGlow)"
                >
                  <animateMotion
                    dur="2s"
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                    path={pathD}
                    rotate="auto"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.08;0.85;1"
                    dur="2s"
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

              <circle
                cx={connector.x1}
                cy={connector.y1}
                r={3}
                fill="#2a7ae8"
                filter="url(#connectorGlow)"
              />
              <circle
                cx={connector.x2}
                cy={connector.y2}
                r={2.5}
                fill="#2a7ae8"
                filter="url(#connectorGlow)"
              />
            </svg>
          ) : null}

          <div
            ref={canvasWrapRef}
            className="relative z-10 h-[45vh] min-h-0 w-full sm:h-[50vh] lg:h-full"
          >
            <IntelligenceStackVisual
              className="h-full w-full"
              scrollProgress={scrollProgress}
            />
          </div>

          <div className="relative z-30 flex h-auto min-h-0 w-full items-center justify-center px-1 lg:h-full">
            <div className="relative z-30 w-full max-w-md overflow-visible">
              {/*
                Continuous scroll-driven crossfade (DOM styles in rAF).
                No Framer AnimatePresence — avoids queued jerks on fast scroll.
              */}
              <div className="relative min-h-[11.5rem] sm:min-h-[13rem] md:min-h-[15rem]">
                {/* Stable connector anchor (doesn't jump between cards) */}
                <div
                  ref={cardHeaderRef}
                  className="pointer-events-none absolute left-5 top-5 h-6 w-px opacity-0"
                  aria-hidden
                />

                {INTELLIGENCE_LAYERS.map((layer, index) => (
                  <div
                    key={layer.label}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className={cn(
                      "rounded-lg border border-white/10 bg-surface-raised/95 px-3 py-2 shadow-[0_8px_30px_rgba(2,8,20,0.45)] backdrop-blur-md will-change-[opacity,transform] sm:rounded-2xl sm:px-4 sm:py-3 md:px-5 md:py-4",
                      index === 0 ? "relative" : "absolute inset-0",
                    )}
                    style={{
                      opacity: index === 0 ? 1 : 0,
                      transform: "translate3d(0, 0, 0)",
                    }}
                    aria-hidden={index !== 0}
                  >
                    <div>
                      <span className="text-[9px] font-medium uppercase tracking-wider text-[#93c5fd] sm:text-[11px] md:text-xs">
                        {layer.eyebrow}
                      </span>

                      <h3 className="mt-0 text-sm font-semibold tracking-tight text-cream sm:mt-1 sm:text-base md:text-xl">
                        {layer.title}
                      </h3>
                    </div>

                    <p className="mt-0.5 text-[10px] leading-relaxed text-cream-muted sm:mt-1 sm:text-xs md:text-sm">
                      {layer.description}
                    </p>

                    <ul className="mt-1 space-y-1 sm:space-y-1.5 md:mt-2">
                      {layer.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-1 text-[9px] text-cream-muted sm:gap-1.5 sm:text-xs md:gap-2.5 md:text-sm"
                        >
                          <span
                            aria-hidden
                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          />
                          <span className="leading-snug text-cream/90">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
