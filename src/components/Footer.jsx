import React from "react";
import footerimg from "../assets/footer.png";
import Logo from "../assets/Logo.png";

const Footer = ({scrollToEnviromatics, scrollToLeadership, scrollToTypography}) => {
  return (
    <footer className="w-full py-4 bg-[#0e060f]">
      <div className="w-full mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4">
          {/* Logo and Address */}
          <div className="flex items-start md:items-center sm:flex-row flex-col lg:gap-20 gap-6">
            <img src={Logo} alt="Logo" />
            <div className="text-left">
              <h3 className="text-gray-400 text-sm md:text-xs lg:text-sm font-medium mb-2">
                OFFICE ADDRESS
              </h3>
              <p className="text-gray-300 text-sm md:text-xs lg:text-sm">
                St George's Court, Winnington Avenue,
                <br />
                Northwich, Cheshire, England, CW8 4EE
              </p>
            </div>
          </div>

          {/* NVIDIA Logo */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex mb-6 flex-wrap items-center md:justify-center justify-start gap-3">
              <a
                href="https://www.linkedin.com/company/insurevision-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-24 py-2 flex items-center justify-center rounded-full text-xs border border-primary text-white hover:bg-white hover:text-[#ff4066] transition-colors"
              >
                LinkedIn
              </a>
              <button
                onClick={scrollToTypography}
                className="w-24 py-2 flex items-center justify-center rounded-full text-xs border border-primary text-white hover:bg-white hover:text-[#ff4066] transition-colors"
              >
                Solutions
              </button>
              <button
                onClick={scrollToEnviromatics}
                className="w-24 py-2 flex items-center justify-center rounded-full text-xs border border-primary text-white hover:bg-white hover:text-[#ff4066] transition-colors"
              >
                Software
              </button>
              <button
                onClick={scrollToLeadership}
                className="w-24 py-2 flex items-center justify-center rounded-full text-xs border border-primary text-white hover:bg-white hover:text-[#ff4066] transition-colors"
              >
                Leadership
              </button>
            </div>
            <img src={footerimg} alt="NVIDIA" className="h-18 object-contain w-36 xl:w-auto" />
          </div>
        </div>

        <div className="flex items-start md:justify-end flex-col md:flex-row justify-center p-6 lg:p-0 lg:pt-2 gap-4 w-full">
          <div>
            <p className="text-gray-400 text-sm md:text-xs">
              © 2025 Advanced Automobile Solutions Ltd.
            </p>
          </div>
          <a
            href="#"
            className="text-gray-400 text-sm md:text-xs hover:text-white transition-colors"
          >
            Cookie Policy
          </a>
          <a
            href="#"
            className="text-gray-400 text-sm md:text-xs hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
