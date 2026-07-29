"use client";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { setLenisInstance } from "@/components/scroll/lenis-instance";

gsap.registerPlugin(ScrollTrigger);

export default function LenisScroll() {
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    setLenisInstance(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform
        ? "transform"
        : "fixed",
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });
    ScrollTrigger.addEventListener("refresh", () => lenis.resize());

    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tickerUpdate);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
