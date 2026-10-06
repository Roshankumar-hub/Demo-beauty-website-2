export const px = (id: number, w = 1200, h = 800, ext = "jpeg") =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const WHATSAPP_NUMBER = "919876543210";
export const whatsappLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Artists", href: "#artists" },
  { label: "Gallery", href: "#gallery" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
];

export const IMAGES = {
  hero: px(4343180, 1920, 1200),
  intro: px(31588661, 900, 1200),
  introSmall: px(7195809, 700, 500),
  featured: px(32159815, 1920, 1100),
  before: px(14669406, 1000, 1250),
  after: px(14669406, 1000, 1250),
  cta: px(36701535, 1920, 1100),
  map: px(7750114, 1200, 700),
};

export const SERVICES = [
  { name: "Hair Styling", price: "₹999", desc: "Precision cuts, blowouts and editorial styling tailored to your face shape.", img: px(696285, 700, 900) },
  { name: "Hair Coloring", price: "₹1,999", desc: "Balayage, global colour and dimensional highlights with ammonia-free formulas.", img: px(8468125, 700, 900) },
  { name: "Luxury Facial", price: "₹1,499", desc: "Deep-cleansing rituals with botanical actives for luminous, rested skin.", img: px(12115040, 700, 900) },
  { name: "Bridal Makeup", price: "₹4,999", desc: "Flawless, long-wear artistry designed to photograph beautifully all day.", img: px(39334930, 700, 900) },
  { name: "Nail Art", price: "₹799", desc: "Sculpted shapes, gel finishes and hand-painted designs that last.", img: px(34885844, 700, 900) },
  { name: "Eyelash Extensions", price: "₹1,499", desc: "Feather-light classic, hybrid and volume sets for effortless definition.", img: px(5128235, 700, 900) },
  { name: "Hair Spa", price: "₹999", desc: "Restorative scalp therapy and deep conditioning for silk-soft hair.", img: px(23349912, 700, 900) },
  { name: "Skin Treatment", price: "₹1,999", desc: "Advanced peels, hydrafacials and glow therapies by skin specialists.", img: px(8740310, 700, 900) },
];

export const ARTISTS = [
  { name: "Maya Sharma", role: "Senior Hair Artist", exp: "8+ Years Experience", img: px(29852852, 700, 900) },
  { name: "Ananya Rao", role: "Professional Makeup Artist", exp: "6+ Years Experience", img: px(4078809, 700, 900) },
  { name: "Sofia Mehta", role: "Skin Specialist", exp: "7+ Years Experience", img: px(26989515, 700, 900) },
  { name: "Kiara Kapoor", role: "Nail Artist", exp: "5+ Years Experience", img: px(12562546, 700, 900) },
];

export const PACKAGES = [
  { name: "Glow", price: "₹2,999", popular: false, items: ["Luxury Facial", "Hair Spa", "Manicure", "Hair Styling"] },
  { name: "Signature", price: "₹5,999", popular: true, items: ["Premium Facial", "Hair Treatment", "Manicure + Pedicure", "Hair Styling", "Head Massage"] },
  { name: "Bridal", price: "₹9,999", popular: false, items: ["Bridal Makeup", "Hair Styling", "Skin Preparation", "Trial Session", "Nail Styling"] },
];

export type GalleryCat = "ALL" | "HAIR" | "MAKEUP" | "NAILS" | "SKIN" | "BRIDAL";
export const GALLERY_CATS: GalleryCat[] = ["ALL", "HAIR", "MAKEUP", "NAILS", "SKIN", "BRIDAL"];

export const GALLERY = [
  { id: 1, cat: "HAIR", img: px(15868761, 700, 950), tall: true },
  { id: 2, cat: "MAKEUP", img: px(35538643, 700, 700) },
  { id: 3, cat: "NAILS", img: px(34997574, 700, 700) },
  { id: 4, cat: "BRIDAL", img: px(37710473, 700, 950), tall: true },
  { id: 5, cat: "SKIN", img: px(8406612, 700, 700) },
  { id: 6, cat: "HAIR", img: px(6690785, 700, 700) },
  { id: 7, cat: "MAKEUP", img: px(20181205, 700, 950), tall: true },
  { id: 8, cat: "NAILS", img: px(3997384, 700, 700) },
  { id: 9, cat: "SKIN", img: px(11898946, 700, 950), tall: true },
  { id: 10, cat: "BRIDAL", img: px(29624010, 700, 700) },
  { id: 11, cat: "HAIR", img: px(3993323, 700, 700) },
  { id: 12, cat: "NAILS", img: px(34835304, 700, 700) },
];

export const TESTIMONIALS = [
  { quote: "Absolutely loved my experience. The team understood exactly what I wanted and the final look was even better than I imagined.", name: "Priya", role: "Bridal Client" },
  { quote: "The most relaxing facial I've ever had. My skin has never looked this radiant — I've already booked my next three sessions.", name: "Nandini", role: "Skin Ritual Member" },
  { quote: "Maya transformed my hair completely. The colour is dimensional, healthy and exactly the shade I showed her. Pure artistry.", name: "Ritika", role: "Colour Client" },
  { quote: "From the moment you walk in, everything feels considered. The space, the service, the attention to detail — truly luxurious.", name: "Aisha", role: "Signature Package" },
];

export const INSTAGRAM = [
  px(11009465, 600, 600),
  px(34607162, 600, 600),
  px(5938217, 600, 600),
  px(36930354, 600, 600),
  px(7529417, 600, 600),
  px(13068377, 600, 600),
];

export const STATS = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "K+", label: "Happy Clients" },
  { value: 20, suffix: "+", label: "Beauty Services" },
  { value: 15, suffix: "+", label: "Expert Artists" },
];
