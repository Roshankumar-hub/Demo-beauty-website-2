import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { IMAGES } from "../data/content";
import { Reveal, SectionHeading } from "./ui/Motion";

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(96, Math.max(4, p)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragging(true);
    update(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging) update(e.clientX);
  };
  const stop = () => setDragging(false);

  return (
    <section className="relative py-24 md:py-36 bg-ink">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading eyebrow="Real Results" title="The Transformation" subtitle="See the difference. Feel the confidence." />

        <Reveal>
          <div
            ref={ref}
            className="relative mx-auto aspect-[4/5] sm:aspect-[16/10] max-w-5xl select-none overflow-hidden touch-pan-y"
            style={{ cursor: dragging ? "grabbing" : "ew-resize" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={stop}
            onPointerCancel={stop}
            onPointerLeave={stop}
            data-cursor
            role="slider"
            aria-label="Before and after comparison"
            aria-valuenow={Math.round(pos)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 3));
              if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 3));
            }}
          >
            {/* After (full colour) */}
            <img src={IMAGES.after} alt="After transformation" loading="lazy" className="img-cover absolute inset-0 pointer-events-none" draggable={false} />
            {/* Before (muted) */}
            <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <img
                src={IMAGES.before}
                alt="Before transformation"
                loading="lazy"
                className="img-cover"
                style={{ filter: "grayscale(0.85) brightness(0.72) contrast(0.9) sepia(0.15)" }}
                draggable={false}
              />
            </div>

            {/* Labels */}
            <div className="absolute top-5 left-5 glass px-4 py-2 text-[0.62rem] tracking-[0.35em] uppercase text-cream pointer-events-none">
              Before
            </div>
            <div className="absolute top-5 right-5 bg-gold px-4 py-2 text-[0.62rem] tracking-[0.35em] uppercase text-ink pointer-events-none">
              After
            </div>

            {/* Handle */}
            <div className="absolute inset-y-0 pointer-events-none" style={{ left: `${pos}%` }}>
              <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-cream/90 shadow-[0_0_20px_rgba(201,169,110,0.8)]" />
              <motion.div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full border border-cream/80 bg-ink/60 backdrop-blur-md text-cream"
                animate={reduce ? {} : { boxShadow: ["0 0 0 0 rgba(201,169,110,0.5)", "0 0 0 18px rgba(201,169,110,0)"] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>
            <div className="pointer-events-none absolute inset-0 border border-cream/10" />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-[0.65rem] tracking-[0.35em] uppercase text-muted">Drag to compare — Before ← → After</p>
        </Reveal>
      </div>
    </section>
  );
}
