import React, { useEffect, useState } from "react";
import Lines from "../assets/line-mask.png";
import Up from "../assets/up-line.png";
import Down from "../assets/down-line.png";
import Banner from "../assets/BannerHotPink.webp";
import LineArt from "../assets/LineArt.mp4";

const Hero = () => {
  return (
    <div className="hero">
      <section className="hidden min-[600px]:block">
        {/* <video
          src={LineArt}
          className="w-full mix-blend-screen absolute z-50"
          autoPlay
          muted
          loop
        /> */}
        <img className="relative" src={Banner} />
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
    </div>
  );
};

export default Hero;
