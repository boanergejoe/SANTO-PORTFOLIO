import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { navLinks, site } from "../data/portfolio";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    let previousY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > previousY && currentY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      previousY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    if (lenis) {
      lenis.scrollTo(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const menuVariants = {
    open: {
      clipPath: "circle(1500px at 90% 5%)",
      transition: { type: "spring" as const, stiffness: 20, restDelta: 2 },
    },
    closed: {
      clipPath: "circle(0px at 90% 5%)",
      transition: { type: "spring" as const, stiffness: 400, damping: 40 },
    },
  };

  const listVariants = {
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { y: { stiffness: 1000, velocity: -100 } },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: { y: { stiffness: 1000 } },
    },
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed left-0 right-0 top-6 z-50 flex justify-center px-4"
          >
            <div className="glass-panel flex w-full max-w-7xl items-center justify-between rounded-[2rem] px-6 py-4 shadow-xl">
              <a
                href="#hero"
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo("#hero");
                }}
                className="group flex cursor-pointer select-none items-center gap-3 text-lg font-extrabold"
                aria-label={`${site.name} — go to home`}
              >
                <div className="relative h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-600 via-primary to-sky-400 p-[1px] shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-background">
                    <span className="bg-gradient-to-r from-purple-500 to-sky-400 bg-clip-text text-xs font-extrabold tracking-tighter text-transparent">
                      {site.initials}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-extrabold leading-none tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {site.name}
                  </span>
                  <span className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                    Portfolio
                  </span>
                </div>
              </a>

              <nav className="hidden flex-1 justify-center md:flex" aria-label="Main navigation">
                <ul className="flex space-x-8">
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.name}
                      className="group relative text-sm font-medium text-muted-foreground transition-colors"
                    >
                      <a
                        href={link.href}
                        onClick={(event) => {
                          event.preventDefault();
                          scrollTo(link.href);
                        }}
                        className="cursor-pointer hover:text-foreground"
                      >
                        {link.name}
                      </a>
                      <motion.span
                        className="absolute -bottom-2 left-1/2 h-0.5 w-0 rounded-full bg-primary/80 shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                        initial={{ width: 0, x: "-50%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setMenuOpen(true)}
                  className="p-2 text-foreground transition-colors hover:text-primary md:hidden"
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <motion.button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute right-8 top-8 text-foreground"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.2 }}
              aria-label="Close menu"
            >
              <X size={32} />
            </motion.button>

            <motion.ul
              variants={listVariants}
              className="flex h-full flex-col items-center justify-center space-y-10"
            >
              {navLinks.map((link) => (
                <motion.li key={link.name} variants={itemVariants}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="cursor-pointer text-4xl font-bold text-muted-foreground transition-all hover:tracking-wider hover:text-primary"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
