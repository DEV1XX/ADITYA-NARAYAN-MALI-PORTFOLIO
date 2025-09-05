"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const SkillsPage = () => {
  const containerRef = useRef(null);
  const skillTitleRef = useRef(null);
  const skillsContainerRef = useRef(null);

  const skills = [
    { id: "htmlicon", name: "HTML", image: "html3.png" },
    { id: "cssicon", name: "CSS", image: "css.png" },
    { id: "jsicon", name: "JAVASCRIPT", image: "js.jpeg" },
    { id: "gsapicon", name: "GSAP", image: "gsap.png" },
    { id: "reacticon", name: "REACT JS", image: "react6.png" },
    { id: "githubicon", name: "GITHUB", image: "github.png" },
    { id: "mongodbicon", name: "MONGO DB", image: "mongodbicon.png" },
    { id: "expressjsicon", name: "EXPRESS JS", image: "expressjsicon.png" },
    { id: "bootstrapicon", name: "BOOTSTRAP", image: "bootstrapicon.png" },
    { id: "tailwindicon", name: "TAILWIND", image: "tailwindicon.png" },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Add a small delay to ensure other components are fully mounted
    const timer = setTimeout(() => {
      // Override any CSS hiding for this component
      gsap.set(containerRef.current, { opacity: 1, visibility: 'visible' });

      const ctx = gsap.context(() => {
        // Set initial state for all elements using container-scoped selectors
        gsap.set(skillTitleRef.current, { opacity: 0, scale: 0 });
        gsap.set(containerRef.current.querySelectorAll(".skills-item"), { opacity: 0, scale: 0 });

        // Title animation - triggers when skills page enters viewport
        gsap.to(skillTitleRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none none",
            id: "skills-page-title-animation",
            refreshPriority: 1, // Lower priority to avoid conflicts
          },
        });

        // Skills animation - all items animate together when container is in view
        const skillItems = containerRef.current.querySelectorAll(".skills-item");
        if (skillItems.length > 0) {
          gsap.to(skillItems, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.2)",
            stagger: {
              amount: 0.8, // Total time for all animations
              from: "start",
            },
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none none",
              id: "skills-page-items-stagger-animation",
              refreshPriority: 1, // Lower priority to avoid conflicts
            },
          });
        }

        // Refresh ScrollTrigger after setup to ensure proper positioning
        ScrollTrigger.refresh();
      }, containerRef);

      return () => {
        ctx.revert();
        // Kill only our specific ScrollTriggers
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars && (
            trigger.vars.id === "skills-page-title-animation" || 
            trigger.vars.id === "skills-page-items-stagger-animation"
          )) {
            trigger.kill();
          }
        });
      };
    }, 100); // Small delay to avoid conflicts

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="skillsPage">
    <div ref={containerRef} className="h-screen w-full bg-[#0C090D] overflow-hidden flex flex-col">
      {/* Skills Title */}
      <div
        ref={skillTitleRef}
        className="text-white font-orbitron text-center flex-shrink-0"
        style={{
          fontSize: "5vmax",
          fontWeight: 300,
          paddingTop: "2vh",
          paddingBottom: "1vh",
        }}
      >
        SKILLS
      </div>

      {/* Skills Container with Glassmorphism */}
      <div className="relative flex-1 mx-4 md:mx-8 lg:mx-16 mb-4 overflow-hidden">
        {/* Glassmorphism Background */}
        <div
          className="absolute inset-0 backdrop-blur-sm border border-gray-700/20 rounded-lg"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        ></div>

        {/* Skills Grid */}
        <div
          ref={skillsContainerRef}
          className="relative z-10 h-full flex flex-wrap justify-center content-center items-center p-2 md:p-4 lg:ml-[85px]"
          style={{
            gap: "0.75rem",
          }}
        >
          {skills.map((skill, index) => {
            return (
            <div
              key={skill.id}
              className="skills-item flex flex-col bg-[#834a97] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.5625rem)] lg:w-[10vw] h-[calc(50vw/2.2)] sm:h-[calc(33.333vw/1.8)] md:h-[calc(25vw/1.8)] lg:h-[10vw]"
              style={{
                minHeight: "90px",
                minWidth: "90px",
                maxHeight: "140px",
                maxWidth: "140px",
              }}
            >
              {/* Skill Icon */}
              <div
                className="bg-[#0C090D] flex-1 bg-cover bg-center p-2 sm:p-3 md:p-4"
                style={{
                  backgroundImage: `url(${skill.image})`,
                  backgroundSize: skill.id === "reacticon" ? "auto" : "cover",
                  minHeight: "50px",
                }}
              ></div>

              {/* Skill Name */}
              <div className="bg-[#0C090D] flex justify-center items-center font-orbitron text-white text-center px-1 py-1">
                <span
                  className="leading-tight text-[2.5vw] sm:text-[1.8vw] md:text-[1.5vw] lg:text-[1.2vw]"
                  style={{
                    fontWeight: 400,
                    height: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    lineHeight: "1.1",
                    minFontSize: "10px",
                    maxFontSize: "14px",
                  }}
                >
                  {skill.name}
                </span>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
    </section>
  );
};