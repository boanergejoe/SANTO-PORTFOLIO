import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { site } from "../data/portfolio";

const inputClasses =
  "flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-base ring-offset-background/30 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50 dark:border-gray-800";

const contactItems = [
  {
    icon: Mail,
    label: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    label: site.phone,
    href: `tel:${site.phone.replace(/[^\d+]/g, "")}`,
  },
  {
    icon: MapPin,
    label: site.location,
    href: "https://maps.google.com/?q=Kigali,+Rwanda",
  },
];

export function ContactSection() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel relative overflow-hidden rounded-[3rem] border border-foreground/10 p-8 md:p-12"
      >
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative z-10 flex flex-col gap-12 md:flex-row md:gap-24">
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Let&apos;s{" "}
                <span className="text-gradient-primary">Connect</span>
              </h2>
              <p className="text-muted-foreground">
                Currently open for new opportunities and exciting collaborations.
                Whether you have a question or just want to say hi, I&apos;ll try my
                best to get back to you!
              </p>
            </div>

            <div className="space-y-6">
              {contactItems.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center gap-4 text-muted-foreground transition-colors hover:text-primary"
                >
                  <div className="glass-panel flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="glass-panel relative flex-1 rounded-[2rem] border border-foreground/10 p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-sm font-medium text-muted-foreground"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={inputClasses}
                  placeholder=" "
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-sm font-medium text-muted-foreground"
                >
                  Your Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClasses}
                  placeholder=" "
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-medium text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  className={`${inputClasses} min-h-[120px] resize-none`}
                  placeholder="How can I help you?"
                />
              </div>

              <button
                type="submit"
                className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              >
                Send Message
                <Send className="ml-1 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
