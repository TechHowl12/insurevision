import React from "react";
import footerimg from "../assets/footer.png";
import Logo from "../assets/Logo.png";

const Footer = ({scrollToEnviromatics, scrollToLeadership, scrollToTypography}) => {
  return (
    <footer className="w-full py-6">
      <div className="w-full mx-auto px-4 lg:px-8">
        <div className="flex flex-col p-4 md:flex-row justify-between items-start md:items-center gap-6 md:gap-4">
          {/* Logo and Address */}
          <div className="flex items-start sm:flex-row flex-col md:gap-20 gap-6">
            <img src={Logo} alt="Logo" />
            <div className="text-left">
              <h3 className="text-gray-400 text-sm font-medium mb-2">
                OFFICE ADDRESS
              </h3>
              <p className="text-gray-300 text-sm">
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
                className="px-4 py-2 rounded-full text-xs border border-primary text-white hover:bg-white hover:text-[#ff4066] transition-colors"
              >
                LinkedIn
              </a>
              <button
                onClick={scrollToTypography}
                className="px-4 py-2 rounded-full text-xs border border-primary text-white hover:bg-white hover:text-[#ff4066] transition-colors"
              >
                Solutions
              </button>
              <button
                onClick={scrollToEnviromatics}
                className="px-4 py-2 rounded-full text-xs border border-primary text-white hover:bg-white hover:text-[#ff4066] transition-colors"
              >
                Software
              </button>
              <button
                onClick={scrollToLeadership}
                className="px-4 py-2 rounded-full text-xs border border-primary text-white hover:bg-white hover:text-[#ff4066] transition-colors"
              >
                Leadership
              </button>
            </div>
            <img src={footerimg} alt="NVIDIA" className="h-18 object-contain" />
          </div>
        </div>

        <div className="flex items-start md:justify-end flex-col md:flex-row justify-center p-6 gap-4 w-full">
          <div>
            <p className="text-gray-400 text-sm">
              © 2025 Advanced Automobile Solutions Ltd.
            </p>
          </div>
          <a
            href="#"
            className="text-gray-400 text-sm hover:text-white transition-colors"
          >
            Cookie Policy
          </a>
          <a
            href="#"
            className="text-gray-400 text-sm hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
