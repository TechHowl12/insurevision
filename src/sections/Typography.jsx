import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Typography = () => {
  const containerRef = useRef(null);

  const text = `Humans drive cars and understand risk with our eyes, not gps and
acerometer data. We focus our attention on danger rather than on
counting and classifying road objects. Our understanding is based on our
experience as drivers... InsureVision analyses risk contextually just
like humans`;
  const chars = Array.from(text);

  useEffect(() => {
    const container = containerRef.current;
    const letters = container.querySelectorAll(".char");

    // Ensure initial color is white
    gsap.set(letters, { color: "#ffffff" });

    gsap.to(letters, {
      scrollTrigger: {
        trigger: container,
        start: "top 80%",       // pin when container top reaches center
        end: "+=500",            // pin for 300px scroll
        scrub: true,       // no extra placeholder space
        // markers: true,
      },
      color: "#b94c99",
      ease: "power1.out",
      stagger: {
        each: 1,               // letter-by-letter timing
        from: "start",
      },
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative text-white w-11/12 md:w-10/12 mx-auto mt-[14%] md:mt-[12%] text-center z-40"
    >
      <h1 className="text-2xl md:text-4xl tracking-normal md:leading-relaxed">
        {chars.map((char, i) => (
          <span key={i} className="char">
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default Typography;
