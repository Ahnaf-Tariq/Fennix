"use client";

import { ArrowRight, CalendarDays, Clock3, Video } from "lucide-react";

export default function ContactBooking() {
  return (
    <section className="relative overflow-hidden bg-[#F8F9FA] py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-[#d7e6f5] px-6 py-10 shadow-[0_28px_70px_-40px_rgba(6,27,49,0.5)] sm:px-10 sm:py-12 lg:px-14">
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

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb8f5]">
                Live conversation
              </p>
              <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                Book a 30-minute meeting
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
                Prefer to talk live? Pick a time below. You will receive a
                Google Meet link when you book.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {[
                  { icon: Clock3, label: "30 minutes" },
                  { icon: Video, label: "Google Meet" },
                  { icon: CalendarDays, label: "Same-week slots" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-2 text-xs font-medium text-white/85 backdrop-blur-sm"
                  >
                    <Icon size={14} strokeWidth={2.2} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md sm:p-6">
                <h3 className="mb-2 text-lg font-semibold tracking-tight text-white">
                  Schedule with Fennix
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-white/60">
                  Walk through your use case, data sources, and what a
                  successful pilot looks like for your team.
                </p>
                <a
                  href="mailto:sales@fennix.ai?subject=Book%20a%2030-minute%20meeting"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-[#061b31] shadow-[0_14px_32px_-14px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-[#e8f2ff]"
                >
                  Book a meeting
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
