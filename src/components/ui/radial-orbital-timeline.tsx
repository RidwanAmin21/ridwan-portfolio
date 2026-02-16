"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  /** Lucide (or other) icon component. Optional when logo is provided. */
  icon?: React.ElementType;
  /** Image src for logo (e.g. tech stack). Optional when icon is provided. */
  logo?: string;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  /** "light" uses site theme (background, foreground, borders). "dark" is the original black layout. */
  variant?: "light" | "dark";
  /** Optional class for the root container (e.g. min-h-[70vh] to avoid full viewport). */
  className?: string;
}

export default function RadialOrbitalTimeline({
  timelineData,
  variant = "dark",
  className,
}: RadialOrbitalTimelineProps) {
  const isLight = variant === "light";
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
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
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    if (isLight) {
      switch (status) {
        case "completed":
          return "text-primary-foreground bg-primary border-primary";
        case "in-progress":
          return "text-primary bg-primary-foreground border-primary";
        case "pending":
          return "text-muted-foreground bg-muted border-border";
        default:
          return "text-muted-foreground bg-muted border-border";
      }
    }
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center overflow-hidden",
        isLight
          ? "bg-transparent min-h-[70vh] text-foreground"
          : "h-screen bg-black",
        className
      )}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div
            className={cn(
              "absolute w-16 h-16 rounded-full animate-pulse flex items-center justify-center z-10",
              isLight
                ? "bg-gradient-to-br from-accent via-indigo-400 to-accent-glow border border-border"
                : "bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500"
            )}
          >
            <div
              className={cn(
                "absolute w-20 h-20 rounded-full border animate-ping opacity-70",
                isLight ? "border-border" : "border-white/20"
              )}
            />
            <div
              className={cn(
                "absolute w-24 h-24 rounded-full border animate-ping opacity-50",
                isLight ? "border-border/80" : "border-white/10"
              )}
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className={cn(
                "w-8 h-8 rounded-full backdrop-blur-md",
                isLight ? "bg-background border border-border" : "bg-white/80"
              )}
            />
          </div>

          <div
            className={cn(
              "absolute w-96 h-96 rounded-full border",
              isLight ? "border-zinc-200/60" : "border-white/10"
            )}
          />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeContent = item.logo ? (
              <img
                src={item.logo}
                alt={item.title}
                className="w-6 h-6 object-contain pointer-events-none"
              />
            ) : Icon ? (
              <Icon size={16} />
            ) : null;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: isLight
                      ? "radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                />

                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 transform",
                    isExpanded && "scale-150",
                    isLight
                      ? isExpanded
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                        : isRelated
                          ? "bg-accent text-accent-foreground border-accent animate-pulse"
                          : "bg-card text-card-foreground border-border shadow-sm"
                      : isExpanded
                        ? "bg-white text-black border-white shadow-lg shadow-white/30"
                        : isRelated
                          ? "bg-white/50 text-black border-white animate-pulse"
                          : "bg-black text-white border-white/40"
                  )}
                >
                  {nodeContent}
                </div>

                <div
                  className={cn(
                    "absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300",
                    isLight
                      ? isExpanded
                        ? "text-foreground scale-125"
                        : "text-muted-foreground"
                      : isExpanded
                        ? "text-white scale-125"
                        : "text-white/70"
                  )}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card
                    className={cn(
                      "absolute top-20 left-1/2 -translate-x-1/2 w-64 backdrop-blur-lg shadow-xl overflow-visible",
                      isLight
                        ? "bg-card/95 border border-border text-card-foreground shadow-lg"
                        : "bg-black/90 border-white/30 shadow-white/10"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3",
                        isLight ? "bg-border" : "bg-white/50"
                      )}
                    />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={cn(
                            "px-2 text-xs",
                            getStatusStyles(item.status)
                          )}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                              ? "IN PROGRESS"
                              : "PENDING"}
                        </Badge>
                        <span
                          className={cn(
                            "text-xs font-mono",
                            isLight ? "text-muted-foreground" : "text-white/50"
                          )}
                        >
                          {item.date}
                        </span>
                      </div>
                      <CardTitle
                        className={cn(
                          "text-sm mt-2",
                          isLight ? "text-foreground" : "text-white"
                        )}
                      >
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent
                      className={cn(
                        "text-xs",
                        isLight ? "text-muted-foreground" : "text-white/80"
                      )}
                    >
                      <p>{item.content}</p>

                      <div
                        className={cn(
                          "mt-4 pt-3 border-t",
                          isLight ? "border-border" : "border-white/10"
                        )}
                      >
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            Energy Level
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div
                          className={cn(
                            "w-full h-1 rounded-full overflow-hidden",
                            isLight ? "bg-muted" : "bg-white/10"
                          )}
                        >
                          <div
                            className="h-full bg-gradient-to-r from-accent to-indigo-500"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div
                          className={cn(
                            "mt-4 pt-3 border-t",
                            isLight ? "border-border" : "border-white/10"
                          )}
                        >
                          <div className="flex items-center mb-2">
                            <Link
                              size={10}
                              className={isLight ? "text-muted-foreground mr-1" : "text-white/70 mr-1"}
                            />
                            <h4
                              className={cn(
                                "text-xs uppercase tracking-wider font-medium",
                                isLight ? "text-muted-foreground" : "text-white/70"
                              )}
                            >
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className={cn(
                                    "flex items-center h-6 px-2 py-0 text-xs rounded-none transition-all",
                                    isLight
                                      ? "border-border bg-transparent hover:bg-accent hover:text-accent-foreground text-foreground"
                                      : "border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white"
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className={cn(
                                      "ml-1",
                                      isLight ? "text-muted-foreground" : "text-white/60"
                                    )}
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
  );
}
