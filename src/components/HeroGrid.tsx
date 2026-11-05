import { useId } from "react";
import { cn } from "../lib/cn";

interface HeroGridProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  glow?: boolean;
}

export function HeroGrid({
  width = 24,
  height = 24,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = true,
}: HeroGridProps) {
  const patternId = useId();

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <svg
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full fill-foreground/35 dark:fill-white/35 [mask-image:radial-gradient(ellipse_at_center,white_55%,transparent_90%)]",
          className,
        )}
      >
        <defs>
          <pattern
            id={patternId}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${x} ${y})`}
          >
            <circle cx={cx} cy={cy} r={cr} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      </svg>
      {glow && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px] dark:bg-primary/35" />
      )}
    </div>
  );
}
