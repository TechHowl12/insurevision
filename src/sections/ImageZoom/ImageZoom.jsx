import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ImageZoom.css";
import roadImg from "../../assets/roadImg.png";
import placeholderImg from "../../assets/placeholder.png";

gsap.registerPlugin(ScrollTrigger);

const ImageZoom = () => {
  useEffect(() => {
    const img1 = document.querySelector(".img-reveal-img");
    const img2 = document.querySelector(".img-reveal-img2");

    const step1 = document.querySelector(".instruc-step1");
    const step2 = document.querySelector(".instruc-step2");
    const step3 = document.querySelector(".instruc-step3");

    gsap.set([img1, img2, step1, step2, step3], {
      autoAlpha: 0,
      display: "none",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".instruction-section",
        start: "top top",
        end: "+=3000", // Enough space for all animations
        scrub: 0.8,
        pin: true,
        markers: false,
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
       
      ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="instruction-section min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="text-white text-center mb-5 section3-text">
              How will we ensure your Safety?
            </h1>
            <div className="text-center position-relative">
              <div className="img-reaveal1 d-flex align-items-center justify-content-center">
                <img
                  src={roadImg}
                  className="img-reveal-img rounded-2"
                  style={{
                    display: "none",
                    opacity: 0,
                    width: "25%",
                    transition: "none",
                  }}
                  alt=""
                />
              </div>

              <div className="img-reaveal2 d-flex align-items-center justify-content-center position-absolute h-100 top-0 w-100 start-0 z-index-10">
                <div className="instruc-step1 position-absolute start-0 w-100">
                  <div className="row mx-0 justify-content-center">
                    <div className="col-md-6">
                      <div className="step-inner text-center">
                        <p className="mb-0 fw-bold folds-heading">
                          Next Gen Risk Understanding
                        </p>
                        <p className="mt-2 para-text">
                          By bringing the true context into the equation and
                          observing drivers over time, we’re radically
                          increasing the accuracy of risk assessment. This will
                          make it possible to identify and take action with the
                          riskiest drivers in your fleet.
                        </p>
                      </div>
                      <div className="step-count">
                        <span>1</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="instruc-step2 position-absolute w-100">
                  <div className="row mx-0">
                    <div className="col-md-5 d-flex align-items-center">
                      <div className="step-inner text-center">
                        <p className="mb-0 fw-bold folds-heading text-start">
                          Real Time Accident Prevention
                        </p>
                        <p className="mt-2 para-text text-width-1 text-start">
                          Our AI doesn't just measure risk—it anticipates it in
                          its earliest stages, alerting drivers and activating
                          preventive measures seconds before potential accidents
                          occur. Not just smarter insurance—safer roads.
                        </p>
                      </div>
                      <div className="step-count">
                        <span>2</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="instruc-step3 position-absolute w-100">
                  <div className="row mx-0 justify-content-end">
                    <div className="col-md-5 d-flex align-items-center flex-row-reverse">
                      <div className="step-inner text-end">
                        <p className="mb-0 fw-bold folds-heading text-end">
                          Super Charge Existing Video Telematics
                        </p>
                        <p className="mt-2  para-text text-width-2  text-end">
                          Transform your existing dashcam infrastructure into a
                          sophisticated risk intelligence system. InsureVision's
                          hardware-agnostic platform extracts actionable,
                          underwriting-grade insights from cameras you already
                          have.
                        </p>
                      </div>
                      <div className="step-count">
                        <span>3</span>
                      </div>
                    </div>
                  </div>
                </div>

                <img
                  src={placeholderImg}
                  className="img-reveal-img2 rounded-2"
                  style={{
                    display: "none",
                    opacity: 0,
                    width: "15%",
                    transition: "none",
                  }}
                  alt=""
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