import React, { useEffect, useState } from "react";
import Lines from "../assets/line-mask.png";
import Up from "../assets/up-line.png";
import Down from "../assets/down-line.png";

const Hero = ({ showButtons }) => {
  const [hideButtons, setHideButtons] = useState(false);
  const baseButtonClasses =
    "rounded-full text-xs w-24 border border-[#b94c99] text-white py-2 transition-all duration-300";
  const shouldShow = showButtons && !hideButtons;

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 250;
      setHideButtons(isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hero">
      <section className="relative text-white">
      <img className="hidden md:inline absolute z-10 pointer-events-none" src={Lines} />
        {/* Fixed Left Buttons */}
        <div
          className={`fixed bottom-20 md:bottom-6 flex gap-3 z-50 transition-all duration-500
          ${
            shouldShow
              ? "opacity-100 left-1/2 -translate-x-1/2 md:left-2 md:translate-x-0"
              : "opacity-0 -left-40"
          }
        }`}
        >
          {["Facebook", "Instagram", "Blogs"].map((label) => (
            <button
              key={label}
              className={`${baseButtonClasses} bg-[#0E000b] hover:bg-[#b94c99]`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right Buttons */}
        <div
          className={`fixed bottom-6 md:bottom-6 flex gap-3 z-50 transition-all duration-500 ${
            shouldShow
              ? "opacity-100 right-1/2 translate-x-1/2 md:right-2 md:translate-x-0"
              : "opacity-0 -right-40"
          }     
        }`}
        >
          {["Solution", "Software", "Leadership"].map((label) => (
            <button
              key={label}
              className={`${baseButtonClasses} bg-[#0E000b] hover:bg-[#b94c99]`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="w-full flex flex-col justify-center h-[100vh] md:[h-80vh] items-center">
          <img className="mb-2" src={Up} />
          <div className="content w-11/12 h-96 lg:w-[600px] lg:h-[450px] sm:w-[300px] sm:h-[200px] md:w-[450px] md:h-[300px] flex flex-col justify-between">
            <h1 className="text-5xl xl:text-6xl font-bold capitalize text-center">
              more context <br /> less risk
            </h1>
            <p className="text-center opacity-75 font-light">
              Insurevision combines video from a vehicle’s forward-facing camera
              with a unique transformer AI model to deliver intelligent risk
              analysis.
            </p>
          </div>
          <div>
            <h2 className="uppercase relative text-[#b94c99] z-10 mt-2">
              The future of road safety, now.
            </h2>
            <img
              className="absolute h-32 md:h-60 left-1/2 transform -translate-x-1/2"
              src={Down}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
