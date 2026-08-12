"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export interface ProcessStep {
  title: string;
  description: string;
  link: string;
  tags: string[];
  n: string;
}

const COLLAPSED_HEIGHT = 44;
const EXPANDED_HEIGHT = 300;
const CARD_GAP = 8;

function getStackHeight(stepCount: number) {
  return (
    stepCount * COLLAPSED_HEIGHT +
    (EXPANDED_HEIGHT - COLLAPSED_HEIGHT) +
    Math.max(stepCount - 1, 0) * CARD_GAP
  );
}

function getExpandAmount(activePosition: number, index: number) {
  return Math.max(0, 1 - Math.abs(activePosition - index));
}

interface ProcessCardProps {
  step: ProcessStep;
  index: number;
  activePosition: ReturnType<typeof useTransform<number, number>>;
}

function ProcessCard({ step, index, activePosition }: ProcessCardProps) {
  const height = useTransform(activePosition, (position) => {
    const expand = getExpandAmount(position, index);
    return COLLAPSED_HEIGHT + expand * (EXPANDED_HEIGHT - COLLAPSED_HEIGHT);
  });

  const contentOpacity = useTransform(activePosition, (position) => {
    const expand = getExpandAmount(position, index);
    return expand < 0.2 ? 0 : Math.min(1, (expand - 0.2) / 0.35);
  });

  const barOpacity = useTransform(activePosition, (position) => {
    const expand = getExpandAmount(position, index);
    return expand > 0.35 ? 0 : 1;
  });

  return (
    <motion.article
      style={{ height }}
      className="relative w-full overflow-hidden rounded-sm bg-[#eceff3]"
    >
      <motion.div
        style={{ opacity: barOpacity }}
        className="absolute inset-0 flex items-center px-5"
        aria-hidden
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {step.n} — {step.title}
        </span>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="grid h-full grid-cols-1 gap-4 p-5 md:grid-cols-[1fr_190px] md:items-start md:gap-6 md:p-6"
      >
        <div className="flex min-w-0 flex-col">
          <h3 className="mb-3 text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
            {step.title}
          </h3>

          <div className="mb-3 flex flex-wrap gap-2">
            {step.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-zinc-300/80 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-zinc-600">
            {step.description}
          </p>
        </div>

        <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-sm bg-zinc-200 md:h-36 md:w-[180px] md:justify-self-end">
          <Image
            src={step.link}
            alt={step.title}
            fill
            loading="lazy"
            sizes="190px"
            className="object-cover"
          />
        </div>
      </motion.div>
    </motion.article>
  );
}

function VerticalFennixHeading({
  scrollProgress,
  stackHeight,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  stackHeight: number;
}) {
  const measureRef = useRef<HTMLParagraphElement>(null);
  const [scaleY, setScaleY] = useState(1);

  const fillMask = useTransform(
    scrollProgress,
    (progress) =>
      `linear-gradient(to bottom, #000 ${progress * 100}%, transparent ${progress * 100}%)`,
  );

  const textStyle = {
    writingMode: "vertical-rl" as const,
    textOrientation: "mixed" as const,
    fontSize: "3.75rem",
    lineHeight: 0.82,
  };

  const updateScale = useCallback(() => {
    const el = measureRef.current;
    if (!el || stackHeight <= 0) return;

    const naturalHeight = el.offsetHeight;
    if (naturalHeight > 0) setScaleY(stackHeight / naturalHeight);
  }, [stackHeight]);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  return (
    <div
      className="relative mt-4 hidden shrink-0 select-none lg:block"
      style={{ height: stackHeight > 0 ? stackHeight : undefined }}
      aria-hidden
    >
      <p
        ref={measureRef}
        className="pointer-events-none invisible absolute left-0 top-0 font-semibold uppercase tracking-[0.08em]"
        style={textStyle}
      >
        Fennix
      </p>

      <div
        className="relative inline-block origin-top"
        style={{ transform: `scaleY(${scaleY})` }}
      >
        <p
          className="font-semibold uppercase tracking-[0.08em] text-[#e4e8ee]"
          style={textStyle}
        >
          Fennix
        </p>
        <motion.p
          style={{
            ...textStyle,
            WebkitMaskImage: fillMask,
            maskImage: fillMask,
          }}
          className="absolute inset-0 font-semibold uppercase tracking-[0.08em] text-[#1456A8]"
        >
          Fennix
        </motion.p>
      </div>
    </div>
  );
}

function MobileProcessCard({ step }: { step: ProcessStep }) {
  return (
    <article className="overflow-hidden rounded-sm bg-[#eceff3]">
      <div className="flex flex-col gap-6 p-6">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {step.n}
          </p>
          <h3 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">
            {step.title}
          </h3>
          <div className="mb-4 flex flex-wrap gap-2">
            {step.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-zinc-300/80 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm leading-relaxed text-zinc-600">
            {step.description}
          </p>
        </div>
        <div className="relative h-52 w-full overflow-hidden rounded-sm bg-zinc-200">
          <Image
            src={step.link}
            alt={step.title}
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </article>
  );
}

interface StackingCardProps {
  steps: ProcessStep[];
}

export default function StackingCard({ steps }: StackingCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [stackHeight, setStackHeight] = useState(() =>
    getStackHeight(steps.length),
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activePosition = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.max(steps.length - 1, 0)],
  );

  useEffect(() => {
    const cardsEl = cardsRef.current;
    if (!cardsEl) return;

    function syncStackHeight() {
      if (!cardsRef.current) return;
      const measured = cardsRef.current.offsetHeight;
      if (measured > 0) setStackHeight(measured);
    }

    syncStackHeight();

    const observer = new ResizeObserver(syncStackHeight);
    observer.observe(cardsEl);
    window.addEventListener("resize", syncStackHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncStackHeight);
    };
  }, [steps.length]);

  const pinHeight = `${Math.max(steps.length, 1) * 100}vh`;

  return (
    <>
      <div className="space-y-4 px-4 lg:hidden">
        {steps.map((step) => (
          <MobileProcessCard key={step.title} step={step} />
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative hidden lg:block"
        style={{ height: pinHeight }}
      >
        <div className="sticky top-0 flex h-screen items-center pt-6 lg:pt-8">
          <div className="mx-auto flex w-full max-w-6xl items-start gap-10 px-6 xl:gap-14">
            <VerticalFennixHeading
              scrollProgress={scrollYProgress}
              stackHeight={stackHeight}
            />

            <div className="min-w-0 flex-1 pt-4">
              <div ref={cardsRef} className="flex flex-col gap-2">
                {steps.map((step, index) => (
                  <ProcessCard
                    key={step.title}
                    step={step}
                    index={index}
                    activePosition={activePosition}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
