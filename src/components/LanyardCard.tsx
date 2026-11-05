import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";
import santoPortrait from "../assets/avatars/santo.jpg";

interface LanyardCardProps {
  children?: ReactNode;
  ropeLength?: number;
  ropeColor?: string;
  cardWidth?: string;
  className?: string;
}

const GRAVITY = 3000;
const DAMPING = 0.92;

function Rope({ length, color }: { length: number; color: string }) {
  const hookStart = length + 10;
  const hookEnd = length + 18;

  return (
    <svg
      width="44"
      height={length + 38}
      viewBox={`0 0 44 ${length + 38}`}
      style={{ display: "block", margin: "0 auto", overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="metalDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#71717a" />
          <stop offset="35%" stopColor="#27272a" />
          <stop offset="70%" stopColor="#52525b" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
        <linearGradient id="hookDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#52525b" />
          <stop offset="40%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#3f3f46" />
        </linearGradient>
        <linearGradient id="strapHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="75%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <rect x="12" y="0" width="20" height={length + 4} rx="2" fill={color} />
      <rect
        x="12"
        y="0"
        width="20"
        height={length + 4}
        rx="2"
        fill="url(#strapHighlight)"
      />
      <line
        x1="13.5"
        y1="0"
        x2="13.5"
        y2={length + 4}
        stroke="#ffffff"
        strokeOpacity="0.15"
        strokeWidth="0.75"
        strokeDasharray="3 2"
      />
      <line
        x1="30.5"
        y1="0"
        x2="30.5"
        y2={length + 4}
        stroke="#ffffff"
        strokeOpacity="0.15"
        strokeWidth="0.75"
        strokeDasharray="3 2"
      />
      <rect
        x="10"
        y={length}
        width="24"
        height="10"
        rx="2.5"
        fill="url(#metalDark)"
        stroke="#18181b"
        strokeWidth="0.8"
      />
      <circle cx="13.5" cy={length + 5} r="1.3" fill="#a1a1aa" />
      <circle cx="30.5" cy={length + 5} r="1.3" fill="#a1a1aa" />
      <path
        d={`M 15 ${length + 9} C 15 ${hookStart + 6}, 29 ${hookStart + 6}, 29 ${length + 9}`}
        fill="none"
        stroke="url(#metalDark)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect
        x="19"
        y={hookStart + 2}
        width="6"
        height="6"
        rx="1"
        fill="url(#metalDark)"
      />
      <path
        d={`M 20 ${hookStart + 7} L 20 ${hookEnd + 6} C 20 ${hookEnd + 15}, 24 ${hookEnd + 15}, 24 ${hookEnd + 6} L 24 ${hookStart + 7}`}
        fill="none"
        stroke="url(#hookDark)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <line
        x1="20.5"
        y1={hookEnd + 1}
        x2="20.5"
        y2={hookEnd + 10}
        stroke="#d4d4d8"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function LanyardCard({
  children,
  ropeLength = 75,
  ropeColor = "#27272a",
  cardWidth = "w-72 sm:w-80 md:w-84",
  className,
}: LanyardCardProps) {
  const physics = useRef({ angle: 0, velocity: 0 });
  const frame = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);
  const dragging = useRef(false);
  const pointerStartX = useRef(0);
  const startAngle = useRef(0);
  const lastFrameAngle = useRef(0);
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const tick = useCallback(
    (time: number) => {
      if (lastTime.current === null) lastTime.current = time;
      const delta = Math.min((time - lastTime.current) / 1000, 0.05);
      lastTime.current = time;

      const state = physics.current;
      if (dragging.current) {
        if (delta > 0) {
          state.velocity = (state.angle - lastFrameAngle.current) / delta;
        }
        lastFrameAngle.current = state.angle;
        frame.current = requestAnimationFrame(tick);
        return;
      }

      const pendulumLength = ropeLength + 100;
      const acceleration =
        -(GRAVITY / pendulumLength) * Math.sin(state.angle) -
        DAMPING * state.velocity;
      state.velocity += acceleration * delta;
      state.angle += state.velocity * delta;
      setAngle(state.angle);

      if (Math.abs(state.angle) > 0.001 || Math.abs(state.velocity) > 0.001) {
        frame.current = requestAnimationFrame(tick);
      } else {
        state.angle = 0;
        state.velocity = 0;
        setAngle(0);
      }
    },
    [ropeLength],
  );

  const startAnimation = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current);
    lastTime.current = null;
    frame.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragging.current = true;
    setIsDragging(true);
    pointerStartX.current = event.clientX;
    startAngle.current = physics.current.angle;
    lastFrameAngle.current = physics.current.angle;
    if (frame.current) cancelAnimationFrame(frame.current);
    lastTime.current = null;
    frame.current = requestAnimationFrame(tick);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const deltaX = event.clientX - pointerStartX.current;
    const pendulumLength = ropeLength + 100;
    const nextAngle = Math.max(
      -1.4,
      Math.min(1.4, startAngle.current - deltaX / pendulumLength),
    );
    physics.current.angle = nextAngle;
    setAngle(nextAngle);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragging.current = false;
    setIsDragging(false);
  };

  const handleClick = () => {
    if (Math.abs(physics.current.velocity) < 0.1 && Math.abs(physics.current.angle) < 0.05) {
      physics.current.velocity = 4;
      startAnimation();
    }
  };

  const degrees = (angle * 180) / Math.PI;

  return (
    <div
      className={cn("flex select-none flex-col items-center", className)}
      style={{ touchAction: "none" }}
    >
      <div className="relative z-10 h-3.5 w-3.5 rounded-full border border-zinc-700 bg-zinc-900 shadow-md" />

      <div
        className={cn(
          "flex cursor-grab flex-col items-center active:cursor-grabbing",
          isDragging && "cursor-grabbing",
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleClick}
        style={{
          transform: `rotate(${degrees}deg)`,
          transformOrigin: "top center",
          willChange: "transform",
          marginTop: "-6px",
        }}
      >
        <div style={{ pointerEvents: "none" }}>
          <Rope length={ropeLength} color={ropeColor} />
        </div>

        <div
          className={cn(
            "relative rounded-[1.75rem] overflow-hidden shadow-2xl border border-foreground/15 dark:border-white/15 bg-card pointer-events-none mt-[-16px]",
            cardWidth,
          )}
        >
          <div className="pointer-events-none absolute left-1/2 top-2.5 z-30 -translate-x-1/2">
            <div className="flex h-2.5 w-9 items-center justify-center rounded-full border border-white/30 bg-black/70 shadow-inner dark:bg-black/90">
              <div className="h-1 w-7 rounded-full bg-zinc-950 opacity-90" />
            </div>
          </div>

          {children ?? <DefaultCard />}
        </div>
      </div>

      <p className="pointer-events-none mt-8 select-none text-[11px] font-medium text-zinc-400 dark:text-zinc-600">
        Drag or click the card
      </p>
    </div>
  );
}

function DefaultCard() {
  return (
    <div className="flex h-full w-full flex-col bg-card">
      <div className="relative flex flex-col items-center overflow-hidden bg-gradient-to-br from-purple-700 via-primary to-indigo-950 px-5 pb-6 pt-7 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] opacity-10 [background-size:12px_12px]" />
        <div className="group relative mt-1 h-28 w-28 overflow-hidden rounded-full border border-white/50 bg-gradient-to-tr from-cyan-400 via-primary to-purple-400 p-1 shadow-2xl backdrop-blur-md">
          <img
            src={santoPortrait}
            alt="Santo J"
            className="h-full w-full rounded-full object-cover contrast-105 filter"
            loading="eager"
          />
          <div className="absolute bottom-1 right-2 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 shadow-md" />
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-3 bg-card p-5 text-center text-card-foreground">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-foreground">
            Santo
          </h3>
          <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
            <span>Software Engineer</span>
          </div>
        </div>
        <div className="my-0.5 w-full border-t border-border/60" />
        <div className="grid w-full grid-cols-2 gap-2.5 rounded-xl border border-border/50 bg-muted/40 p-3 text-left">
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
              Specialty
            </span>
            <span className="text-xs font-bold text-foreground">Full-Stack AI &amp; UX</span>
          </div>
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
              Location
            </span>
            <span className="text-xs font-bold text-foreground">Kigali, Rwanda</span>
          </div>
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
              Experience
            </span>
            <span className="text-xs font-bold text-foreground">10+ Years</span>
          </div>
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
              Status
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
              ● Active
            </span>
          </div>
        </div>
        <div className="mt-1 flex w-full flex-col items-center gap-1">
          <div className="flex h-7 w-full items-end justify-center gap-[2.5px] rounded-lg border border-border/40 bg-white/90 px-3 py-0.5 dark:bg-black/40">
            {Array.from({ length: 36 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[1px] bg-foreground"
                style={{
                  width: index % 4 === 0 ? "3.5px" : index % 2 === 0 ? "2px" : "1px",
                  height: `${50 + Math.sin(index * 1.4) * 45}%`,
                }}
              />
            ))}
          </div>
          <div className="flex w-full items-center justify-between px-1 text-[10px]">
            <span className="font-mono font-bold tracking-widest text-primary">
              SR-89240-PRO
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
              LIGHTSWIND UI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
