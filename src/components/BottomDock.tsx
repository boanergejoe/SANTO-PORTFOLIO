import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Briefcase,
  FolderKanban,
  GraduationCap,
  House,
  MessageSquare,
  Send,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../lib/cn";

const BASE_ITEM_SIZE = 44;
const MAGNIFICATION = 66;
const DISTANCE = 180;

const items = [
  { icon: House, label: "Home", target: "hero" },
  { icon: User, label: "About", target: "about" },
  { icon: Briefcase, label: "Career", target: "career" },
  { icon: FolderKanban, label: "Projects", target: "projects" },
  { icon: GraduationCap, label: "Education", target: "education" },
  { icon: MessageSquare, label: "Testimonials", target: "testimonials" },
  { icon: Send, label: "Contact", target: "contact" },
];

interface DockItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  mouseX: MotionValue<number>;
}

function DockItem({ icon: Icon, label, onClick, mouseX }: DockItemProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [center, setCenter] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const measure = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) setCenter(rect.left + rect.width / 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const width = useTransform(
    mouseX,
    [center - DISTANCE, center, center + DISTANCE],
    [BASE_ITEM_SIZE, MAGNIFICATION, BASE_ITEM_SIZE],
  );
  const animatedWidth = useSpring(width, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{ width: animatedWidth, height: animatedWidth }}
      className="relative inline-flex cursor-pointer items-center justify-center rounded-full bg-background shadow-md"
      aria-label={label}
      aria-haspopup="true"
    >
      <div className="flex items-center justify-center text-foreground">
        <Icon size={20} />
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute left-1/2 z-50 w-fit whitespace-pre rounded-md border border-border bg-[#060606] px-2 py-0.5 text-xs text-white"
            style={{ x: "-50%", bottom: "calc(100% + 8px)" }}
            role="tooltip"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function BottomDock({ visible }: { visible: boolean }) {
  const mouseX = useMotionValue(1_000_000);
  const [hovered, setHovered] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-2 left-0 right-0 z-[999] hidden md:block"
        >
          <motion.div
            animate={{ height: hovered ? 256 : 56 }}
            transition={{ type: "spring", mass: 0.1, stiffness: 150, damping: 12 }}
            className="mx-2 flex max-w-full items-center justify-center"
          >
            <motion.div
              onMouseMove={(event) => mouseX.set(event.pageX)}
              onMouseLeave={() => {
                mouseX.set(1_000_000);
                setHovered(false);
              }}
              onMouseEnter={() => setHovered(true)}
              className="absolute bottom-2 left-1/2 flex w-fit -translate-x-1/2 transform items-center justify-center rounded-[24px] border border-zinc-200/80 bg-zinc-100/80 p-[3px] shadow-lg backdrop-blur-xl transition-all duration-300 sm:rounded-[28px] dark:border-zinc-800/80 dark:bg-zinc-900/80"
              style={{ height: 56 }}
              role="toolbar"
              aria-label="Application dock"
            >
              <div
                className={cn(
                  "flex h-full w-fit items-end gap-4 rounded-[20px] border border-zinc-200/90 bg-white/90 px-4 pb-2 shadow-inner transition-all duration-300 sm:rounded-[24px] dark:border-zinc-800/90 dark:bg-black/90",
                )}
              >
                {items.map((item) => (
                  <DockItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    onClick={() => scrollTo(item.target)}
                    mouseX={mouseX}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
