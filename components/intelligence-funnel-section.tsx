"use client";

import { SectionTag } from "@/components/ui/section-tag";
import { FunnelChart, PatternLines } from "@/components/ui/funnel-chart";

const funnelData = [
  {
    label: "Detect Patterns",
    title: "Detect patterns and anomalies",
    value: 98,
    description:
      "Continuously scans fragmented data to identify hidden patterns, unusual spikes, and anomalies that signal operational or financial shifts early.",
    gradient: [
      { offset: "0%", color: "#1456A8" },
      { offset: "100%", color: "#0B3F7D" },
    ],
  },
  {
    label: "Forecast Finance",
    title: "Forecast financial and operational impact",
    value: 82,
    description:
      "Projects future financial and operational outcomes based on current trends, connecting drivers, risks, and business performance in real time.",
    gradient: [
      { offset: "0%", color: "#1D67C2" },
      { offset: "100%", color: "#1456A8" },
    ],
  },
  {
    label: "Predict Risks",
    title: "Predict risks and opportunities",
    value: 64,
    description:
      "Anticipates potential risks and growth opportunities by analyzing internal metrics and external market signals before they become visible.",
    gradient: [
      { offset: "0%", color: "#2875D6" },
      { offset: "100%", color: "#1D67C2" },
    ],
  },
  {
    label: "Recommend actions",
    title: "Recommend next-best actions",
    value: 46,
    description:
      "Delivers real-time, context-aware recommendations so leaders can act faster with clarity on what to do next and why it matters.",
    gradient: [
      { offset: "0%", color: "#3A86E4" },
      { offset: "100%", color: "#2875D6" },
    ],
  },
  {
    label: "Track Outcomes",
    title: "Track outcomes continuously",
    value: 28,
    description:
      "Follows every action after it ships—so teams know whether risk is closing, compounding, or needs a new decision cycle.",
    gradient: [
      { offset: "0%", color: "#5A9EF0" },
      { offset: "100%", color: "#3A86E4" },
    ],
  },
];

export default function IntelligenceFunnelSection() {
  return (
    <section className="relative overflow-visible bg-white py-18 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <SectionTag>Anomaly Detection</SectionTag>
          <h2 className="mb-2 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
            Detects Anomalies{" "}
            <span className="text-primary-gradient">& Predicts Risks</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-zinc-500 md:text-base">
            Fennix surfaces what changed, what it means, and what to do next—so
            teams catch risks early and act before impact compounds.
          </p>
        </div>

        <div className="overflow-visible">
          <FunnelChart
            className="mx-auto w-full max-w-5xl overflow-visible"
            data={funnelData}
            color="#1456A8"
            edges="curved"
            gap={8}
            showValues={false}
            showPercentage
            grid={{
              bands: true,
              lines: true,
              bandColor: "#ffffff",
              lineColor: "#ffffff",
              lineOpacity: 1,
              lineWidth: 1,
            }}
            labelAlign="center"
            labelLayout="grouped"
            labelOrientation="vertical"
            layers={3}
            orientation="horizontal"
            renderPattern={(id, color) => (
              <PatternLines
                background={color}
                id={id}
                orientation={["diagonal"]}
                stroke="rgba(255,255,255,0.35)"
                strokeWidth={0.8}
                width={10}
                height={10}
              />
            )}
          />
        </div>
      </div>
    </section>
  );
}
