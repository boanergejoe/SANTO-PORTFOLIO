import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Mail,
} from "lucide-react";
import { useLenis } from "lenis/react";
import { AuroraText } from "../components/AuroraText";
import { LanyardCard } from "../components/LanyardCard";
import { TechMarquee } from "../components/TechMarquee";
import { site } from "../data/portfolio";

const socials = [
  { icon: Github, href: site.github, label: "GitHub" },
  { icon: Mail, href: `mailto:${site.email}`, label: "Email" },
];

export function HeroSection() {
  const lenis = useLenis();

  const viewWork = () => {
    if (lenis) {
      lenis.scrollTo("#projects");
    } else {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100vh] flex-col overflow-hidden bg-background pt-12 md:pt-16"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-12 px-6 pb-12 md:flex-row md:gap-20">
        <motion.div
          className="flex flex-1 flex-col items-center pt-0 text-center md:items-start md:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <span className="glass-panel inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-semibold border-foreground/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Available for work
              </span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-4 text-center md:text-left"
          >
            <h1 className="mb-2 text-5xl font-bold tracking-tight md:text-7xl">
              Hi, I&apos;m
            </h1>

            <div className="block dark:hidden">
              <span className="block select-none bg-gradient-to-r from-violet-600 via-sky-500 via-purple-600 to-indigo-600 bg-clip-text pb-2 text-[clamp(3rem,6.5vw,5.5rem)] font-extrabold leading-none tracking-tight text-transparent">
                {site.name}
              </span>
            </div>

            <div className="hidden dark:block">
              <AuroraText
                text={site.name}
                fontSize="clamp(3rem, 6.5vw, 5.5rem)"
                className="justify-start overflow-visible bg-transparent p-0"
                textClassName="bg-gradient-to-r from-cyan-400 via-purple-400 to-sky-300 bg-clip-text pb-2 font-extrabold text-transparent"
              />
            </div>
          </motion.div>

          <motion.p
            className="mb-8 w-full max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            I build exceptional and accessible digital experiences. Specialized in
            crafting premium web applications with elegant design systems.
          </motion.p>

          <motion.div
            className="mb-10 flex w-full flex-wrap items-center justify-center gap-4 md:w-auto md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button
              type="button"
              onClick={viewWork}
              className="flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all hover:-translate-y-1 hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
            >
              View Work
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="/resume.pdf"
              download
              className="glass-panel flex h-12 items-center gap-2 rounded-full border border-foreground/10 bg-background px-7 text-sm font-semibold text-foreground transition-all hover:-translate-y-1 hover:bg-foreground/10"
            >
              Resume
              <Download className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            className="flex w-full items-center justify-center gap-5 md:w-auto md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="transform text-muted-foreground transition-colors duration-200 hover:-translate-y-1 hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex w-full max-w-md flex-1 items-center justify-center py-2"
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <LanyardCard
            ropeLength={75}
            ropeColor="#27272a"
            cardWidth="w-72 sm:w-80 md:w-84"
          />
        </motion.div>
      </div>

      <div className="relative z-10 mt-auto w-full">
        <TechMarquee />
      </div>
    </section>
  );
}
