import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { PACKAGES } from "../data/content";
import { EASE, SectionHeading } from "./ui/Motion";
import MagneticButton from "./ui/MagneticButton";

export default function Packages() {
  const reduce = useReducedMotion();
  return (
    <section id="packages" className="relative py-24 md:py-36 bg-ink overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full blur-[180px] bg-gold/[0.07]" />
      <div className="mx-auto max-w-[1300px] px-5 md:px-10">
        <SectionHeading eyebrow="Curated Rituals" title="Signature Packages" subtitle="Thoughtfully bundled experiences — crafted for value, designed for indulgence." />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
          {PACKAGES.map((p, i) => (
            <motion.article
              key={p.name}
              initial={reduce ? false : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
              whileHover={reduce ? {} : { y: -10 }}
              className={`group relative flex flex-col p-8 md:p-10 transition-shadow duration-700 ${
                p.popular
                  ? "glow-border bg-gradient-to-b from-ink-3 to-ink-2 md:-my-6 md:py-16 shadow-[0_30px_90px_rgba(201,169,110,0.15)]"
                  : "border border-cream/10 bg-ink-2/60 hover:border-gold/30"
              }`}
              data-cursor
            >
              {p.popular && (
                <>
                  <div className="absolute -top-px inset-x-10 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                  <div className="absolute top-5 right-5 md:top-6 md:right-6 bg-gold text-ink px-3 py-1.5 text-[0.58rem] tracking-[0.3em] uppercase font-medium">
                    Most Popular
                  </div>
                  <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(201,169,110,0.12), transparent 60%)" }}
                  />
                </>
              )}
              <div className="text-[0.62rem] tracking-[0.35em] uppercase text-gold">{p.name}</div>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-serif text-5xl md:text-6xl text-cream">{p.price}</span>
                <span className="text-xs text-muted">/ session</span>
              </div>
              <div className="my-8 h-px w-full bg-gradient-to-r from-gold/40 to-transparent" />
              <ul className="space-y-4 flex-1">
                {p.items.map((it) => (
                  <li key={it} className="flex items-center gap-3 text-sm text-cream/80">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gold/50 text-gold">
                      <Check className="h-3 w-3" />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <MagneticButton href="#booking" variant={p.popular ? "solid" : "outline"} className="w-full">
                  Book Package
                </MagneticButton>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
