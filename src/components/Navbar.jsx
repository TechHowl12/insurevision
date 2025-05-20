import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import MenuOpen from "../assets/Menuopen.png";
import MenuClose from "../assets/Menuclosed.png";

const Navbar = ({
  scrollToForm,
  scrollToTypography,
  scrollToEnviromatics,
  scrollToLeadership,
}) => {
  const [isScrolled, setIsScrolled] = useState(false); // For buttons
  const [showLogo, setShowLogo] = useState(true); // Separate state for logo
  const [showMenu, setShowMenu] = useState(false); // Hamburger menu toggle

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50); // For buttons
      setShowLogo(scrollY <= 50);  // For logo only
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="bg-transparent w-full z-50 fixed pt-3 px-2">
      <div className="relative flex w-full items-center justify-between">
        {/* Menu Icon and Left Buttons */}
        <div className="flex items-center gap-x-3">
          <img
            src={showMenu || !isScrolled ? MenuClose : MenuOpen}
            className="cursor-pointer z-50 md:w-8 md:h-8 lg:w-10 lg:h-10"
            onClick={toggleMenu}
            alt="Menu"
          />

          {/* Desktop Left Buttons */}
          <div
            className={`space-x-3 transition-all hidden sm:flex duration-500 transform ${
              isScrolled && !showMenu
                ? "opacity-0 -translate-x-20"
                : "opacity-100 translate-x-0"
            }`}
          >
            <button
              onClick={scrollToTypography}
              className="rounded-full bg-[#0E000b] text-[10px] lg:text-xs w-16 lg:w-24 border border-primary text-white hover:bg-white hover:text-[#FF4066] py-1 lg:py-2 transition-all duration-300"
            >
              Solution
            </button>
            <button
              onClick={scrollToEnviromatics}
              className="rounded-full bg-[#0E000b] text-[10px] lg:text-xs w-16 lg:w-24 border border-primary text-white hover:bg-white hover:text-[#FF4066] py-1 lg:py-2 transition-all duration-300"
            >
              Software
            </button>
            <button
              onClick={scrollToLeadership}
              className="rounded-full bg-[#0E000b] text-[10px] lg:text-xs w-16 lg:w-24 border border-primary text-white hover:bg-white hover:text-[#FF4066] py-1 lg:py-2 transition-all duration-300"
            >
              Leadership
            </button>
          </div>
        </div>

        {/* Center Logo */}
        <img
          src={Logo}
          className={`absolute md:w-28 lg:w-auto left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
            showLogo ? "opacity-100" : "opacity-0"
          }`}
          alt="Logo"
        />

        {/* Desktop Right Buttons */}
        <div className="gap-x-3 hidden sm:flex">
          <div
            className={`space-x-3 duration-500 transform transition-all ${
              isScrolled && !showMenu
                ? "opacity-0 translate-x-20 pointer-events-none"
                : "opacity-100 translate-x-0 pointer-events-auto"
            }`}
          >
            <a
              href="https://www.linkedin.com/company/insurevision-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="rounded-full bg-[#0E000b] text-[10px] lg:text-xs w-16 lg:w-24 border border-primary text-white hover:bg-white hover:text-[#FF4066] py-1 lg:py-2 transition-all duration-300">
                LinkedIn
              </button>
            </a>
          </div>
          <button
            onClick={scrollToForm}
            className="cursor-pointer rounded-full text-[10px] lg:text-xs appearance-none bg-[#FF4066] px-5 lg:px-8 md:py-1 lg:py-2 text-white uppercase hover:bg-[#fff] hover:text-[#FF4066] transition-all duration-300"
          >
            get in touch
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMenu && (
        <div className="sm:hidden mt-1 flex flex-col gap-3 px-4 pb-4 bg-[#0E000b] rounded-b-xl">
          <button
            onClick={scrollToTypography}
            className="rounded-full bg-[#0E000b] text-sm border border-primary text-white py-2 hover:bg-white hover:text-primary transition-all duration-300"
          >
            Solution
          </button>
          <button
            onClick={scrollToEnviromatics}
            className="rounded-full bg-[#0E000b] text-sm border border-primary text-white py-2 hover:bg-white hover:text-primary transition-all duration-300"
          >
            Software
          </button>
          <button
            onClick={scrollToLeadership}
            className="rounded-full bg-[#0E000b] text-sm border border-primary text-white py-2 hover:bg-white hover:text-primary transition-all duration-300"
          >
            Leadership
          </button>
          <a
            href="https://www.linkedin.com/company/insurevision-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full flex justify-center items-center bg-[#0E000b] text-sm border border-primary text-white py-2 hover:bg-white hover:text-primary transition-all duration-300"
          >
            LinkedIn
          </a>
          <button className="rounded-full bg-[#0E000b] text-sm border border-primary text-white py-2 hover:bg-white hover:text-primary transition-all duration-300">
            Blogs
          </button>
          <button
            onClick={scrollToForm}
            className="rounded-full bg-primary text-sm text-white py-2 uppercase hover:bg-white hover:text-primary transition-all duration-300"
          >
            get in touch
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
