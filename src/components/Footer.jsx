import React from 'react';
import footerimg from '../assets/footer.png';

const Footer = () => {
  return (
    <footer className="w-full py-6">
      <div className="w-full mx-auto px-4 lg:px-8">
        <div className="flex flex-col p-4 md:flex-row justify-between items-start md:items-center gap-6 md:gap-4">
          {/* Logo and Address */}
          <div className="flex items-start sm:flex-row flex-col md:gap-20 gap-6">
          <h1 className="uppercase font-thin text-white text-center text-lg">
          insure<span className="font-bold">vision</span>
        </h1>
            <div className="text-left">
              <h3 className="text-gray-400 text-sm font-medium mb-2">OFFICE ADDRESS</h3>
              <p className="text-gray-300 text-sm">
                St George's Court, Winnington Avenue,<br />
                Northwich, Cheshire, England, CW8 4EE
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex mb-6 flex-wrap items-center md:justify-center justify-start  gap-3">
  {["Facebook", "Instagram", "Blogs", "Solutions", "Software", "Leadership"].map((label) => (
    <a
      key={label}
      href="#"
      className="px-4 py-2 rounded-full text-xs border border-[#B94C99] text-white hover:bg-[#B94C99]/20 transition-colors"
    >
      {label}
    </a>
  ))}
  <a
    href="#"
    className="px-8 py-4 rounded-full text-sm border border-[#B94C99] text-white hover:bg-[#B94C99]/20 transition-colors font-semibold uppercase tracking-wide"
  >
    PRESS RELEASE
  </a>
</div>


          {/* NVIDIA Logo */}
          <div className="flex flex-col  gap-4">
            <img 
              src={footerimg}
              alt="NVIDIA"
              className="h-18 object-contain"
            />

           {/* <div className="flex  gap-6">
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</a>
          </div> */}
           
          </div>

         
        </div>

        <div className="flex items-start md:justify-end flex-col md:flex-row justify-center p-6 gap-4 w-full">
            <div><p className="text-gray-400 text-sm">© 2025 Advanced Automobile Solutions Ltd.</p></div>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</a>

            
          </div>
      </div>
    </footer>
  );
};

export default Footer;