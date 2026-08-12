"use client";

import { useEffect, useState } from "react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { onSplashComplete } from "@/lib/splash-lifecycle";
import { HeroWalkthrough } from "./hero-walkthrough";
import { useRouter } from "next/navigation";

const SPLINE_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

function HeroAbstractPattern() {
  const ringRadii = [90, 150, 210, 270, 330, 390];

  return (
    <div className="pointer-events-none absolute inset-0 z-1 overflow-visible">
      <svg
        viewBox="0 0 900 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        className="absolute right-[2%] top-[2%] hidden h-[min(96dvh,900px)] w-auto max-w-none opacity-[0.09] sm:block md:right-[4%] md:top-[4%] lg:right-[5%]"
        aria-hidden
      >
        <g stroke="#b8d4f8" strokeWidth="1" fill="none">
          {ringRadii.map((radius) => (
            <circle key={radius} cx="450" cy="420" r={radius} />
          ))}
        </g>

        <g stroke="#ffffff" strokeWidth="0.75" fill="none" opacity="0.7">
          <path d="M60 340 C180 320 280 340 400 340 S640 320 840 340" />
          <path d="M60 420 C160 440 280 420 400 420 S680 440 840 420" />
          <path d="M60 500 C190 480 300 500 420 500 S650 480 840 500" />
        </g>

        <g stroke="#93c5fd" strokeWidth="0.75" fill="none" opacity="0.65">
          <path d="M450 420 A200 200 0 0 1 450 620" />
          <path d="M450 420 A280 280 0 0 0 450 140" />
          <path d="M450 420 A340 340 0 0 1 790 420" />
          <path d="M450 420 A390 390 0 0 0 60 420" />
        </g>
      </svg>
    </div>
  );
}

export default function Hero() {
  const router = useRouter();
  const [isRobotMounted, setIsRobotMounted] = useState(false);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "fetch";
    link.href = SPLINE_SCENE;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    void import("@splinetool/react-spline");
    void fetch(SPLINE_SCENE, { mode: "cors", credentials: "omit" }).catch(
      () => undefined,
    );

    const warmTimer = window.setTimeout(() => setIsRobotMounted(true), 120);
    const unbindDone = onSplashComplete(() => setIsHeroRevealed(true));

    return () => {
      window.clearTimeout(warmTimer);
      unbindDone();
      link.remove();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-dvh overflow-x-clip overflow-y-visible"
    >
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
      <div className="pointer-events-none absolute -right-10 top-[40%] h-[min(50dvh,420px)] w-[min(70vw,420px)] -translate-y-1/2 rounded-full bg-primary-mid/20 blur-[90px] sm:-right-16 sm:h-[min(70dvh,680px)] sm:w-[min(52vw,640px)] sm:blur-[120px]" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-[36%] w-[56%] rounded-full bg-[#041628]/50 blur-[80px] sm:-left-24 sm:h-[42%] sm:w-[48%] sm:blur-[100px]" />

      <HeroAbstractPattern />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-7xl flex-col px-4 pb-6 pt-24 sm:px-6 sm:pb-10 sm:pt-28 md:px-8 lg:flex-row lg:items-stretch lg:gap-4 lg:px-10 lg:pb-12">
        <div className="relative flex shrink-0 flex-col justify-center overflow-hidden lg:flex-1">
          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-10"
            size={200}
          />

          <div className="relative z-10">
            <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm sm:mb-4 sm:px-4 sm:py-1.5 sm:text-[11px] sm:tracking-[0.18em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7dd3fc]" />
              Unified AI Intelligence
            </p>

            <h1 className="max-w-[18ch] text-[1.65rem] font-medium leading-[1.12] tracking-tight text-white sm:max-w-none sm:text-3xl md:text-4xl lg:text-6xl">
              AI-Powered Decision{" "}
              <span className="text-[#93c5fd]">Intelligence</span> Platform
            </h1>

            <p className="mt-3 max-w-md text-sm font-extralight leading-relaxed text-white/75 sm:mt-5 sm:max-w-lg sm:text-base md:text-lg">
              Turn fragmented business data into real-time decisions — one AI
              layer for your entire organization.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-2.5">
              <button
                type="button"
                onClick={() => router.push("/contact")}
                className="btn-primary btn-glass-shimmer px-3.5 py-2 text-xs sm:px-4 sm:text-sm"
              >
                Start Your 30-Day Pilot
              </button>
              <a
                href="#capabilities"
                className="btn-glass-shimmer inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-sm sm:px-4 sm:text-sm"
              >
                Meet Fennix
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-20 mt-4 flex min-h-0 flex-1 items-end justify-center overflow-visible sm:mt-6 lg:mt-0">
          <div className="relative h-[min(52dvh,420px)] w-full max-w-[460px] overflow-visible sm:h-[min(54dvh,480px)] sm:max-w-[560px] md:h-[min(60dvh,560px)] md:max-w-[680px] lg:h-[min(68dvh,620px)] lg:max-w-[820px]">
            <HeroWalkthrough />
            <div className="absolute -left-[14%] right-[-6%] bottom-0 h-[112%] origin-bottom scale-[0.72] sm:-left-[18%] sm:h-[115%] sm:scale-[0.72] md:-left-[24%] md:scale-[0.84] lg:-left-[28%] lg:h-[118%] lg:scale-[0.92]">
              {isRobotMounted ? (
                <SplineScene
                  scene={SPLINE_SCENE}
                  className="h-full w-full"
                  paused={!isHeroRevealed}
                  visible={isHeroRevealed}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
