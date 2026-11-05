import { useEffect, useRef } from "react";
import { cn } from "../lib/cn";

interface MorphingTextProps {
  texts: string[];
  className?: string;
  morphTime?: number;
  cooldownTime?: number;
}

export function MorphingText({
  texts,
  className,
  morphTime = 1.5,
  cooldownTime = 0.6,
}: MorphingTextProps) {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!texts.length) return;

    let frame = 0;
    let lastTime = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let index = 0;

    const text1 = text1Ref.current;
    const text2 = text2Ref.current;
    if (!text1 || !text2) return;

    text1.textContent = texts[index % texts.length];
    text2.textContent = texts[(index + 1) % texts.length];

    const setMorph = (fraction: number) => {
      text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const inverse = 1 - fraction;
      text1.style.filter = `blur(${Math.min(8 / inverse - 8, 100)}px)`;
      text1.style.opacity = `${Math.pow(inverse, 0.4) * 100}%`;
    };

    const doCooldown = () => {
      morph = 0;
      text1.style.filter = "";
      text1.style.opacity = "0%";
      text2.style.filter = "";
      text2.style.opacity = "100%";
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    const animate = () => {
      frame = requestAnimationFrame(animate);

      const now = new Date();
      const shouldIncrementIndex = morph >= morphTime;
      const delta = (now.getTime() - lastTime.getTime()) / 1000;
      lastTime = now;
      cooldown -= delta;

      if (cooldown <= 0) {
        doMorph();
      } else {
        doCooldown();
      }

      if (shouldIncrementIndex) {
        index = (index + 1) % texts.length;
        text1.textContent = texts[index % texts.length];
        text2.textContent = texts[(index + 1) % texts.length];
        morph = 0;
      }
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, [texts, morphTime, cooldownTime]);

  const longest = texts.reduce((longestText, text) =>
    text.length > longestText.length ? text : longestText,
  );

  return (
    <div
      className={cn(
        "relative inline-flex select-none items-center justify-center font-extrabold tracking-tight",
        className,
      )}
    >
      <span
        ref={text1Ref}
        className="absolute inset-0 flex items-center justify-center text-center transition-all duration-200"
      />
      <span
        ref={text2Ref}
        className="absolute inset-0 flex items-center justify-center text-center transition-all duration-200"
      />
      <span className="pointer-events-none px-2 py-1 opacity-0">{longest}</span>
    </div>
  );
}
