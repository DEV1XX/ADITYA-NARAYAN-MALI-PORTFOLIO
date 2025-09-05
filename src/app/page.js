'use client';

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { LandingPage } from "./Slides/LandingPage";
import { AboutPage } from "./Slides/AboutPage";
import { SkillsPage } from "./Slides/SkillsPage";
import { ProjectsPage } from "./Slides/ProjectsPage";
import { ContactPage } from "./Slides/ContactPage";
import Menubar from "./Slides/Menubar";
// Navbar import removed - no longer needed
import { gsap } from 'gsap';

export default function Home() {
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const loadingRef = useRef(null);

  // Static Site Generation compatibility
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Add viewport meta tag to prevent zooming
    const existingViewport = document.querySelector('meta[name="viewport"]');
    if (existingViewport) {
      existingViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    } else {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.getElementsByTagName('head')[0].appendChild(viewport);
    }

    // Add CSS to prevent zooming and scrolling issues + prevent initial flash
    const style = document.createElement('style');
    style.textContent = `
      html, body {
        touch-action: pan-x pan-y;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
        overflow-x: hidden;
        position: relative;
        width: 100%;
        max-width: 100vw;
      }
      
      * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      @media (max-width: 768px) {
        html {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
      }

      /* Prevent initial flash - components start hidden */
      .landing-page-content,
      .about-page-content,
      .menubar-content {
        opacity: 0;
        visibility: hidden;
      }
    `;
    document.head.appendChild(style);

    // Global loading animation
    if (loadingRef.current) {
      gsap.fromTo(loadingRef.current.children[0], 
        { 
          opacity: 0, 
          y: 30,
          scale: 0.9
        }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1,
          ease: "power2.out"
        }
      );

      // Animate loading bar
      gsap.fromTo(loadingRef.current.querySelector('.loading-bar'), 
        { width: "0%" }, 
        { 
          width: "100%", 
          duration: 1.5, 
          ease: "power2.inOut",
          onComplete: () => {
            gsap.to(loadingRef.current, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => setIsGlobalLoading(false)
            });
          }
        }
      );
    }

    return () => {
      // Clean up
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [isClient]);

  // Global loading screen
  if (isGlobalLoading) {
    return (
      <div 
        ref={loadingRef}
        className="fixed inset-0 bg-[#0C090D] text-white flex flex-col items-center justify-center z-50 overflow-hidden"
      >
        <div className="text-center px-4 w-full max-w-full">
          <h1 className="font-orbitron text-lg xs:text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-2 leading-tight break-words">
            ADITYA NARAYAN MALI
          </h1>
          <p className="font-poppins text-xs xs:text-sm md:text-base">PORTFOLIO WEBSITE</p>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="loading-bar h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  // Main content after loading is complete
  return (
    <>
      <LandingPage />
      <Menubar />
      <AboutPage />
      <SkillsPage /> 
      <ProjectsPage />
      <ContactPage />
    </>
  );
}