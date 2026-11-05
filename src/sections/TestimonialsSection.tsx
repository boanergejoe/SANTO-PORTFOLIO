import { motion } from "framer-motion";
import { testimonials } from "../data/portfolio";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
          Client{" "}
          <span className="text-gradient-primary">Testimonials</span>
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Feedback from talented leaders I&apos;ve had the pleasure of partnering
          with throughout my career.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="glass-panel group relative flex flex-col overflow-hidden rounded-3xl border border-foreground/10 p-8 transition-colors duration-500 hover:border-primary/30"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-[40px] transition-colors duration-500 group-hover:bg-primary/20" />

            <div className="absolute right-8 top-6 select-none text-primary/10">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M10 11l-2 2v-3H4V4h6v7zm10 0l-2 2v-3h-4V4h6v7z" />
              </svg>
            </div>

            <p className="relative z-10 mb-8 flex-grow italic leading-relaxed text-muted-foreground">
              &quot;{testimonial.content}&quot;
            </p>

            <div className="relative z-10 mt-auto flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                loading="lazy"
                decoding="async"
                className="h-12 w-12 rounded-full border border-foreground/10 object-cover"
              />
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  {testimonial.name}
                </h4>
                <p className="text-xs font-medium text-primary">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
