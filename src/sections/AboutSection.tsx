import { motion } from "framer-motion";
import { heroStats } from "../data/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        className="flex flex-col items-center gap-16 md:flex-row"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
              Passionate about{" "}
              <span className="text-gradient-primary">Digital Excellence</span>
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I am a Software Engineer based in Kigali, Rwanda. Explore my
              portfolio to learn more about my projects, technical skills, and
              background.
            </p>
          </div>
        </div>

        <div className="grid w-full flex-1 grid-cols-2 gap-4">
          {heroStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="glass-panel group relative overflow-hidden rounded-2xl border border-foreground/10 p-6 transition-colors hover:border-primary/50"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-colors group-hover:bg-primary/20" />
                <div className="mb-4 w-max rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-1 text-3xl font-bold text-foreground">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
