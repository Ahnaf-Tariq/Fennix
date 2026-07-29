"use client";

import { useTransform, motion, useScroll, type MotionValue } from "framer-motion";
import { useRef, forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
  n: string;
}

interface CardProps {
  i: number;
  data: ProjectData;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export function Card({ i, data, progress, range, targetScale }: CardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="w-full max-w-6xl origin-top px-4"
      >
        <article className="relative flex min-h-[60vh] w-full flex-col-reverse overflow-hidden rounded-[2.5rem] border border-zinc-100 bg-white shadow-[0_40px_100px_-30px_rgba(12,74,140,0.16)] md:h-[70vh] md:flex-row">
          <div className="relative flex flex-1 flex-col justify-center p-8 md:p-20">
            <div className="relative z-10 text-left">
              <h3 className="mb-4 font-display text-4xl leading-[1.1] tracking-tight text-zinc-900 md:text-6xl">
                {data.title}
              </h3>
              <p className="max-w-md text-lg leading-relaxed text-zinc-500 md:text-xl">
                {data.description}
              </p>
              <button
                type="button"
                className="btn-primary btn-glass-shimmer mt-6 inline-flex items-center gap-2 px-4 py-2"
              >
                <ArrowRight className="h-4 w-4" />
                Discover More
              </button>
            </div>
          </div>

          <div className="relative h-[300px] flex-1 p-4 md:h-auto md:p-6">
            <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-zinc-50">
              <Image
                src={data.link}
                alt={data.title}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </article>
      </motion.div>
    </div>
  );
}

const StackingCard = forwardRef<HTMLElement, { projects: ProjectData[] }>(
  ({ projects }, _ref) => {
    const container = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start start", "end end"],
    });

    return (
      <main ref={container} className="relative">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={`p_${i}`}
              i={i}
              data={project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>
    );
  }
);

StackingCard.displayName = "StackingCard";
export default StackingCard;
