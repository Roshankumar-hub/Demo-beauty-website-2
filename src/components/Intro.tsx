import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IMAGES, STATS } from "../data/content";
import { ImageReveal, Reveal, SplitText } from "./ui/Motion";
import MagneticButton from "./ui/MagneticButton";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      setN(Math.round(e * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 80]);

  return (
    <section id="about" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div ref={ref} className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-10 items-center">
        {/* Text */}
        <div className="lg:col-span-6 lg:pr-10">
          <Reveal y={16}>
            <div className="flex items-center gap-3 mb-6">
              <span className="gold-line" />
              <span className="eyebrow">The Art of Beauty</span>
            </div>
          </Reveal>
          <SplitText
            as="h2"
            text="More than a beauty appointment. It's an experience designed around you."
            className="font-serif font-light text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4.2rem] leading-[1.05] text-cream"
            stagger={0.04}
          />
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-lg text-muted leading-relaxed text-base md:text-lg">
              At Demo Luxe Beauty, every visit begins with a conversation. Our expert artists study your features,
              lifestyle and aspirations before curating a personalised ritual — using only premium, dermatologically
              trusted products in a space designed for calm.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10">
              <MagneticButton href="#services" variant="outline">
                Discover the Studio
              </MagneticButton>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:mt-20">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i} y={24}>
                <div className="border-l border-gold/30 pl-4">
                  <div className="font-serif text-4xl md:text-5xl text-cream">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-[0.62rem] tracking-[0.25em] uppercase text-muted">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="relative lg:col-span-6 h-[520px] sm:h-[620px] lg:h-[760px]">
          <motion.div style={{ y: reduce ? 0 : y1 }} className="absolute right-0 top-0 w-[72%] h-[80%]">
            <ImageReveal src={IMAGES.intro} alt="Elegant woman in studio" className="h-full w-full" direction="up" />
            <div className="glow-border pointer-events-none absolute -inset-4 border border-gold/10" />
          </motion.div>
          <motion.div style={{ y: reduce ? 0 : y2 }} className="absolute left-0 bottom-0 w-[52%] h-[42%] shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
            <ImageReveal src={IMAGES.introSmall} alt="Studio interior" className="h-full w-full" direction="left" delay={0.2} />
          </motion.div>
          <motion.div
            className="absolute -left-2 top-[18%] hidden sm:flex glass px-5 py-4 items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.9 }}
          >
            <span className="font-serif text-3xl text-gold">★</span>
            <div>
              <div className="font-serif text-xl text-cream leading-none">4.9 / 5</div>
              <div className="text-[0.6rem] tracking-[0.25em] uppercase text-muted mt-1">1,200+ Reviews</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
