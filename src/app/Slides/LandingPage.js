'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

// GSAP imports - make sure to install: npm install gsap
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

export const LandingPage = () => {
  const isMenuOpen = useSelector((state) => state.menubar.isMenubarOpen);
  const [isClient, setIsClient] = useState(false);

  // Refs for animations
  const imageRef = useRef(null);
  const webTextRef = useRef(null);
  const developerTextRef = useRef(null);
  const skillsTextRef = useRef(null);
  const containerRef = useRef(null);

  // Static Site Generation compatibility
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Main content animations - starts immediately since loading is handled by parent
  useEffect(() => {
    if (!isClient) return;

    const tl = gsap.timeline();

    // Container fade in - remove CSS hiding and animate in
    if (containerRef.current) {
      // Remove CSS hiding classes and set initial GSAP state
      containerRef.current.classList.add('content-loaded');
      gsap.set(containerRef.current, { opacity: 0, visibility: 'visible' });
      gsap.to(containerRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" });
    }

    // Image animations - subtle continuous movement
    if (imageRef.current) {
      // Initial entrance
      gsap.fromTo(imageRef.current, 
        { 
          scale: 0.8, 
          opacity: 0,
          rotation: -5
        }, 
        { 
          scale: 1, 
          opacity: 1, 
          rotation: 0,
          duration: 1.2, 
          ease: "power3.out",
          delay: 0.3
        }
      );

      // Continuous floating animation
      gsap.to(imageRef.current, {
        y: -10,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Subtle scale breathing effect
      gsap.to(imageRef.current, {
        scale: 1.02,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1
      });
    }

    // Staggered text animations
    const textElements = [webTextRef.current, developerTextRef.current];
    
    textElements.forEach((element, index) => {
      if (element) {
        gsap.fromTo(element, 
          { 
            x: index === 0 ? -100 : 100, 
            opacity: 0
          }, 
          { 
            x: 0, 
            opacity: 1,
            duration: 1.2, 
            ease: "power3.out",
            delay: 0.6 + (index * 0.3)
          }
        );

        // Add continuous subtle movement to text
        gsap.to(element, {
          x: index === 0 ? 5 : -5,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2 + (index * 0.5)
        });
      }
    });

    // Skills text animation
    if (skillsTextRef.current) {
      const skills = skillsTextRef.current.children;
      gsap.fromTo(skills, 
        { 
          y: 30, 
          opacity: 0 
        }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power2.out",
          stagger: 0.1,
          delay: 1.5
        }
      );

      // Add continuous subtle movement to skills
      Array.from(skills).forEach((skill, index) => {
        gsap.to(skill, {
          y: index % 2 === 0 ? 3 : -3,
          duration: 3 + (index * 0.2),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 3 + (index * 0.3)
        });
      });
    }

  }, [isClient]);

  // Text hover animations
  const handleTextHover = (element, isEntering) => {
    if (!isClient) return;
    
    gsap.to(element, {
      scale: isEntering ? 1.05 : 1,
      textShadow: isEntering ? "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)" : "none",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSkillHover = (element, isEntering) => {
    if (!isClient) return;
    
    gsap.to(element, {
      y: isEntering ? -5 : 0,
      scale: isEntering ? 1.1 : 1,
      textShadow: isEntering ? "0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.3)" : "none",
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  };

  return (
    <section id="homePage">
      {/* Main Homepage */}
      <div 
        ref={containerRef}
        className="landing-page-content min-h-screen w-full bg-[#0C090D] overflow-hidden max-w-full relative"
      >
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-5rem)] md:px-8 py-0 lg:py-0 max-w-full">
          {/* Left Half - Image */}
          <div className="w-full lg:w-1/2 flex justify-center mb-5 mt-0 lg:mb-0 px-4 lg:px-0">
            <div 
              ref={imageRef}
              className="relative w-96 h-96 xs:w-[450px] xs:h-[450px] sm:w-[500px] sm:h-[500px] md:w-[520px] md:h-[520px] lg:w-[580px] lg:h-[580px] xl:w-[680px] xl:h-[680px] max-w-[90vw] max-h-[90vw] lg:max-w-none lg:max-h-none cursor-pointer"
              onMouseEnter={(e) => {
                if (isClient) {
                  gsap.to(e.currentTarget, {
                    scale: 1.08,
                    duration: 0.4,
                    ease: "power2.out"
                  });
                }
              }}
              onMouseLeave={(e) => {
                if (isClient) {
                  gsap.to(e.currentTarget, {
                    scale: 1.02,
                    duration: 0.4,
                    ease: "power2.out"
                  });
                }
              }}
            >
              <Image
                src="/final img .jpg"
                alt="Aditya Narayan Mali"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Right Half - Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center mb-18 text-center lg:text-left lg:pl-8 px-4 lg:px-0 max-w-full overflow-hidden">
            <div 
              ref={webTextRef}
              className="text-gray-300 font-bebas text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-none mb-1 lg:mb-3 break-words cursor-pointer select-none"
              onMouseEnter={(e) => handleTextHover(e.target, true)}
              onMouseLeave={(e) => handleTextHover(e.target, false)}
            >
              WEB
            </div>
            <div 
              ref={developerTextRef}
              className="text-gray-300 font-bebas text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-none mb-3 lg:mb-5 break-words cursor-pointer select-none"
              onMouseEnter={(e) => handleTextHover(e.target, true)}
              onMouseLeave={(e) => handleTextHover(e.target, false)}
            >
              DEVELOPER
            </div>
            <div 
              ref={skillsTextRef}
              className="font-poppins text-base xs:text-lg sm:text-xl md:text-2xl lg:text-2xl text-gray-300 flex flex-wrap justify-center lg:justify-start gap-2 md:gap-2 max-w-full"
            >
              <span 
                className="cursor-pointer select-none"
                onMouseEnter={(e) => handleSkillHover(e.target, true)}
                onMouseLeave={(e) => handleSkillHover(e.target, false)}
              >
                FRONTEND
              </span>
              <span 
                className="cursor-pointer select-none"
                onMouseEnter={(e) => handleSkillHover(e.target, true)}
                onMouseLeave={(e) => handleSkillHover(e.target, false)}
              >
                | BACKEND
              </span>
              <span 
                className="hidden md:inline cursor-pointer select-none"
                onMouseEnter={(e) => handleSkillHover(e.target, true)}
                onMouseLeave={(e) => handleSkillHover(e.target, false)}
              >
                | ANIMATED WEBSITES
              </span>
              <span 
                className="cursor-pointer select-none"
                onMouseEnter={(e) => handleSkillHover(e.target, true)}
                onMouseLeave={(e) => handleSkillHover(e.target, false)}
              >
                | DSA
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};