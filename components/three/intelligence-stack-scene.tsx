"use client";

import { ContactShadows, Environment, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";

interface StackBlock {
  label: string;
  radius: number;
  height: number;
}

const BLOCKS: StackBlock[] = [
  { label: "Live Signals", radius: 3.6, height: 1.6 },
  { label: "Data Sources", radius: 3.15, height: 1.4 },
  { label: "Internal Layer", radius: 2.7, height: 1.3 },
  { label: "External Layer", radius: 2.3, height: 1.2 },
  { label: "AI Processing", radius: 1.9, height: 1.15 },
  { label: "Smart Decisions", radius: 1.55, height: 1.05 },
];

const GAP = 0.16;
const ANGLE_STEP = (Math.PI * 2) / BLOCKS.length;

// How far (in radians) off dead-center-front a label can be before it starts
// fading. Kept as a smooth ramp (not a hard on/off cut) so nothing "pops".
const FACING_FULL = 0.35;
const FACING_FADE_END = 0.95;

function createBrandGradientTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#062043");
  gradient.addColorStop(0.22, "#062043");
  gradient.addColorStop(0.52, "#062043");
  gradient.addColorStop(0.78, "#062043");
  gradient.addColorStop(1, "#062043");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

interface IntelligenceStackSceneProps {
  scrollProgress?: number;
}

function DatabaseDisk({
  block,
  index,
  y,
  scrollProgress,
  total,
  modelRotationY,
  gradientMap,
}: {
  block: StackBlock;
  index: number;
  y: number;
  scrollProgress: number;
  total: number;
  modelRotationY: number;
  gradientMap: THREE.Texture | null;
}) {
  const segment = 1 / total;
  const revealStart = index * segment;
  const local = (scrollProgress - revealStart) / segment;
  const hasRevealed = scrollProgress >= revealStart - 0.02;
  const isActive =
    scrollProgress >= revealStart &&
    scrollProgress < revealStart + segment + 0.01;

  const textAngle = index * ANGLE_STEP;
  const worldFacing =
    (((textAngle + modelRotationY) % (Math.PI * 2)) + Math.PI * 2) %
    (Math.PI * 2);
  const angleFromFront = Math.min(worldFacing, Math.PI * 2 - worldFacing);

  // Continuous fade instead of a boolean flip — removes the visible "pop"
  // as a label rotates past the front-facing point.
  const facingFactor =
    1 -
    THREE.MathUtils.smoothstep(angleFromFront, FACING_FULL, FACING_FADE_END);
  const facingFloor = 0.14; // keep labels faintly visible all the way around

  const baseReveal = hasRevealed ? Math.min(1, Math.max(0.75, local * 1.4)) : 0;
  const textOpacity =
    baseReveal * Math.max(facingFloor, facingFactor) * (hasRevealed ? 1 : 0);

  const emissiveBoost = isActive ? 0.45 : 0.28;

  const fontSize = Math.max(0.24, block.radius * 0.12);
  const maxWidth = block.radius * 1.7;
  const textX = Math.sin(textAngle) * (block.radius + 0.05);
  const textZ = Math.cos(textAngle) * (block.radius + 0.05);

  return (
    <group position={[0, y, 0]}>
      <mesh>
        <cylinderGeometry
          args={[block.radius, block.radius * 0.988, block.height, 64]}
        />
        <meshStandardMaterial
          map={gradientMap ?? undefined}
          color="#ffffff"
          emissive="#1a5fbf"
          emissiveIntensity={emissiveBoost}
          roughness={0.22}
          metalness={0.48}
          envMapIntensity={1.1}
        />
      </mesh>

      {/* Top rim highlight */}
      <mesh position={[0, block.height * 0.505, 0]}>
        <cylinderGeometry
          args={[block.radius * 0.978, block.radius * 0.978, 0.05, 64]}
        />
        <meshStandardMaterial
          color="#2a7ae8"
          emissive="#2a7ae8"
          emissiveIntensity={0.55}
          roughness={0.15}
          metalness={0.5}
        />
      </mesh>

      {/* Bottom rim highlight — mirrors the top so each disk reads as a
          distinct, polished layer rather than a flat cutout. */}
      <mesh position={[0, -block.height * 0.505, 0]}>
        <cylinderGeometry
          args={[block.radius * 0.978, block.radius * 0.978, 0.035, 64]}
        />
        <meshStandardMaterial
          color="#0c4a8c"
          emissive="#2a7ae8"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      {/* Engraved shadow pass: a slightly smaller, recessed, darker copy of
          the label sitting just behind/below the main text. This is what
          sells the "carved into the metal" look instead of a decal floating
          in front of the surface. */}
      <Text
        position={[textX * 0.992, -0.014, textZ * 0.992]}
        rotation={[0, textAngle, 0]}
        fontSize={fontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fillOpacity={textOpacity * 0.85}
        maxWidth={maxWidth}
        renderOrder={9}
        depthOffset={-1}
        material-toneMapped={false}
        material-depthTest={false}
      >
        {block.label}
      </Text>

      {/* Main label — the raised, lit face of the engraving. Outline
          opacity is now tied to textOpacity so the dark outline can never
          appear on its own before the white fill is ready (this was the
          cause of the black-flash-then-white effect). */}
      <Text
        position={[textX, 0.012, textZ]}
        rotation={[0, textAngle, 0]}
        fontSize={fontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fillOpacity={textOpacity}
        outlineWidth={0.009}
        outlineBlur={0.006}
        outlineColor="#061b31"
        outlineOpacity={textOpacity * 0.4}
        maxWidth={maxWidth}
        renderOrder={10}
        depthOffset={-2}
        material-toneMapped={false}
        material-depthTest={false}
      >
        {block.label}
      </Text>
    </group>
  );
}

export function IntelligenceStackScene({
  scrollProgress = 0,
}: IntelligenceStackSceneProps) {
  const rootRef = useRef<Group>(null);
  const rotationYRef = useRef(0);

  const gradientMap = useMemo(() => createBrandGradientTexture(), []);

  const positions = useMemo(() => {
    const heights = BLOCKS.map((b) => b.height);
    const totalHeight =
      heights.reduce((sum, h) => sum + h, 0) + GAP * (BLOCKS.length - 1);
    let y = totalHeight / 2 - heights[0] / 2;
    const ys: number[] = [];

    for (let i = 0; i < BLOCKS.length; i++) {
      ys.push(y);
      if (i < BLOCKS.length - 1) y -= heights[i] / 2 + GAP + heights[i + 1] / 2;
    }

    return ys;
  }, []);

  // Bottom-most point of the whole stack, used to place the contact shadow
  // right under the model regardless of how BLOCKS is tuned later.
  const stackBottom = useMemo(() => {
    const lastIndex = BLOCKS.length - 1;
    return positions[lastIndex] - BLOCKS[lastIndex].height / 2;
  }, [positions]);

  useFrame(() => {
    if (!rootRef.current) return;
    const targetY = -scrollProgress * ANGLE_STEP * BLOCKS.length;
    rotationYRef.current += (targetY - rotationYRef.current) * 0.07;
    rootRef.current.rotation.y = rotationYRef.current;
    rootRef.current.rotation.x = 0.08;
  });

  const modelRotationY = -scrollProgress * ANGLE_STEP * BLOCKS.length;

  return (
    <>
      {/* Soft studio reflections so the metal/glass materials actually pick
          up highlights instead of reading flat. Low intensity keeps the
          brand colors from washing out. */}
      <Environment preset="city" environmentIntensity={0.35} />

      <group ref={rootRef} scale={1.12} position={[0, 0, 0]}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 8, 4]} intensity={1.1} />
        <directionalLight position={[-4, 2, -3]} intensity={0.35} />
        <pointLight position={[0, 2.5, 4]} intensity={0.9} color="#2a7ae8" />
        {/* Cool rim light from behind so the model separates from the
            background and reads as more three-dimensional. */}
        <pointLight position={[0, 1, -5]} intensity={0.55} color="#8fb8f5" />

        {BLOCKS.map((block, index) => (
          <DatabaseDisk
            key={block.label}
            block={block}
            index={index}
            y={positions[index]}
            scrollProgress={scrollProgress}
            total={BLOCKS.length}
            modelRotationY={modelRotationY}
            gradientMap={gradientMap}
          />
        ))}

        <ContactShadows
          position={[0, stackBottom - 0.1, 0]}
          opacity={0.4}
          scale={14}
          blur={2.6}
          far={5}
        />
      </group>
    </>
  );
}
