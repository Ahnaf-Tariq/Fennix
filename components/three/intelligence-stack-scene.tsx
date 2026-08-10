"use client";

import { ContactShadows, Environment, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { Group } from "three";

interface StackBlock {
  label: string;
  radius: number;
  height: number;
}

const BLOCKS: StackBlock[] = [
  { label: "ERP · CRM · Sales Data", radius: 3.85, height: 1.95 },
  { label: "Finance & Operations", radius: 3.35, height: 1.7 },
  { label: "Market & Competitor Signals", radius: 2.9, height: 1.55 },
  { label: "Sentiment & Macro Data", radius: 2.45, height: 1.4 },
  { label: "Fennix AI Engine", radius: 2.05, height: 1.3 },
  { label: "Decision Intelligence", radius: 1.7, height: 1.2 },
];

const GAP = 0.2;
const ANGLE_STEP = (Math.PI * 2) / BLOCKS.length;

const FACING_FULL = 0.55;
const FACING_FADE_END = 1.3;

const FADE_IN_START = -0.4;
const FADE_IN_END = 0.1;
const FADE_OUT_START = 0.6;
const FADE_OUT_END = 1.1;
const CORNER_OFFSET = 0.4;

const ROTATION_SMOOTHING_PER_SEC = 7.5;
const MAX_ANGULAR_VELOCITY = ANGLE_STEP * 5.5;
const ROTATION_MIN = -ANGLE_STEP * (BLOCKS.length - 1);
const ROTATION_MAX = 0;
const SNAP_EPSILON = 0.00025;

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

function ArcLabel({
  text,
  centerAngle,
  radius,
  fontSize,
  opacity,
}: {
  text: string;
  centerAngle: number;
  radius: number;
  fontSize: number;
  opacity: number;
}) {
  const chars = useMemo(() => text.split(""), [text]);

  const placements = useMemo(() => {
    const angularWidths = chars.map((ch) => {
      let widthFactor = 0.62;
      if (ch === " ") widthFactor = 0.36;
      else if (ch === "·" || ch === ".") widthFactor = 0.3;
      else if (ch === "&") widthFactor = 0.76;
      else if (ch >= "A" && ch <= "Z") widthFactor = 0.7;
      return (fontSize * widthFactor) / radius;
    });

    const totalAngle = angularWidths.reduce((sum, a) => sum + a, 0);
    let cursor = -totalAngle / 2;

    return chars.map((ch, i) => {
      const w = angularWidths[i];
      const angle = centerAngle + cursor + w / 2;
      cursor += w;
      return { ch, angle };
    });
  }, [chars, centerAngle, fontSize, radius]);

  return (
    <>
      {placements.map(({ ch, angle }, i) => {
        if (ch === " ") return null;

        const x = Math.sin(angle) * (radius + 0.05);
        const z = Math.cos(angle) * (radius + 0.05);
        const xShadow = Math.sin(angle) * (radius * 0.992 + 0.05);
        const zShadow = Math.cos(angle) * (radius * 0.992 + 0.05);

        return (
          <group key={i}>
            <Text
              position={[xShadow, -0.02, zShadow]}
              rotation={[0, angle, 0]}
              fontSize={fontSize}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.02}
              fillOpacity={opacity * 0.9}
              renderOrder={9}
              depthOffset={-1}
              material-toneMapped={false}
              material-depthTest={false}
            >
              {ch}
            </Text>

            <Text
              position={[x, 0.02, z]}
              rotation={[0, angle, 0]}
              fontSize={fontSize}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.02}
              fillOpacity={opacity}
              outlineWidth={0.028}
              outlineBlur={0.006}
              outlineColor="#020d1c"
              outlineOpacity={opacity * 0.9}
              renderOrder={10}
              depthOffset={-2}
              material-toneMapped={false}
              material-depthTest={false}
            >
              {ch}
            </Text>
          </group>
        );
      })}
    </>
  );
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
  rotationRef,
  gradientMap,
  nextRadius,
}: {
  block: StackBlock;
  index: number;
  y: number;
  scrollProgress: number;
  total: number;
  rotationRef: React.MutableRefObject<number>;
  gradientMap: THREE.Texture | null;
  nextRadius: number | null;
}) {
  const dist = scrollProgress * total - index;
  const isActive = dist >= 0 && dist < 1.01;

  const baseAngle = index * ANGLE_STEP;

  const lifeProgress = THREE.MathUtils.smoothstep(
    dist,
    FADE_IN_START,
    FADE_OUT_END,
  );
  const angleOffset = THREE.MathUtils.lerp(
    CORNER_OFFSET,
    -CORNER_OFFSET,
    lifeProgress,
  );
  const textAngle = baseAngle + angleOffset;

  const fadeIn = THREE.MathUtils.smoothstep(dist, FADE_IN_START, FADE_IN_END);
  const fadeOut =
    1 - THREE.MathUtils.smoothstep(dist, FADE_OUT_START, FADE_OUT_END);
  const revealOpacity = Math.min(fadeIn, fadeOut);

  const emissiveBoost = isActive ? 0.45 : 0.28;
  const fontSize = Math.max(0.32, block.radius * 0.175);
  const facingFloor = 0.32;

  const [textOpacity, setTextOpacity] = useState(
    () => revealOpacity * facingFloor,
  );
  const lastOpacityRef = useRef(textOpacity);

  useFrame(() => {
    const worldFacing =
      (((textAngle + rotationRef.current) % (Math.PI * 2)) + Math.PI * 2) %
      (Math.PI * 2);
    const angleFromFront = Math.min(worldFacing, Math.PI * 2 - worldFacing);
    const facingFactor =
      1 -
      THREE.MathUtils.smoothstep(angleFromFront, FACING_FULL, FACING_FADE_END);

    const next = revealOpacity * Math.max(facingFloor, facingFactor);

    if (Math.abs(next - lastOpacityRef.current) > 0.004) {
      lastOpacityRef.current = next;
      setTextOpacity(next);
    }
  });

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

      {nextRadius != null ? (
        <>
          <mesh
            position={[0, -block.height * 0.5 - GAP * 0.5, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry
              args={[nextRadius * 0.995, block.radius * 0.995, 72]}
            />
            <meshStandardMaterial
              color="#041628"
              emissive="#0c4a8c"
              emissiveIntensity={0.22}
              roughness={0.45}
              metalness={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, -block.height * 0.5 - GAP * 0.5, 0]}>
            <cylinderGeometry
              args={[
                block.radius * 0.992,
                nextRadius * 1.01,
                GAP * 0.95,
                64,
                1,
                true,
              ]}
            />
            <meshStandardMaterial
              color="#041628"
              emissive="#0c4a8c"
              emissiveIntensity={0.18}
              roughness={0.4}
              metalness={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      ) : null}

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

      <ArcLabel
        text={block.label}
        centerAngle={textAngle}
        radius={block.radius}
        fontSize={fontSize}
        opacity={textOpacity}
      />
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

  const stackBottom = useMemo(() => {
    const lastIndex = BLOCKS.length - 1;
    return positions[lastIndex] - BLOCKS[lastIndex].height / 2;
  }, [positions]);

  useFrame((_, delta) => {
    if (!rootRef.current) return;

    const dt = Math.min(delta, 1 / 30);

    const rawTargetY = -scrollProgress * ANGLE_STEP * BLOCKS.length;
    const targetY = THREE.MathUtils.clamp(
      rawTargetY,
      ROTATION_MIN,
      ROTATION_MAX,
    );

    const diff = targetY - rotationYRef.current;

    // Critically-damped style catch-up — keep pace with Lenis without hard snaps
    const smoothingFactor = 1 - Math.exp(-ROTATION_SMOOTHING_PER_SEC * dt);
    let step = diff * smoothingFactor;

    const maxStep = MAX_ANGULAR_VELOCITY * dt;
    if (Math.abs(step) > maxStep) step = Math.sign(step) * maxStep;

    // Ease residual so it never micro-jitters near target
    if (Math.abs(diff) < 0.012) step = diff * Math.min(1, smoothingFactor * 1.35);

    rotationYRef.current += step;

    if (Math.abs(targetY - rotationYRef.current) < SNAP_EPSILON) {
      rotationYRef.current = targetY;
    }

    rootRef.current.rotation.y = rotationYRef.current;
    rootRef.current.rotation.x = 0.04;
  });

  return (
    <>
      <Environment preset="city" environmentIntensity={0.35} />

      <group ref={rootRef} scale={1.25} position={[0, 0, 0]}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 8, 4]} intensity={1.1} />
        <directionalLight position={[-4, 2, -3]} intensity={0.35} />
        <pointLight position={[0, 2.5, 4]} intensity={0.9} color="#2a7ae8" />
        <pointLight position={[0, 1, -5]} intensity={0.55} color="#8fb8f5" />

        {BLOCKS.map((block, index) => (
          <DatabaseDisk
            key={block.label}
            block={block}
            index={index}
            y={positions[index]}
            scrollProgress={scrollProgress}
            total={BLOCKS.length}
            rotationRef={rotationYRef}
            gradientMap={gradientMap}
            nextRadius={
              index < BLOCKS.length - 1 ? BLOCKS[index + 1].radius : null
            }
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
