import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMAGES } from "../data/content";
import { EASE, Reveal, SplitText } from "./ui/Motion";

const CARDS = [
  { n: "01", t: "Personalized", d: "Beauty experiences designed around you." },
  { n: "02", t: "Expert Artists", d: "Professionals who understand your style." },
  { n: "03", t: "Premium Care", d: "Quality products and exceptional attention to detail." },
];

export default function Featured() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-44 min-h-[100svh] flex items-center">
      <motion.div className="absolute inset-[-10%]" style={reduce ? {} : { y, scale }}>
        <img src={IMAGES.featured} alt="Cinematic beauty portrait" loading="lazy" className="img-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="max-w-2xl">
          <Reveal y={16}>
            <div className="flex items-center gap-3 mb-6">
              <span className="gold-line" />
              <span className="eyebrow">The Experience</span>
            </div>
          </Reveal>
          <h2 className="font-serif font-light leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-cream">
            <SplitText text="YOUR BEAUTY." className="block" />
            <SplitText text="YOUR MOMENT." className="block italic text-gradient-gold" delay={0.25} />
          </h2>
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-md text-base md:text-lg text-cream/75 leading-relaxed">
              Every appointment is thoughtfully designed around your style, personality and confidence.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.n}
              initial={reduce ? false : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: EASE }}
              whileHover={reduce ? {} : { y: -8 }}
              className="glass glow-border relative p-7 md:p-9 group"
              style={{ marginTop: i === 1 ? undefined : 0 }}
            >
              <motion.div
                className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60"
                animate={reduce ? {} : { opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, delay: i }}
              />
              <div className="flex items-center gap-4 text-gold">
                <span className="font-serif text-2xl">{c.n}</span>
                <span className="h-px w-8 bg-gold/50" />
                <span className="text-[0.65rem] tracking-[0.35em] uppercase">{c.t}</span>
              </div>
              <p className="mt-5 font-serif text-2xl md:text-[1.65rem] leading-snug text-cream">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
