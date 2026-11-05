import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../lib/cn";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, .cursor-pointer, [data-magnetic]";
const MAGNETIC_DISTANCE = 50;
const TRAIL_LENGTH = 4;

function CursorArrow({ size = 22 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size * 2}
      height={size * 2.16}
      viewBox="0 0 50 54"
      fill="none"
      className="pointer-events-none drop-shadow-md"
      aria-hidden="true"
    >
      <g filter="url(#cursor_filter)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="currentColor"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <filter
          id="cursor_filter"
          x="0"
          y="0"
          width="50"
          height="54"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 35, stiffness: 350, mass: 0.8 });
  const springY = useSpring(y, { damping: 35, stiffness: 350, mass: 0.8 });
  const rotation = useMotionValue(0);
  const springRotation = useSpring(rotation, {
    damping: 50,
    stiffness: 250,
  });
  const scale = useSpring(1, { stiffness: 450, damping: 30 });

  const pointer = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastMove = useRef(Date.now());
  const rawAngle = useRef(0);
  const displayedAngle = useRef(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setEnabled(true);
    document.body.style.cursor = "none";

    const handleMove = (event: MouseEvent) => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;

        const now = Date.now();
        const elapsed = now - lastMove.current;
        if (elapsed > 0) {
          velocity.current = {
            x: (event.clientX - pointer.current.x) / elapsed,
            y: (event.clientY - pointer.current.y) / elapsed,
          };
        }
        lastMove.current = now;

        let nextX = event.clientX;
        let nextY = event.clientY;

        const target = event.target as Element | null;
        const isInteractive = Boolean(target?.closest(INTERACTIVE_SELECTOR));
        setInteractive(isInteractive);
        document.body.style.cursor = isInteractive ? "pointer" : "none";

        const candidates = document.querySelectorAll(INTERACTIVE_SELECTOR);
        let closestX = 0;
        let closestY = 0;
        let closestDistance = MAGNETIC_DISTANCE;
        candidates.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distance = Math.hypot(nextX - centerX, nextY - centerY);
          if (distance < closestDistance) {
            closestX = centerX;
            closestY = centerY;
            closestDistance = distance;
          }
        });
        if (closestDistance < MAGNETIC_DISTANCE) {
          const strength = 1 - closestDistance / MAGNETIC_DISTANCE;
          nextX += (closestX - nextX) * strength * 0.35;
          nextY += (closestY - nextY) * strength * 0.35;
        }

        pointer.current = { x: nextX, y: nextY };
        x.set(nextX);
        y.set(nextY);

        setTrail((current) => [{ x: nextX, y: nextY }, ...current.slice(0, TRAIL_LENGTH - 1)]);

        const speed = Math.hypot(velocity.current.x, velocity.current.y);
        if (speed > 0.1) {
          const angle =
            (Math.atan2(velocity.current.y, velocity.current.x) * 180) / Math.PI + 90;
          let delta = angle - rawAngle.current;
          if (delta > 180) delta -= 360;
          if (delta < -180) delta += 360;
          displayedAngle.current += delta;
          rawAngle.current = angle;
          rotation.set(displayedAngle.current);
        }
      });
    };

    const handleEnter = () => setHidden(false);
    const handleLeave = () => {
      setHidden(true);
      setInteractive(false);
      document.body.style.cursor = "auto";
    };
    const handleDown = () => scale.set(0.75);
    const handleUp = () => scale.set(1);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
      document.body.style.cursor = "auto";
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [rotation, scale, x, y]);

  if (!enabled || hidden) return null;

  return (
    <>
      {!interactive &&
        trail.map((point, index) => (
          <div
            key={index}
            className="pointer-events-none fixed z-[9998] h-2.5 w-2.5 rounded-full bg-primary"
            style={{
              left: point.x,
              top: point.y,
              transform: "translate(-50%, -50%)",
              opacity: ((TRAIL_LENGTH - index) / TRAIL_LENGTH) * 0.4,
              zIndex: 9998 - index,
            }}
            aria-hidden="true"
          />
        ))}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          position: "fixed",
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          rotate: springRotation,
          scale,
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
          filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))",
        }}
        className={cn(
          "pointer-events-none hidden select-none text-primary md:block",
          interactive && "opacity-0",
        )}
        aria-hidden="true"
      >
        <CursorArrow />
      </motion.div>
    </>
  );
}
