"use client";

import { ArrowRight } from "lucide-react";

export default function PricingCta() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#d7e6f5] px-6 py-12 text-center shadow-[0_24px_60px_-36px_rgba(6,27,49,0.45)] sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(145deg, #0d2f54 0%, #0a2745 45%, #061b31 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(42,122,232,0.45) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(143,184,245,0.35) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Stop Guessing.{" "}
              <span className="text-[#8fb8f5]">Start Deciding.</span>
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
              Built for executives who need clear decision support, not data
              overload.
            </p>
            <button
              type="button"
              className="cursor-pointer group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#061b31] shadow-[0_14px_32px_-14px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-[#e8f2ff]"
              onClick={() => {
                window.location.href = "/contact";
              }}
            >
              Start Your 30-Day Pilot
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
