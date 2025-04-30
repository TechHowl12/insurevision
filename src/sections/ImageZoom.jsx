import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Placeholderimg from '../assets/placeholder.png'
import roadrimg from '../assets/roadImg.png'

// Only register the plugin once to avoid conflicts
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ImageZoom = () => {
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
    
    // Check initially
    checkMobile();
    
    // Set up listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const img1 = img1Ref.current;
    const img2 = img2Ref.current;
    const step1 = step1Ref.current;
    const step2 = step2Ref.current;
    const step3 = step3Ref.current;
    const section = sectionRef.current;

    // Clear any existing scroll triggers for this component
    ScrollTrigger.getAll()
      .filter(trigger => trigger.vars?.trigger === section)
      .forEach(trigger => trigger.kill());

    // Initially hide all elements
    gsap.set([img1, img2, step1, step2, step3], {
      autoAlpha: 0,
      display: "none",
    });

    // Create different timeline based on device type
    if (isMobile) {
      // MOBILE VERSION - with pauses
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2500", 
          scrub: 0.5,
          pin: true,
          markers: false,
          id: "image-zoom-trigger-mobile"
        },
      });

      // Animate first image - for mobile
      tl.set(img1, { display: "block", width: "50%" })
        .to(img1, {
          autoAlpha: 1,
          duration: 0.5,
        })
        .to(img1, {
          width: "100%",
          ease: "power2.out",
          duration: 1.5,
        })

        // Animate second image - for mobile
        .set(img2, { display: "block", width: "30%" })
        .to(img2, {
          autoAlpha: 1,
          duration: 0.5,
        })
        .to(img2, {
          width: "40%",
          ease: "power2.out",
          duration: 1,
        })

        // Reveal Step 1 with pause
        .set(step1, { display: "block" })
        .to(step1, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        })
        .addLabel("step1visible")
        // Hold step 1 visible for a while
        .to({}, { duration: 2 }) // This creates a pause
        // Fade out step 1
        .to(step1, {
          autoAlpha: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.in",
        })

        // Reveal Step 2 with pause
        .set(step2, { display: "block" })
        .to(step2, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        })
        .addLabel("step2visible")
        // Hold step 2 visible for a while
        .to({}, { duration: 2 })
        // Fade out step 2
        .to(step2, {
          autoAlpha: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.in",
        })

        // Reveal Step 3 with pause
        .set(step3, { display: "block" })
        .to(step3, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        })
        .addLabel("step3visible")
        // Hold step 3 visible for a while
        .to({}, { duration: 2 })
        // Optional: fade out step 3 at the end
        .to(step3, {
          autoAlpha: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.in",
        });
        
    } else {
      // DESKTOP VERSION - original animation flow
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=3000",
          scrub: 0.8,
          pin: true,
          markers: false,
          id: "image-zoom-trigger-desktop"
        },
      });

      // Animate first image
      tl.set(img1, { display: "block", width: "25%" })
        .to(img1, {
          autoAlpha: 1,
          duration: 0.5,
        })
        .to(img1, {
          width: "100%",
          ease: "power2.out",
          duration: 1,
        })

        // Animate second image
        .set(img2, { display: "block", width: "15%" })
        .to(img2, {
          autoAlpha: 1,
          duration: 0.5,
        })
        .to(img2, {
          width: "20%",
          ease: "power2.out",
          duration: 1,
        })

        // Reveal Step 1
        .set(step1, { display: "block" })
        .to(step1, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        })

        // Reveal Step 2
        .set(step2, { display: "block" })
        .to(step2, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        })

        // Reveal Step 3
        .set(step3, { display: "block" })
        .to(step3, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });
    }
       
    ScrollTrigger.refresh();

    // Update on resize to handle orientation changes
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Kill only this component's ScrollTrigger instances
      ScrollTrigger.getAll()
        .filter(trigger => trigger.vars?.trigger === section)
        .forEach(trigger => trigger.kill());
      
      window.removeEventListener('resize', handleResize);
      
      // Final refresh to update the DOM state
      ScrollTrigger.refresh();
    };
  }, [isMobile]); // Dependency on isMobile to recreate animation when device type changes

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen flex items-center justify-center py-5 overflow-hidden bg-black"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full">
            <h1 className="text-white text-center mb-5 md:mb-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              How will we ensure your Safety?
            </h1>
            <div className="text-center relative">
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
                <div 
                  ref={step1Ref} 
                  className={`absolute top-1/4 sm:top-[8%] left-0 w-full px-4 sm:px-0 transition-all duration-500 ease-in-out ${isMobile ? 'transform' : ''}`}
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
                          observing drivers over time, we're radically
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

                <div 
                  ref={step2Ref} 
                  className={`absolute top-1/3 sm:top-[45%] md:top-[51%] left-0 sm:left-[1%] w-full px-4 sm:px-0 transition-all duration-500 ease-in-out ${isMobile ? 'transform' : ''}`}
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

                <div 
                  ref={step3Ref} 
                  className={`absolute top-1/2 sm:top-[70%] md:top-[51%] right-0 sm:right-[1%] w-full px-4 sm:px-0 transition-all duration-500 ease-in-out ${isMobile ? 'transform' : ''}`}
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
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mt-4 sm:mt-0 sm:-mr-6 md:-mr-7 bg-black flex items-center justify-center text-white rounded-full border border-[#b94C99]">
                        <span>3</span>
                      </div>
                    </div>
                  </div>
                </div>

                <img
                  ref={img2Ref}
                  src={Placeholderimg}
                  className="rounded-md"
                  style={{
                    display: "none",
                    opacity: 0,
                    width: "15%",
                    transition: "none",
                  }}
                  alt="Placeholder"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageZoom;