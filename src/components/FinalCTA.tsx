import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMAGES } from "../data/content";
import { Reveal, SplitText } from "./ui/Motion";
import MagneticButton from "./ui/MagneticButton";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-48 min-h-[90svh] flex items-center justify-center text-center">
      <motion.div className="absolute inset-[-15%]" style={reduce ? {} : { y }}>
        <img src={IMAGES.cta} alt="Elegant beauty portrait" loading="lazy" className="img-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(11,10,9,0.7) 100%)" }} />

      <div className="relative mx-auto max-w-4xl px-5">
        <Reveal y={16}>
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="gold-line" />
            <span className="eyebrow">Begin Your Journey</span>
            <span className="gold-line rotate-180" />
          </div>
        </Reveal>
        <h2 className="font-serif font-light leading-[0.95] text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] text-cream">
          <SplitText text="YOUR BEST LOOK" className="block" />
          <SplitText text="STARTS HERE." className="block italic text-gradient-gold" delay={0.25} />
        </h2>
        <Reveal delay={0.4}>
          <p className="mx-auto mt-8 max-w-md text-base md:text-lg text-cream/75">Step into a beauty experience created just for you.</p>
        </Reveal>
        <Reveal delay={0.55}>
          <div className="mt-12">
            <MagneticButton href="#booking" className="px-10">
              Book Your Appointment
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
