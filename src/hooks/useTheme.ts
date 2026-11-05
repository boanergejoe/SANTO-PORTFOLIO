import { useCallback, useEffect, useState, type RefObject } from "react";
import { flushSync } from "react-dom";

type AnimationType =
  | "circle-spread"
  | "round-morph"
  | "swipe-left"
  | "swipe-right"
  | "swipe-up"
  | "swipe-down"
  | "diag-down-right"
  | "fade-in-out"
  | "shrink-grow"
  | "wave-ripple"
  | "split-vertical"
  | "flip-x-in";

const animationTypes: AnimationType[] = [
  "circle-spread",
  "round-morph",
  "swipe-left",
  "swipe-right",
  "swipe-up",
  "swipe-down",
  "diag-down-right",
  "fade-in-out",
  "shrink-grow",
  "wave-ripple",
  "split-vertical",
  "flip-x-in",
];

interface ViewTransitionDocument {
  startViewTransition?: (update: () => void) => {
    ready: Promise<void>;
  };
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    // Storage can be unavailable in private browsing contexts.
  }
}

/**
 * Theme state with the same view-transition choreography the reference uses.
 * The animation is randomly chosen on every toggle and originates from the
 * toggle button when its ref is provided.
 */
export function useTheme(anchorRef?: RefObject<HTMLElement | null>) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(async () => {
    const next = !isDark;
    const doc = document as unknown as ViewTransitionDocument;

    if (!doc.startViewTransition) {
      applyTheme(next);
      return;
    }

    const transition = doc.startViewTransition(() => {
      flushSync(() => applyTheme(next));
    });

    await transition.ready;

    const button = anchorRef?.current;
    const rect = button?.getBoundingClientRect();
    const originX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const originY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const radius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY),
    );
    const width = window.innerWidth;
    const height = window.innerHeight;
    const chosen =
      animationTypes[Math.floor(Math.random() * animationTypes.length)];
    const duration = 500;
    const root = document.documentElement;
    const pseudo = "::view-transition-new(root)";

    const options = (ms: number, easing: string) => ({
      duration: ms,
      easing,
      pseudoElement: pseudo,
    });

    switch (chosen) {
      case "round-morph":
        root.animate(
          [
            { opacity: 0, transform: "scale(0.8) rotate(5deg)" },
            { opacity: 1, transform: "scale(1) rotate(0deg)" },
          ],
          options(duration * 1.2, "cubic-bezier(0.68, -0.55, 0.265, 1.55)"),
        );
        break;
      case "swipe-left":
        root.animate(
          { clipPath: [`inset(0 0 0 ${width}px)`, "inset(0 0 0 0)"] },
          options(duration, "cubic-bezier(0.2, 0, 0, 1)"),
        );
        break;
      case "swipe-right":
        root.animate(
          { clipPath: [`inset(0 ${width}px 0 0)`, "inset(0 0 0 0)"] },
          options(duration, "cubic-bezier(0.2, 0, 0, 1)"),
        );
        break;
      case "swipe-up":
        root.animate(
          { clipPath: [`inset(${height}px 0 0 0)`, "inset(0 0 0 0)"] },
          options(duration, "cubic-bezier(0.2, 0, 0, 1)"),
        );
        break;
      case "swipe-down":
        root.animate(
          { clipPath: [`inset(0 0 ${height}px 0)`, "inset(0 0 0 0)"] },
          options(duration, "cubic-bezier(0.2, 0, 0, 1)"),
        );
        break;
      case "diag-down-right":
        root.animate(
          {
            clipPath: [
              "polygon(0 0, 0 0, 0 0, 0 0)",
              "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            ],
          },
          options(duration * 1.3, "cubic-bezier(0.4, 0, 0.2, 1)"),
        );
        break;
      case "fade-in-out":
        root.animate(
          { opacity: [0, 1] },
          options(duration * 0.7, "ease-in-out"),
        );
        break;
      case "shrink-grow":
        root.animate(
          [
            { transform: "scale(0.9)", opacity: 0 },
            { transform: "scale(1)", opacity: 1 },
          ],
          options(duration * 1.2, "cubic-bezier(0.19, 1, 0.22, 1)"),
        );
        break;
      case "flip-x-in":
        root.animate(
          [
            { transform: "rotateY(90deg)", opacity: 0 },
            { transform: "rotateY(0deg)", opacity: 1 },
          ],
          options(duration * 1.1, "ease-out"),
        );
        break;
      case "split-vertical":
        root.animate(
          { clipPath: ["inset(50% 0 50% 0)", "inset(0 0 0 0)"] },
          options(duration * 1.3, "cubic-bezier(0.68, -0.55, 0.265, 1.55)"),
        );
        break;
      case "wave-ripple":
        root.animate(
          {
            clipPath: [
              "circle(0% at 50% 50%)",
              `circle(${radius}px at 50% 50%)`,
            ],
          },
          options(duration * 1.3, "cubic-bezier(0.68, -0.55, 0.265, 1.55)"),
        );
        break;
      case "circle-spread":
      default:
        root.animate(
          {
            clipPath: [
              `circle(0px at ${originX}px ${originY}px)`,
              `circle(${radius}px at ${originX}px ${originY}px)`,
            ],
          },
          options(duration, "ease-in-out"),
        );
        break;
    }
  }, [anchorRef, isDark]);

  return { isDark, toggleTheme };
}
