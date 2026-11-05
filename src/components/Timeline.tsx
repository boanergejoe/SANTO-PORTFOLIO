import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon?: LucideIcon;
}

interface TimelineProps {
  events: TimelineEvent[];
  title: string;
  subtitle: string;
}

export function Timeline({ events, title, subtitle }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const parallax = useTransform(smoothProgress, [0, 1], [15, -15]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.floor(value * events.length);
    if (next !== activeIndex && next >= 0 && next < events.length) {
      setActiveIndex(next);
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div className="px-4 py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">{title}</h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-24">
        <div className="relative mx-auto">
          <div className="absolute left-1/2 top-0 z-10 h-full -translate-x-1/2 transform bg-primary/20" />

          <motion.div
            className="absolute left-1/2 top-0 z-10 -translate-x-1/2"
            style={{
              height: progressHeight,
              width: 3,
              borderRadius: "9999px",
              background: "linear-gradient(to bottom, #22d3ee, #6366f1, #a855f7)",
              boxShadow:
                "0 0 15px rgba(99,102,241,0.5), 0 0 25px rgba(168,85,247,0.3)",
            }}
          />

          <motion.div
            className="absolute z-20"
            style={{
              top: progressHeight,
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <motion.div
              className="h-5 w-5 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(99,102,241,0.5) 40%, rgba(34,211,238,0) 70%)",
                boxShadow:
                  "0 0 15px 4px rgba(168,85,247,0.6), 0 0 25px 8px rgba(99,102,241,0.4), 0 0 40px 15px rgba(34,211,238,0.2)",
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <div className="relative z-20">
            {events.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;
              const isActive = index <= activeIndex;

              return (
                <div
                  key={`${event.year}-${event.title}`}
                  className={cn(
                    "relative mb-20 flex flex-col items-center py-4 lg:flex-row",
                    isEven
                      ? "lg:justify-start"
                      : "lg:flex-row-reverse lg:justify-start",
                  )}
                >
                  <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full border-4 bg-background",
                        isActive ? "border-primary" : "border bg-card",
                      )}
                      animate={
                        isActive
                          ? {
                              scale: [1, 1.3, 1],
                              boxShadow: [
                                "0 0 0px rgba(99,102,241,0)",
                                "0 0 12px rgba(99,102,241,0.6)",
                                "0 0 0px rgba(99,102,241,0)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  <motion.div
                    className={cn(
                      "relative z-30 mt-12 w-full rounded-lg border border-border/40 bg-card shadow-md transition-all duration-300 lg:mt-0 lg:w-[calc(50%-40px)]",
                      isEven
                        ? "lg:mr-[calc(50%+20px)]"
                        : "lg:ml-[calc(50%+20px)]",
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] },
                    }}
                    viewport={{ once: false, margin: "-100px" }}
                    style={{ y: parallax }}
                  >
                    <div className="rounded-lg border border-border bg-background p-0 text-card-foreground shadow-sm">
                      <div className="p-6">
                        <div className="mb-2 flex items-center">
                          {Icon && <Icon className="mr-2 h-4 w-4 text-primary" />}
                          <span className="text-sm font-bold text-primary">
                            {event.year}
                          </span>
                        </div>
                        <h3 className="mb-1 text-xl font-bold">{event.title}</h3>
                        {event.subtitle && (
                          <p className="mb-2 font-medium text-muted-foreground">
                            {event.subtitle}
                          </p>
                        )}
                        <p className="text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
