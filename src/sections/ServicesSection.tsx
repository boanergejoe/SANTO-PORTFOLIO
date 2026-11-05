import { motion } from "framer-motion";
import { GradientBorderCard } from "../components/GradientBorderCard";
import { services } from "../data/portfolio";

export function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-gradient-primary mb-4 text-3xl font-bold tracking-tight md:text-5xl">
          What I Do
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Delivering comprehensive digital solutions that cover the entire lifecycle
          of professional product engineering.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <GradientBorderCard
                className="h-full rounded-[2rem] border border-border/80 bg-card/80 p-8"
                gradientSize={280}
                gradientColor="rgba(139, 92, 246, 0.12)"
                gradientFrom="#8b5cf6"
                gradientTo="#38bdf8"
              >
                <div className="flex h-full flex-col justify-between gap-6">
                  <div>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40 group-hover:bg-primary/20">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </GradientBorderCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
