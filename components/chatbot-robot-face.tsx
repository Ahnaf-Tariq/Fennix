"use client";

import { useEffect, useId, useRef, useState } from "react";

interface Gaze {
  x: number;
  y: number;
}

interface GazePose {
  eyeX: number;
  eyeY: number;
  headRotate: number;
  headSkewY: number;
  headX: number;
  headY: number;
}

interface ChatbotRobotFaceProps {
  className?: string;
  animated?: boolean;
}

const HEAD_ORIGIN = { x: 32, y: 34 };

function getPose({ x, y }: Gaze): GazePose {
  return {
    eyeX: x * 2.5,
    eyeY: y * 1.85,
    headRotate: x * 9.5,
    headSkewY: y * -4.5,
    headX: x * 1.3,
    headY: y * 1.1 - Math.abs(x) * 0.25,
  };
}

export function ChatbotRobotFace({
  className,
  animated = true,
}: ChatbotRobotFaceProps) {
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<SVGSVGElement>(null);
  const targetRef = useRef<Gaze>({ x: 0, y: 0 });
  const currentRef = useRef<Gaze>({ x: 0, y: 0 });
  const resumeIdleRef = useRef(0);
  const [gaze, setGaze] = useState<Gaze>({ x: 0, y: 0 });

  const headGrad = `${uid}-head`;
  const visorGrad = `${uid}-visor`;
  const eyeGlow = `${uid}-eye`;

  const pose = getPose(animated ? gaze : { x: 0, y: 0 });

  useEffect(() => {
    if (!animated) return;

    let rafId = 0;

    const tick = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      const ease = 0.075;

      cur.x += (tgt.x - cur.x) * ease;
      cur.y += (tgt.y - cur.y) * ease;

      if (Math.abs(cur.x - tgt.x) > 0.001 || Math.abs(cur.y - tgt.y) > 0.001) {
        setGaze({ x: cur.x, y: cur.y });
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const glances: Array<Gaze & { hold: number }> = [
      { x: 0, y: 0, hold: 900 },
      { x: -1, y: 0, hold: 2800 },
      { x: 0, y: 0, hold: 700 },
      { x: 1, y: 0, hold: 2800 },
      { x: 0, y: 0, hold: 700 },
      { x: 0, y: -1, hold: 2400 },
      { x: 0, y: 0, hold: 700 },
      { x: 0, y: 1, hold: 2400 },
    ];

    let index = 0;
    let timeoutId = 0;
    let tracking = false;

    const runIdle = () => {
      if (tracking) return;
      const glance = glances[index];
      targetRef.current = { x: glance.x, y: glance.y };
      timeoutId = window.setTimeout(runIdle, glance.hold);
      index = (index + 1) % glances.length;
    };

    runIdle();

    const onMove = (event: MouseEvent) => {
      const svg = rootRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist > 360) return;

      tracking = true;
      window.clearTimeout(timeoutId);
      window.clearTimeout(resumeIdleRef.current);

      targetRef.current = {
        x: Math.max(-1, Math.min(1, dx / 95)),
        y: Math.max(-1, Math.min(1, dy / 95)),
      };

      resumeIdleRef.current = window.setTimeout(() => {
        tracking = false;
        runIdle();
      }, 2000);
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.clearTimeout(resumeIdleRef.current);
      window.removeEventListener("mousemove", onMove);
    };
  }, [animated]);

  const headTransform = animated
    ? [
        `translate(${pose.headX}px, ${pose.headY}px)`,
        `rotate(${pose.headRotate}deg)`,
        `skewY(${pose.headSkewY}deg)`,
      ].join(" ")
    : undefined;

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={headGrad} x1="14" y1="10" x2="50" y2="54">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d4e8ff" />
        </linearGradient>
        <linearGradient id={visorGrad} x1="32" y1="23" x2="32" y2="43">
          <stop offset="0%" stopColor="#061525" />
          <stop offset="100%" stopColor="#0e3158" />
        </linearGradient>
        <radialGradient id={eyeGlow} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#c5f0ff" />
          <stop offset="50%" stopColor="#2a7ae8" />
          <stop offset="100%" stopColor="#0c4a8c" />
        </radialGradient>
      </defs>

      <g
        style={
          headTransform
            ? {
                transform: headTransform,
                transformOrigin: `${HEAD_ORIGIN.x}px ${HEAD_ORIGIN.y}px`,
                transformBox: "fill-box",
              }
            : undefined
        }
      >
        <circle
          cx={HEAD_ORIGIN.x}
          cy={HEAD_ORIGIN.y}
          r="22.5"
          fill={`url(#${headGrad})`}
          stroke="#2a7ae8"
          strokeWidth="1.2"
        />

        <rect
          x="18"
          y="26"
          width="28"
          height="16"
          rx="8"
          fill={`url(#${visorGrad})`}
        />

        <Eye cx={24.5} cy={34} eyeX={pose.eyeX} eyeY={pose.eyeY} glowId={eyeGlow} />
        <Eye cx={39.5} cy={34} eyeX={pose.eyeX} eyeY={pose.eyeY} glowId={eyeGlow} />
      </g>
    </svg>
  );
}

interface EyeProps {
  cx: number;
  cy: number;
  eyeX: number;
  eyeY: number;
  glowId: string;
}

function Eye({ cx, cy, eyeX, eyeY, glowId }: EyeProps) {
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <rect x="-6" y="-4" width="12" height="8" rx="4" fill="#040c16" />
      <g transform={`translate(${eyeX}, ${eyeY})`}>
        <circle cx="0" cy="0" r="2.9" fill={`url(#${glowId})`} />
        <circle cx="0.85" cy="-0.85" r="0.85" fill="#ffffff" opacity="0.92" />
      </g>
    </g>
  );
}
