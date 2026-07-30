"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Link, Zap, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: LucideIcon;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const rotationAngleRef = useRef(0);

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
    const radius = 210;
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

  function getStatusStyles(status: TimelineItem["status"]): string {
    switch (status) {
      case "completed":
        return "border-primary/30 bg-primary/10 text-primary";
      case "in-progress":
        return "border-primary bg-primary text-white";
      case "pending":
        return "border-zinc-300 bg-zinc-100 text-zinc-500";
      default:
        return "border-zinc-300 bg-zinc-100 text-zinc-500";
    }
  }

  const hasExpandedItem = Object.values(expandedItems).some(Boolean);

  return (
    <section className="relative w-full overflow-hidden bg-white py-10 md:py-16">
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="mb-2 text-4xl sm:text-5xl md:text-6xl font-semibold text-zinc-900 tracking-tight">
            Your Path to{" "}
            <span className="text-primary-gradient">Unified Intelligence</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-zinc-500 md:text-base">
            Navigate each phase of your decision intelligence rollout — from
            planning and design to deployment and release.
          </p>
        </div>

        <div
          className="relative flex h-[min(85dvh,720px)] w-full items-center justify-center overflow-hidden"
          ref={containerRef}
          onClick={handleContainerClick}
        >
          <div className="pointer-events-none absolute h-[min(72dvh,640px)] w-[min(72dvh,640px)] rounded-full bg-[radial-gradient(circle,rgba(42,122,232,0.14)_0%,rgba(42,122,232,0.06)_45%,transparent_72%)]" />

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
                className={`absolute z-1 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-primary-light via-primary-mid to-primary-dark shadow-[0_0_40px_rgba(42,122,232,0.45)] transition-opacity duration-300 ${
                  hasExpandedItem
                    ? "pointer-events-none opacity-0"
                    : "animate-pulse opacity-100"
                }`}
              >
                <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-2 border-primary/40 opacity-80" />
                <div
                  className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-primary/25 opacity-60"
                  style={{ animationDelay: "0.5s" }}
                />
                <div className="relative z-10 h-10 w-10 rounded-full bg-white shadow-md" />
              </div>

              <div className="absolute z-1 h-104 w-104 rounded-full border-2 border-primary/35 shadow-[inset_0_0_30px_rgba(42,122,232,0.08)]" />

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
                        width: `${item.energy * 0.5 + 40}px`,
                        height: `${item.energy * 0.5 + 40}px`,
                        left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                        top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                      }}
                    />

                    <div
                      className={`
                  flex h-12 w-12 items-center justify-center rounded-full
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
                  ${isExpanded ? "scale-150" : ""}
                `}
                    >
                      <Icon size={18} strokeWidth={2.25} />
                    </div>

                    <div
                      className={`
                  absolute top-14 whitespace-nowrap
                  text-sm font-bold tracking-wide
                  transition-all duration-300
                  ${isExpanded ? "scale-110 text-primary" : "text-zinc-700"}
                `}
                    >
                      {item.title}
                    </div>

                    {isExpanded && (
                      <Card className="absolute top-20 left-1/2 z-30 w-64 -translate-x-1/2 overflow-visible border-primary/20 bg-white shadow-xl shadow-primary/10">
                        <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-primary/30" />
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge
                              className={`px-2 text-xs ${getStatusStyles(item.status)}`}
                            >
                              {item.status === "completed"
                                ? "COMPLETE"
                                : item.status === "in-progress"
                                  ? "IN PROGRESS"
                                  : "PENDING"}
                            </Badge>
                            <span className="font-mono text-xs text-zinc-400">
                              {item.date}
                            </span>
                          </div>
                          <CardTitle className="mt-2 text-sm text-zinc-900">
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs text-zinc-600">
                          <p>{item.content}</p>

                          <div className="mt-4 border-t border-zinc-100 pt-3">
                            <div className="mb-1 flex items-center justify-between text-xs text-zinc-700">
                              <span className="flex items-center">
                                <Zap size={10} className="mr-1 text-primary" />
                                Energy Level
                              </span>
                              <span className="font-mono text-primary">
                                {item.energy}%
                              </span>
                            </div>
                            <div className="h-1 w-full overflow-hidden rounded-full bg-primary/10">
                              <div
                                className="h-full bg-linear-to-r from-primary-light to-primary-mid"
                                style={{ width: `${item.energy}%` }}
                              />
                            </div>
                          </div>

                          {item.relatedIds.length > 0 && (
                            <div className="mt-4 border-t border-zinc-100 pt-3">
                              <div className="mb-2 flex items-center">
                                <Link
                                  size={10}
                                  className="mr-1 text-primary/70"
                                />
                                <h4 className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
                                  Connected Nodes
                                </h4>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {item.relatedIds.map((relatedId) => {
                                  const relatedItem = timelineData.find(
                                    (i) => i.id === relatedId,
                                  );
                                  return (
                                    <Button
                                      key={relatedId}
                                      variant="outline"
                                      size="sm"
                                      className="flex h-6 items-center rounded-md border-primary/25 bg-transparent px-2 py-0 text-xs text-primary transition-all hover:bg-primary/10 hover:text-primary"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleItem(relatedId);
                                      }}
                                    >
                                      {relatedItem?.title}
                                      <ArrowRight
                                        size={8}
                                        className="ml-1 text-primary/60"
                                      />
                                    </Button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
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
