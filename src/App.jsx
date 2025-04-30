import Lenis from "lenis";
import "./App.css";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import ContactForm from "./sections/ContactForm.jsx";
import Enviromatics from "./sections/Enviromatics.jsx";
import Hero from "./sections/Hero.jsx";
import Typography from "./sections/Typography.jsx";
import { useEffect, useState } from "react";
import ImageZoom from "./sections/ImageZoom/ImageZoom.jsx";
import LeadershipTestimonial from "./sections/Leadership.jsx";

function App() {
  const [showFixedButtons, setShowFixedButtons] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768; // example breakpoint: 768px for tablets and up
    }
    return true; // default to true if window is undefined (e.g. SSR)
  });

  useEffect(() => {
    const handleResize = () => {
      setShowFixedButtons(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lenis = new Lenis({
    autoRaf: true,
  });

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  return (
    <>
      <Navbar toggleButtons={() => setShowFixedButtons((prev) => !prev)} />
      <Hero showButtons={showFixedButtons} />
      <Typography />
      {/* <ImageZoom/> */}
      <Enviromatics />
      <LeadershipTestimonial />
      <ContactForm />
      <Footer />
    </>
  );
}

export default App;
