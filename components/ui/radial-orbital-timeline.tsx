"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/section-tag";

interface TimelineItem {
  id: number;
  title: string;
  content: string;
  icon: LucideIcon;
  relatedIds: number[];
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {},
  );
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [orbitRadius, setOrbitRadius] = useState(210);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const rotationAngleRef = useRef(0);

  useEffect(() => {
    function updateOrbitRadius() {
      const width = window.innerWidth;
      if (width < 380) setOrbitRadius(112);
      else if (width < 480) setOrbitRadius(128);
      else if (width < 640) setOrbitRadius(148);
      else if (width < 768) setOrbitRadius(172);
      else if (width < 1024) setOrbitRadius(190);
      else setOrbitRadius(210);
    }

    updateOrbitRadius();
    window.addEventListener("resize", updateOrbitRadius);
    return () => window.removeEventListener("resize", updateOrbitRadius);
  }, []);


  function handleContainerClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  }

  function toggleItem(id: number) {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false;
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  }

  useEffect(() => {
    if (!autoRotate) return;

    const rotationTimer = setInterval(() => {
      setRotationAngle((prev) => {
        const newAngle = (prev + 0.3) % 360;
        rotationAngleRef.current = newAngle;
        return Number(newAngle.toFixed(3));
      });
    }, 50);

    return () => clearInterval(rotationTimer);
  }, [autoRotate, viewMode]);

  function centerViewOnNode(nodeId: number) {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetRotation = 270 - (nodeIndex / totalNodes) * 360;

    setRotationAngle((prev) => {
      const current = rotationAngleRef.current || prev;
      let delta = targetRotation - current;

      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      const next = current + delta;
      rotationAngleRef.current = next;
      return next;
    });
  }

  function calculateNodePosition(index: number, total: number) {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = orbitRadius;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.82,
      Math.min(1, 0.82 + 0.18 * ((1 + Math.sin(radian)) / 2)),
    );

    return { x, y, zIndex, opacity };
  }

  function getRelatedItems(itemId: number): number[] {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  }

  function isRelatedToActive(itemId: number): boolean {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  }

  const hasExpandedItem = Object.values(expandedItems).some(Boolean);
  const orbitSize = orbitRadius * 2;
  const isCompact = orbitRadius < 160;

  return (
    <section className="relative w-full overflow-hidden bg-white py-10 md:py-16">
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <SectionTag>What Fennix Does</SectionTag>
          <h2 className="mb-2 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
            Turn Questions Into{" "}
            <span className="text-primary-gradient">Intelligent Decisions</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-zinc-500 md:text-base">
            Fennix unifies fragmented IT, finance, ops, sales, and market data
            into one AI layer—delivering real-time insights, recommendations,
            and continuous tracking.
          </p>
        </div>

        <div
          className="relative flex h-[min(72dvh,560px)] w-full items-center justify-center overflow-hidden sm:h-[min(78dvh,640px)] md:h-[min(85dvh,720px)]"
          ref={containerRef}
          onClick={handleContainerClick}
        >
          <div
            className="pointer-events-none absolute rounded-full bg-[radial-gradient(circle,rgba(42,122,232,0.14)_0%,rgba(42,122,232,0.06)_45%,transparent_72%)]"
            style={{
              width: orbitSize * 1.15,
              height: orbitSize * 1.15,
            }}
          />

          <div className="relative flex h-full w-full max-w-4xl items-center justify-center">
            <div
              className="absolute flex h-full w-full items-center justify-center"
              ref={orbitRef}
              style={{
                perspective: "1000px",
                transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
              }}
            >
              <div
                className={`absolute z-1 flex items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-primary-light via-primary-mid to-primary-dark shadow-[0_0_40px_rgba(42,122,232,0.45)] transition-opacity duration-300 ${
                  hasExpandedItem
                    ? "pointer-events-none opacity-0"
                    : "animate-pulse opacity-100"
                } ${isCompact ? "h-14 w-14" : "h-20 w-20"}`}
              >
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-2 border-primary/40 opacity-80 ${
                    isCompact ? "h-16 w-16" : "h-24 w-24"
                  }`}
                />
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-primary/25 opacity-60 ${
                    isCompact ? "h-20 w-20" : "h-28 w-28"
                  }`}
                  style={{ animationDelay: "0.5s" }}
                />
                <div
                  className={`relative z-10 rounded-full bg-white shadow-md ${
                    isCompact ? "h-7 w-7" : "h-10 w-10"
                  }`}
                />
              </div>

              <div
                className="absolute z-1 rounded-full border-2 border-primary/35 shadow-[inset_0_0_30px_rgba(42,122,232,0.08)]"
                style={{ width: orbitSize, height: orbitSize }}
              />

              {timelineData.map((item, index) => {
                const position = calculateNodePosition(
                  index,
                  timelineData.length,
                );
                const isExpanded = expandedItems[item.id];
                const isRelated = isRelatedToActive(item.id);
                const isPulsing = pulseEffect[item.id];
                const Icon = item.icon;

                const nodeStyle = {
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                };

                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      nodeRefs.current[item.id] = el;
                    }}
                    className={`absolute z-20 cursor-pointer ${
                      autoRotate ? "" : "transition-all duration-700 ease-out"
                    }`}
                    style={nodeStyle}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItem(item.id);
                    }}
                  >
                    <div
                      className={`absolute -inset-1 rounded-full ${
                        isPulsing ? "animate-pulse duration-1000" : ""
                      }`}
                      style={{
                        background:
                          "radial-gradient(circle, rgba(42,122,232,0.32) 0%, rgba(42,122,232,0.08) 55%, rgba(42,122,232,0) 72%)",
                        width: isCompact ? "48px" : "64px",
                        height: isCompact ? "48px" : "64px",
                        left: isCompact ? "-8px" : "-12px",
                        top: isCompact ? "-8px" : "-12px",
                      }}
                    />

                    <div
                      className={`
                  flex items-center justify-center rounded-full
                  ${isCompact ? "h-9 w-9" : "h-12 w-12"}
                  ${
                    isExpanded
                      ? "bg-primary text-white"
                      : isRelated
                        ? "bg-primary/20 text-primary"
                        : "bg-white text-primary"
                  }
                  border-2
                  ${
                    isExpanded
                      ? "border-primary shadow-xl shadow-primary/35"
                      : isRelated
                        ? "animate-pulse border-primary shadow-md shadow-primary/20"
                        : "border-primary/55 shadow-md shadow-primary/15"
                  }
                  transform transition-all duration-300
                  ${isExpanded ? (isCompact ? "scale-125" : "scale-150") : ""}
                `}
                    >
                      <Icon size={isCompact ? 15 : 18} strokeWidth={2.25} />
                    </div>

                    <div
                      className={`
                  absolute left-1/2 -translate-x-1/2 whitespace-nowrap
                  font-bold tracking-wide
                  transition-all duration-300
                  ${isCompact ? "top-11 text-[11px]" : "top-14 text-sm"}
                  ${
                    isExpanded
                      ? "pointer-events-none scale-95 opacity-0"
                      : "text-zinc-700"
                  }
                `}
                    >
                      {item.title}
                    </div>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.32,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute top-[4.5rem] left-1/2 z-30 w-[min(19rem,calc(100vw-2rem))] -translate-x-1/2"
                      >
                        <div
                          aria-hidden
                          className="mx-auto mb-0 h-2.5 w-px bg-linear-to-b from-primary/40 to-transparent"
                        />

                        <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_18px_40px_-18px_rgba(6,27,49,0.28),0_0_0_1px_rgba(20,86,168,0.04)]">
                          <div
                            aria-hidden
                            className="h-[3px] w-full"
                            style={{ background: "var(--gradient-primary)" }}
                          />

                          <div className="p-3 sm:p-5">
                            <div className="mb-2 flex items-center gap-2.5 sm:mb-3 sm:gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(145deg,#1456a8_0%,#0c4a8c_55%,#061b31_100%)] text-white shadow-sm sm:h-9 sm:w-9">
                                <Icon size={isCompact ? 14 : 16} strokeWidth={2.25} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/70">
                                  Capability {String(index + 1).padStart(2, "0")}
                                </p>
                                <h4 className="truncate text-[14px] font-semibold tracking-tight text-zinc-900 sm:text-[15px]">
                                  {item.title}
                                </h4>
                              </div>
                            </div>

                            <p className="text-[12px] leading-relaxed text-zinc-500 sm:text-[13px]">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
