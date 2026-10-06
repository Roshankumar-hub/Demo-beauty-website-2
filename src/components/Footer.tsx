import { NAV_LINKS, whatsappLink } from "../data/content";
import { scrollToId } from "./ui/MagneticButton";
import { Reveal } from "./ui/Motion";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./ui/Icons";

export default function Footer() {
  return (
    <footer className="relative bg-ink border-t border-cream/5 pt-20 pb-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <span className="font-serif text-[18vw] leading-none text-cream/[0.025] select-none whitespace-nowrap translate-y-[30%]">LUXE</span>
      </div>
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToId("#home"); }} className="font-serif text-2xl md:text-3xl tracking-[0.22em] text-cream">
              DEMO <span className="text-gold">LUXE</span> BEAUTY
            </a>
            <p className="mt-5 max-w-sm text-muted leading-relaxed">Beauty, confidence and artistry — redefined.</p>
            <div className="mt-8 flex items-center gap-3">
              {[
                { I: InstagramIcon, href: "https://instagram.com/demoluxebeauty", l: "Instagram" },
                { I: FacebookIcon, href: "https://facebook.com", l: "Facebook" },
                { I: WhatsAppIcon, href: whatsappLink("Hello Demo Luxe Beauty!"), l: "WhatsApp" },
              ].map(({ I, href, l }) => (
                <a key={l} href={href} target="_blank" rel="noreferrer" aria-label={l} className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all duration-500 hover:border-gold hover:text-gold hover:-translate-y-1">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal className="md:col-span-3" delay={0.1}>
            <div className="eyebrow mb-6">Navigate</div>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => { e.preventDefault(); scrollToId(l.href); }} className="group inline-flex items-center gap-3 text-sm text-cream/70 hover:text-cream transition-colors">
                    <span className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-5" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="md:col-span-4" delay={0.2}>
            <div className="eyebrow mb-6">Studio</div>
            <div className="space-y-4 text-sm text-cream/70">
              <p>24 Luxury Avenue,<br />Bengaluru, Karnataka</p>
              <p><a href="tel:+919876543210" className="hover:text-gold transition-colors">+91 98765 43210</a></p>
              <p><a href="mailto:hello@demoluxebeauty.in" className="hover:text-gold transition-colors">hello@demoluxebeauty.in</a></p>
              <p className="text-muted">Mon – Sat · 9 AM – 8 PM<br />Sun · 10 AM – 6 PM</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-[0.62rem] tracking-[0.2em] uppercase text-muted md:flex-row">
          <p>© 2026 Demo Luxe Beauty. All Rights Reserved.</p>
          <p className="flex items-center gap-6">
            <a href="#" className="hover:text-cream transition-colors">Privacy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms</a>
            <span className="text-cream/30">Demo Website</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
