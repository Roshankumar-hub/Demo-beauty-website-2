import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { TESTIMONIALS } from "../data/content";
import { EASE, Reveal, SectionHeading } from "./ui/Motion";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = (d: number) => {
    setDir(d);
    setI((p) => (p + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 5500);
    return () => clearInterval(t);
  }, [paused]);

  const t = TESTIMONIALS[i];

  return (
    <section className="relative py-24 md:py-36 bg-ink overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 font-serif text-[22rem] md:text-[34rem] leading-none text-gold/[0.04] select-none">
        &rdquo;
      </div>
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <SectionHeading eyebrow="Testimonials" title="What Our Clients Say" />

        <Reveal>
          <div
            className="relative min-h-[320px] md:min-h-[300px] text-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={i}
                custom={dir}
                initial={reduce ? false : { opacity: 0, x: dir * 50, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -dir * 50, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="mx-auto max-w-3xl"
              >
                <div className="mb-6 flex justify-center gap-1 text-gold text-lg tracking-[0.3em]">★★★★★</div>
                <p className="font-serif text-2xl sm:text-3xl md:text-[2.4rem] leading-[1.3] text-cream font-light italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-8">
                  <div className="text-sm tracking-[0.3em] uppercase text-cream">— {t.name}</div>
                  <div className="mt-1 text-[0.62rem] tracking-[0.25em] uppercase text-muted">{t.role}</div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex items-center justify-center gap-6">
            <button onClick={() => go(-1)} aria-label="Previous testimonial" className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold hover:text-gold">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, k) => (
                <button
                  key={k}
                  onClick={() => {
                    setDir(k > i ? 1 : -1);
                    setI(k);
                  }}
                  aria-label={`Go to testimonial ${k + 1}`}
                  className="relative h-1 overflow-hidden rounded-full bg-cream/15 transition-all duration-500"
                  style={{ width: k === i ? 40 : 12 }}
                >
                  {k === i && (
                    <motion.span
                      key={`${i}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-gold"
                      initial={{ width: "0%" }}
                      animate={{ width: paused ? "100%" : "100%" }}
                      transition={{ duration: paused || reduce ? 0 : 5.5, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next testimonial" className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold hover:text-gold">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
