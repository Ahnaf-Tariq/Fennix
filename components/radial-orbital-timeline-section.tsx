"use client";

import {
  Database,
  MessageSquareText,
  TrendingUp,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Unify Data",
    content:
      "Connect databases, warehouses, ERP, CRM, finance, ops, sales, marketing, and cloud sources into one AI layer—so Fennix turns fragmented systems into real-time decision intelligence.",
    icon: Database,
    relatedIds: [2, 3],
  },
  {
    id: 2,
    title: "AI Chat",
    content:
      "Query your enterprise data in plain language and get immediate, precise answers with full traceability—secure, role-based responses with context, cause, and next steps.",
    icon: MessageSquareText,
    relatedIds: [1, 5],
  },
  {
    id: 3,
    title: "Market Signals",
    content:
      "Monitor real-time market trends, macroeconomic shifts, and competitor activity alongside internal data—so leaders see both sides before committing capital.",
    icon: TrendingUp,
    relatedIds: [1, 4],
  },
  {
    id: 4,
    title: "Risk Detection",
    content:
      "Detect patterns and anomalies, forecast financial and operational impact, and predict risks and opportunities early—so teams act before impact compounds.",
    icon: ShieldAlert,
    relatedIds: [3, 5],
  },
  {
    id: 5,
    title: "Act Faster",
    content:
      "Get clear, decision-ready recommendations—not just charts—so you understand what happened, why it matters, the cost impact, and what to do next.",
    icon: Sparkles,
    relatedIds: [2, 4],
  },
];

export default function RadialOrbitalTimelineSection() {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
}
