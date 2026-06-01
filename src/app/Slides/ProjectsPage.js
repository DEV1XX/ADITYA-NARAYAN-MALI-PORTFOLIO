"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── PROJECT DATA ──────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "db-buddy",
    title: "DB BUDDY",
    description:
      "An AI-powered SaaS platform that converts Natural Language to SQL and returns query results.",
    techStack: ["AI Integration", "MongoDB", "Express.js", "React", "Node.js", "JWT"],
    link: "https://db-buddy.tech",
    status: "Live",
    screenshot: "/db-buddy-preview.png",
  },
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
    title: "ANIMATED PORTFOLIO",
    description:
      "A stunning animated portfolio website showcasing smooth transitions, interactive elements, and modern web design principles.",
    techStack: ["HTML5", "CSS3", "JavaScript", "GSAP", "Animations"],
    link: "",
    status: "Live",
    screenshot: "/portfolio-preview.png",
  },
  {
    id: "netflixclone",
    title: "NETFLIX CSS CLONE",
    description:
      "A pixel-perfect Netflix interface clone demonstrating advanced CSS skills, responsive design, and attention to detail.",
    techStack: ["HTML5", "CSS3", "Responsive Design", "Flexbox", "Grid"],
    link: "https://netflix-css-clone-aditya-git-main-dev1xxs-projects.vercel.app/",
    status: "Live",
    screenshot:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop",
  },
];

// ─── PROJECT CARD ──────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  const inner = (
    <div
      className="project-item group relative flex flex-col overflow-hidden rounded-xl
        transition-all duration-400 ease-out hover:scale-[1.01]"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
      />

      {/* Card body */}
      <div className="relative z-10 flex flex-col gap-5 p-7 sm:p-8 h-full">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <h3
            className="font-orbitron text-white leading-tight"
            style={{ fontSize: "clamp(15px, 1.8vw, 21px)", fontWeight: 400, letterSpacing: "0.08em" }}
          >
            # {project.title}
          </h3>
          <span
            className="shrink-0 rounded-full px-3 py-1 font-mono uppercase"
            style={{
              fontSize: "clamp(9px, 0.95vw, 11px)",
              letterSpacing: "0.1em",
              color: project.status === "Live" ? "rgba(134,239,172,0.8)" : "rgba(253,230,138,0.8)",
              background: project.status === "Live" ? "rgba(134,239,172,0.06)" : "rgba(253,230,138,0.06)",
              border: project.status === "Live" ? "1px solid rgba(134,239,172,0.15)" : "1px solid rgba(253,230,138,0.15)",
            }}
          >
            ● {project.status}
          </span>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />

        {/* Description */}
        <p
          className="font-mono leading-relaxed flex-1"
          style={{ fontSize: "clamp(12px, 1.1vw, 14px)", color: "rgba(255,255,255,0.4)", lineHeight: "1.8" }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-col gap-2.5">
          <span
            className="font-orbitron uppercase tracking-widest"
            style={{ fontSize: "clamp(9px, 0.9vw, 11px)", color: "rgba(255,255,255,0.2)" }}
          >
            Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="rounded-md px-3 py-1.5 font-mono"
                style={{
                  fontSize: "clamp(10px, 0.95vw, 12px)",
                  color: "rgba(255,255,255,0.4)",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Link indicator */}
        {project.link && (
          <div className="flex items-center gap-2 mt-1">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
            <span
              className="font-mono uppercase tracking-widest transition-colors duration-300 group-hover:text-white/60"
              style={{ fontSize: "clamp(9px, 0.9vw, 11px)", color: "rgba(255,255,255,0.2)" }}
            >
              view live ↗
            </span>
          </div>
        )}
      </div>

      {/* Screenshot overlay on hover */}
      {project.screenshot && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center rounded-xl
            opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none"
          style={{ background: "rgba(12,9,13,0.92)" }}
        >
          <div className="relative w-full h-full p-6 flex flex-col items-center justify-center gap-3">
            <span
              className="font-orbitron uppercase tracking-widest"
              style={{ fontSize: "clamp(9px, 0.9vw, 11px)", color: "rgba(255,255,255,0.25)" }}
            >
              Preview
            </span>
            <Image
              src={project.screenshot}
              alt={`${project.title} preview`}
              width={800}
              height={500}
              className="max-w-full max-h-[75%] object-contain rounded-lg pointer-events-auto"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            />
          </div>
        </div>
      )}

      {/* Hover border brightening */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
      />
    </div>
  );

  return project.link ? (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export const ProjectsPage = () => {
  const containerRef = useRef(null);
  const titleRef     = useRef(null);
  const subtitleRef  = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const timer = setTimeout(() => {
      gsap.set(containerRef.current, { opacity: 1, visibility: "visible" });

      const ctx = gsap.context(() => {
        const el    = containerRef.current;
        const cards = el.querySelectorAll(".project-item");

        gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 30 });
        gsap.set(cards, { opacity: 0, y: 40 });

        gsap.to(titleRef.current, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none", id: "pj-title" },
        });
        gsap.to(subtitleRef.current, {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.15,
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none", id: "pj-sub" },
        });
        gsap.to(cards, {
          opacity: 1, y: 0, duration: 0.55, ease: "power2.out",
          stagger: { amount: 0.8, from: "start" },
          scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none none none", id: "pj-cards" },
        });

        ScrollTrigger.refresh();
      }, containerRef);

      return () => {
        ctx.revert();
        ScrollTrigger.getAll()
          .filter((t) => t.vars?.id?.startsWith("pj-"))
          .forEach((t) => t.kill());
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="projectsPage">
      <div
        ref={containerRef}
        className="relative min-h-screen w-full overflow-hidden"
        style={{ background: "#0C090D" }}
      >
        {/* ── Background ── */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)", filter: "blur(60px)" }}
          />
          <div
            className="absolute -bottom-48 -right-24 h-[420px] w-[420px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)", filter: "blur(70px)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col items-center px-4 pb-20 pt-14 sm:px-8 md:px-12 lg:px-20">

          {/* Title block */}
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <div
              ref={titleRef}
              className="font-orbitron uppercase tracking-[0.25em] text-white"
              style={{ fontSize: "clamp(32px, 5.5vw, 62px)", fontWeight: 300 }}
            >
              PROJECTS
            </div>
            <div
              ref={subtitleRef}
              className="font-mono uppercase tracking-widest"
              style={{ fontSize: "clamp(10px, 1.2vw, 13px)", color: "rgba(255,255,255,0.3)", letterSpacing: "0.3em" }}
            >
              selected works &amp; builds
            </div>
            <div
              className="mt-2 h-px w-28"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
            />
          </div>

          {/* Projects grid */}
          <div className="w-full max-w-5xl">
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(360px, 100%), 1fr))" }}
            >
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};