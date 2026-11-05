import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/portfolio";

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto w-full max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-16"
      >
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight md:text-left md:text-5xl">
          Selected{" "}
          <span className="text-gradient-primary">Works</span>
        </h2>
        <p className="max-w-2xl text-center text-lg text-muted-foreground md:text-left">
          A showcase of complex systems, elegant interfaces, and scalable
          applications I&apos;ve engineered.
        </p>
      </motion.div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-12">
        {projects.map((project, index) => (
          <motion.a
            key={project.id}
            href={project.link}
            className={`group relative block overflow-hidden rounded-[2.25rem] border border-foreground/10 shadow-xl ${project.gridClass}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="absolute inset-0 bg-neutral-950">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full transform-gpu object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-8">
              <div className="flex translate-y-2 transform-gpu items-end justify-between gap-4 transition-transform duration-300 group-hover:translate-y-0">
                <div className="z-10 max-w-lg">
                  <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-white drop-shadow-md md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-white/80 opacity-90 transition-opacity duration-300 group-hover:opacity-100 md:text-base">
                    {project.subtitle}
                  </p>
                </div>

                <div className="z-10 flex h-12 w-12 shrink-0 rotate-45 items-center justify-center rounded-full border border-white/30 bg-white/20 opacity-80 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:rotate-0 group-hover:bg-white group-hover:opacity-100 group-hover:text-black">
                  <ArrowUpRight className="h-6 w-6 text-white transition-colors group-hover:text-black" />
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
