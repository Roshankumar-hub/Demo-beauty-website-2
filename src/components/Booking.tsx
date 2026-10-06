import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { SERVICES, whatsappLink } from "../data/content";
import { EASE, Reveal, SplitText } from "./ui/Motion";
import { WhatsAppIcon } from "./ui/Icons";

const TIMES = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"];

const field =
  "w-full bg-transparent border-b border-cream/15 py-3.5 text-cream placeholder:text-muted/70 outline-none transition-colors duration-500 focus:border-gold text-[15px] font-light";
const label = "block text-[0.6rem] tracking-[0.3em] uppercase text-muted mb-1";

export default function Booking() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", date: "", time: "", message: "" });
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  const waMsg = `Hello Demo Luxe Beauty! I'd like to book an appointment.%0A%0AName: ${form.name || "-"}%0AService: ${form.service || "-"}%0ADate: ${form.date || "-"}%0ATime: ${form.time || "-"}%0APhone: ${form.phone || "-"}`;

  return (
    <section id="booking" className="relative py-24 md:py-36 bg-ink overflow-hidden">
      <div className="pointer-events-none absolute -right-32 top-10 h-[34rem] w-[34rem] rounded-full blur-[170px] bg-rose/[0.07]" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-[30rem] w-[30rem] rounded-full blur-[170px] bg-gold/[0.07]" />

      <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal y={16}>
            <div className="flex items-center gap-3 mb-6">
              <span className="gold-line" />
              <span className="eyebrow">Reserve Your Visit</span>
            </div>
          </Reveal>
          <SplitText
            as="h2"
            text="Ready for your next look?"
            className="font-serif font-light text-5xl sm:text-6xl lg:text-7xl leading-[1] text-cream"
          />
          <Reveal delay={0.3}>
            <p className="mt-6 text-lg text-muted">Your beauty transformation starts here.</p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 space-y-6 text-sm text-cream/70">
              {["Complimentary consultation with every first visit", "Confirmation within 2 hours during opening times", "Flexible rescheduling up to 12 hours before"].map((t) => (
                <div key={t} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <Check className="h-3 w-3" />
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <a
              href={whatsappLink(decodeURIComponent(waMsg))}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-3 border border-[#25D366]/50 px-7 py-4 text-[0.7rem] tracking-[0.3em] uppercase text-cream transition-all duration-500 hover:bg-[#25D366] hover:text-ink hover:border-[#25D366]"
            >
              <WhatsAppIcon className="h-4.5 w-4.5" /> Book via WhatsApp
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.2}>
            <div className="glass glow-border relative p-7 sm:p-10 md:p-12">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="flex min-h-[460px] flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      className="flex h-20 w-20 items-center justify-center rounded-full border border-gold text-gold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
                    >
                      <motion.svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <motion.path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.6 }} />
                      </motion.svg>
                    </motion.div>
                    <motion.h3 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }} className="mt-8 font-serif text-3xl sm:text-4xl text-cream leading-tight">
                      Your appointment request<br className="hidden sm:block" /> has been received.
                    </motion.h3>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-4 max-w-sm text-sm text-muted">
                      Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}. Our concierge will confirm your {form.service || "appointment"} shortly.
                    </motion.p>
                    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} onClick={() => setDone(false)} className="mt-8 text-[0.62rem] tracking-[0.3em] uppercase text-gold border-b border-gold/40 pb-1">
                      Make another request
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <div>
                      <label className={label} htmlFor="b-name">Full Name</label>
                      <input id="b-name" required className={field} placeholder="Your name" value={form.name} onChange={set("name")} />
                    </div>
                    <div>
                      <label className={label} htmlFor="b-phone">Phone Number</label>
                      <input id="b-phone" required type="tel" className={field} placeholder="+91" value={form.phone} onChange={set("phone")} />
                    </div>
                    <div>
                      <label className={label} htmlFor="b-email">Email</label>
                      <input id="b-email" type="email" className={field} placeholder="you@email.com" value={form.email} onChange={set("email")} />
                    </div>
                    <div>
                      <label className={label} htmlFor="b-service">Select Service</label>
                      <select id="b-service" required className={`${field} bg-ink`} value={form.service} onChange={set("service")}>
                        <option value="" disabled>Choose a service</option>
                        {SERVICES.map((s) => (
                          <option key={s.name} value={s.name}>{s.name}</option>
                        ))}
                        <option value="Glow Package">Glow Package</option>
                        <option value="Signature Package">Signature Package</option>
                        <option value="Bridal Package">Bridal Package</option>
                      </select>
                    </div>
                    <div>
                      <label className={label} htmlFor="b-date">Select Date</label>
                      <input id="b-date" required type="date" className={field} value={form.date} onChange={set("date")} />
                    </div>
                    <div>
                      <label className={label} htmlFor="b-time">Select Time</label>
                      <select id="b-time" required className={`${field} bg-ink`} value={form.time} onChange={set("time")}>
                        <option value="" disabled>Choose a time</option>
                        {TIMES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label} htmlFor="b-msg">Message</label>
                      <textarea id="b-msg" rows={3} className={`${field} resize-none`} placeholder="Tell us about the look you have in mind…" value={form.message} onChange={set("message")} />
                    </div>
                    <div className="sm:col-span-2 pt-2">
                      <button type="submit" className="btn-solid w-full py-4.5 text-[0.72rem] tracking-[0.3em] uppercase font-medium min-h-[54px]">
                        Book My Appointment
                      </button>
                      <p className="mt-4 text-center text-[0.62rem] tracking-[0.15em] text-muted">No payment required. We'll confirm by phone or WhatsApp.</p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
