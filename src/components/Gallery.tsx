import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { GALLERY, GALLERY_CATS, type GalleryCat } from "../data/content";
import { EASE, SectionHeading } from "./ui/Motion";

export default function Gallery() {
  const [cat, setCat] = useState<GalleryCat>("ALL");
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const items = cat === "ALL" ? GALLERY : GALLERY.filter((g) => g.cat === cat);

  const idx = open === null ? -1 : items.findIndex((g) => g.id === open);
  const next = useCallback(() => {
    if (idx < 0) return;
    setOpen(items[(idx + 1) % items.length].id);
  }, [idx, items]);
  const prev = useCallback(() => {
    if (idx < 0) return;
    setOpen(items[(idx - 1 + items.length) % items.length].id);
  }, [idx, items]);

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [open, next, prev]);

  const current = items[idx];

  return (
    <section id="gallery" className="relative py-24 md:py-36 bg-ink-2">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading eyebrow="Portfolio" title="The Luxe Gallery" subtitle="A curated glimpse into the artistry that happens inside our studio." />

        {/* Filters */}
        <LayoutGroup>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
            {GALLERY_CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`relative px-4 py-2.5 text-[0.65rem] tracking-[0.3em] uppercase transition-colors duration-500 ${
                  cat === c ? "text-ink" : "text-cream/60 hover:text-cream"
                }`}
              >
                {cat === c && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 bg-cream" transition={{ duration: 0.5, ease: EASE }} />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>

        {/* Masonry */}
        <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          <AnimatePresence mode="popLayout">
            {items.map((g) => (
              <motion.button
                layout
                key={g.id}
                onClick={() => setOpen(g.id)}
                initial={reduce ? false : { opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.6, ease: EASE }}
                className={`group relative mb-4 block w-full overflow-hidden break-inside-avoid bg-ink-3 ${g.tall ? "aspect-[3/4]" : "aspect-square"}`}
                aria-label={`View ${g.cat.toLowerCase()} work`}
                data-cursor
              >
                <img
                  src={g.img}
                  alt={`${g.cat} work`}
                  loading="lazy"
                  className="img-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/60 text-cream">
                    <Eye className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-[0.6rem] tracking-[0.35em] uppercase text-gold">{g.cat}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[160] flex items-center justify-center bg-ink/95 backdrop-blur-xl p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal
          >
            <button className="absolute top-5 right-5 md:top-8 md:right-8 flex h-12 w-12 items-center justify-center rounded-full glass text-cream hover:text-gold" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full glass text-cream hover:text-gold"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full glass text-cream hover:text-gold"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.id}
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={current.img} alt={current.cat} className="max-h-[80vh] max-w-[90vw] object-contain shadow-[0_40px_120px_rgba(0,0,0,0.8)]" />
                <figcaption className="absolute -bottom-10 left-0 flex items-center gap-3 text-[0.62rem] tracking-[0.35em] uppercase text-cream/70">
                  <span className="gold-line" /> {current.cat} — {idx + 1} / {items.length}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
