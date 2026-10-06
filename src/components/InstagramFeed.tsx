import { motion, useReducedMotion } from "framer-motion";
import { INSTAGRAM } from "../data/content";
import { EASE, Reveal } from "./ui/Motion";
import MagneticButton from "./ui/MagneticButton";
import { InstagramIcon } from "./ui/Icons";

export default function InstagramFeed() {
  const reduce = useReducedMotion();
  return (
    <section className="relative py-24 md:py-32 bg-ink-2">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 flex flex-col items-center text-center">
          <Reveal y={16}>
            <div className="flex items-center gap-3 mb-5">
              <span className="gold-line" />
              <span className="eyebrow">Instagram</span>
              <span className="gold-line rotate-180" />
            </div>
          </Reveal>
          <Reveal>
            <h2 className="font-serif font-light text-4xl sm:text-5xl md:text-6xl text-cream">Follow the Beauty</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <a href="https://instagram.com/demoluxebeauty" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm tracking-[0.2em] text-gold hover:text-cream transition-colors">
              <InstagramIcon className="h-4 w-4" /> @demoluxebeauty
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 md:gap-3">
          {INSTAGRAM.map((src, i) => (
            <motion.a
              key={src}
              href="https://instagram.com/demoluxebeauty"
              target="_blank"
              rel="noreferrer"
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="group relative aspect-square overflow-hidden bg-ink-3"
              aria-label="View on Instagram"
              data-cursor
            >
              <img src={src} alt="Instagram post" loading="lazy" className="img-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
              <div className="absolute inset-0 bg-ink/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center text-cream opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                <InstagramIcon className="h-7 w-7" />
              </div>
            </motion.a>
          ))}
        </div>

        <Reveal className="mt-12 text-center" delay={0.2}>
          <MagneticButton href="https://instagram.com/demoluxebeauty" target="_blank" variant="outline">
            <InstagramIcon className="h-4 w-4" /> Follow Us on Instagram
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
