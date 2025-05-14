import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import roadrimg from "../assets/roadImg.png";
import Video from "../assets/video.mp4";
import Down from "../assets/down-line.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MobileImageZoom = () => {
  const sectionRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const stepRefs = [useRef(null), useRef(null), useRef(null)];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const [img1, img2] = [img1Ref.current, img2Ref.current];

    // kill any old triggers for this section
    ScrollTrigger.getAll()
      .filter((t) => t.vars.trigger === section)
      .forEach((t) => t.kill());

    // hide everything initially
    gsap.set([img1, img2, ...stepRefs.map((r) => r.current)], {
      autoAlpha: 0,
      display: "none",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=100%",
        scrub: 0.5,
        pin: true,
      },
    });

    // Image zoom
    tl.set(img1, { display: "block", width: isMobile ? "25%" : "25%" })
      .to(img1, { autoAlpha: 1, duration: 0.5 })
      .to(img1, { width: "100%", duration: 1.5, ease: "power2.out" });

    // Video fade in
    tl.set(img2, { display: "block" }).to(img2, {
      autoAlpha: 1,
      duration: 0.5,
    });

    // Step cards: fade in one after another, but keep them on screen
    stepRefs.forEach((ref, i) => {
      tl.set(ref.current, { display: "block" })
        .to(ref.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        })
        .to({}, { duration: 2 }); // pause before next step
    });

    ScrollTrigger.refresh();
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === section)
        .forEach((t) => t.kill());
      window.removeEventListener("resize", onResize);
      ScrollTrigger.refresh();
    };
  }, [isMobile]);

  return (
    <>
      <img src={Down} alt="down" className="mx-auto mb-2 h-36 md:h-56" />
      <h1 className="text-white text-3xl text-center sm:text-4xl md:text-3xl mb-5 md:mb-10">
        How will we ensure your Safety?
      </h1>
      <section ref={sectionRef} className="block overflow-visible py-5">
        <div className="container h-[830px] mx-auto px-4 mt-10 text-center">
          <div className="relative flex flex-col items-center justify-center">
            {/* Image + Video */}
            <div className="relative w-full flex justify-center">
              <img
                ref={img1Ref}
                src={roadrimg}
                alt="Road"
                className="rounded-md grayscale opacity-0"
                style={{ width: "25%" }}
              />
              <video
                ref={img2Ref}
                src={Video}
                autoPlay
                muted
                loop
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 rounded-md opacity-0"
              />
            </div>

            {/* Step Cards */}
            <div className="flex flex-col items-center w-full mt-8">
              {[
                "Next Gen Risk Understanding",
                "Real Time Accident Prevention",
                "Super Charge Existing Video Telematics",
              ].map((title, i) => (
                <div
                  key={i}
                  ref={stepRefs[i]}
                  className={`w-full md:w-2/3 lg:w-1/2 opacity-0 ${
                    i > 0 ? "mt-3" : ""
                  }`}
                  style={{ display: "none" }}
                >
                  <div className="bg-black p-2 rounded-xl text-white border border-primary font-['Figtree',sans-serif] shadow-[0_0_15px_rgba(185,76,153,0.3)] text-center">
                    <p className="font-bold text-lg">{title}</p>
                    <p className="text-xs mt-2">
                      {
                        [
                          "By bringing the true context into the equation and observing drivers over time, we’re radically increasing the accuracy of risk assessment. This will make it possible to identify and take action with the riskiest drivers in your fleet.",
                          "Our AI doesn't just measure risk—it anticipates it in its earliest stages, alerting drivers and activating preventive measures seconds before potential accidents occur. Not just smarter insurance—safer roads.",
                          "Transform your existing dashcam infrastructure into a sophisticated risk intelligence system. InsureVision's hardware-agnostic platform extracts actionable, underwriting-grade insights from cameras you already have.",
                        ][i]
                      }
                    </p>
                    <div className="w-8 h-8 mt-4 mx-auto bg-black flex items-center justify-center text-white rounded-full border border-primary">
                      <span>{i + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MobileImageZoom;
