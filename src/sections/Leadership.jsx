import { useEffect, useRef, useState } from "react"
import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import arrrowupimg from "../assets/arrowup.png"
import arrowdownimg from "../assets/arrowdown.png"

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
      name: "Dan Freedman",
      title: "Head of Insurance",
      bio: "Dan led the development of a pioneering telematics insurance product at the UK's Direct Line Group. Dan's expertise in helping familiarise the insurance sector with cutting edge technology is an essential skill in building our offer.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 2,
      name: "Hossein Hadian",
      title: "Head of AI",
      bio: "Hossein studied his PhD at Johns Hopkins and is an expert in transformer AI. He's published multiple papers on the subject and delivered state-of-the-art financial LLM.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    },
    {
      id: 3,
      name: "Scott Miller",
      title: "Head of Hardware",
      bio: "Scott is an electronics engineer with experience in the military equipment and automotive sectors. Scott's ability to roadmap products from inception to certification, at pace, is seeing us form disruptive new delivery collaborations.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 4,
      name: "ELENA RODRIGUEZ",
      title: "Chief Data Scientist",
      bio: "Elena leads our data science initiatives, transforming complex insurance data into actionable insights. Her research in predictive modeling has revolutionized how we approach risk assessment and pricing.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
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
          end: "+=200%", // Less scroll space on mobile
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
          }, 2000); // Change every 2 seconds
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
      className="min-h-screen w-full flex items-center justify-center bg-black text-white relative overflow-hidden"
    >
      <div 
        ref={containerRef}
        className="container mx-auto px-4 py-8  flex flex-col md:flex-row items-center justify-between relative"
        style={{ opacity: 1, visibility: "visible" }}
      >
        {/* Left side - Title and Bio */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center z-10 px-2 md:px-8">
          <h1 className="leadership-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider mb-6 md:mb-16">LEADERSHIP</h1>

          {/* Bio with border box that's attached to the image */}
          <div className="bio-container w-full mt-6 md:mt-16 ml-2 md:ml-8 flex justify-end">
            <div className="bio-box relative p-4 sm:p-8 md:p-14 border-t border-l border-b border-[#B94C99] text-right w-full ml-2 md:ml-4">
              <p className="bio-text text-xs text-left sm:text-sm md:text-base text-gray-300" key={`bio-${activeMember}`}>{currentMember.bio}</p>
            </div>
          </div>
        </div>

        {/* Center - Profile Images */}
        <div className={`w-full flex flex-col items-${isMobile ? 'center md:items-start' : 'start'} justify-center relative my-6 md:my-0`}>
          {/* Small profile image top */}
          <div className="profile-image mb-3 md:mb-6 w-16 md:w-24 h-20 md:h-32 overflow-hidden">
            <img
              src={smallProfiles[0].image || "/placeholder.svg"}
              alt="Team member"
              className="w-full h-full object-cover"
              key={`small-top-${activeMember}`}
            />
          </div>

          {/* Small profile image middle-top */}
          <div className="profile-image mb-3 md:mb-6 w-16 md:w-24 h-20 md:h-32 overflow-hidden">
            <img
              src={smallProfiles[1].image || "/placeholder.svg"}
              alt="Team member"
              className="w-full h-full object-cover"
              key={`small-middle-${activeMember}`}
            />
          </div>

          {/* Main profile image */}
          <div className="main-profile relative mb-3 md:mb-6">
            <div className="absolute inset-1 border-r-4 border-b-4 border-[#B94C99] transform translate-x-2 translate-y-2"></div>
            <div className="w-48 sm:w-64 md:w-78 h-48 sm:h-64 md:h-76 overflow-hidden">
              <img
                src={currentMember.image || "/placeholder.svg"}
                alt={currentMember.name}
                className="w-full h-full object-cover"
                key={`main-${activeMember}`}
              />
            </div>
          </div>

          {/* Small profile image bottom */}
          <div className="profile-image w-16 md:w-24 h-20 md:h-32 overflow-hidden">
            <img
              src={smallProfiles[2].image || "/placeholder.svg"}
              alt="Team member"
              className="w-full h-full object-cover"
              key={`small-bottom-${activeMember}`}
            />
          </div>
        </div>

        {/* Right side - Name, Title, Social */}
        <div className="w-full flex flex-col ml-[2%] lg:mr[5%] items-center md:items-start justify-center z-10">
          <div className="name-title text-center md:text-left mt-6 md:mt-56 mb-4 md:mb-8" key={`name-${activeMember}`}>
            <div className="text-xs md:text-sm text-[#B94C99] mb-1 md:mb-2">MEET</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{currentMember.name.split(" ")[0]}</h2>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{currentMember.name.split(" ")[1]}</h2>
            <div className="mt-2 md:mt-4 text-xs md:text-sm text-gray-400">{currentMember.title}</div>
          </div>

          {/* Social icons */}
          <div className="social-icons flex space-x-4 mb-4 md:mb-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={isMobile ? 16 : 18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={isMobile ? 16 : 18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={isMobile ? 16 : 18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={isMobile ? 16 : 18} />
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
          <div className={`arrows absolute ${isMobile ? 'right-4 top-1/2' : 'right-8 top-1/2'} transform -translate-y-1/2 flex flex-col items-center space-y-6 md:space-y-12`}>
            <button
              className="text-gray-400 hover:text-white transition-colors"
              onClick={() => setActiveMember((prev) => (prev > 1 ? prev - 1 : totalMembers))}
            >
              <img
                src={arrrowupimg}
                alt="Previous member"
                className={`${isMobile ? 'h-6 w-1.5' : 'h-8 w-2'}`}
              />
            </button>
            <button
              className="text-gray-400 hover:text-white transition-colors"
              onClick={() => setActiveMember((prev) => (prev < totalMembers ? prev + 1 : 1))}
            >
              <img
                src={arrowdownimg}
                alt="Next member"
                className={`${isMobile ? 'h-6 w-1.5' : 'h-8 w-2'}`}
              />
            </button>
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