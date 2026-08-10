"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { SectionTag } from "@/components/ui/section-tag";

const steps = [
  {
    title: "Connect",
    description:
      "Fennix links up with your existing ERP, CRM, HR, Sales, Marketing, Operations, Finance into a single unified decision layer with external data sources.",
    mockup: "/images/image-1-easy.png",
    step: "01",
  },
  {
    title: "Analyze",
    description:
      "Fennix continuously analyzes your data to uncover patterns, bottlenecks, cost drivers, and market shifts—insights that would typically require a full team.",
    mockup: "/images/Web-screens-2.jpg",
    step: "02",
  },
  {
    title: "Act",
    description:
      "Your team gets clear, decision-ready recommendations—not just charts—so you understand what's happening, why, the cost impact, and what actions to take.",
    mockup: "/images/image-1-easy.png",
    step: "03",
  },
];

interface StepCardProps {
  step: (typeof steps)[number];
  index: number;
  isActive: boolean;
  isDimmed: boolean;
  onActivate: (event: React.MouseEvent<HTMLElement>) => void;
}

function StepCard({
  step,
  index,
  isActive,
  isDimmed,
  onActivate,
}: StepCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={onActivate}
      className="relative border-b border-zinc-200 py-6"
    >
      <div
        className={cn(
          "relative z-10 grid grid-cols-1 gap-2 transition-[opacity,filter] duration-200 ease-out md:grid-cols-10 md:items-start md:gap-4",
          isDimmed ? "opacity-40 blur-[2px]" : "opacity-100 blur-0",
        )}
      >
        <div className="md:col-span-1">
          <span
            className={cn(
              "text-sm font-semibold tracking-wide transition-colors duration-200",
              isActive ? "text-primary-light" : "text-zinc-400",
            )}
          >
            {step.step}
          </span>
        </div>

        <div className="md:col-span-5">
          <h3 className="relative mb-3 text-xl font-semibold uppercase tracking-tight sm:text-3xl md:text-4xl">
            <span
              className={cn(
                "block text-zinc-900 transition-opacity duration-200",
                isActive ? "opacity-0" : "opacity-100",
              )}
              aria-hidden={isActive}
            >
              {step.title}
            </span>
            <span
              className={cn(
                "pointer-events-none absolute inset-0 block text-primary-gradient transition-opacity duration-200",
                isActive ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={!isActive}
            >
              {step.title}
            </span>
          </h3>
          <p className="max-w-lg text-xs leading-relaxed text-zinc-500 sm:text-sm">
            {step.description}
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 md:col-span-4 md:items-end md:pt-2">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
            Step {index + 1} of {steps.length}
          </span>
          <span
            className={cn(
              "text-sm font-semibold transition-colors duration-200",
              isActive ? "text-primary-light" : "text-zinc-500",
            )}
          >
            Unified decision layer
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function EasyToGetStarted() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const cursorX = useSpring(0, { stiffness: 220, damping: 28, mass: 0.4 });
  const cursorY = useSpring(0, { stiffness: 220, damping: 28, mass: 0.4 });

  function updateCursorPosition(clientX: number, clientY: number) {
    if (!listRef.current) return;

    const listRect = listRef.current.getBoundingClientRect();
    cursorX.set(clientX - listRect.left);
    cursorY.set(clientY - listRect.top);
  }

  function handleListMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (activeIndex === null) return;
    updateCursorPosition(event.clientX, event.clientY);
  }

  function handleListTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (activeIndex === null) return;
    const touch = event.touches[0];
    if (!touch) return;
    updateCursorPosition(touch.clientX, touch.clientY);
  }

  function handleCardActivate(
    index: number,
    event: React.MouseEvent<HTMLElement>,
  ) {
    setActiveIndex(index);
    updateCursorPosition(event.clientX, event.clientY);
  }

  const activeStep = activeIndex !== null ? steps[activeIndex] : null;

  return (
    <section
      id="how-it-works"
      className="relative w-full scroll-mt-28 overflow-hidden bg-white pb-20 pt-10"
    >
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 text-center md:mb-14">
          <SectionTag>Start your journey</SectionTag>
          <h2 className="mb-4 text-4xl sm:text-5xl md:text-6xl font-semibold text-zinc-900 tracking-tight">
            Easy to <span className="text-primary-gradient">Get Started</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-zinc-500 md:text-base">
            Three simple steps to turn fragmented data into confident decisions.
          </p>
        </div>

        <div
          ref={listRef}
          className="relative border-t border-zinc-200"
          onMouseLeave={() => setActiveIndex(null)}
          onMouseMove={handleListMouseMove}
          onTouchMove={handleListTouchMove}
        >
          {steps.map((step, index) => (
            <StepCard
              key={step.title}
              step={step}
              index={index}
              isActive={activeIndex === index}
              isDimmed={activeIndex !== null && activeIndex !== index}
              onActivate={(event) => handleCardActivate(index, event)}
            />
          ))}

          <AnimatePresence>
            {activeStep && activeIndex !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute z-20 w-88 overflow-hidden rounded-2xl border border-[#d7e6f5] bg-white shadow-[0_24px_60px_-20px_rgba(12,74,140,0.45)] md:w-120"
                style={{
                  left: cursorX,
                  top: cursorY,
                  x: "-50%",
                  y: "-112%",
                }}
              >
                <div className="relative h-36 w-full md:h-44">
                  <Image
                    src={activeStep.mockup}
                    alt={activeStep.title}
                    fill
                    sizes="(max-width: 768px) 352px, 480px"
                    className="object-cover object-center transition-opacity duration-200"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default EasyToGetStarted;
