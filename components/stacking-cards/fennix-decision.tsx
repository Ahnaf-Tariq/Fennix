import React from "react";
import StackingCard from "./stacking-card";
import { SectionTag } from "@/components/ui/section-tag";

const FennixDecision = () => {
  const projects = [
    {
      title: "AI Chat",
      description:
        "Query your enterprise data in plain language and receive immediate, precise answers with full traceability. Fennix's intelligence layer understands business context and provides secure, role-based responses tailored to each role.",
      link: "/images/Chatbot.jpg", // From image_159a3c.png
      color: "#f8d7d7",
      n: "01",
    },
    {
      title: "External Market Trends",
      description:
        "Monitor real-time market trends, macroeconomic shifts, and competitor activity. Fennix analyzes external signals to help manufacturers anticipate demand changes, align operations, and make proactive, data-driven decisions with confidence.",
      link: "/images/Analyze-Meter.jpg", // From image_159a02.png
      color: "#e3f2e7",
      n: "02",
    },
    {
      title: "Social Sentiment",
      description:
        "Track and analyze what people are saying about your brand, company, and product. Fennix connects sentiment shifts to performance metrics, helping you identify how negative trends influence customer behavior and potential revenue drops in real time.",
      link: "/images/16.png", // From image_154867.png
      color: "#dbeafe",
      n: "03",
    },
  ];

  return (
    <section id="capabilities" className="scroll-mt-28 bg-white pt-20">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
        <SectionTag className="mb-0">Decision Making</SectionTag>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-zinc-900 tracking-tight">
          Fennix Decision{" "}
          <span className="text-primary-gradient">Intelligence</span>
        </h2>
        <p className="mx-auto max-w-xl text-sm text-zinc-500 md:text-base">
          Fennix Decision Intelligence is a platform that helps you make better
          decisions.
        </p>
      </div>

      <StackingCard projects={projects} />
    </section>
  );
};

export default FennixDecision;
