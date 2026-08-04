"use client";

import { Canvas } from "@react-three/fiber";

import { Suspense } from "react";

import { IntelligenceStackScene } from "./intelligence-stack-scene";

interface IntelligenceStackVisualProps {
  className?: string;

  scrollProgress?: number;
}

export function IntelligenceStackVisual({
  className,

  scrollProgress = 0,
}: IntelligenceStackVisualProps) {
  return (
    <div
      className={`h-full w-full overflow-visible ${className ?? ""}`}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 28], fov: 36, near: 0.1, far: 100 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <IntelligenceStackScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
