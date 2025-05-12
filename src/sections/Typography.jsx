import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Down from "../assets/down-line.png";



gsap.registerPlugin(ScrollTrigger);

const Typography = () => {
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
      onReverseComplete: () => setIsAnimating(false)
    });

    // Add the color animation to the timeline
    tl.to(letters, {
      color: "#b94c99",
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
      start: "top top",
      end: "+=300%",
      pin: true,
      pinSpacing: true,
      id: "typography-pin", // Unique ID to avoid conflicts
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Only update timeline progress during scroll
        if (self.getVelocity() !== 0 || self.progress > 0) {
          tl.progress(self.progress);
          setIsAnimating(self.progress > 0 && self.progress < 1);
        }
      }
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
    <div
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center"
    >
          
      <div
        ref={containerRef}
        className="text-white w-11/12 md:w-9/12 lg:w-10/12 2xl:w-10/12 mx-auto text-center z-40"
      >
        <h1 className="text-2xl md:text-4xl 2xl:mt-[30vh] tracking-normal md:leading-relaxed">
    
          {chars.map((char, i) => (
            <span key={i} className="char">
              {char}
            </span>
          ))}
        </h1>
        <img src={Down} alt="down" className="mx-auto mb-2 h-36 md:h-60" />
      </div>
     
    </div>
  );
};

export default Typography;