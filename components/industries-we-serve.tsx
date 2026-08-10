"use client";

import {
  Factory,
  ShoppingCart,
  Truck,
  HeartPulse,
  Cpu,
  ArrowRight,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import { SectionTag } from "@/components/ui/section-tag";

interface Industry {
  title: string;
  description: string;
  icon: LucideIcon;
}

const industries: Industry[] = [
  {
    title: "Financial Services",
    description:
      "Revenue, margins, portfolio performance, risk exposure, fraud signals, and regulatory compliance insights.",
    icon: Landmark,
  },
  {
    title: "Healthcare",
    description:
      "Patient flow, care outcomes, capacity planning, operational efficiency, resource use, and cost management.",
    icon: HeartPulse,
  },
  {
    title: "Retail & E-commerce",
    description:
      "Sales trends, conversion rates, demand patterns, customer behavior, inventory flow, and channel ROI.",
    icon: ShoppingCart,
  },
  {
    title: "Manufacturing",
    description:
      "Production output, capacity use, downtime, quality control, operational efficiency, and cost drivers.",
    icon: Factory,
  },
  {
    title: "Logistics & Supply Chain",
    description:
      "Inventory visibility, delivery timelines, lead times, route efficiency, vendor performance, and risks.",
    icon: Truck,
  },
  {
    title: "SaaS & Technology",
    description:
      "User growth, churn, product usage, feature adoption, recurring revenue, and unit economics.",
    icon: Cpu,
  },
];

export default function IndustriesWeServe() {
  return (
    <section
      id="industries"
      className="relative w-full scroll-mt-28 overflow-hidden bg-white py-20 md:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-16">
          <div className="w-full lg:w-[54%]">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {industries.map((industry, index) => (
                <IndustryCard
                  key={industry.title}
                  industry={industry}
                  index={index}
                />
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-1 text-center lg:w-[46%] lg:pl-6 lg:text-left">
            <SectionTag className="mb-1.5 lg:self-start">Industries</SectionTag>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
              Industries We <span className="text-primary-gradient">Serve</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-zinc-500 md:text-lg lg:mx-0">
              Whether you move money, goods, or software—Fennix aligns metrics
              to how your industry actually runs, so leaders see signal instead
              of noise.
            </p>
            <div className="pt-6">
              <button
                type="button"
                className="btn-primary group mx-auto flex items-center gap-2 px-8 py-3.5 lg:mx-0"
              >
                Start Your 30-Day Pilot
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustryCard({
  industry,
  index,
}: {
  industry: Industry;
  index: number;
}) {
  const Icon = industry.icon;
  const n = String(index + 1).padStart(2, "0");

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl border border-[#d7e6f5] bg-white p-5 shadow-[0_1px_0_rgba(20,86,168,0.04)] transition-all duration-500",
        "hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_24px_48px_-20px_rgba(6,27,49,0.55)]",
        "sm:p-6",
      ].join(" ")}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 z-0 h-28 w-28 rounded-full opacity-0 transition-all duration-500 ease-out group-hover:-right-[40%] group-hover:-top-[40%] group-hover:h-[220%] group-hover:w-[220%] group-hover:opacity-100"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 delay-75 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 85% 15%, rgba(42,122,232,0.28) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-[linear-gradient(145deg,rgba(42,122,232,0.12)_0%,rgba(255,255,255,0.9)_55%,rgba(20,86,168,0.06)_100%)] text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-[#061b31] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
          <Icon size={20} strokeWidth={2.1} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <h3 className="text-[15px] font-semibold tracking-tight text-zinc-900 transition-colors duration-500 group-hover:text-white sm:text-base">
              {industry.title}
            </h3>
          </div>
          <p className="text-[13px] leading-relaxed text-zinc-500 transition-colors duration-500 group-hover:text-white/70 sm:text-sm">
            {industry.description}
          </p>
          <div className="mt-3 flex translate-x-[-4px] items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-[#93c5fd] group-hover:opacity-100">
            Explore
            <ArrowRight size={12} strokeWidth={2.4} />
          </div>
        </div>
      </div>
    </article>
  );
}
