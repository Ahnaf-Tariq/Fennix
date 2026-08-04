"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Eye,
  ShieldCheck,
  ScrollText,
  Server,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SectionTag } from "@/components/ui/section-tag";

interface Feature {
  title: string;
  desc: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: "Explainable insights",
    icon: Eye,
    desc: "Every recommendation is transparent and traceable—so teams can see why a decision was made.",
  },
  {
    title: "Role-based access",
    icon: ShieldCheck,
    desc: "Control who can view, query, and act—with permissions aligned to your governance model.",
  },
  {
    title: "Audit trails",
    icon: ScrollText,
    desc: "Keep a full record of access, actions, and outcomes for detailed compliance and accountability.",
  },
  {
    title: "Deployment options",
    icon: Server,
    desc: "Deploy where your security bar requires—cloud, private environments, or hybrid setups.",
  },
];

export default function DecisionIntelligence() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-white">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="mb-12 space-y-4 text-center">
            <SectionTag className="mb-0">Our Features</SectionTag>
            <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
              Decision Intelligence{" "}
              <span className="text-primary-gradient">Predicts Risks</span>
            </h2>
            <p className="mx-auto max-w-xl text-sm text-zinc-500 md:text-base">
              Our Decision Intelligence features are designed to help you make
              better decisions.
            </p>
          </div>

          <div className="relative mx-auto flex h-[300px] w-full max-w-[1200px] items-center justify-start">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                feature={feature}
                index={index}
                total={features.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({
  feature,
  index,
  total,
  progress,
}: {
  feature: Feature;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const Icon = feature.icon;
  const n = String(index + 1).padStart(2, "0");

  const start = index * 0.15;
  const end = Math.min(start + 0.45, 1);

  const xRaw = useTransform(progress, [start, end], [0, index * 310]);
  const rotateRaw = useTransform(progress, [start, end], [-8, 0]);
  const opacity = useTransform(progress, [0, 0.05], [0.8, 1]);

  const x = useSpring(xRaw, { stiffness: 90, damping: 22 });
  const rotate = useSpring(rotateRaw, { stiffness: 90, damping: 22 });

  return (
    <motion.article
      style={{
        x,
        rotate,
        opacity,
        zIndex: total - index,
        position: "absolute",
        left: 0,
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
      className={[
        "group w-[290px] transform-gpu overflow-hidden rounded-2xl border border-[#d7e6f5] bg-white p-4 shadow-[0_1px_0_rgba(20,86,168,0.04)] will-change-transform transition-shadow duration-500",
        "hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_24px_48px_-20px_rgba(6,27,49,0.55)]",
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
              {feature.title}
            </h3>
          </div>
          <p className="text-[13px] leading-relaxed text-zinc-500 transition-colors duration-500 group-hover:text-white/70 sm:text-sm">
            {feature.desc}
          </p>
          <div className="mt-3 flex translate-x-[-4px] items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-[#93c5fd] group-hover:opacity-100">
            Explore
            <ArrowRight size={12} strokeWidth={2.4} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
