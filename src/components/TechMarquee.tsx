import { motion } from "framer-motion";
import { techStack } from "../data/portfolio";

export function TechMarquee() {
  const items = [...techStack, ...techStack];

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-hidden border-y border-foreground/10 bg-foreground/[0.02] py-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative flex w-full items-center overflow-hidden"
      >
        <div className="pointer-events-none absolute left-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-[marquee_35s_linear_infinite] items-center whitespace-nowrap py-1 hover:[animation-play-state:paused]">
          {items.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="group mx-3 flex shrink-0 cursor-default items-center gap-3 rounded-full border border-foreground/10 bg-background/80 px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:scale-105 hover:border-primary/50 hover:bg-foreground/5"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="h-5 w-5 object-contain transition-transform duration-300 group-hover:scale-110 dark:invert-0"
                loading="lazy"
                decoding="async"
              />
              <span className="text-xs tracking-wide md:text-sm">{tech.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
