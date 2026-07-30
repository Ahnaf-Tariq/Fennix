"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Zap, ShieldCheck, BarChart3, Globe } from "lucide-react";

const DecisionIntelligence = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const features = [
    {
      title: "Real-time Processing",
      icon: <Zap size={24} className="text-primary" />,
      desc: "Instant data ingestion and analysis.",
    },
    {
      title: "Enterprise Security",
      icon: <ShieldCheck size={24} className="text-primary" />,
      desc: "Bank-grade encryption standards.",
    },
    {
      title: "Predictive Insights",
      icon: <BarChart3 size={24} className="text-primary" />,
      desc: "Forecasting market trends.",
    },
    {
      title: "Global Connectivity",
      icon: <Globe size={24} className="text-primary" />,
      desc: "Seamless market integration.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="w-full py-10 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-zinc-900 tracking-tight">
            Decision Intelligence{" "}
            <span className="text-primary-gradient">Predicts Risks</span>
          </h2>
        </div>

        {/* The Track: This is where the cards "spread" */}
        <div className="relative h-[330px] w-full flex items-center">
          {features.map((feature, index) => (
            <Card
              key={index}
              feature={feature}
              index={index}
              total={features.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ feature, index, total, progress }: any) => {
  // Each card starts at X: 0 (Far Left) and moves to its spread position
  // We offset the "start" and "end" of the animation for each card to create the pull effect
  const start = index * 0.1;
  const end = start + 0.4;

  const xRaw = useTransform(
    progress,
    [start, end],
    [0, index * 320], // 320 is the card width + gap
  );

  const rotateRaw = useTransform(progress, [start, end], [-10, 0]);
  const opacityRaw = useTransform(progress, [start, start + 0.1], [0, 1]);

  const x = useSpring(xRaw, { stiffness: 80, damping: 20 });
  const rotate = useSpring(rotateRaw, { stiffness: 80, damping: 20 });

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity: opacityRaw,
        zIndex: total - index, // Top card is index 0
        position: "absolute",
        left: 0,
      }}
      className="w-[300px] p-8 rounded-[2.5rem] bg-white border border-blue-100 shadow-xl flex flex-col items-center text-center"
    >
      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-6 shadow-inner">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-zinc-900 mb-3 tracking-tight">
        {feature.title}
      </h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
    </motion.div>
  );
};

export default DecisionIntelligence;
