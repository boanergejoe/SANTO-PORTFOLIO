import { useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../lib/cn";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isDark, toggleTheme } = useTheme(buttonRef);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      className={cn(
        "p-2.5 rounded-full glass-panel border border-foreground/10 hover:border-primary/40 text-foreground transition-all shadow-md flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95",
        className,
      )}
      aria-label="Toggle Theme"
      aria-pressed={isDark}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
      ) : (
        <Moon className="h-5 w-5 text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
      )}
    </button>
  );
}
