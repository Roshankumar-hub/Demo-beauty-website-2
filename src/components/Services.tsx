import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "../data/content";
import { EASE, Reveal, SectionHeading } from "./ui/Motion";
import MagneticButton, { scrollToId } from "./ui/MagneticButton";

function ServiceCard({ s, i }: { s: (typeof SERVICES)[number]; i: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: (i % 4) * 0.1, ease: EASE }}
      whileHover={reduce ? {} : { y: -10 }}
      className="group relative aspect-[3/4] overflow-hidden bg-ink-3 min-w-[78vw] sm:min-w-0 snap-center"
      data-cursor
    >
      <img
        src={s.img}
        alt={s.name}
        loading="lazy"
        className="img-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-gold/25 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="absolute inset-0 border border-cream/0 transition-colors duration-700 group-hover:border-gold/30" />

      <div className="absolute top-5 left-5 text-[0.6rem] tracking-[0.3em] text-cream/60">0{i + 1}</div>

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 translate-y-10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
        <div className="text-[0.62rem] tracking-[0.3em] uppercase text-gold mb-2">Starting from {s.price}</div>
        <h3 className="font-serif text-2xl md:text-[1.75rem] text-cream leading-tight">{s.name}</h3>
        <p className="mt-3 text-sm text-cream/70 leading-relaxed opacity-0 transition-opacity duration-700 delay-100 group-hover:opacity-100 line-clamp-2">
          {s.desc}
        </p>
        <button
          onClick={() => scrollToId("#booking")}
          className="mt-5 inline-flex items-center gap-2 text-[0.65rem] tracking-[0.3em] uppercase text-cream border-b border-gold/60 pb-1 opacity-0 translate-y-3 transition-all duration-700 delay-150 group-hover:opacity-100 group-hover:translate-y-0 hover:text-gold"
        >
          Book Now <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-36 bg-ink-2">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-[36rem] w-[36rem] rounded-full blur-[160px] bg-gold/[0.06]" />
      </div>
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading eyebrow="What We Offer" title="Our Signature Services" subtitle="Designed to make you feel your absolute best." />

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 sm:overflow-visible">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.name} s={s} i={i} />
          ))}
        </div>

        <Reveal className="mt-14 text-center" delay={0.2}>
          <MagneticButton href="#packages" variant="outline">
            View All Services
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
