"use client";

import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { HeroWalkthrough } from "./hero-walkthrough";

const SPLINE_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

function HeroAbstractPattern() {
  const ringRadii = [90, 150, 210, 270, 330, 390];

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[58%] overflow-hidden md:w-[54%] lg:w-[50%]">
      <svg
        viewBox="0 0 640 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-[-6%] top-[8%] h-[min(88dvh,820px)] w-auto max-w-none opacity-[0.09] md:right-[-2%] md:top-[6%] lg:right-0"
        aria-hidden
      >
        <g stroke="#b8d4f8" strokeWidth="1" fill="none">
          {ringRadii.map((radius) => (
            <circle key={radius} cx="96" cy="300" r={radius} />
          ))}
        </g>

        <g stroke="#ffffff" strokeWidth="0.75" fill="none" opacity="0.7">
          <path d="M0 228 C120 208 220 228 340 228 S540 208 640 228" />
          <path d="M0 308 C100 328 220 308 340 308 S560 328 640 308" />
          <path d="M0 388 C130 368 240 388 360 388 S530 368 640 388" />
        </g>

        <g stroke="#93c5fd" strokeWidth="0.75" fill="none" opacity="0.65">
          <path d="M96 300 A200 200 0 0 1 96 500" />
          <path d="M96 300 A280 280 0 0 0 96 20" />
          <path d="M96 300 A340 340 0 0 1 436 300" />
          <path d="M96 300 A420 420 0 0 0 516 300" />
        </g>
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-dvh overflow-x-clip">
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero-glow-left)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero-glow-right)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero-glow-bottom)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero-vignette)" }}
      />
      <div className="pointer-events-none absolute -right-16 top-[38%] h-[min(70dvh,680px)] w-[min(52vw,640px)] -translate-y-1/2 rounded-full bg-[#0c4a8c]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[42%] w-[48%] rounded-full bg-[#041628]/50 blur-[100px]" />

      <HeroAbstractPattern />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-7xl flex-col px-6 pb-10 pt-28 md:px-8 lg:flex-row lg:items-stretch lg:gap-4 lg:px-10 lg:pb-12">
        <div className="relative flex flex-1 flex-col justify-center overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-10"
            size={260}
          />

          <div className="relative z-10">
            <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7dd3fc]" />
              Unified AI Intelligence
            </p>

            <h1 className="text-2xl font-semibold leading-[1.08] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-6xl">
              AI-Powered Decision{" "}
              <span className="text-[#93c5fd]">Intelligence</span> Platform
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
              Turn fragmented business data into real-time decisions — one AI
              layer for your entire organization.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-2.5">
              <button
                type="button"
                className="btn-primary btn-glass-shimmer px-4 py-2"
              >
                Start Your 30-Day Pilot
              </button>
              <a
                href="#fennix-decision"
                className="btn-glass-shimmer inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm"
              >
                Meet Fennix
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative mt-6 flex flex-1 items-end justify-center lg:mt-0">
          <div className="relative h-[min(68dvh,620px)] w-full max-w-[720px] overflow-visible">
            <HeroWalkthrough />
            <div className="absolute inset-x-0 bottom-0 h-[118%] origin-bottom -translate-x-[6%] scale-[0.78] sm:-translate-x-[8%] sm:scale-[0.84] md:-translate-x-[10%] md:scale-[0.88] lg:-translate-x-[12%] lg:scale-[0.92]">
              <SplineScene scene={SPLINE_SCENE} className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
