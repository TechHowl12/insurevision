import React from "react";

const Navbar = ({ toggleButtons,scrollToSection }) => {
  return (
    <div className="bg-transparent w-full z-50 fixed pt-6 px-2">
      <div className="relative flex w-full items-center justify-between">
        {/* Menu Icon */}
        <svg
          width="34"
          height="34"
          onClick={toggleButtons}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Menu"
          className="bg-[#0E000b] border border-[#b94c99] rounded-lg p-1"
        >
          <rect x="3" y="5" width="18" height="2" fill="white" />
          <rect x="6" y="11" width="12" height="2" fill="white" />
          <rect x="3" y="17" width="18" height="2" fill="white" />
        </svg>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 uppercase font-thin text-white text-center text-lg">
          insure<span className="font-bold">vision</span>
        </h1>

        <button
          onClick={scrollToSection}
          className="cursor-pointer hidden sm:inline-flex rounded-full text-xs appearance-none bg-[#b94c99] px-4 py-2 text-white uppercase hover:bg-white hover:text-[#b94c99] transition-all duration-300"
        >
          get in touch
        </button>
      </div>
    </div>
  );
};

export default Navbar;
