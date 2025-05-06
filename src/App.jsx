import Lenis from "lenis";
import "./App.css";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import ContactForm from "./sections/ContactForm.jsx";
import Enviromatics from "./sections/Enviromatics.jsx";
import Typography from "./sections/Typography.jsx";
import { useEffect, useRef, useState } from "react";
import LeadershipTestimonial from "./sections/Leadership.jsx";
import MobileImageZoom from "./sections/MobileImageZoom.jsx";
import DesktopImageZoom from "./sections/DesktopImageZoom.jsx";
import Hero from "./sections/Hero.jsx";

function App() {
  const formRef = useRef(null);
  const leaderRef = useRef(null);
  const enviromaticsRef = useRef(null);
  const typoRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToLeadership = () => {
    leaderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTypography = () => {
    typoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToEnviromatics = () => {
    enviromaticsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const lenis = new Lenis({ autoRaf: true });

  useEffect(() => {
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <Navbar
        scrollToForm={scrollToForm}
        scrollToTypography={scrollToTypography}
        scrollToLeadership={scrollToLeadership}
        scrollToEnviromatics={scrollToEnviromatics}
      />
      <Hero />

      <div ref={typoRef}>
        <Typography />
      </div>

      <div className="block sm:hidden">
        <MobileImageZoom />
      </div>
      <div className="hidden sm:block">
        <DesktopImageZoom />
      </div>

      <div ref={enviromaticsRef}>
        <Enviromatics />
      </div>

      <div ref={leaderRef}>
        <LeadershipTestimonial />
      </div>

      <div ref={formRef}>
        <ContactForm />
      </div>

      <Footer />
    </>
  );
}

export default App;
