"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const AboutPage = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const rollingTextRef = useRef(null);
  const aboutDivRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Add a small delay to prevent conflicts with other components
    const timer = setTimeout(() => {
      // Initial setup - override CSS hiding and set up GSAP
      gsap.set(containerRef.current, { opacity: 1, visibility: 'visible' });

      const ctx = gsap.context(() => {
        // Initial elements setup
        gsap.set(
          [titleRef.current, paragraphRef.current],
          { opacity: 0, y: 50 }
        );

        // Set rolling text initial state only for desktop
        if (window.innerWidth > 768 && rollingTextRef.current) {
          gsap.set(rollingTextRef.current, { opacity: 0, y: 50 });
        }

        // Main timeline starting with container fade in
        const tl = gsap.timeline();
        
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        })
          .to(
            paragraphRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
            },
            "-=0.5"
          );

        // Add rolling text animation only for desktop
        if (window.innerWidth > 768 && rollingTextRef.current) {
          tl.to(
            rollingTextRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.8"
          );
        }

        // ScrollTrigger scaling - use specific container as reference
        gsap.fromTo(
          aboutDivRef.current,
          { scale: 0.95, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: aboutDivRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              id: "about-page-scale-animation",
              refreshPriority: 0, // Higher priority for about page
            },
          }
        );

        // Rolling text scroll - only on desktop
        if (window.innerWidth > 768 && rollingTextRef.current) {
          gsap.to(rollingTextRef.current, {
            x: "-20%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
              id: "about-page-rolling-text",
              refreshPriority: 0,
            },
          });
        }

        // Text reveal with unique class names
        if (paragraphRef.current) {
          const chars = paragraphRef.current.innerText.split("");
          paragraphRef.current.innerHTML = chars
            .map((char) =>
              char === " " ? " " : `<span class="about-page-char">${char}</span>` // More unique class name
            )
            .join("");

          gsap.fromTo(
            containerRef.current.querySelectorAll(".about-page-char"), // Use container-specific selector
            { opacity: 0.3 },
            {
              opacity: 1,
              duration: 0.05,
              stagger: 0.02,
              scrollTrigger: {
                trigger: paragraphRef.current,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1,
                id: "about-page-chars-reveal",
                refreshPriority: 0,
              },
            }
          );
        }

        // Refresh ScrollTrigger after all animations are set up
        ScrollTrigger.refresh();
      }, containerRef);

      return () => {
        ctx.revert();
        // Kill only ScrollTriggers with our specific IDs
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars && (
            trigger.vars.id === "about-page-scale-animation" || 
            trigger.vars.id === "about-page-rolling-text" || 
            trigger.vars.id === "about-page-chars-reveal"
          )) {
            trigger.kill();
          }
        });
      };
    }, 50); // Shorter delay for about page since it appears first

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="aboutPage">
    <div
      ref={containerRef}
      className="about-page-content min-h-screen overflow-x-hidden bg-[#0C090D]"
    >
      {/* Main content container */}
      <div ref={aboutDivRef} className="w-full bg-[#0C090D]">
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-white text-center font-orbitron font-light text-[12vw] md:text-[5vmax] pt-[8vw] md:pt-[3vw]"
          style={{
            fontWeight: 300,
          }}
        >
          ABOUT ME
        </h1>

        {/* Paragraph with Glass Effect */}
        <div className="relative">
          <div
            className="absolute backdrop-blur-sm border border-gray-700/20 top-[10px] left-[10px] right-[10px] md:top-[20px] md:left-[20px] md:right-[20px] bottom-0 rounded-lg"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          ></div>

          <p
            ref={paragraphRef}
            className="text-white text-justify relative z-10 font-poppins text-[4.5vw] md:text-[1.3vw] p-5 md:p-20 pb-0 leading-[1.6] md:leading-[1.6]"
          >
            Hello! I'm Aditya Narayan Mali, a passionate Full Stack Developer
            from Nabarangpur, Odisha. I have completed my schooling from
            "Kendriya Vidyalaya Nabarangpur", and am pursuing my Bachelors
            degree in Information Technology from "ODISHA UNIVERSITY OF
            TECHNOLOGY AND RESEARCH, BHUBANESWAR". With a knack for turning
            complex problems into simple, beautiful, and intuitive solutions, I
            thrive at the intersection of design and development. Growing up in
            the vibrant landscapes of Odisha, I developed a curiosity for
            technology early on. This curiosity soon turned into a passion,
            leading me to explore the world of coding and software development.
            Over the years, I have honed my skills in both front-end and
            back-end technologies, allowing me to build seamless, responsive,
            and user-friendly web applications.
          </p>
        </div>
      </div>

      {/* Rolling text - Hidden on mobile */}
      <div className="w-full overflow-hidden relative hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/5 to-transparent pointer-events-none"></div>

        <div
          ref={rollingTextRef}
          className="whitespace-nowrap relative z-10 font-bebas"
          style={{
            fontSize: "12vw",
            color: "rgba(243, 235, 235, 0.87)",
            backgroundColor: "rgba(12, 9, 13, 0)",
            textShadow: "8px 2px 10px rgb(50, 30, 30)",
            marginLeft: "4vw",
            marginBottom: "6vw",
            width: "100%",
            transform: "translateX(0)",
          }}
        >
          A PASSIONATE WEB DEVELOPER
        </div>
      </div>
    </div>
    </section>
  );
};