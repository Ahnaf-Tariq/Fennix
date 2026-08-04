"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";

interface NodeConfig {
  position: [number, number, number];
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  phase: number;
  size: number;
}

const NODES: NodeConfig[] = [
  {
    position: [1.2, 0.22, 0.42],
    color: "#2a7ae8",
    emissive: "#1a5fbf",
    emissiveIntensity: 0.65,
    phase: 0,
    size: 0.17,
  },
  {
    position: [-1.08, -0.1, 0.38],
    color: "#ffffff",
    emissive: "#c7d9f0",
    emissiveIntensity: 0.15,
    phase: 1.3,
    size: 0.15,
  },
  {
    position: [0.42, 0.88, -0.62],
    color: "#dbeafe",
    emissive: "#2a7ae8",
    emissiveIntensity: 0.12,
    phase: 2.4,
    size: 0.14,
  },
  {
    position: [-0.5, -0.58, -0.52],
    color: "#ffffff",
    emissive: "#eef4fc",
    emissiveIntensity: 0.1,
    phase: 3.6,
    size: 0.14,
  },
  {
    position: [0.9, -0.46, 0.8],
    color: "#2a7ae8",
    emissive: "#2a7ae8",
    emissiveIntensity: 0.35,
    phase: 5,
    size: 0.13,
  },
];

export interface IntelligenceLayerContent {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
}

export const INTELLIGENCE_LAYERS: IntelligenceLayerContent[] = [
  {
    label: "ERP · CRM · Sales Data",
    eyebrow: "Layer 01",
    title: "ERP · CRM · Sales Data",
    description:
      "Fennix connects directly to your ERP and CRM, pulling sales pipelines, orders, and customer records into a single live dataset.",
    points: [
      "Native connectors for major ERP/CRM platforms",
      "Real-time sync, no nightly batch jobs",
    ],
  },
  {
    label: "Finance & Operations",
    eyebrow: "Layer 02",
    title: "Finance & Operations",
    description:
      "Revenue, cost, and operational metrics feed the model continuously, so every recommendation is grounded in your actual financial position.",
    points: [
      "Live P&L and cash-flow ingestion",
      "Operational KPIs across departments",
    ],
  },
  {
    label: "Market & Competitor Signals",
    eyebrow: "Layer 03",
    title: "Market & Competitor Signals",
    description:
      "External market and competitor signals are layered on top of your internal data, giving context to every shift in performance.",
    points: [
      "Competitor pricing and positioning feeds",
      "Category and market-share tracking",
    ],
  },
  {
    label: "Sentiment & Macro Data",
    eyebrow: "Layer 04",
    title: "Sentiment & Macro Data",
    description:
      "Macroeconomic indicators and sentiment data give the model a wider lens — so recommendations account for conditions outside your four walls.",
    points: [
      "Consumer and B2B sentiment indices",
      "Macro indicators relevant to your sector",
    ],
  },
  {
    label: "Fennix AI Engine",
    eyebrow: "Layer 05",
    title: "Fennix AI Engine",
    description:
      "All prior layers converge in the Fennix AI Engine, which reasons across data types to surface patterns a human analyst would miss.",
    points: [
      "Cross-layer correlation modeling",
      "Continuously retrained on fresh data",
    ],
  },
  {
    label: "Decision Intelligence",
    eyebrow: "Layer 06",
    title: "Decision Intelligence",
    description:
      "The top of the stack turns everything below it into concrete, ranked recommendations your team can act on immediately.",
    points: [
      "Ranked, confidence-scored recommendations",
      "One-click hand-off to your workflow tools",
    ],
  },
];

interface UnifiedDataLayerSceneProps {
  scrollProgress?: number;
}

function DataNode({
  position,
  color,
  emissive,
  emissiveIntensity = 0,
  phase,
  size,
}: NodeConfig) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.65 + phase) * 0.08;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 28, 28]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive ?? "#000000"}
        emissiveIntensity={emissiveIntensity}
        roughness={0.2}
        metalness={0.18}
      />
    </mesh>
  );
}

export function UnifiedDataLayerScene({
  scrollProgress = 0,
}: UnifiedDataLayerSceneProps) {
  const groupRef = useRef<Group>(null);

  const connections = useMemo(
    () =>
      NODES.map((node) => ({
        points: [[0, 0, 0], node.position] as [
          [number, number, number],
          [number, number, number],
        ],
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.12 + scrollProgress * Math.PI * 0.4;
    groupRef.current.rotation.x = Math.sin(t * 0.28) * 0.06;
  });

  return (
    <group ref={groupRef} scale={0.88}>
      <ambientLight intensity={1.35} />
      <directionalLight position={[4, 6, 5]} intensity={0.75} />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} />
      <pointLight position={[0, 1, 2.5]} intensity={0.65} color="#2a7ae8" />
      <pointLight position={[-2, -1, 1]} intensity={0.25} color="#ffffff" />

      <mesh rotation={[Math.PI / 2, 0, scrollProgress * Math.PI * 0.5]}>
        <torusGeometry args={[0.95, 0.022, 10, 72]} />
        <meshStandardMaterial
          color="#2a7ae8"
          emissive="#1a5fbf"
          emissiveIntensity={0.2}
          roughness={0.25}
          metalness={0.25}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.014, 8, 56]} />
        <meshStandardMaterial
          color="#c7d9f0"
          emissive="#2a7ae8"
          emissiveIntensity={0.08}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshStandardMaterial
          color="#2a7ae8"
          emissive="#2a7ae8"
          emissiveIntensity={0.7}
          roughness={0.1}
          metalness={0.25}
          transparent
          opacity={0.45}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.32, 36, 36]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#2a7ae8"
          emissiveIntensity={0.18}
          roughness={0.12}
          metalness={0.2}
        />
      </mesh>

      {NODES.map((node) => (
        <DataNode key={node.phase} {...node} />
      ))}

      {connections.map((line, index) => (
        <Line
          key={index}
          points={line.points}
          color="#2a7ae8"
          lineWidth={1.8}
          transparent
          opacity={0.6}
        />
      ))}
    </group>
  );
}
