import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { IMAGES, whatsappLink } from "../data/content";
import { ImageReveal, Reveal, SectionHeading } from "./ui/Motion";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./ui/Icons";

const ITEMS = [
  { icon: MapPin, t: "Location", lines: ["24 Luxury Avenue, Bengaluru"], href: "https://maps.google.com/?q=Bengaluru" },
  { icon: Phone, t: "Phone", lines: ["+91 98765 43210"], href: "tel:+919876543210" },
  { icon: Mail, t: "Email", lines: ["hello@demoluxebeauty.in"], href: "mailto:hello@demoluxebeauty.in" },
  { icon: Clock, t: "Opening Hours", lines: ["Mon – Sat · 9:00 AM – 8:00 PM", "Sunday · 10:00 AM – 6:00 PM"] },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-36 bg-ink-2">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading eyebrow="Visit Us" title="Find the Studio" subtitle="Nestled in the heart of Bengaluru — a quiet sanctuary away from the city's pace." align="left" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ul className="divide-y divide-cream/10">
              {ITEMS.map((it, i) => (
                <li key={it.t}>
                  <Reveal delay={i * 0.08} y={24}>
                    <div className="group flex gap-6 py-7">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink">
                        <it.icon className="h-4.5 w-4.5" />
                      </span>
                      <div>
                        <div className="text-[0.6rem] tracking-[0.3em] uppercase text-muted">{it.t}</div>
                        {it.lines.map((l) =>
                          it.href ? (
                            <a key={l} href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="mt-1.5 block font-serif text-xl md:text-2xl text-cream hover:text-gold transition-colors">
                              {l}
                            </a>
                          ) : (
                            <div key={l} className="mt-1.5 font-serif text-xl md:text-2xl text-cream">{l}</div>
                          )
                        )}
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal delay={0.3}>
              <div className="mt-8 flex items-center gap-4">
                {[
                  { I: InstagramIcon, href: "https://instagram.com/demoluxebeauty", l: "Instagram" },
                  { I: WhatsAppIcon, href: whatsappLink("Hello Demo Luxe Beauty!"), l: "WhatsApp" },
                  { I: FacebookIcon, href: "https://facebook.com", l: "Facebook" },
                ].map(({ I, href, l }) => (
                  <a key={l} href={href} target="_blank" rel="noreferrer" aria-label={l} className="flex h-12 w-12 items-center justify-center rounded-full glass text-cream transition-all duration-500 hover:bg-cream hover:text-ink">
                    <I className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="relative h-[380px] md:h-full md:min-h-[520px]">
              <ImageReveal src={IMAGES.map} alt="Studio location" className="h-full w-full" imgClassName="grayscale brightness-[0.45] contrast-110" direction="right" />
              {/* Map grid overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{ backgroundImage: "linear-gradient(rgba(243,235,223,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(243,235,223,0.12) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="relative flex h-5 w-5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                  <span className="relative inline-flex h-5 w-5 rounded-full bg-gold border-2 border-ink" />
                </span>
                <div className="mt-4 glass px-5 py-3 text-center">
                  <div className="font-serif text-lg text-cream leading-none">Demo Luxe Beauty</div>
                  <div className="mt-1 text-[0.58rem] tracking-[0.25em] uppercase text-gold">24 Luxury Avenue</div>
                </div>
              </div>
              <a href="https://maps.google.com/?q=Bengaluru" target="_blank" rel="noreferrer" className="absolute bottom-5 right-5 glass px-4 py-2.5 text-[0.6rem] tracking-[0.3em] uppercase text-cream hover:text-gold transition-colors">
                Open in Maps ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
