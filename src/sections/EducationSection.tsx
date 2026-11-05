import { motion } from "framer-motion";
import {
  Brain,
  Calendar,
  CircleCheck,
  CodeXml,
  GraduationCap,
  Lightbulb,
  School,
  Server,
} from "lucide-react";
import { GradientBorderCard } from "../components/GradientBorderCard";
import {
  education,
  professionalTraits,
  technicalSkills,
} from "../data/portfolio";

export function EducationSection() {
  return (
    <section id="education" className="mx-auto max-w-7xl space-y-20 px-6 py-24">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="mb-3 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-md">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              Academic{" "}
              <span className="text-gradient-primary">Background</span>
            </h2>
          </div>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Building the theoretical foundation and research methodologies that
            empower high-performance practical engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {education.map((item, index) => {
            const Icon = item.icon;
            const BadgeIcon = item.badgeIcon;
            return (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <GradientBorderCard
                  className="h-full rounded-[2.25rem] border border-border/80 bg-card/80 p-8 shadow-xl"
                  gradientSize={300}
                  gradientColor="rgba(139, 92, 246, 0.12)"
                  gradientFrom="#8b5cf6"
                  gradientTo="#38bdf8"
                >
                  <div className="flex h-full flex-col justify-between gap-6">
                    <div>
                      <div className="mb-6 flex items-start justify-between gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-sm">
                          <Icon className="h-7 w-7 text-primary" />
                        </div>
                        <span
                          className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-extrabold shadow-sm ${item.badgeColor}`}
                        >
                          <BadgeIcon className="h-3.5 w-3.5" />
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-foreground">
                        {item.degree}
                      </h3>

                      <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-border/60 pb-4 text-xs font-semibold text-muted-foreground">
                        <span className="flex items-center gap-1.5 font-bold text-foreground">
                          <School className="h-3.5 w-3.5 text-primary" />{" "}
                          {item.school}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5 font-mono font-bold text-primary">
                          <Calendar className="h-3.5 w-3.5" /> {item.year}
                        </span>
                      </div>

                      <ul className="space-y-3.5">
                        {item.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                          >
                            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span className="font-medium text-foreground/90">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GradientBorderCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.section
        id="skills"
        className="space-y-8"
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <CodeXml className="h-5 w-5" />
          </div>
          <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            Expertise &amp; Skills
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="glass-panel relative overflow-hidden rounded-[2rem] border border-foreground/15 p-8 shadow-xl">
            <div className="mb-8 flex items-center justify-between border-b border-border/60 pb-4">
              <h4 className="flex items-center gap-2 text-xl font-bold text-foreground">
                <Server className="h-5 w-5 text-primary" /> Technical Arsenal
              </h4>
              <span className="rounded-full border border-border/50 bg-muted/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Proficiency
              </span>
            </div>

            <div className="space-y-6">
              {technicalSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={skill.name} className="space-y-2.5">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span className="flex items-center gap-2.5 text-foreground">
                        <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-1.5">
                          <Icon className={`h-4 w-4 ${skill.color}`} />
                        </div>
                        {skill.name}
                      </span>
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-bold text-primary">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="h-2.5 w-full overflow-hidden rounded-full border border-border/40 bg-muted/60 p-[1px]">
                      <motion.div
                        className="relative h-full rounded-full bg-gradient-to-r from-purple-600 via-primary to-sky-400 shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1.5,
                          ease: "easeOut",
                          delay: 0.2 + index * 0.1,
                        }}
                        viewport={{ once: true }}
                      >
                        <div className="absolute bottom-0 right-0 top-0 w-2 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel flex flex-col justify-between rounded-[2rem] border border-foreground/15 p-8 shadow-xl">
            <div>
              <div className="mb-8 flex items-center justify-between border-b border-border/60 pb-4">
                <h4 className="flex items-center gap-2 text-xl font-bold text-foreground">
                  <Brain className="h-5 w-5 text-primary" /> Professional Traits
                </h4>
                <span className="rounded-full border border-border/50 bg-muted/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Core Competencies
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {professionalTraits.map((trait, index) => {
                  const Icon = trait.icon;
                  return (
                    <motion.div
                      key={trait.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: index * 0.08,
                      }}
                      viewport={{ once: true }}
                      className={`flex cursor-default items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-transform hover:scale-105 ${trait.color}`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{trait.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 border-t border-border/60 pt-6">
              <div className="flex items-start gap-3.5 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-purple-500/5 to-transparent p-4 shadow-sm">
                <div className="mt-0.5 shrink-0 rounded-xl bg-primary/20 p-2 text-primary">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div>
                  <strong className="mb-0.5 block text-sm font-bold text-foreground">
                    Constant Learner &amp; Tech Pioneer
                  </strong>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Continuously evolving with cutting-edge AI frameworks,
                    distributed architectures, and modern web design systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </section>
  );
}
