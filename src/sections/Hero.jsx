import React, { useEffect, useState, useRef } from "react";
import Lines from "../assets/line-mask.png";
import Up from "../assets/up-line.png";
import Down from "../assets/down-line.png";
import Banner from "../assets/BannerPink.webp";
import LineArt from "../assets/animation.mp4";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = ({typoRef}) => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const text = `Humans drive cars and understand risk with our eyes, not gps and
  accelerometer data. We focus our attention on danger rather than on
  counting and classifying road objects. Our understanding is based on our
  experience as drivers... InsureVision analyses risk contextually just
  like humans`;
  const chars = Array.from(text);

  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    const letters = container.querySelectorAll(".char");

    // Clear any previous ScrollTrigger instances
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    // Ensure initial color is white
    gsap.set(letters, { color: "#ffffff" });

    // Create a timeline for our animations
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => setIsAnimating(false),
      onReverseComplete: () => setIsAnimating(false),
    });

    // Add the color animation to the timeline
    tl.to(letters, {
      color: "#FF4066",
      ease: "power1.inOut",
      stagger: {
        each: 0.02,
        from: "start",
      },
      duration: 1.5,
    });

    // Create a unique ScrollTrigger for this section
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: "center center", // trigger when h1 is centered in viewport
      end: "+=100%", // adjust based on your desired scroll duration
      pin: true,
      pinSpacing: true,
      id: "typography-pin",
      scrub: 0.3,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (self.getVelocity() !== 0 || self.progress > 0) {
          tl.progress(self.progress);
          setIsAnimating(self.progress > 0 && self.progress < 1);
        }
      },
    });

    return () => {
      // Clean up on component unmount
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      tl.kill();
    };
  }, []);

  return (
    <div className="hero">
      <section className="hidden min-[600px]:block">
        <video
          src={LineArt}
          className="w-full mix-blend-screen absolute z-40"
          autoPlay
          muted
          loop
        />
        <img
          src={Banner}
          width={1600}
          height={900}
          className="w-full h-auto relative"
          alt="Hero banner"
        />
      </section>
      <section className="relative text-white block min-[600px]:hidden">
        <div className="w-full flex flex-col justify-center h-[100vh] md:[h-80vh] items-center">
          <img className="mb-2 block invisible" src={Up} />
          <div className="content w-11/12 h-96 lg:w-[600px] lg:h-[450px] sm:w-[300px] sm:h-[200px] md:w-[450px] md:h-[300px] flex flex-col justify-between">
            <h1 className="text-5xl xl:text-6xl font-bold capitalize text-center">
              more context <br /> less risk
            </h1>
            <p className="text-center text-[15px] md:text-[19px] md:w-full opacity-75 font-light">
              Insurevision combines video from a vehicle’s forward-facing camera
              <span className="hidden md:inline">
                <br />
              </span>
              with a unique transformer AI model to deliver intelligent risk
              analysis.
            </p>
          </div>
          <div>
            <h2 className="uppercase relative text-primary z-10 mt-2">
              The future of road safety, now.
            </h2>
            <img
              className="relative mt-4 h-32 md:h-60 left-1/2 transform -translate-x-1/2"
              src={Down}
            />
          </div>
        </div>
      </section>
      <section ref={typoRef}>
        <div
        ref={sectionRef}
        className="relative flex items-center justify-center"
      >
        <div
          ref={containerRef}
          className="text-white w-11/12 md:w-11/12 lg:w-11/12 2xl:w-10/12 mx-auto text-center z-40"
        >
          <h1 className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl tracking-normal md:leading-relaxed">
            {chars.map((char, i) => (
              <span key={i} className="char">
                {char}
              </span>
            ))}
          </h1>
          <img
            src={Down}
            alt="down"
            className="mx-auto hidden lg:block my-2 h-36 md:h-60"
          />
        </div>
      </div>
      </section>
    </div>
  );
};

export default Hero;
