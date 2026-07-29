import React from "react";
import StackingCard from "./stacking-card";

const FennixDecision = () => {
  const projects = [
    {
      title: "AI Chat",
      description:
        "Query your enterprise data in plain language and receive immediate, precise answers with full traceability.",
      link: "/images/Chatbot.jpg", // From image_159a3c.png
      color: "#f8d7d7",
      n: "01",
    },
    {
      title: "Dashboard",
      description:
        "Fennix lets you pull metrics directly from AI chat and turn them into live, auto-updating insights with no manual refresh needed.",
      link: "/images/Analyze-Meter.jpg", // From image_159a02.png
      color: "#e3f2e7",
      n: "02",
    },
    {
      title: "Social Sentiment",
      description:
        "Track and analyze what people are saying about your brand. Fennix connects sentiment shifts to performance metrics.",
      link: "/images/16.png", // From image_154867.png
      color: "#dbeafe",
      n: "03",
    },
  ];

  return (
    <section id="fennix-decision" className="bg-white pt-20">
      <div className="max-w-6xl mx-auto px-4 mb- flex justify-center items-center">
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
          Fennix Decision{" "}
          <span className="text-primary-gradient">Intelligence</span>
        </h2>
      </div>

      <StackingCard projects={projects} />
    </section>
  );
};

export default FennixDecision;
