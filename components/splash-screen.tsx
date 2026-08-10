"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { getLenisInstance } from "@/components/scroll/lenis-instance";
import {
  markSplashComplete,
  markSplashExiting,
  resetSplashLifecycle,
} from "@/lib/splash-lifecycle";

const BLIND_COUNT = 15;
const FAVICON_SRC = "/images/favicon.ico";
const LOGO_SRC = "/images/logo_2_splash.png";

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export default function SplashScreen() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const logoTextWrapRef = useRef<HTMLDivElement>(null);
  const shadesRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useLayoutEffect(() => {
    let cancelled = false;
    let ctx: gsap.Context | null = null;

    resetSplashLifecycle();
    document.documentElement.classList.add("splash-active");
    document.body.style.overflow = "hidden";

    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    getLenisInstance()?.scrollTo(0, { immediate: true });
    getLenisInstance()?.stop();

    void import("@splinetool/react-spline");

    async function startAnimation() {
      await Promise.all([preloadImage(FAVICON_SRC), preloadImage(LOGO_SRC)]);
      if (cancelled || !preloaderRef.current) return;

      // Let the browser paint the loaded images into layout before measuring.
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });
      if (cancelled) return;

      ctx = gsap.context(() => {
        const textEl = textRef.current;
        const isMobile = window.innerWidth < 640;
        const gap = isMobile ? 12 : 28;
        const textWidth = textEl?.getBoundingClientRect().width ?? 0;
        const logoShift = textWidth > 0 ? -(textWidth + gap) / 2 : 0;

        gsap.set(logoRef.current, { scale: 0, opacity: 0 });
        gsap.set(logoTextWrapRef.current, { x: 0, opacity: 1 });
        gsap.set(textEl, {
          clipPath: "inset(0 100% 0 0)",
          opacity: 0,
        });

        const tl = gsap.timeline({
          onComplete: () => {
            if (cancelled) return;
            setIsComplete(true);
            document.body.style.overflow = "";
            document.documentElement.classList.remove("splash-active");
            getLenisInstance()?.start();
            markSplashComplete();
          },
        });

        tl.to(logoRef.current, {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
        });

        tl.to(
          textEl,
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 0.85,
            ease: "expo.out",
          },
          "-=0.15",
        );

        tl.to(
          logoTextWrapRef.current,
          {
            x: logoShift,
            duration: 0.85,
            ease: "power2.inOut",
          },
          "<",
        );

        tl.to({}, { duration: 0.7 });

        tl.to(logoTextWrapRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onStart: () => markSplashExiting(),
        });

        const shades = shadesRef.current?.children;
        if (shades) {
          const shadeArray = Array.from(shades) as HTMLElement[];

          gsap.set(shadeArray, {
            scaleX: 1,
            transformOrigin: "left center",
          });

          tl.to(
            shadeArray,
            {
              scaleX: 0,
              duration: 0.35,
              stagger: {
                amount: 0.5,
                from: "start",
              },
              ease: "power2.inOut",
            },
            "-=0.05",
          );
        }
      }, preloaderRef);
    }

    void startAnimation();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  if (isComplete) return null;

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-[9999]">
      <div ref={shadesRef} className="pointer-events-none absolute inset-0">
        {Array.from({ length: BLIND_COUNT }).map((_, i) => {
          const widthPct = 100 / BLIND_COUNT;
          return (
            <div
              key={i}
              className="absolute top-0 bottom-0 bg-[#01060f]"
              style={{
                left: `calc(${i * widthPct}% - 1px)`,
                width: `calc(${widthPct}% + 2px)`,
                transformOrigin: "left center",
                willChange: "transform",
              }}
            />
          );
        })}
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div
          ref={logoTextWrapRef}
          className="relative flex items-center justify-center"
        >
          <div
            ref={logoRef}
            className="relative z-10 flex shrink-0 items-center justify-center"
            style={{
              willChange: "transform",
              transform: "scale(0)",
              opacity: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FAVICON_SRC}
              alt="Fennix"
              width={66}
              height={66}
              className="h-10 w-10 object-contain sm:h-[66px] sm:w-[66px]"
              draggable={false}
            />
          </div>

          <div
            ref={textRef}
            className="absolute top-1/2 left-full ml-3 -translate-y-1/2 overflow-hidden sm:ml-7"
            style={{
              clipPath: "inset(0 100% 0 0)",
              opacity: 0,
            }}
          >
            {/* Transparent white wordmark — blends into dark splash like Getweys */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_SRC}
              alt="Fennix"
              width={351}
              height={88}
              className="block h-8 w-auto max-w-none sm:h-11"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
