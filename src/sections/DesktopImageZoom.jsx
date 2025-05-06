import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import roadrimg from '../assets/roadImg.png';
import Down from "../assets/down-line.png";
import Video from "../assets/video.mp4";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DesktopImageZoom = () => {
  const sectionRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const img1 = img1Ref.current;
    const img2 = img2Ref.current;
    const step1 = step1Ref.current;
    const step2 = step2Ref.current;
    const step3 = step3Ref.current;

    ScrollTrigger.getAll()
      .filter(trigger => trigger.vars?.trigger === section)
      .forEach(trigger => trigger.kill());

    gsap.set([img1, img2, step1, step2, step3], {
      autoAlpha: 0,
      display: "none",
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=2000px",
        scrub: 0.5,
        pin: true,
        markers: false,
      },
    });

    const revealStep = (stepRef, label) => {
      return timeline
        .set(stepRef, { display: "block" })
        .to(stepRef, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        })
        .addLabel(label)
        .to({}, { duration: 2 })
        .to(stepRef, {
          autoAlpha: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.in",
        });
    };

    // Image animation
    timeline
      .set(img1, { display: "block", width: isMobile ? "50%" : "25%" })
      .to(img1, { autoAlpha: 1, duration: 0.5 })
      .to(img1, {
        width: "100%",
        ease: "power2.out",
        duration: isMobile ? 1.5 : 1,
      });

    // Video animation
    timeline
      .set(img2, { display: "block" }) // width is set via Tailwind (w-[35%])
      .to(img2, { autoAlpha: 1, duration: 0.5 });

    // Step reveals
    if (isMobile) {
      revealStep(step1, "step1visible");
      revealStep(step2, "step2visible");
      revealStep(step3, "step3visible");
    } else {
      timeline
        .set(step1, { display: "block" })
        .to(step1, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .set(step2, { display: "block" })
        .to(step2, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .set(step3, { display: "block" })
        .to(step3, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" });
    }

    // Hold for 5 seconds
    timeline.to({}, { duration: 5 });

    ScrollTrigger.refresh();

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => {
      ScrollTrigger.getAll()
        .filter(trigger => trigger.vars?.trigger === section)
        .forEach(trigger => trigger.kill());
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.refresh();
    };
  }, [isMobile]);

  return (
      <section
      ref={sectionRef}
      className="h-screen overflow-visible flex items-center justify-center py-5"
    >
      
      <div className="container mx-auto px-4">
      <img src={Down} alt="down" className="mx-auto mb-2 h-36 md:h-56" />
          <h1 className="text-white text-3xl text-center sm:text-4xl md:text-5xl mb-5 md:mb-10">
            How will we ensure your Safety?
          </h1>
        <div className="flex justify-center">
          <div className="w-11/12">
          
            <div className="text-center relative overflow-visible">
            
              <div className="flex items-center justify-center">
                <img
                  ref={img1Ref}
                  src={roadrimg}
                  className="rounded-md grayscale"
                  style={{
                    display: "none",
                    opacity: 0,
                    width: "25%",
                    transition: "none",
                  }}
                  alt="Road view"
                />
              </div>

              <div className="flex items-center justify-center absolute h-full top-0 w-full left-0 z-10">
                {/* Step 1 */}
                <div
                  ref={step1Ref}
                  className="absolute z-50 top-0 w-full px-4 sm:px-0"
                  style={{ display: "none", opacity: 0 }}
                >
                  <div className="flex justify-center">
                    <div className="w-full md:w-2/3 lg:w-1/2">
                      <div className="text-center bg-black p-3 sm:p-5 md:p-10 rounded-xl text-white border border-[#b94C99] font-['Figtree',sans-serif] shadow-[0_0_15px_rgba(185,76,153,0.3)]">
                        <p className="mb-0 font-bold text-lg sm:text-xl md:text-2xl">
                          Next Gen Risk Understanding
                        </p>
                        <p className="mt-2 text-xs sm:text-sm">
                          By bringing the true context into the equation and
                          observing drivers over time, we’re radically
                          increasing the accuracy of risk assessment. This will
                          make it possible to identify and take action with the
                          riskiest drivers in your fleet.
                        </p>
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto -mt-5 sm:-mt-6 md:-mt-7 bg-black flex items-center justify-center text-white rounded-full border border-[#b94C99]">
                        <span>1</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  ref={step2Ref}
                  className="absolute z-50 bottom-0 w-full px-4 sm:px-0"
                  style={{ display: "none", opacity: 0 }}
                >
                  <div className="flex">
                    <div className="w-full sm:w-10/12 md:w-5/12 flex flex-col sm:flex-row items-center">
                      <div className="bg-black p-3 sm:p-5 md:p-8 rounded-xl text-white border border-[#b94C99] font-['Figtree',sans-serif] w-full sm:w-[95%] shadow-[0_0_15px_rgba(185,76,153,0.3)]">
                        <p className="mb-0 font-bold text-lg sm:text-xl md:text-2xl text-left">
                          Real Time Accident Prevention
                        </p>
                        <p className="mt-2 text-xs sm:text-sm text-left max-w-md">
                          Our AI doesn't just measure risk—it anticipates it in
                          its earliest stages, alerting drivers and activating
                          preventive measures seconds before potential accidents
                          occur. Not just smarter insurance—safer roads.
                        </p>
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mt-4 sm:mt-0 sm:-ml-6 md:-ml-7 bg-black flex items-center justify-center text-white rounded-full border border-[#b94C99]">
                        <span>2</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  ref={step3Ref}
                  className="absolute z-50 bottom-0 w-full px-4 sm:px-0"
                  style={{ display: "none", opacity: 0 }}
                >
                  <div className="flex justify-end">
                    <div className="w-full sm:w-10/12 md:w-5/12 flex flex-col-reverse sm:flex-row-reverse items-center">
                      <div className="bg-black p-3 sm:p-5 md:p-8 rounded-xl text-white border border-[#b94C99] font-['Figtree',sans-serif] w-full sm:w-[95%] shadow-[0_0_15px_rgba(185,76,153,0.3)]">
                        <p className="mb-0 font-bold text-lg sm:text-xl md:text-2xl text-right">
                          Super Charge Existing Video Telematics
                        </p>
                        <p className="mt-2 text-xs sm:text-sm text-right max-w-md ml-auto inline-flex">
                          Transform your existing dashcam infrastructure into a
                          sophisticated risk intelligence system. InsureVision's
                          hardware-agnostic platform extracts actionable,
                          underwriting-grade insights from cameras you already
                          have.
                        </p>
                      </div>
                      <div className="z-40 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mt-4 sm:mt-0 sm:-mr-6 md:-mr-7 bg-black flex items-center justify-center text-white rounded-full border border-[#b94C99]">
                        <span>3</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* VIDEO */}
                <video
                  ref={img2Ref}
                  src={Video}
                  className="hidden relative opacity-0 w-[35%] transition-none rounded-md"
                  autoPlay
                  muted
                  loop
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesktopImageZoom;