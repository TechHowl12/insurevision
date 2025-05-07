import React, { useEffect, useState, useRef } from "react";
import Arrow from "../assets/arrowdown.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AccessExtractImg from "../assets/Access&Extract.png";
import AnalyzePredictImg from "../assets/Analyze&Predict.png";
import CoachImproveImg from "../assets/Coach&Improve.png";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stepDetails = [
  {
    title: "access & extract",
    description:
      "Accessing and extracting available video data from existing dashcams or from our high tech AI powered dashcams in vehicles and fleets.",
    bgColor: "#b94c99",
    bgImage: AccessExtractImg,
    bullets: ["AI Dashcams", "Video Extraction", "Video Uploads"],
  },
  {
    title: "analyze & predict",
    description:
      "Extracted video data is analysed on the edge or in the cloud into actionable risk insights, delivering driver-level risk prediction and real-time accident prevention.",
    bgColor: "#3b82f6",
    bgImage: AnalyzePredictImg,
    bullets: ["Driver Behaviour", "Road Risk Patterns", "Driver Alert"],
  },
  {
    title: "coach & improve",
    description:
      "In the long term, risk insights are utilised for driver behaviour and patterns with personalized feedback, behaviour modification suggestions and fleet/driver monitoring services.",
    bgColor: "#10b981",
    bgImage: CoachImproveImg,
    bullets: [
      "Personalized Feedback",
      "Driver/Fleet Monitoring",
      "Behaviour Modification",
    ],
  },
];

