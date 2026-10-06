import { motion, useReducedMotion } from "framer-motion";
import { ARTISTS } from "../data/content";
import { EASE, SectionHeading } from "./ui/Motion";
import { InstagramIcon } from "./ui/Icons";

export default function Artists() {
  const reduce = useReducedMotion();
  return (
    <section id="artists" className="relative py-24 md:py-36 bg-ink-2 overflow-hidden">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full blur-[160px] bg-rose/[0.06]" />
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading eyebrow="The Team" title="Meet Our Artists" subtitle="Talent, creativity and a passion for beauty." />

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible">
          {ARTISTS.map((a, i) => (
            <motion.article
              key={a.name}
              initial={reduce ? false : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
              className={`group min-w-[75vw] sm:min-w-0 snap-center ${i % 2 === 1 ? "lg:mt-14" : ""}`}
              data-cursor
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-ink-3">
                <img
                  src={a.img}
                  alt={a.name}
                  loading="lazy"
                  className="img-cover grayscale-[30%] transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="absolute inset-0 border border-transparent transition-colors duration-700 group-hover:border-gold/40 m-3" />
                <a
                  href="https://instagram.com/demoluxebeauty"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${a.name} on Instagram`}
                  className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-gold"
                >
                  <InstagramIcon className="h-4.5 w-4.5" />
                </a>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-[0.6rem] tracking-[0.3em] uppercase text-gold">{a.exp}</div>
                </div>
              </div>
              <div className="pt-5 flex items-end justify-between border-b border-cream/10 pb-5 transition-colors duration-500 group-hover:border-gold/40">
                <div>
                  <h3 className="font-serif text-2xl md:text-[1.7rem] text-cream transition-transform duration-500 group-hover:translate-x-2">{a.name}</h3>
                  <p className="mt-1 text-xs tracking-[0.15em] uppercase text-muted">{a.role}</p>
                </div>
                <span className="font-serif text-xl text-gold/50">0{i + 1}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
