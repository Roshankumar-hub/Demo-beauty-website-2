import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/content";
import { scrollToId } from "./ui/MagneticButton";
import { EASE } from "./ui/Motion";
import { InstagramIcon as Instagram, FacebookIcon as Facebook } from "./ui/Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(href), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 2.4 }}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 ${
          scrolled ? "bg-ink/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] border-b border-cream/5" : "bg-transparent"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-[1500px] items-center justify-between px-5 md:px-10 transition-all duration-700 ${
            scrolled ? "py-3.5" : "py-6 md:py-8"
          }`}
          aria-label="Primary"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("#home");
            }}
            className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.22em] text-cream"
          >
            DEMO <span className="text-gold">LUXE</span> BEAUTY
          </a>

          <ul className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  className={`group relative text-[0.7rem] tracking-[0.28em] uppercase transition-colors duration-500 ${
                    active === l.href ? "text-gold" : "text-cream/75 hover:text-cream"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-500 ${
                      active === l.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                go("#booking");
              }}
              className="btn-luxe hidden sm:inline-flex border border-gold/60 px-6 py-3 text-[0.68rem] tracking-[0.3em] uppercase text-cream"
            >
              Book Now
            </a>
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="lg:hidden relative flex h-11 w-11 items-center justify-center"
            >
              <span className={`absolute h-px w-6 bg-cream transition-all duration-500 ${open ? "rotate-45" : "-translate-y-2"}`} />
              <span className={`absolute h-px w-6 bg-cream transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`absolute h-px w-6 bg-cream transition-all duration-500 ${open ? "-rotate-45" : "translate-y-2"}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] bg-ink/95 backdrop-blur-2xl lg:hidden flex flex-col"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex-1 flex flex-col justify-center px-8 pt-24">
              <ul className="space-y-2">
                {NAV_LINKS.map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.a
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(l.href);
                      }}
                      className="flex items-baseline gap-4 py-2 font-serif text-4xl sm:text-5xl text-cream"
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.06, duration: 0.7, ease: EASE }}
                    >
                      <span className="text-xs text-gold font-sans tracking-widest">0{i + 1}</span>
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-10"
              >
                <button onClick={() => go("#booking")} className="btn-solid w-full py-4 text-[0.72rem] tracking-[0.3em] uppercase font-medium">
                  Book Now
                </button>
                <div className="mt-8 flex items-center gap-6 text-cream/60">
                  <Instagram className="h-5 w-5" />
                  <Facebook className="h-5 w-5" />
                  <span className="text-xs tracking-widest">@demoluxebeauty</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