const Enviromatics = () => {
  const [progress, setProgress] = useState(0);
  const [connectorProgress, setConnectorProgress] = useState(0);
  const [activeButton, setActiveButton] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animationCycles, setAnimationCycles] = useState(0);
  const [isPinActive, setIsPinActive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const containerRef = useRef(null);
  const totalCycles = stepDetails.length;

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set up ScrollTrigger for pinning
  useEffect(() => {
    // Clear any existing ScrollTrigger instances for this section
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    // Kill all ScrollTrigger instances related to this component
    ScrollTrigger.getAll()
      .filter(t => t.vars.id === "enviromatics-pin" || t.vars.trigger === sectionRef.current)
      .forEach(t => t.kill());

    // Create new ScrollTrigger instance (only pin on desktop)
    if (sectionRef.current && containerRef.current) {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%", // More space for complete cycle
        pin: !isMobile, // Only pin on desktop
        pinSpacing:!isMobile, // Only add pin spacing on desktop
        anticipatePin: 1,
        scrub: false,
        markers: false,
        id: "enviromatics-pin",
        onEnter: () => {
          setIsVisible(true);
          setIsPinActive(!isMobile);
          // We'll let the animation flow naturally
        },
        onLeave: () => {
          setIsVisible(false);
          setIsPinActive(false);
        },
        onEnterBack: () => {
          setIsVisible(true);
          setIsPinActive(!isMobile);
        },
        onLeaveBack: () => {
          setIsVisible(false);
          setIsPinActive(false);
        }
      });
    }

    // Refresh ScrollTrigger to apply changes
    ScrollTrigger.refresh();

    // Cleanup on component unmount or when screen size changes
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      
      // Kill all related ScrollTrigger instances
      ScrollTrigger.getAll()
        .filter(t => t.vars.id === "enviromatics-pin" || t.vars.trigger === sectionRef.current)
        .forEach(t => t.kill());
        
      ScrollTrigger.refresh();
    };
  }, [isMobile]); // Add isMobile as dependency to rerun when screen size changes

  // Animate only when visible
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((p) => p + 1);
      } else if (connectorProgress < 100) {
        setConnectorProgress((cp) => cp + 2);
      } else {
        // Move to next step
        const nextButton = (activeButton + 1) % stepDetails.length;
        setActiveButton(nextButton);
        setProgress(0);
        setConnectorProgress(0);
      }
    }, 40);
    
    return () => clearInterval(interval);
  }, [isVisible, progress, connectorProgress, activeButton, stepDetails.length]);

  const currentStep = stepDetails[activeButton];

  return (
    <div 
      ref={sectionRef}
      className={`text-white w-full ${isMobile ? 'min-h-screen pb-10' : 'h-screen'} flex items-center justify-center mt-6 px-4 md:px-[12%] py-0 md:py-16 overflow-hidden`}
    >
      <div ref={containerRef} className="flex flex-col">
        {/* Intro Section */}
        <div>
          <h3 className="text-sm uppercase text-center tracking-widest font-bold">
            introducing
          </h3>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-wider text-center uppercase mt-2">
            Enviromatics
          </h1>
          <h1 className="text-2xl sm:text-3xl font-normal tracking-wider text-center uppercase mt-2">
            Telematics 2.0
          </h1>
          <p className="text-[#b94c99] text-center capitalize text-xs sm:text-sm mt-4 font-medium">
            technology built based on real world scenarios
          </p>
        </div>

        {/* Progress Buttons */}
        <div
          className="flex flex-col mt-7 sm:flex-row gap-x-0 sm:gap-y-0 w-full xl:w-10/12 mx-auto"
        >
          {stepDetails.map((step, index) => (
            <div key={index} className="relative items-center flex-1 flex">
              <button
                onClick={() => {
                  setActiveButton(index);
                  setProgress(0);
                  setConnectorProgress(0);
                }}
                className={`border uppercase whitespace-nowrap rounded-full py-4 text-xs w-full flex items-center justify-between pl-4 overflow-hidden
                  ${activeButton === index ? "flex" : "hidden"} 
                  md:flex                                             
                  ${
                    activeButton === index
                      ? "border-[#b94c99]"
                      : "border-slate-200"
                  }
                `}
              >
                <span className="z-10">{step.title}</span>
                <div className="w-36 md:w-14 lg:w-24 xl:w-32 h-[1px] flex z-40">
                  <div
                    className="h-full transition-all duration-100"
                    style={{
                      width:
                        activeButton === index
                          ? connectorProgress > 0
                            ? "100%"
                            : `${progress}%`
                          : "0%",
                      backgroundColor:
                        activeButton === index ? "#b94c99" : "#fff",
                    }}
                  />
                  <div className="h-full flex-1 bg-white" />
                </div>
              </button>
              {index < stepDetails.length - 1 && (
                <div className="hidden sm:block w-12 h-[1px] bg-white relative">
                  <div
                    className="absolute left-0 top-0 h-full transition-all duration-100"
                    style={{
                      width:
                        activeButton === index && connectorProgress > 0
                          ? `${connectorProgress}%`
                          : "0%",
                      backgroundColor:
                        activeButton === index && connectorProgress > 0
                          ? "#b94c99"
                          : "white",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
          <div className="flex mt-2 justify-between w-full sm:hidden">
            <button
              className="sm:hidden px-2"
              onClick={(e) => {
                e.stopPropagation();
                setActiveButton(
                  (prev) => (prev - 1 + stepDetails.length) % stepDetails.length
                );
                setProgress(0);
                setConnectorProgress(0);
              }}
            >
              <img className="rotate-90" src={Arrow}/>
            </button>
            <button
              className="sm:hidden px-2"
              onClick={(e) => {
                e.stopPropagation();
                setActiveButton((prev) => (prev + 1) % stepDetails.length);
                setProgress(0);
                setConnectorProgress(0);
              }}
            >
              <img className="-rotate-90"  src={Arrow}/>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-3 md:mt-7 flex items-center flex-col sm:flex-row w-full md:w-11/12 mx-auto justify-center gap-x-5 gap-y-5 sm:gap-y-0">
          <div className="w-full sm:w-1/2 xl:w-5/12 flex flex-col gap-y-7 justify-between py-3">
            <h4 className="text-slate-200 text-sm 2xl:text-lg leading-relaxed w-full sm:w-11/12 capitalize">
              {currentStep.description}
            </h4>
            <div className="flex flex-col gap-7">
              {currentStep.bullets.map((line, idx) => (
                <div key={idx} className="flex items-center gap-x-5">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="100"
                      height="100"
                      stroke="#ffffff"
                      fill="none"
                      strokeWidth="2"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="20"
                      stroke="#b94c99"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                  <h3 className="uppercase text-xs">{line}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full sm:w-1/2 xl:w-4/12">
            <div className="relative overflow-hidden mx-auto">
              {/* Background image */}
              <img 
                src={currentStep.bgImage} 
                alt={currentStep.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enviromatics;