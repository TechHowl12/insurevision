import { useEffect, useRef, useState } from "react"
import { Linkedin } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import arrrowupimg from "../assets/arrowup.png";
import arrowdownimg from "../assets/arrowdown.png";
import markImg from "../assets/Mark.png";
import danImg from "../assets/Dan.png";
import hosseinImg from "../assets/Hossein.png";
import scottImg from "../assets/Scott.png";

// Only register the plugin once to avoid conflicts
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LeadershipTestimonial(){
  const [activeMember, setActiveMember] = useState(1)
  const containerRef = useRef(null)
  const sectionRef = useRef(null)
  const totalMembers = 4
  const scrollTriggerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const teamMembers = [
    {
      id: 1,
      name: "MARK MILLER",
      title: "Founder & CEO",
      bio: "Mark brings over 15 years of experience in the insurance industry, with a track record of scaling innovative startups. His vision for combining AI with insurance is driving our mission forward.",
      image: markImg,
      linkedinUrl: "https://www.linkedin.com/in/mark-miller-81a89b149",
    },
    {
      id: 2,
      name: "DAN FREEDMAN",
      title: "Head of Insurance",
      bio: "Dan led the development of a pioneering telematics insurance product at the UK's Direct Line Group. Dan's expertise in helping familiarise the insurance sector with cutting edge technology is an essential skill in building our offer.",
      image: danImg,
      linkedinUrl: "https://www.linkedin.com/in/freedmandan/",
    },
    {
      id: 3,
      name: "HOSSEIN HADIAN",
      title: "Head of AI",
      bio: "Hossein studied his PhD at Johns Hopkins and is an expert in transformer AI. He's published multiple papers on the subject and delivered state-of-the-art financial LLM.",
      image: hosseinImg,
      linkedinUrl: "https://www.linkedin.com/in/hhadian/",
    },
    {
      id: 4,
      name: "SCOTT MILLER",
      title: "Head of Hardware",
      bio: "Scott is an electronics engineer with experience in the military equipment and automotive sectors. Scott's ability to roadmap products from inception to certification, at pace, is seeing us form disruptive new delivery collaborations.",
      image: scottImg,
      linkedinUrl: "https://www.linkedin.com/in/scottmillereqfin/",
    },
  ]

  // Dynamically generate small profiles based on active member
  const [smallProfiles, setSmallProfiles] = useState([
    { id: 1, image: teamMembers[1].image },
    { id: 2, image: teamMembers[2].image },
    { id: 3, image: teamMembers[3].image },
  ])

  useEffect(() => {
    // Update small profiles to exclude the active member's image and cycle through others
    const currentMemberData = teamMembers.find((m) => m.id === activeMember)
    const availableMembers = teamMembers.filter((m) => m.id !== activeMember)
    const newSmallProfiles = [
      { id: 1, image: availableMembers[0].image },
      { id: 2, image: availableMembers[1].image },
      { id: 3, image: availableMembers[2].image },
    ]
    setSmallProfiles(newSmallProfiles)
  }, [activeMember])

  useEffect(() => {
    const container = containerRef.current
    const section = sectionRef.current
    
    // Set mounted state to true
    setIsMounted(true)
    
    // Make container visible immediately
    if (container) {
      // Override the autoAlpha setting directly in the DOM
      container.style.opacity = "1"
      container.style.visibility = "visible"
    }

    // Create the main ScrollTrigger for the section
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill()
    }

    // Configure scroll-based animations based on device type
    const setupScrollTrigger = () => {
      // Clear any existing scroll triggers for this component first
      ScrollTrigger.getAll()
        .filter(trigger => trigger.vars?.trigger === section)
        .forEach(trigger => trigger.kill());

      // Mobile config - simpler animations, touch-friendly
      if (isMobile) {
        scrollTriggerRef.current = ScrollTrigger.create({
          id: "leadership-scrolltrigger-mobile",
          trigger: section,
          start: "top top",
          end: "+=150%", // Less scroll space on mobile
          pin: true,
          pinSpacing: true,
          scrub: 1, // Smoother for touch devices
          markers: false,
          onEnter: () => {
            // Simpler entrance animation for mobile
            gsap.to(container, {
              duration: 0.5, // Faster for mobile
              autoAlpha: 1,
              ease: "power2.out",
            })

            // Minimal animations for mobile to improve performance
            gsap.from([".leadership-title", ".profile-image", ".bio-text", ".name-title"], {
              duration: 0.5,
              y: 20,
              opacity: 0,
              stagger: 0.1,
              ease: "power2.out",
            })
          },
          onUpdate: (self) => {
            // Calculate which team member to show based on scroll progress
            const progress = self.progress;
            // Ensure proper sequential display (1,2,3,4)
            if (progress < 0.25) {
              setActiveMember(1);
            } else if (progress < 0.5) {
              setActiveMember(2);
            } else if (progress < 0.75) {
              setActiveMember(3);
            } else {
              setActiveMember(4);
            }
          }
        });
      } 
      // Desktop config - richer animations
      else {
        scrollTriggerRef.current = ScrollTrigger.create({
          id: "leadership-scrolltrigger-desktop",
          trigger: section,
          start: "top top",
          end: "+=400%", // More scroll space for desktop
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          markers: false,
          onEnter: () => {
            gsap.to(container, {
              duration: 1,
              autoAlpha: 1,
              ease: "power3.out",
            })

            // Full desktop animations
            gsap.from(".leadership-title", {
              duration: 1.2,
              y: 50,
              ease: "power3.out",
              delay: 0.3,
            })

            gsap.from(".profile-image", {
              duration: 0.8,
              scale: 0.8,
              stagger: 0.2,
              ease: "back.out(1.7)",
              delay: 0.5,
            })

            gsap.from(".bio-text", {
              duration: 1,
              x: -30,
              ease: "power2.out",
              delay: 0.7,
            })

            gsap.from(".name-title", {
              duration: 1,
              y: 20,
              ease: "power2.out",
              delay: 0.9,
            })

            gsap.from(".social-icons a", {
              duration: 0.5,
              y: 10,
              stagger: 0.1,
              ease: "power2.out",
              delay: 1.2,
            })

            gsap.from(".pagination button", {
              duration: 0.5,
              scale: 0,
              stagger: 0.1,
              ease: "back.out(1.7)",
              delay: 1.4,
            })
          },
          onUpdate: (self) => {
            // Calculate which team member to show based on scroll progress
            const progress = self.progress;
            // Ensure proper sequential display (1,2,3,4)
            if (progress < 0.25) {
              setActiveMember(1);
            } else if (progress < 0.5) {
              setActiveMember(2);
            } else if (progress < 0.75) {
              setActiveMember(3);
            } else {
              setActiveMember(4);
            }
          }
        });
      }

      // Create individual scroll triggers - fixed ranges for proper navigation
      const sectionRanges = [
        { start: 0, end: 0.25 },
        { start: 0.25, end: 0.5 },
        { start: 0.5, end: 0.75 },
        { start: 0.75, end: 1 }
      ];
      
      // Clear any existing individual scroll triggers for this component
      ScrollTrigger.getAll()
        .filter(trigger => trigger !== scrollTriggerRef.current && trigger.vars?.trigger === section)
        .forEach(trigger => trigger.kill());

      // Create new scroll triggers for each member
      teamMembers.forEach((member, index) => {
        const range = sectionRanges[index];
        const sectionStart = isMobile ? 
          `+=${range.start * 200}%` : 
          `+=${range.start * 400}%`;
        const sectionEnd = isMobile ? 
          `+=${range.end * 200}%` : 
          `+=${range.end * 400}%`;
        
        ScrollTrigger.create({
          id: `leadership-member-${member.id}`,
          trigger: section,
          start: sectionStart,
          end: sectionEnd,
          onEnter: () => {
            setActiveMember(member.id);
          },
          onEnterBack: () => {
            setActiveMember(member.id);
          }
        });
      });

      // Refresh ScrollTrigger to properly update all instances
      ScrollTrigger.refresh();
    };

    // Set up scroll trigger
    setupScrollTrigger();

    // Cleanup
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      
      // Kill all ScrollTrigger instances associated with this component
      ScrollTrigger.getAll()
        .filter(trigger => trigger.vars?.trigger === section)
        .forEach(trigger => trigger.kill());
      
      // Final refresh to update the DOM state
      ScrollTrigger.refresh();
    };
  }, [totalMembers, isMobile]);

  // Automatic slider - only active when not scrolling
  useEffect(() => {
    let interval;
    
    // Create an observer to detect if user is scrolling
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // When section is visible, start auto-rotation
          interval = setInterval(() => {
            if (!ScrollTrigger.isScrolling()) {
              setActiveMember((prev) => (prev < totalMembers ? prev + 1 : 1));
            }
          }, 5000); // Change every 2 seconds
        } else {
          // Clear interval when section is not visible
          clearInterval(interval);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      scrollObserver.observe(sectionRef.current);
    }

    return () => {
      clearInterval(interval);
      if (sectionRef.current) {
        scrollObserver.unobserve(sectionRef.current);
      }
    };
  }, [totalMembers]);

  // Animation for changing team members - simplify by removing animations
  useEffect(() => {
    // Simply update the content without animations when navigating
    // This will make immediate changes with no fades or movements
  }, [activeMember, isMobile]);

  const handlePagination = (index) => {
    setActiveMember(index)
  }

  const currentMember = teamMembers.find((member) => member.id === activeMember) || teamMembers[0]

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full md:w-10/12 flex items-center justify-center text-white relative overflow-hidden mx-auto"
    >
      <div 
        ref={containerRef}
        className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between relative"
        style={{ opacity: 1, visibility: "visible" }}
      >
        {/* Mobile layout adjustment - reordering content */}
        <div className="w-full flex flex-col md:hidden items-center justify-center mb-4 pr-2">
          {/* Mobile title at the top */}
          <h1 className="leadership-title text-3xl font-bold tracking-wider mt-2 mb-4">LEADERSHIP</h1>
          
          {/* Compact images area - centered */}
          <div className="flex justify-center items-center space-x-4 mb-4" style={{transform: "translateX(5%)"}}>
            <div className="flex flex-col space-y-3">
              {/* Small images on the side */}
              <div className="profile-image w-14 h-18 overflow-hidden">
                <img
                  src={smallProfiles[0].image || "/placeholder.svg"}
                  alt="Team member"
                  className="w-full h-full object-cover grayscale"
                  key={`small-mobile-1-${activeMember}`}
                />
              </div>
              <div className="profile-image w-14 h-18 overflow-hidden">
                <img
                  src={smallProfiles[1].image || "/placeholder.svg"}
                  alt="Team member"
                  className="w-full h-full object-cover grayscale"
                  key={`small-mobile-2-${activeMember}`}
                />
              </div>
            </div>
            
            {/* Main profile image */}
            <div className="main-profile relative mx-2">
              <div className="absolute inset-1 border-r-2 border-b-2 border-[#B94C99] transform translate-x-1 translate-y-1"></div>
              <div className="w-[200px] h-[165px] md:w-[306px] md:h-[253px] overflow-hidden flex items-center justify-center">
                <img
                  src={currentMember.image || "/placeholder.svg"}
                  alt={currentMember.name}
                  className="w-full h-full object-cover"
                  key={`main-mobile-${activeMember}`}
                />
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              {/* Small images on the other side */}
              <div className="profile-image w-14 h-18 overflow-hidden">
                <img
                  src={smallProfiles[2].image || "/placeholder.svg"}
                  alt="Team member"
                  className="w-full h-full object-cover grayscale"
                  key={`small-mobile-3-${activeMember}`}
                />
              </div>
              
              {/* Vertical arrows for mobile - moved to the side */}
              <div className="flex flex-col space-y-3">
                <button
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => setActiveMember((prev) => (prev > 1 ? prev - 1 : totalMembers))}
                >
                  <img
                    src={arrrowupimg}
                    alt="Previous member"
                    className="h-4 w-1.5"
                  />
                </button>
                <button
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => setActiveMember((prev) => (prev < totalMembers ? prev + 1 : 1))}
                >
                  <img
                    src={arrowdownimg}
                    alt="Next member"
                    className="h-4 w-1.5"
                  />
                </button>
              </div>
            </div>
          </div>
          
          {/* Name and title */}
          <div className="name-title text-center mt-2 mb-3" key={`name-mobile-${activeMember}`}>
            <div className="text-xs text-[#B94C99] mb-1">MEET</div>
            <h2 className="text-2xl font-bold">{currentMember.name}</h2>
            <div className="mt-1 text-xs text-gray-400">{currentMember.title}</div>
          </div>
          
          {/* Social icons */}
          <div className="social-icons flex space-x-4 mb-3">
            <a href={currentMember.linkedinUrl} className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={16} />
            </a>
          </div>
          
          {/* Pagination */}
          <div className="w-full flex justify-center space-x-2 mt-1 mb-4">
            {teamMembers && teamMembers.length > 0 ? (
              teamMembers.map((member) => (
                <button
                  key={`pagination-mobile-${member.id}`}
                  onClick={() => handlePagination(member.id)}
                  className={`w-6 h-6 border ${
                    activeMember === member.id ? 'border-[#B94C99] text-[#B94C99]' : 'border-gray-700 text-gray-700'
                  } flex items-center justify-center hover:border-[#B94C99] hover:text-[#B94C99] transition-colors text-xs`}
                >
                  {member.id || "N/A"}
                </button>
              ))
            ) : (
              <div className="text-gray-400 text-xs">No team members to display</div>
            )}
          </div>
          
          {/* Bio text at the bottom */}
          <div className="bio-container w-full mt-1 mb-3 flex justify-center">
            <div className="bio-box relative  py-8 px-8 border border-[#B94C99] w-[300px] md:w-[306px] text-center">
              <p className="bio-text text-xs text-center text-gray-300" key={`bio-mobile-${activeMember}`}>{currentMember.bio}</p>
            </div>
          </div>
        </div>

        {/* Original desktop layout - hide on mobile */}
        <div className="hidden md:flex md:flex-row md:w-full items-center justify-between">
          {/* Left side - Title and Bio */}
          <div className="w-full md:w-[140%] flex flex-col items-center justify-center z-10 px-2 md:px-8 md:mt-40">
            <h1 className="leadership-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider">LEADERSHIP</h1>

            {/* Bio with border box that's attached to the image */}
            <div className="bio-container w-full ml-20 mt-16 md:ml-15 flex justify-center">
              <div className="bio-box relative  pr-2 border-t border-l border-b border-[#B94C99] text-center ml-2 md:ml-4">
                <p className="bio-text text-xs px-4 py-10 text-center sm:text-sm text-gray-300" key={`bio-${activeMember}`}>{currentMember.bio}</p>
              </div>
            </div>
          </div>

          {/* Center - Profile Images */}
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center relative my-6 md:my-0">
            {/* Small profile image top */}
            <div className="profile-image mb-5 md:mb-6 w-20 md:w-24 h-24 md:h-32 overflow-hidden">
              <img
                src={smallProfiles[0].image || "/placeholder.svg"}
                alt="Team member"
                className="w-full h-full object-cover grayscale"
                key={`small-top-${activeMember}`}
              />
            </div>

            {/* Small profile image middle-top */}
            <div className="profile-image mb-5 md:mb-6 w-20 md:w-24 h-24 md:h-32 overflow-hidden">
              <img
                src={smallProfiles[1].image || "/placeholder.svg"}
                alt="Team member"
                className="w-full h-full object-cover grayscale"
                key={`small-middle-${activeMember}`}
              />
            </div>

            {/* Main profile image */}
            <div className="main-profile relative mb-5 md:mb-6">
              <div className="absolute inset-1 border-r-4 border-b-4 border-[#B94C99] transform translate-x-2 translate-y-2"></div>
              <div className="w-[253px] h-[309px] overflow-hidden flex items-center justify-center">
                <img
                  src={currentMember.image || "/placeholder.svg"}
                  alt={currentMember.name}
                  className="w-full h-full object-cover"
                  key={`main-${activeMember}`}
                />
              </div>  
            </div>

            {/* Small profile image bottom */}
            <div className="profile-image w-20 md:w-24 h-24 md:h-32 overflow-hidden">
              <img
                src={smallProfiles[2].image || "/placeholder.svg"}
                alt="Team member"
                className="w-full h-full object-cover grayscale"
                key={`small-bottom-${activeMember}`}
              />
            </div>
          </div>

          {/* Right side - Name, Title, Social */}
          <div className="w-full flex md:m-20 flex-col ml-[2%] lg:mr[5%] items-center md:items-start justify-center z-10">
            <div className="name-title text-center md:text-left mt-6 md:mt-56 mb-4 md:mb-8" key={`name-${activeMember}`}>
              <div className="text-xs md:text-sm text-[#B94C99] mb-1 md:mb-2">MEET</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{currentMember.name.split(" ")[0]}</h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{currentMember.name.split(" ")[1]}</h2>
              <div className="mt-2 md:mt-4 text-xs md:text-sm text-gray-400">{currentMember.title}</div>
            </div>

            {/* Social icons */}
            <div className="social-icons flex space-x-4 mb-4 md:mb-6">
              <a href={currentMember.linkedinUrl} className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>

            {/* Pagination - Now below social icons */}
            <div className="w-32 md:w-40 h-8 md:h-10 flex space-x-2 mt-2 md:mt-4 mb-4 md:mb-8 z-20">
              {teamMembers && teamMembers.length > 0 ? (
                teamMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => handlePagination(member.id)}
                    className={`w-8 md:w-10 h-8 md:h-10 border ${
                      activeMember === member.id ? 'border-[#B94C99] text-[#B94C99]' : 'border-gray-700 text-gray-700'
                    } flex items-center justify-center hover:border-[#B94C99] hover:text-[#B94C99] transition-colors text-xs md:text-sm`}
                  >
                    {member.id || "N/A"}
                  </button>
                ))
              ) : (
                <div className="text-gray-400 text-xs md:text-sm">No team members to display</div>
              )}
            </div>

            {/* Vertical arrows - Now positioned to the right */}
            <div className="arrows absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-12">
              <button
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setActiveMember((prev) => (prev > 1 ? prev - 1 : totalMembers))}
              >
                <img
                  src={arrrowupimg}
                  alt="Previous member"
                  className="h-8 w-2"
                />
              </button>
              <button
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setActiveMember((prev) => (prev < totalMembers ? prev + 1 : 1))}
              >
                <img
                  src={arrowdownimg}
                  alt="Next member"
                  className="h-8 w-2"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Second section that appears after scrolling through first section */}
      <div className={`absolute ${isMobile ? 'top-[200%]' : 'top-[400%]'} left-0 w-full min-h-screen bg-black flex items-center justify-center`}>
        <div className="container mx-auto px-4 py-8 md:py-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-8">Our Vision</h2>
          <p className="text-sm sm:text-base md:text-xl max-w-3xl mx-auto">
            We're building the future of insurance technology, combining AI, hardware innovation,
            and data science to create solutions that change the industry.
          </p>
        </div>
      </div>
    </div>
  )    
}