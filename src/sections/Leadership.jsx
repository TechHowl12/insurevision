import { useEffect, useRef, useState } from "react";
import { Linkedin } from "lucide-react";
import gsap from "gsap";
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
  const mainImageRef = useRef(null)
  const mainImageWrapperRef = useRef(null)
  const totalMembers = 4
  const scrollTriggerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const prevMemberRef = useRef(1)
  
  // Handle LinkedIn Redirect explicitly
  const handleLinkedInRedirect = (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
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
  // and track previous main images
  const [smallProfiles, setSmallProfiles] = useState([
    { id: 1, image: teamMembers[1].image }, // Dan's image
    { id: 2, image: teamMembers[2].image }, // Hossein's image
    { id: 3, image: teamMembers[3].image }, // Scott's image
  ]);
  
  // Update profiles when active member changes
  useEffect(() => {
    // Skip on initial render
    if (prevMemberRef.current === activeMember) return;
    
    // Create an ordered array based on active member
    let orderedMembers = [];
    
    // First determine the starting position based on active member
    switch(activeMember) {
      case 1: // Mark is main
        orderedMembers = [
          { id: 2, image: teamMembers[1].image }, // Dan's image
          { id: 3, image: teamMembers[2].image }, // Hossein's image
          { id: 4, image: teamMembers[3].image }, // Scott's image
        ];
        break;
      case 2: // Dan is main
        orderedMembers = [
          { id: 1, image: teamMembers[0].image }, // Mark's image
          { id: 3, image: teamMembers[2].image }, // Hossein's image
          { id: 4, image: teamMembers[3].image }, // Scott's image
        ];
        break;
      case 3: // Hossein is main
        orderedMembers = [
          { id: 1, image: teamMembers[0].image }, // Mark's image
          { id: 2, image: teamMembers[1].image }, // Dan's image
          { id: 4, image: teamMembers[3].image }, // Scott's image
        ];
        break;
      case 4: // Scott is main
        orderedMembers = [
          { id: 1, image: teamMembers[0].image }, // Mark's image
          { id: 2, image: teamMembers[1].image }, // Dan's image
          { id: 3, image: teamMembers[2].image }, // Hossein's image
        ];
        break;
      default:
        orderedMembers = [
          { id: 2, image: teamMembers[1].image },
          { id: 3, image: teamMembers[2].image },
          { id: 4, image: teamMembers[3].image },
        ];
    }
    
    // Update small profiles
    setSmallProfiles(orderedMembers);
    
    // Update previous member reference
    prevMemberRef.current = activeMember;
  }, [activeMember, teamMembers]);

  // Animation for changing profile images - simplified version without 3D effects
  useEffect(() => {
    if (!mainImageRef.current || !mainImageWrapperRef.current) return;
    
    // Skip animation on first render
    if (prevMemberRef.current === activeMember) return;
    
    // Add a small transition effect without 3D rotation
    mainImageRef.current.style.transition = "opacity 0.3s ease";
    mainImageRef.current.style.opacity = "0";
    
    // After a short delay, change the image and fade it back in
    setTimeout(() => {
      mainImageRef.current.src = teamMembers.find(m => m.id === activeMember).image;
      mainImageRef.current.style.opacity = "1";
      
      // Make sure we're not interfering with click events
      mainImageRef.current.onclick = (e) => {
        e.stopPropagation();
      };
    }, 150);
  }, [activeMember, teamMembers, isMobile]);

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
            gsap.to(container, {
              duration: 0.5, // Faster for mobile
              autoAlpha: 1,
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
          end: "+=200%", // More scroll space for desktop
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
          }, 5000); // Change every 5 seconds
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

  const handlePagination = (index) => {
    if (index !== activeMember) {
      setActiveMember(index);
    }
  }

  const currentMember = teamMembers.find((member) => member.id === activeMember) || teamMembers[0]
  
  // Handle arrow navigation
  const handleArrowNavigation = (direction) => {
    if (direction === 'prev') {
      setActiveMember(prev => prev > 1 ? prev - 1 : totalMembers);
    } else {
      setActiveMember(prev => prev < totalMembers ? prev + 1 : 1);
    }
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full xl:w-10/12 flex items-center justify-center text-white relative overflow-hidden mx-auto"
    >
      <div 
        ref={containerRef}
        className="container mx-auto px-4 py-4 flex flex-col lg:flex-row items-center justify-between relative"
        style={{ opacity: 1, visibility: "visible" }}
      >
        {/* Mobile layout adjustment - reordering content */}
        <div className="w-full flex flex-col lg:hidden items-center justify-center mb-4 pr-2">
          {/* Mobile title at the top */}
          <h1 className="leadership-title text-3xl font-bold tracking-wider mt-2 mb-4">LEADERSHIP</h1>
          
          {/* Compact images area - centered */}
          <div className="flex justify-center items-center space-x-4 mb-4" style={{transform: "translateX(5%)"}}>
            <div className="flex flex-col space-y-3">
              {/* Small images on the side */}
              <div className="profile-image w-14 h-18 overflow-hidden">
                <a 
                  href={teamMembers.find(m => m.id === smallProfiles[0].id)?.linkedinUrl}
                  onClick={(e) => handleLinkedInRedirect(e, teamMembers.find(m => m.id === smallProfiles[0].id)?.linkedinUrl)}
                  className="w-full h-full cursor-pointer block"
                >
                  <img
                    src={smallProfiles[0].image || "/placeholder.svg"}
                    alt="Team member"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                    key={`small-mobile-1-${activeMember}`}
                  />
                </a>
              </div>
              <div className="profile-image w-14 h-18 overflow-hidden">
                <a 
                  href={teamMembers.find(m => m.id === smallProfiles[1].id)?.linkedinUrl}
                  onClick={(e) => handleLinkedInRedirect(e, teamMembers.find(m => m.id === smallProfiles[1].id)?.linkedinUrl)}
                  className="w-full h-full cursor-pointer block"
                >
                  <img
                    src={smallProfiles[1].image || "/placeholder.svg"}
                    alt="Team member"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                    key={`small-mobile-2-${activeMember}`}
                  />
                </a>
              </div>
            </div>
            
            {/* Main profile image - MOBILE */}
            <div className="main-profile relative mx-2">
              <div className="absolute inset-1 border-r-2 border-b-2 border-primary transform translate-x-1 translate-y-1"></div>
              <div 
                ref={mainImageWrapperRef} 
                className="w-[200px] h-[165px] lg:w-[306px] lg:h-[253px] overflow-hidden flex items-center justify-center"
              >
                <a 
                  href={currentMember.linkedinUrl}
                  onClick={(e) => handleLinkedInRedirect(e, currentMember.linkedinUrl)}
                  className="w-full h-full cursor-pointer relative"
                >
                  <img
                    ref={mainImageRef}
                    src={currentMember.image || "/placeholder.svg"}
                    alt={currentMember.name}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    key={`main-mobile-base`}
                  />
                </a>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              {/* Small images on the other side */}
              <div className="profile-image w-14 h-18 overflow-hidden">
                <a 
                  href={teamMembers.find(m => m.id === smallProfiles[2].id)?.linkedinUrl}
                  onClick={(e) => handleLinkedInRedirect(e, teamMembers.find(m => m.id === smallProfiles[2].id)?.linkedinUrl)}
                  className="w-full h-full cursor-pointer block"
                >
                  <img
                    src={smallProfiles[2].image || "/placeholder.svg"}
                    alt="Team member"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                    key={`small-mobile-3-${activeMember}`}
                  />
                </a>
              </div>
              
              {/* Vertical arrows for mobile - moved to the side */}
              <div className="flex flex-col space-y-3">
                <button
                  className="text-gray-400 hover:text-white transition-colors"
                  style={{ margin: "2px" }}
                  onClick={() => handleArrowNavigation('prev')}
                >
                  <img
                    src={arrrowupimg}
                    alt="Previous member"
                    className="h-8 w-2"
                  />
                </button>
                <button
                  className="text-gray-400 hover:text-white transition-colors"
                  style={{ margin: "2px" }}
                  onClick={() => handleArrowNavigation('next')}
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
          
          {/* Name and title */}
          <div className="name-title w-2xl text-center mt-2 mb-3" key={`name-mobile-${activeMember}`}>
            <div className="text-xs text-primary mb-1">MEET</div>
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
                    activeMember === member.id ? 'border-primary text-primary' : 'border-gray-700 text-gray-700'
                  } flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-xs`}
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
            <div className="bio-box relative py-8 px-8 border border-primary flex justify-center items-center w-[300px] lg:w-[306px] text-center"
              style={{ width: "455px", height: "130px", minHeight: "130px", maxHeight: "130px", textAlign: "right" }}
            >
              <p className="bio-text text-xs text-right text-gray-300" key={`bio-mobile-${activeMember}`}>{currentMember.bio}</p>
            </div>
          </div>
        </div>

        {/* Original desktop layout - hide on mobile */}
        <div className="hidden lg:flex lg:flex-row lg:w-full lg:pr-20 xl:pr-30 items-center justify-center">
          {/* Left side - Title and Bio */}
          <div className="w-full lg:w-[140%] flex flex-col items-center justify-center z-10 lg:ml-22 lg:mt-40">
            <h1 className="leadership-title text-5xl xl:text-6xl font-bold tracking-wider">LEADERSHIP</h1>

            {/* Bio with border box that's attached to the image */}
            <div className="bio-container w-full lg:ml-10 ml-20 mt-16 flex justify-center">
              <div className="bio-box lg:w-[300px] xl:w-[455px] relative flex justify-center items-center pr-2 border-t border-l border-b border-primary text-center ml-2 lg:ml-4"
                style={{ height: "160px", minHeight: "180px", maxHeight: "180px", textAlign: "right" }}
              >
                <p className="bio-text text-xs px-4 text-right sm:text-sm text-gray-300" key={`bio-${activeMember}`}>{currentMember.bio}</p>
              </div>
            </div>
          </div>

          {/* Center - Profile Images */}
          <div className="w-full lg:w-1/2 flex flex-col items-start justify-center relative my-6 lg:my-0">
            {/* Small profile image top */}
            <div className="profile-image mb-5 lg:mb-6 w-20 lg:w-24 h-24 lg:h-32 overflow-hidden">
              <a 
                href={teamMembers.find(m => m.id === smallProfiles[0].id)?.linkedinUrl}
                onClick={(e) => handleLinkedInRedirect(e, teamMembers.find(m => m.id === smallProfiles[0].id)?.linkedinUrl)}
                className="w-full h-full cursor-pointer block"
              >
                <img
                  src={smallProfiles[0].image || "/placeholder.svg"}
                  alt="Team member"
                  className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
                  key={`small-top-${activeMember}`}
                />
              </a>
            </div>

            {/* Small profile image middle-top */}
            <div className="profile-image mb-5 lg:mb-6 w-20 lg:w-24 h-24 lg:h-32 overflow-hidden">
              <a 
                href={teamMembers.find(m => m.id === smallProfiles[1].id)?.linkedinUrl}
                onClick={(e) => handleLinkedInRedirect(e, teamMembers.find(m => m.id === smallProfiles[1].id)?.linkedinUrl)}
                className="w-full h-full cursor-pointer block"
              >
                <img
                  src={smallProfiles[1].image || "/placeholder.svg"}
                  alt="Team member"
                  className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
                  key={`small-middle-${activeMember}`}
                />
              </a>
            </div>

            {/* Main profile image - DESKTOP */}
            <div className="main-profile relative mb-5 lg:mb-6">
              <div className="absolute inset-1 border-r-4 border-b-4 border-primary transform translate-x-2 translate-y-2"></div>
              <div 
                ref={mainImageWrapperRef} 
                className="w-[253px] h-[309px] overflow-hidden flex items-center justify-center"
              >
                <a 
                  href={currentMember.linkedinUrl}
                  onClick={(e) => handleLinkedInRedirect(e, currentMember.linkedinUrl)}
                  className="w-full h-full cursor-pointer relative"
                >
                  <img
                    ref={mainImageRef}
                    src={currentMember.image || "/placeholder.svg"}
                    alt={currentMember.name}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    key={`main-${activeMember}`}
                    style={{ transition: "opacity 0.3s ease" }}
                  />
                </a>
              </div>  
            </div>

            {/* Small profile image bottom */}
            <div className="profile-image w-20 lg:w-24 h-24 lg:h-32 overflow-hidden">
              <a 
                href={teamMembers.find(m => m.id === smallProfiles[2].id)?.linkedinUrl}
                onClick={(e) => handleLinkedInRedirect(e, teamMembers.find(m => m.id === smallProfiles[2].id)?.linkedinUrl)}
                className="w-full h-full cursor-pointer block"
              >
                <img
                  src={smallProfiles[2].image || "/placeholder.svg"}
                  alt="Team member"
                  className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
                  key={`small-bottom-${activeMember}`}
                />
              </a>
            </div>
          </div>

          {/* Right side - Name, Title, Social */}
          <div className="w-full flex lg:m-10 xl:m-20 flex-col ml-[2%] xl:mr[5%] items-center lg:items-start justify-center z-10">
            <div className="name-title text-center lg:text-left mt-6 lg:mt-56 mb-4 lg:mb-8" key={`name-${activeMember}`}>
              <div className="text-xs lg:text-sm text-primary mb-1 lg:mb-2">MEET</div>
              <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold">{currentMember.name.split(" ")[0]}</h2>
              <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold">{currentMember.name.split(" ")[1]}</h2>
              <div className="mt-2 lg:mt-4 text-xs lg:text-sm text-gray-400">{currentMember.title}</div>
            </div>

            {/* Social icons */}
            <div className="social-icons flex space-x-4 mb-4 lg:mb-6">
              <a href={currentMember.linkedinUrl} className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>

            {/* Pagination - Now below social icons */}
            <div className="w-32 lg:w-40 h-8 lg:h-10 flex space-x-2 mt-2 lg:mt-4 mb-4 lg:mb-8 z-20">
              {teamMembers && teamMembers.length > 0 ? (
                teamMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => handlePagination(member.id)}
                    className={`w-8 lg:w-10 h-8 lg:h-10 border ${
                      activeMember === member.id ? 'border-primary text-primary' : 'border-gray-700 text-gray-700'
                    } flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-xs lg:text-sm`}
                  >
                    {member.id || "N/A"}
                  </button>
                ))
              ) : (
                <div className="text-gray-400 text-xs lg:text-sm">No team members to display</div>
              )}
            </div>

            {/* Vertical arrows - Now positioned to the right */}
            <div className="arrows absolute gap-4 right-8 lg:top-[51%] xl:top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-12">
              <button
                className="text-gray-400 hover:text-white transition-colors"
                style={{ margin: "2px" }}
                onClick={() => handleArrowNavigation('prev')}
              >
                <img
                  src={arrrowupimg}
                  alt="Previous member"
                  className="h-8 w-2"
                />
              </button>
              <button
                className="text-gray-400 hover:text-white transition-colors"
                style={{ margin: "2px" }}
                onClick={() => handleArrowNavigation('next')}
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
        <div className="container mx-auto px-4 py-8 lg:py-16 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-8">Our Vision</h2>
          <p className="text-sm sm:text-base lg:text-xl max-w-3xl mx-auto">
            We're building the future of insurance technology, combining AI, hardware innovation,
            and data science to create solutions that change the industry.
          </p>
        </div>
      </div>
    </div>
  )    
}