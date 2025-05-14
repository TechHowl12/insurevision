import React, { useState, useRef } from 'react';
import dropdownpng from '../assets/dropdown-pink.png';
import emailjs from '@emailjs/browser';

const ContactForm = ({ formRef: sectionFormRef }) => {
  const [selectedOption, setSelectedOption] = useState('AN INSURANCE COMPANY');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', contact: '',
    designation: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  // Create form reference for EmailJS
  const emailFormRef = useRef();

  const options = [
    'AN INSURANCE PROVIDER',
    'A FLEET OPERATOR',
    'OTHER'
  ];

  const toggleDropdown = () => setIsDropdownOpen(open => !open);
  const selectOption   = option => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  // Close popup function
  const closePopup = () => {
    setShowSuccessPopup(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Google Sheets submission with CORS workaround
      const scriptURL = 'https://script.google.com/macros/s/AKfycbw6tEofOSp6qxNLaWlA3EtHnXT47pJ7LhfJlPtsp81ynxjOqdXNgmuJyy7rnk_P1JhI/exec';
      
      // Build payload object for Google Sheets
      const payload = {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        designation: formData.designation,
        message: formData.message,
        typeOf: selectedOption
      };
      
      // URL-encode it for Google Sheets
      const body = new URLSearchParams(payload).toString();
      
      // Using fetch with no-cors mode as a workaround
      // This won't return a readable response but will still submit the data
      fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      });
      
      // Then, send email using EmailJS - this doesn't have CORS issues
      await emailjs.sendForm(
        "service_nceg182", 
        "template_src6gbo",
        emailFormRef.current,
        "uyKlt5kHw1ATFMVGZ"
      );
      
      console.log('Success: Form submitted and email sent');
      
      // Show success popup
      setShowSuccessPopup(true);

      // Reset form
      setFormData({ name: '', email: '', contact: '', designation: '', message: '' });
    } catch (err) {
      console.error('Error:', err);
      setError('There was an error submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    background: '#0E000B26',
    border: '1px solid #707070',
    borderRadius: '10px'
  };

  return (
    <div ref={sectionFormRef} className="w-full flex items-center justify-center p-4 lg:p-8">
      <div className="w-full sm:w-10/12 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-8 lg:py-12">
        {/* Left Section */}
        <div className="w-full text-left lg:px-0 px-auto">
          <div className="space-y-3">
            <p className="text-primary text-lg font-medium uppercase tracking-wider">CONTACT US</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl text-white leading-tight">
              Deploying Across<br />The Eco-System
            </h1>
            <p className="text-gray-300 mt-4 text-sm sm:text-base">
              Join the future with us now. Get in touch<br />
              to know more
            </p>
          </div>
          
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mt-3">
            <p className="text-sm text-gray-300 whitespace-nowrap">WHO ARE YOU ?</p>
            <div className="relative w-full sm:w-[55%]">
              <button
                onClick={toggleDropdown}
                name="selectedOption"
                className="w-full text-left px-5 py-4 border rounded-[10px] relative pr-12 text-sm"
                style={{
                  background: '#0E000B26',
                  border: '1px solid #FF4066'
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
                <div className="absolute left-0 right-0 mt-1 border border-primary rounded-[10px] z-10"
                     style={{ background: '#0E000B26' }}>
                  {options.map((option) => (
                    <div
                      key={option}
                      className="px-5 py-4 hover:bg-[#FF4066]/20 cursor-pointer transition-colors duration-150 text-white text-sm"
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
          <form ref={emailFormRef} onSubmit={handleSubmit} className="w-full space-y-5">
            <input
              type="text"
              name="name"
              placeholder="NAME"
              value={formData.name}
              onChange={handleChange}
              className="w-full py-4 px-5 text-white placeholder-white text-sm"
              style={inputStyles}
              required
            />
            
            <input
              type="email"
              name="email"
              placeholder="EMAIL ID"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-4 px-5 text-white placeholder-white text-sm"
              style={inputStyles}
              required
            />
            
            <input
              type="tel"
              name="contact"
              placeholder="CONTACT NO."
              value={formData.contact}
              onChange={handleChange}
              className="w-full py-4 px-5 text-white placeholder-white text-sm"
              style={inputStyles}
              required
            />
            
            <input
              type="text"
              name="designation"
              placeholder="DESIGNATION"
              value={formData.designation}
              onChange={handleChange}
              className="w-full py-4 px-5 text-white placeholder-white text-sm"
              style={inputStyles}
              required
            />
            
            <textarea
              name="message"
              placeholder="MESSAGE"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full text-white placeholder-white resize-none text-sm"
              style={{
                ...inputStyles,
                height: 'auto',
                padding: '20px'
              }}
              required
            ></textarea>
            
            {/* Hidden field for identity (selected option) */}
            <input 
              type="hidden" 
              name="identity" 
              value={selectedOption} 
            />
            
            <button
              type="submit"
              className="w-full text-white text-sm font-medium rounded-full py-4 bg-[#ff4066] hover:bg-white hover:text-[#ff4066] transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'SUBMIT'}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </div>
      </div>
      
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closePopup}></div>
          <div className="relative bg-[#0E000B] border border-primary rounded-[10px] p-6 max-w-md w-full mx-4 shadow-lg">
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-300 hover:text-white"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-medium text-white mb-2">Thank You!</h3>
              <p className="text-gray-300 mb-6">Your message has been sent successfully. We'll get back to you shortly.</p>
              <button
                onClick={closePopup}
                className="w-full text-white text-sm font-medium rounded-full py-3 bg-primary hover:bg-white hover:text-primary transition-all duration-300"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;