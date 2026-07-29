"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { UnifiedDataLayerScene } from "./unified-data-layer-scene";

interface DataLayerVisualProps {
  className?: string;
  scrollProgress?: number;
}

export function DataLayerVisual({
  className,
  scrollProgress = 0,
}: DataLayerVisualProps) {
  return (
    <div className={`overflow-visible ${className ?? ""}`} aria-hidden>
      <Canvas
        camera={{ position: [0, 0.1, 5.2], fov: 32 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <UnifiedDataLayerScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
