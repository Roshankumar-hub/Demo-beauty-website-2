import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Splits text into words that rise up from a clipped mask */
export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  as: Tag = "span",
  inView = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "p";
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: "110%", opacity: 0, rotate: 2 },
    show: { y: "0%", opacity: 1, rotate: 0, transition: { duration: 0.9, ease: EASE } },
  };
  const MTag = motion[Tag];
  return (
    <MTag
      className={className}
      variants={container}
      initial={reduce ? "show" : "hidden"}
      {...(inView ? { whileInView: "show", viewport: { once: true, margin: "-60px" } } : { animate: "show" })}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span className="inline-block" variants={word}>
            {w}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </MTag>
  );
}

/** Image that reveals via clip-path mask + settles from a slight zoom */
export function ImageReveal({
  src,
  alt,
  className = "",
  imgClassName = "",
  delay = 0,
  direction = "up",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const reduce = useReducedMotion();
  const clip =
    direction === "up"
      ? "inset(100% 0 0 0)"
      : direction === "left"
      ? "inset(0 100% 0 0)"
      : "inset(0 0 0 100%)";
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={reduce ? false : { clipPath: clip }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`img-cover ${imgClassName}`}
        initial={reduce ? false : { scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.6, delay, ease: EASE }}
      />
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col ${alignCls} mb-14 md:mb-20`}>
      {eyebrow && (
        <Reveal y={16}>
          <div className="flex items-center gap-3 mb-5">
            <span className="gold-line" />
            <span className="eyebrow">{eyebrow}</span>
            {align === "center" && <span className="gold-line rotate-180" />}
          </div>
        </Reveal>
      )}
      <SplitText
        as="h2"
        text={title}
        className={`font-serif font-light leading-[1.05] tracking-[-0.01em] text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] ${light ? "text-ink" : "text-cream"}`}
      />
      {subtitle && (
        <Reveal delay={0.25} y={20}>
          <p className={`mt-6 max-w-xl text-base md:text-lg font-light ${light ? "text-ink/70" : "text-muted"}`}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
