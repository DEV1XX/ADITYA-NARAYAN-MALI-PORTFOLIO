"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ProjectsPage = () => {
  const containerRef = useRef(null);
  const projectTitleRef = useRef(null);
  const projectsContainerRef = useRef(null);

  const projects = [
    {
      id: "transmart",
      title: "TRANSMART",
      description:
        "A comprehensive MERN stack expense tracking and management application with real-time analytics and budget planning features.",
      techStack: ["MongoDB", "Express.js", "React", "Node.js", "JWT"],
      link: "https://transmart-frontend.onrender.com",
      status: "Live",
      screenshot: "/transmart-preview.png",
    },
    {
      id: "desidelicacy",
      title: "DESIDELICACY",
      description:
        "A modern ReactJS food delivery application featuring interactive UI, menu browsing, and seamless user experience.",
      techStack: ["React", "CSS3", "JavaScript", "Responsive Design"],
      link: "https://desidelicacy.vercel.app",
      status: "Live",
      screenshot: "/desidelicacy-preview.png",
    },
    {
      id: "animatedportfolio",
      title: "ANIMATED PORTFOLIO WEBSITE",
      description:
        "A stunning animated portfolio website showcasing smooth transitions, interactive elements and modern web design principles.",
      techStack: ["HTML5", "CSS3", "JavaScript", "GSAP", "Animations"],
      link: "",
      status: "Live",
      screenshot: "/portfolio-preview.png",
    },
    {
      id: "netflixclone",
      title: "NETFLIX CSS CLONE",
      description:
        "A pixel-perfect Netflix interface clone demonstrating advanced CSS skills, responsive design and attention to detail.",
      techStack: ["HTML5", "CSS3", "Responsive Design", "Flexbox", "Grid"],
      link: "https://netflix-css-clone-aditya-git-main-dev1xxs-projects.vercel.app/",
      status: "Live",
      screenshot:
        "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=250&fit=crop",
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const timer = setTimeout(() => {
      gsap.set(containerRef.current, { opacity: 1, visibility: "visible" });

      const ctx = gsap.context(() => {
        gsap.set(projectTitleRef.current, { opacity: 0, scale: 0 });
        gsap.set(
          containerRef.current.querySelectorAll(".project-item"),
          { opacity: 0, y: 100 }
        );

        gsap.to(projectTitleRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none none",
            id: "projects-page-title-animation",
            refreshPriority: 1,
          },
        });

        const projectItems =
          containerRef.current.querySelectorAll(".project-item");
        if (projectItems.length > 0) {
          gsap.to(projectItems, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.2)",
            stagger: {
              amount: 1.2,
              from: "start",
            },
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none none",
              id: "projects-page-items-stagger-animation",
              refreshPriority: 1,
            },
          });
        }

        ScrollTrigger.refresh();
      }, containerRef);

      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((trigger) => {
          if (
            trigger.vars &&
            (trigger.vars.id === "projects-page-title-animation" ||
              trigger.vars.id === "projects-page-items-stagger-animation")
          ) {
            trigger.kill();
          }
        });
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="projectsPage">
      <div
        ref={containerRef}
        className="min-h-screen w-full bg-[#0C090D] overflow-y-auto"
      >
        {/* Projects Title */}
        <div
          ref={projectTitleRef}
          className="text-white font-orbitron text-center"
          style={{
            fontSize: "5vmax",
            fontWeight: 300,
            paddingTop: "3vw",
            paddingBottom: "2vw",
          }}
        >
          PROJECTS
        </div>

        {/* Projects Container */}
        <div
          ref={projectsContainerRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project) => {
              const isSmallScreen =
                typeof window !== "undefined" && window.innerWidth <= 768;
              const isMediumScreen =
                typeof window !== "undefined" && window.innerWidth <= 1024;

              const CardContent = (
                <div
                  className="project-item group relative overflow-hidden rounded-2xl border border-gray-700/50 
                  backdrop-blur-md transition-all duration-500 ease-out hover:scale-[1.02]
                  hover:border-white/30 hover:shadow-2xl hover:shadow-purple-500/10"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {/* Project Content */}
                  <div className="relative p-6 sm:p-8 h-full z-10">
                    {/* Header */}
                    <div className="mb-4 sm:mb-6">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <h3
                          className="font-bebas text-white tracking-wider"
                          style={{
                            fontSize: isSmallScreen
                              ? "6vw"
                              : isMediumScreen
                              ? "4vw"
                              : "2.5vw",
                          }}
                        >
                          # {project.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full font-poppins border
                          ${
                            project.status === "Live"
                              ? "bg-green-500/20 text-green-300 border-green-500/30"
                              : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                          }`}
                          style={{
                            fontSize: isSmallScreen
                              ? "2.5vw"
                              : isMediumScreen
                              ? "2vw"
                              : "0.875rem",
                          }}
                        >
                          {project.status}
                        </span>
                      </div>

                      {/* Description */}
                      <p
                        className="text-gray-300 font-poppins leading-relaxed mb-4 sm:mb-6"
                        style={{
                          fontSize: isSmallScreen
                            ? "3.5vw"
                            : isMediumScreen
                            ? "2.5vw"
                            : "1rem",
                        }}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-6 sm:mb-8">
                      <h4
                        className="text-white/80 font-poppins font-medium mb-3"
                        style={{
                          fontSize: isSmallScreen
                            ? "3.2vw"
                            : isMediumScreen
                            ? "2.2vw"
                            : "1rem",
                        }}
                      >
                        Tech Stack:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 backdrop-blur-sm rounded-lg 
                            text-gray-300 font-poppins border border-white/10
                            hover:bg-white/20 transition-colors duration-300"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                              fontSize: isSmallScreen
                                ? "2.8vw"
                                : isMediumScreen
                                ? "2vw"
                                : "0.875rem",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Screenshot Overlay */}
                    {project.screenshot && (
                      <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm rounded-2xl 
                        flex items-center justify-center transition-all duration-500 ease-out
                        opacity-0 group-hover:opacity-100 pointer-events-none"
                      >
                        <div className="relative w-full h-full p-6 flex items-center justify-center">
                          <Image
                            src={project.screenshot}
                            alt={`${project.title} preview`}
                            width={800}
                            height={600}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl
                            ring-1 ring-white/20 pointer-events-auto"
                            style={{
                              filter: "brightness(0.9) contrast(1.1)",
                            }}
                          />
                          <div
                            className="absolute top-6 right-6 text-white/60 font-poppins"
                            style={{
                              fontSize: isSmallScreen ? "2.8vw" : "0.875rem",
                            }}
                          >
                            Preview
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-purple-500/0 
                  group-hover:from-purple-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 
                  transition-all duration-700 pointer-events-none"
                  ></div>
                </div>
              );

              return project.link ? (
                <a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {CardContent}
                </a>
              ) : (
                <div key={project.id}>{CardContent}</div>
              );
            })}
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-xl animate-pulse pointer-events-none"></div>
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-xl animate-pulse pointer-events-none"
          style={{ animationDelay: "700ms" }}
        ></div>
      </div>
    </section>
  );
};
