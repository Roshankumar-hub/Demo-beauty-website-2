import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { whatsappLink } from "../data/content";
import { EASE } from "./ui/Motion";

/* ---------- PRELOADER ---------- */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1600);
    const t2 = setTimeout(onDone, 2550);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-ink flex items-center justify-center"
      initial={{ clipPath: "inset(0 0 0 0)" }}
      animate={phase === 1 ? { clipPath: "inset(0 0 100% 0)" } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      aria-hidden
    >
      <div className="text-center">
        <motion.div
          className="eyebrow mb-5"
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          Premium Beauty Studio
        </motion.div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-serif font-light text-4xl sm:text-6xl md:text-7xl tracking-[0.08em] text-gradient-gold"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          >
            DEMO LUXE BEAUTY
          </motion.h1>
        </div>
        <motion.div
          className="mx-auto mt-8 h-px w-40 bg-gold/30 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="h-full bg-gold"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.4 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ---------- SCROLL PROGRESS ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[120] origin-left bg-gradient-to-r from-gold via-champagne to-rose"
      style={{ scaleX }}
    />
  );
}

/* ---------- CUSTOM CURSOR + GLOW ---------- */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const gx = useSpring(x, { stiffness: 60, damping: 20 });
  const gy = useSpring(y, { stiffness: 60, damping: 20 });
  const rx = useSpring(x, { stiffness: 400, damping: 30 });
  const ry = useSpring(y, { stiffness: 400, damping: 30 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[data-cursor]"));
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("custom-cursor");
    };
  }, [reduce, x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[5] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: gx,
          y: gy,
          background: "radial-gradient(circle, rgba(201,169,110,0.10) 0%, rgba(201,169,110,0) 65%)",
        }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[150] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/70 mix-blend-difference"
        style={{ x: rx, y: ry }}
        animate={{ width: hover ? 48 : 28, height: hover ? 48 : 28, backgroundColor: hover ? "rgba(243,235,223,0.15)" : "rgba(243,235,223,0)" }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[150] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
        style={{ x, y }}
      />
    </>
  );
}

/* ---------- FLOATING BUTTONS ---------- */
export function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <motion.a
        href={whatsappLink("Hello Demo Luxe Beauty! I'd like to book an appointment.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-5 md:right-8 z-[110] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_40px_rgba(37,211,102,0.35)]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.6, ease: EASE }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <MessageCircle className="relative h-6 w-6" />
      </motion.a>
      <AnimatePresence>
        {show && (
          <motion.button
            key="top"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-5 md:right-8 z-[110] flex h-12 w-12 items-center justify-center rounded-full glass text-cream hover:text-gold"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.45, ease: EASE }}
            whileHover={{ y: -4 }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
