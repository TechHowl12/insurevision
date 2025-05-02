import React, { useState } from 'react';
import dropdownpng from '../assets/dropdown.png'

const ContactForm = ({formRef}) => {
  const [selectedOption, setSelectedOption] = useState('AN INSURANCE COMPANY');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const options = [
    'AN INSURANCE PROVIDER',
    'A FLEET OPERATOR',
    'OTHER'
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  const inputStyles = {
    background: '#0E000B26',
    border: '1px solid #707070',
    borderRadius: '10px'
  };

  return (
    <div ref={formRef} className="w-full flex items-center justify-center p-4 lg:p-8" style={{ backgroundColor: '#0E000B' }}>
      <div className="w-full sm:w-10/12 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-8 lg:py-12">
        {/* Left Section */}
        <div className="w-full text-left lg:px-0 px-auto">
          <div className="space-y-3">
            <p className="text-[#B94C99] text-sm font-medium uppercase tracking-wider">CONTACT US</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Deploying Across<br />The Eco-System
            </h1>
            <p className="text-gray-300 mt-4 text-sm sm:text-base">
              Join the future with us now. Get in touch<br />
              to know more
            </p>
          </div>
          
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-3">
            <p className="text-sm text-gray-300 whitespace-nowrap">WHO ARE YOU ?</p>
            <div className="relative w-full sm:w-7/12">
              <button
                onClick={toggleDropdown}
                className="w-full text-left px-5 py-4 border rounded-[10px] relative pr-12 text-sm"
                style={{
                  background: '#0E000B26',
                  border: '1px solid #B94C99'
                }}
              >
                <span className="text-white">{selectedOption}</span>
                <img 
                  src={dropdownpng}
                  alt="dropdown"
                  className={`absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute left-0 right-0 mt-1 border border-[#B94C99] rounded-[10px] z-10"
                     style={{ background: '#0E000B26' }}>
                  {options.map((option) => (
                    <div
                      key={option}
                      className="px-5 py-4 hover:bg-[#B94C99]/20 cursor-pointer transition-colors duration-150 text-white text-sm"
                      onClick={() => selectOption(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Section - Form */}
        <div className="w-full lg:px-0">
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <input
              type="text"
              placeholder="NAME"
              className="w-full py-4 px-5 text-white placeholder-white text-sm"
              style={inputStyles}
              required
            />
            
            <input
              type="email"
              placeholder="EMAIL ID"
              className="w-full py-4 px-5 text-white placeholder-white text-sm"
              style={inputStyles}
              required
            />
            
            <input
              type="tel"
              placeholder="CONTACT NO."
              className="w-full py-4 px-5 text-white placeholder-white text-sm"
              style={inputStyles}
              required
            />
            
            <input
              type="text"
              placeholder="DESIGNATION"
              className="w-full py-4 px-5 text-white placeholder-white text-sm"
              style={inputStyles}
              required
            />
            
            <textarea
              placeholder="MESSAGE"
              rows="5"
              className="w-full text-white placeholder-white resize-none text-sm"
              style={{
                ...inputStyles,
                height: 'auto',
                padding: '20px'
              }}
              required
            ></textarea>
            
            <button
              type="submit"
              className="w-full text-white text-sm font-medium rounded-full py-4 bg-[#B94C99] hover:bg-white hover:text-[#b94c99] transition-all duration-300"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;