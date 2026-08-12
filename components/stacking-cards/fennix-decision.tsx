import StackingCard from "./stacking-card";
import { SectionTag } from "@/components/ui/section-tag";

const steps = [
  {
    title: "AI Chat",
    description:
      "Query your enterprise data in plain language and receive immediate, precise answers with full traceability. Fennix's intelligence layer understands business context and provides secure, role-based responses tailored to each role.",
    link: "/images/Chatbot.jpg",
    tags: ["Natural Language", "Traceability", "Role-Based", "Secure Queries"],
    n: "01",
  },
  {
    title: "External Market Trends",
    description:
      "Monitor real-time market trends, macroeconomic shifts, and competitor activity. Fennix analyzes external signals to help manufacturers anticipate demand changes, align operations, and make proactive, data-driven decisions with confidence.",
    link: "/images/Analyze-Meter.jpg",
    tags: ["Macro Signals", "Competitor Intel", "Demand Forecast", "Real-Time"],
    n: "02",
  },
  {
    title: "Social Sentiment",
    description:
      "Track and analyze what people are saying about your brand, company, and product. Fennix connects sentiment shifts to performance metrics, helping you identify how negative trends influence customer behavior and potential revenue drops in real time.",
    link: "/images/16.webp",
    tags: ["Brand Monitoring", "Sentiment", "Revenue Impact", "Alerts"],
    n: "03",
  },
];

function FennixDecision() {
  return (
    <section id="capabilities" className="scroll-mt-28 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl space-y-4 px-4 text-center">
        <SectionTag className="mb-0">Decision Making</SectionTag>
        <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
          Fennix Decision{" "}
          <span className="text-primary-gradient">Intelligence</span>
        </h2>
        <p className="mx-auto max-w-xl text-sm text-zinc-500 md:text-base">
          Fennix Decision Intelligence is a platform that helps you make better
          decisions.
        </p>
      </div>

      <StackingCard steps={steps} />
    </section>
  );
}

export default FennixDecision;
