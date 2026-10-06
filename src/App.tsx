import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useCallback, useState } from "react";
import { Cursor, FloatingButtons, Preloader, ScrollProgress } from "./components/Chrome";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Services from "./components/Services";
import Featured from "./components/Featured";

const BeforeAfter = lazy(() => import("./components/BeforeAfter"));
const Artists = lazy(() => import("./components/Artists"));
const Packages = lazy(() => import("./components/Packages"));
const Gallery = lazy(() => import("./components/Gallery"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const InstagramFeed = lazy(() => import("./components/InstagramFeed"));
const Booking = lazy(() => import("./components/Booking"));
const Contact = lazy(() => import("./components/Contact"));
const FinalCTA = lazy(() => import("./components/FinalCTA"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);

  return (
    <>
      <AnimatePresence>{loading && <Preloader key="pre" onDone={done} />}</AnimatePresence>
      <div className="grain" aria-hidden />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main>
        <Hero ready={!loading} />
        <Intro />
        <Services />
        <Featured />
        <Suspense fallback={<div className="min-h-[40vh]" />}>
          <BeforeAfter />
          <Artists />
          <Packages />
          <Gallery />
          <Testimonials />
          <InstagramFeed />
          <Booking />
          <Contact />
          <FinalCTA />
          <Footer />
        </Suspense>
      </main>
      <FloatingButtons />
    </>
  );
}
