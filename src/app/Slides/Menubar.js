'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenubar } from '../Redux/Slices/MenubarSlice';
import { gsap } from 'gsap';

const Menubar = () => {
  const isMenuOpen = useSelector((state) => state.menubar.isMenubarOpen);
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const menuLinksRef = useRef([]);

  // Static Site Generation compatibility
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Menu animations
  useEffect(() => {
    if (!isClient) return;

    if (isMenuOpen) {
      // Animate menu links
      gsap.fromTo(menuLinksRef.current, 
        { 
          x: 50, 
          opacity: 0 
        }, 
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.6, 
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.2
        }
      );
    }
  }, [isMenuOpen, isClient]);

  const toggleMenu = () => {
    dispatch(toggleMenubar());
  };

  const handleMenuLinkHover = (element, isEntering) => {
    if (!isClient) return;
    
    gsap.to(element, {
      x: isEntering ? 10 : 0,
      textShadow: isEntering ? "0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.3)" : "none",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const scrollToSection = (id) => {
  const section = document.querySelector(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    dispatch(toggleMenubar()); // ✅ close menu after navigation
  }
};

  return (
    <>
      {/* Menu Overlay */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[70%] md:w-[50%] lg:w-[35%] xl:w-[30%] bg-white/20 backdrop-blur-lg z-50 transition-transform duration-500 max-w-full ${
          isMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <div 
            className="bg-gray-800 h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 hover:shadow-lg transition-all duration-300"
            onClick={toggleMenu}
          >
            <span className="text-white text-lg md:text-xl">✕</span>
          </div>
          <div className="text-white font-poppins text-xs md:text-sm text-center mt-1">
            close
          </div>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col justify-center h-full pl-6 sm:pl-8 md:pl-12 lg:pl-16 space-y-4 md:space-y-6 overflow-hidden">
          {[
            { href: "#homepage", text: "HOME", id: "#homePage" },
            { href: "#aboutus", text: "ABOUT ME", id: "#aboutPage" },
            { href: "#skills", text: "SKILLS" , id: "#skillsPage"},
            { href: "#projects", text: "PROJECTS", id: "#projectsPage" },
            { href: "#contact", text: "CONTACT ME", id: "#contactPage" },
            { href: "/resume-aditya-narayan-mali.pdf", text: "DOWNLOAD RESUME", download: true, }
          ].map((link, index) => (
            <a 
              key={link.text}
              ref={(el) => menuLinksRef.current[index] = el}
              href={link.href}
              {...(link.download && { download: true })}
              className="text-white font-poppins text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light cursor-pointer select-none"
              onClick={()=>scrollToSection(link.id)}
              onMouseEnter={(e) => handleMenuLinkHover(e.target, true)}
              onMouseLeave={(e) => handleMenuLinkHover(e.target, false)}
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>

      {/* Menu Background Overlay - Only for mobile to darken background slightly */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 sm:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default Menubar;