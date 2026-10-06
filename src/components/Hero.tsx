import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { IMAGES } from "../data/content";
import MagneticButton, { scrollToId } from "./ui/MagneticButton";
import { EASE } from "./ui/Motion";

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const lines = ["BEAUTY,", "REDEFINED."];
  const d = 0.1;

  return (
    <section id="home" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <motion.img
          src={IMAGES.hero}
          alt="Luxury beauty portrait"
          className="img-cover"
          initial={reduce ? false : { scale: 1.3, filter: "brightness(0.4)" }}
          animate={ready ? { scale: 1.05, filter: "brightness(0.85)" } : {}}
          transition={{ duration: 2.4, ease: EASE }}
          fetchPriority="high"
        />
        {!reduce && (
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1.05, 1.12, 1.05] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />

      {/* Floating decor */}
      {!reduce && (
        <>
          <motion.div
            className="absolute -top-20 right-[10%] h-[32rem] w-[32rem] rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(201,169,110,0.22), transparent 60%)" }}
            animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[10%] left-[5%] h-80 w-80 rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(217,166,160,0.18), transparent 60%)" }}
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[8%] top-[28%] hidden md:block h-56 w-56 rounded-full border border-gold/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-gold" />
          </motion.div>
          <motion.div
            className="absolute right-[14%] top-[36%] hidden md:block h-28 w-28 rounded-full border border-cream/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-end px-5 pb-28 md:px-10 md:pb-32 lg:justify-center lg:pb-0"
      >
        <motion.div
          className="mb-6 flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={ready ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: d, ease: EASE }}
        >
          <span className="gold-line" />
          <span className="eyebrow">Premium Beauty Studio</span>
        </motion.div>

        <h1 className="font-serif font-light leading-[0.92] tracking-[-0.015em] text-[17vw] sm:text-[13vw] lg:text-[9.5rem] xl:text-[11rem] text-cream">
          {lines.map((line, li) => (
            <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <motion.span
                className={`block ${li === 1 ? "italic text-gradient-gold pl-[0.08em]" : ""}`}
                initial={reduce ? false : { y: "105%", rotate: 1.5 }}
                animate={ready ? { y: 0, rotate: 0 } : {}}
                transition={{ duration: 1.2, delay: d + 0.15 + li * 0.15, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-7 max-w-md text-base md:text-lg text-cream/75 font-light leading-relaxed"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: d + 0.6, ease: EASE }}
        >
          Where beauty meets artistry, confidence and luxury.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: d + 0.8, ease: EASE }}
        >
          <MagneticButton href="#booking">Book an Appointment</MagneticButton>
          <MagneticButton href="#services" variant="outline">
            Explore Services
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToId("#about")}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-cream/60 hover:text-gold transition-colors"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: d + 1.4, duration: 1 }}
        aria-label="Scroll to explore"
      >
        <span className="text-[0.6rem] tracking-[0.4em] uppercase">Scroll to explore</span>
        <span className="relative h-10 w-px bg-cream/20 overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold"
            animate={reduce ? {} : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.button>

      {/* Side label */}
      <motion.div
        className="absolute right-6 md:right-10 bottom-10 z-10 hidden md:flex items-center gap-3 [writing-mode:vertical-rl] rotate-180 text-[0.6rem] tracking-[0.4em] uppercase text-cream/40"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: d + 1.5, duration: 1 }}
      >
        Bengaluru — Est. 2016
      </motion.div>
    </section>
  );
}
