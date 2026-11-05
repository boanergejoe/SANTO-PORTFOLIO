import { cn } from "../lib/cn";

interface AuroraTextProps {
  text: string;
  className?: string;
  textClassName?: string;
  fontSize?: string;
  blurAmount?: string;
  animationSpeed?: {
    border: number;
    first: number;
    second: number;
    third: number;
    fourth: number;
  };
}

const defaultColors = {
  first: "bg-cyan-400",
  second: "bg-yellow-400",
  third: "bg-green-400",
  fourth: "bg-primary",
};

/**
 * Animated aurora name used by the dark theme. The moving blobs sit behind
 * the text with a blend mode, exactly like the reference implementation.
 */
export function AuroraText({
  text,
  className,
  textClassName,
  fontSize = "clamp(3rem, 8vw, 7rem)",
  blurAmount = "blur-lg",
  animationSpeed = { border: 6, first: 5, second: 5, third: 3, fourth: 13 },
}: AuroraTextProps) {
  const colors = defaultColors;
  const speed = animationSpeed;

  return (
    <div
      className={cn("flex items-center justify-center bg-transparent", className)}
    >
      <div className="relative">
        <h2
          className={cn(
            "relative overflow-hidden font-extrabold tracking-tight text-black dark:text-white",
            textClassName,
          )}
          style={{ fontSize }}
        >
          {text}
          <div className="pointer-events-none absolute inset-0 z-10 mix-blend-lighten dark:mix-blend-darken">
            <div
              className={cn(
                "absolute h-[60vw] w-[60vw] rounded-[37%_29%_27%_27%/28%_25%_41%_37%] filter mix-blend-overlay",
                colors.first,
                blurAmount,
              )}
              style={{
                animationName: "aurora-border, aurora-1",
                animationDuration: `${speed.border}s, ${speed.first}s`,
                animationTimingFunction: "ease-in-out, ease-in-out",
                animationIterationCount: "infinite, infinite",
                animationDirection: "normal, alternate",
              }}
            />
            <div
              className={cn(
                "absolute h-[60vw] w-[60vw] rounded-[37%_29%_27%_27%/28%_25%_41%_37%] filter mix-blend-overlay",
                colors.second,
                blurAmount,
              )}
              style={{
                animationName: "aurora-border, aurora-2",
                animationDuration: `${speed.border}s, ${speed.second}s`,
                animationTimingFunction: "ease-in-out, ease-in-out",
                animationIterationCount: "infinite, infinite",
                animationDirection: "normal, alternate",
              }}
            />
            <div
              className={cn(
                "absolute h-[60vw] w-[60vw] rounded-[37%_29%_27%_27%/28%_25%_41%_37%] filter mix-blend-overlay",
                colors.third,
                blurAmount,
              )}
              style={{
                animationName: "aurora-border, aurora-3",
                animationDuration: `${speed.border}s, ${speed.third}s`,
                animationTimingFunction: "ease-in-out, ease-in-out",
                animationIterationCount: "infinite, infinite",
                animationDirection: "normal, alternate",
              }}
            />
            <div
              className={cn(
                "absolute h-[60vw] w-[60vw] rounded-[37%_29%_27%_27%/28%_25%_41%_37%] filter mix-blend-overlay",
                colors.fourth,
                blurAmount,
              )}
              style={{
                animationName: "aurora-border, aurora-4",
                animationDuration: `${speed.border}s, ${speed.fourth}s`,
                animationTimingFunction: "ease-in-out, ease-in-out",
                animationIterationCount: "infinite, infinite",
                animationDirection: "normal, alternate",
              }}
            />
          </div>
        </h2>
      </div>
    </div>
  );
}
