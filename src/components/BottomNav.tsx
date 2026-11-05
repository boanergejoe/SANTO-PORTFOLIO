import { useEffect, useState } from "react";
import { BriefcaseBusiness, GraduationCap, House, Mail, MessageSquare, Send, UserRound } from "lucide-react";
import { site } from "../data/portfolio";

const items = [
  ["Home", "#hero", House],
  ["About", "#about", UserRound],
  ["Career", "#career", BriefcaseBusiness],
  ["Projects", "#projects", MessageSquare],
  ["Education", "#education", GraduationCap],
  ["Contact", "#contact", Mail],
  ["Connect", `mailto:${site.email}`, Send],
] as const;

export function BottomNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 380);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <nav className={`bottom-nav ${visible ? "bottom-nav-visible" : ""}`} aria-label="Quick navigation" aria-hidden={!visible}>
      {items.map(([label, href, Icon]) => (
        <a key={label} href={href} aria-label={label} title={label} tabIndex={visible ? 0 : -1}><Icon size={21} strokeWidth={2.2} /></a>
      ))}
    </nav>
  );
}
