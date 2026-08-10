"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { SectionTag } from "@/components/ui/section-tag";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: number;
  title: string;
  content: string;
  icon: LucideIcon;
  relatedIds: number[];
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

function formatNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function PanelShell({
  children,
  className,
  isActive,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "group relative overflow-hidden rounded-[1.35rem] border border-white/15 text-left outline-none",
        "shadow-[0_22px_50px_-28px_rgba(6,27,49,0.55)]",
        "transition-[flex-grow,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "focus-visible:border-[#8fb8f5]/50 focus-visible:ring-2 focus-visible:ring-[#2a7ae8]/35",
        isActive &&
          "border-[#8fb8f5]/35 shadow-[0_28px_60px_-26px_rgba(6,27,49,0.65)]",
        className,
      )}
      {...props}
    >
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
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(143,184,245,0.55)_50%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-0 h-44 w-44 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(42,122,232,0.45) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-14 bottom-0 h-40 w-40 rounded-full opacity-45"
        style={{
          background:
            "radial-gradient(circle, rgba(143,184,245,0.28) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
          isActive && "opacity-100",
        )}
        style={{
          background:
            "linear-gradient(145deg, rgba(42,122,232,0.22) 0%, transparent 48%, rgba(143,184,245,0.08) 100%)",
        }}
      />
      {children}
    </button>
  );
}

function DesktopStrip({
  timelineData,
}: {
  timelineData: TimelineItem[];
}) {
  const [activeId, setActiveId] = useState(timelineData[0]?.id ?? null);

  return (
    <div
      className="hidden h-[min(54vh,440px)] w-full gap-1.5 md:flex"
      onMouseLeave={() => setActiveId(timelineData[0]?.id ?? null)}
    >
      {timelineData.map((item, index) => {
        const Icon = item.icon;
        const isExpanded = activeId === item.id;
        const number = formatNumber(index);

        return (
          <PanelShell
            key={item.id}
            isActive={isExpanded}
            aria-expanded={isExpanded}
            aria-label={item.title}
            onMouseEnter={() => setActiveId(item.id)}
            onFocus={() => setActiveId(item.id)}
            className="flex h-full min-w-0 flex-col"
            style={{
              flexGrow: isExpanded ? 5.5 : 1,
              flexBasis: 0,
            }}
          >
            <span className="absolute right-3 top-3 z-10 font-semibold tracking-[0.16em] text-white/40 sm:right-4 sm:top-4 sm:text-sm">
              {number}
            </span>

            <span
              aria-hidden
              className="pointer-events-none absolute bottom-[-0.35rem] left-1/2 z-0 -translate-x-1/2 text-[5.5rem] font-semibold leading-none text-white/5"
            >
              {number}
            </span>

            {/* Collapsed */}
            <div
              className={cn(
                "relative z-10 flex h-full flex-col items-center justify-between px-2 py-9 transition-opacity duration-300",
                isExpanded ? "pointer-events-none opacity-0" : "opacity-100",
              )}
              aria-hidden={isExpanded}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#8fb8f5] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm">
                <Icon size={20} strokeWidth={2.1} />
              </span>
              <span
                className="mt-auto text-[13px] font-semibold tracking-tight whitespace-nowrap text-white/85"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {item.title}
              </span>
            </div>

            {/* Expanded */}
            <div
              className={cn(
                "absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-6",
                "transition-opacity duration-300",
                isExpanded ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <div className="flex items-start justify-between gap-3 pr-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/12 text-white shadow-[0_14px_28px_-14px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                  <Icon size={22} strokeWidth={2.05} />
                </span>
                <span className="mt-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb8f5] backdrop-blur-sm">
                  Capability
                </span>
              </div>

              <div className="max-w-md pr-4">
                <div
                  aria-hidden
                  className="mb-4 h-px w-16 bg-[linear-gradient(90deg,#8fb8f5_0%,transparent_100%)]"
                />
                <h3 className="mb-2.5 text-2xl font-semibold tracking-tight text-white sm:text-[1.7rem]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/65 sm:text-[15px] sm:leading-7">
                  {item.content}
                </p>
              </div>
            </div>
          </PanelShell>
        );
      })}
    </div>
  );
}

function MobileAccordion({
  timelineData,
}: {
  timelineData: TimelineItem[];
}) {
  const [activeId, setActiveId] = useState<number | null>(
    timelineData[0]?.id ?? null,
  );

  return (
    <div className="flex flex-col gap-2.5 md:hidden">
      {timelineData.map((item, index) => {
        const Icon = item.icon;
        const isExpanded = activeId === item.id;
        const number = formatNumber(index);

        return (
          <PanelShell
            key={item.id}
            isActive={!!isExpanded}
            aria-expanded={isExpanded}
            onClick={() =>
              setActiveId((current) => (current === item.id ? null : item.id))
            }
            className={cn(
              "w-full",
              "transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isExpanded ? "max-h-80" : "max-h-[84px]",
            )}
          >
            <div className="relative z-10 flex items-center gap-3.5 px-4 py-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/12 text-[#8fb8f5] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm">
                <Icon size={18} strokeWidth={2.05} />
              </span>
              <span className="min-w-0 flex-1 text-sm font-semibold tracking-tight text-white">
                {item.title}
              </span>
              <span className="text-xs font-semibold tracking-[0.16em] text-white/40">
                {number}
              </span>
            </div>

            <div
              className={cn(
                "relative z-10 overflow-hidden px-4 transition-opacity duration-300",
                isExpanded
                  ? "pb-5 opacity-100"
                  : "pointer-events-none h-0 pb-0 opacity-0",
              )}
            >
              <div
                aria-hidden
                className="mb-3 ml-12 h-px w-12 bg-[linear-gradient(90deg,#8fb8f5_0%,transparent_100%)]"
              />
              <p className="pl-12 text-sm leading-relaxed text-white/65">
                {item.content}
              </p>
            </div>
          </PanelShell>
        );
      })}
    </div>
  );
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  return (
    <section className="relative w-full overflow-hidden bg-white py-14 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(42,122,232,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 text-center md:mb-12">
          <SectionTag>What Fennix Does</SectionTag>
          <h2 className="mb-2 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
            Turn Questions Into{" "}
            <span className="text-primary-gradient">Intelligent Decisions</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-zinc-500 md:text-base">
            Fennix unifies fragmented IT, finance, ops, sales, and market data
            into one AI layer—delivering real-time insights, recommendations,
            and continuous tracking.
          </p>
        </div>

        <DesktopStrip timelineData={timelineData} />
        <MobileAccordion timelineData={timelineData} />
      </div>
    </section>
  );
}
