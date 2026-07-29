"use client";

import dynamic from "next/dynamic";

export const DataLayerVisual = dynamic(
  () => import("./data-layer-visual").then((mod) => mod.DataLayerVisual),
  {
    ssr: false,
    loading: () => null,
  },
);

export const IntelligenceStackVisual = dynamic(
  () =>
    import("./intelligence-stack-visual").then(
      (mod) => mod.IntelligenceStackVisual
    ),
  {
    ssr: false,
    loading: () => null,
  }
);
