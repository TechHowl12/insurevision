import Lenis from "lenis";
import "./App.css";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import ContactForm from "./sections/ContactForm.jsx";
import Enviromatics from "./sections/Enviromatics.jsx";
import Hero from "./sections/Hero.jsx";
import Typography from "./sections/Typography.jsx";
import { useEffect, useRef, useState } from "react";
import LeadershipTestimonial from "./sections/Leadership.jsx";
import ImageZoom from "./sections/ImageZoom.jsx";

function App() {
  const [showFixedButtons, setShowFixedButtons] = useState(true);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768; 
    setShowFixedButtons(isDesktop);
  }, []);

  const formRef = useRef(null);

  const scrollToSection = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const lenis = new Lenis({
    autoRaf: true,
  });

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  return (
    <>
      <Navbar
        toggleButtons={() => setShowFixedButtons((prev) => !prev)}
        scrollToSection={scrollToSection}
      />
      <Hero showButtons={showFixedButtons} />
      <Typography />
      <ImageZoom />
      <Enviromatics />
      <LeadershipTestimonial />
      <ContactForm formRef={formRef} />
      <Footer />
    </>
  );
}

export default App;
