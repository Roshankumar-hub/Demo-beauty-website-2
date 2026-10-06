import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
  target?: string;
};

export function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
  type = "button",
  target,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current || window.matchMedia("(pointer: coarse)").matches) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "inline-flex items-center justify-center gap-3 px-8 py-4 text-[0.72rem] tracking-[0.3em] uppercase font-medium select-none min-h-[52px]";
  const styles =
    variant === "solid"
      ? "btn-solid"
      : variant === "outline"
      ? "btn-luxe border border-cream/40 text-cream hover:border-cream"
      : "text-cream/80 hover:text-gold transition-colors";

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      scrollToId(href);
    }
    onClick?.();
  };

  const inner = href ? (
    <a href={href} onClick={handleClick} target={target} rel={target ? "noreferrer" : undefined} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  ) : (
    <button type={type} onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      {inner}
    </motion.div>
  );
}
