import { motion } from "framer-motion";
import {
  ArrowUp,
  Github,
  Heart,
  Mail,
} from "lucide-react";
import { useLenis } from "lenis/react";
import { footerLinks, footerMorphTexts, site } from "../data/portfolio";
import { MorphingText } from "./MorphingText";

const socialLinks = [
  { icon: Github, href: site.github, label: "GitHub" },
  { icon: Mail, href: `mailto:${site.email}`, label: "Email" },
];

export function SiteFooter() {
  const lenis = useLenis();

  const scrollTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative z-10 w-full overflow-hidden rounded-t-[3rem] border-t border-black/5 bg-card/60 pb-28 pt-16 shadow-2xl backdrop-blur-2xl md:pb-36 dark:border-white/10">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-6 md:px-12">
        <div className="flex flex-col items-center justify-between gap-6 border-b border-black/5 pb-8 md:flex-row dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 via-primary to-sky-400 p-[1px] shadow-lg">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-background">
                <span className="bg-gradient-to-r from-purple-500 to-sky-400 bg-clip-text text-xs font-extrabold tracking-tighter text-transparent">
                  {site.initials}
                </span>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base font-extrabold leading-none tracking-tight text-foreground">
                {site.name}
              </span>
              <span className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {site.role}
              </span>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={scrollTop}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="glass-panel flex cursor-pointer items-center gap-2 rounded-full border border-black/5 px-5 py-2.5 text-xs font-bold text-foreground shadow-sm transition-all hover:border-primary/40 hover:text-primary dark:border-white/10"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </motion.button>
        </div>

        <div className="my-2 flex flex-col items-center justify-center rounded-3xl border border-black/5 bg-black/[0.015] px-6 py-12 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
          <span className="mb-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-primary shadow-sm">
            Innovate &amp; Build
          </span>
          <MorphingText
            texts={footerMorphTexts}
            morphTime={1.6}
            cooldownTime={0.8}
            className="min-h-[70px] text-center text-3xl font-extrabold text-foreground md:text-5xl lg:text-6xl"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 border-t border-black/5 py-6 text-sm font-semibold text-muted-foreground md:gap-12 dark:border-white/10">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="transform transition-colors duration-200 hover:scale-105 hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-black/5 pt-6 text-xs text-muted-foreground md:flex-row dark:border-white/10">
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="glass-panel flex h-10 w-10 items-center justify-center rounded-full border border-black/5 text-muted-foreground shadow-sm transition-all hover:scale-110 hover:border-primary/40 hover:text-foreground dark:border-white/10"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-center font-medium md:text-right">
            <span>© {new Date().getFullYear()} {site.name}. Crafted with</span>
            <Heart className="inline-block h-3.5 w-3.5 fill-rose-500 text-rose-500" />
            <span>&amp; Compassion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
