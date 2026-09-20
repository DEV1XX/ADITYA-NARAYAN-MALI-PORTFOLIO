"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── EXPERIENCE DATA ───────────────────────────────────────────────────────────
// To add a new experience: append an object to this array.
const EXPERIENCES = [
  {
    id: "hcltech-2026",
    company: "HCLTech",
    role: "Agentic AI Intern",
    type: "Internship",
    location: "Remote",
    duration: "Jun 2026 – Aug 2026",
    status: "completed",          // "completed" | "current"
    description:
      "Built an Agentic AI-based vulnerability discovery and remediation pipeline at HCLTech using Multi-Agent Workflows, LLMs, and MCP.",
    certificateUrl: "https://drive.google.com/file/d/1ryslyhdG3gDEkLEg5QsaQn7U_a5utyCI/view?usp=drive_link",
    techStack: [
      "LLMs", "Prompt Engineering", "RAG", "MCP",
      "LangChain", "LangGraph", "Python", "Docker",
      "Multi-Agent Workflows",
    ],
    highlights: [
      "Designed multi-agent orchestration for automated vulnerability scanning",
      "Implemented RAG-based context retrieval for remediation suggestions",
      "Integrated MCP for structured tool-calling across agents",
      "Delivered complete pipeline within 2-month internship cycle",
    ],
    issuer: "HCL Technologies Limited — HR: Jyoti",
  },
];

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const T = {
  cardBg:          "rgba(255,255,255,0.02)",
  cardBorder:      "1px solid rgba(255,255,255,0.05)",
  cardBgActive:    "rgba(255,255,255,0.03)",
  cardBorderActive:"1px solid rgba(255,255,255,0.10)",
  accentLine:      "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
  accentLineActive:"linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
  dimLine:         "rgba(255,255,255,0.06)",
  label:  { fontSize:"clamp(9px,0.85vw,10px)",  color:"rgba(255,255,255,0.28)", letterSpacing:"0.12em" },
  body:   { fontSize:"clamp(13px,1.1vw,14px)",  color:"rgba(255,255,255,0.55)", lineHeight:"1.85" },
  meta:   { fontSize:"clamp(12px,1.05vw,13px)", color:"rgba(255,255,255,0.6)"  },
  badge:  { fontSize:"clamp(9px,0.82vw,10px)",  letterSpacing:"0.07em" },
  chip:   { fontSize:"clamp(11px,0.95vw,12px)", color:"rgba(255,255,255,0.5)",
            background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" },
};

// ─── EXPERIENCE CARD ───────────────────────────────────────────────────────────
function ExperienceCard({ exp, isLast }) {
  const isCurrent = exp.status === "current";

  return (
    <div className={`exp-milestone ${isLast ? "" : "mb-5 sm:mb-6"}`}>

      {/*
        MOBILE  (<sm): full-width card with a left accent border — no node column
        DESKTOP (sm+): node circle + card side by side, rail runs through nodes
      */}

      {/* ── Mobile layout: plain card with left border accent ── */}
      <div
        className="block sm:hidden rounded-xl flex flex-col gap-4 transition-all duration-300 group relative"
        style={{
          padding: "18px 16px",
          background: isCurrent ? T.cardBgActive : T.cardBg,
          border:     isCurrent ? T.cardBorderActive : T.cardBorder,
          borderLeft: isCurrent
            ? "2px solid rgba(255,255,255,0.45)"
            : "2px solid rgba(255,255,255,0.15)",
        }}
      >
        <MobileCardContent exp={exp} isCurrent={isCurrent} />
      </div>

      {/* ── Desktop layout: node + card ── */}
      <div className="hidden sm:flex gap-5">

        {/* Node */}
        <div className="relative z-10 shrink-0 pt-1" style={{ width: "32px" }}>
          <div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: "32px", height: "32px",
              background: isCurrent ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
              border: isCurrent ? "1px solid rgba(255,255,255,0.35)" : "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: "9px", height: "9px",
                background: isCurrent ? "#ffffff" : "rgba(255,255,255,0.55)",
                boxShadow: isCurrent ? "0 0 10px rgba(255,255,255,0.7), 0 0 22px rgba(255,255,255,0.2)" : "none",
              }}
            />
            {isCurrent && (
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{ border: "1px solid rgba(255,255,255,0.25)", animationDuration: "2s" }}
              />
            )}
          </div>
        </div>

        {/* Card */}
        <div
          className="group relative flex-1 min-w-0 rounded-xl flex flex-col gap-4 transition-all duration-300"
          style={{
            padding: "clamp(18px,2vw,28px)",
            background: isCurrent ? T.cardBgActive : T.cardBg,
            border:     isCurrent ? T.cardBorderActive : T.cardBorder,
          }}
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-px rounded-t-xl"
            style={{ background: isCurrent ? T.accentLineActive : T.accentLine }} />
          <DesktopCardContent exp={exp} isCurrent={isCurrent} />
          {/* Hover border */}
          <div
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ border: "1px solid rgba(255,255,255,0.11)" }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── SHARED INNER CONTENT (identical markup, reused in both layouts) ───────────
function CardInner({ exp, isCurrent }) {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span
              className="font-orbitron text-white leading-snug"
              style={{ fontSize: "clamp(14px,1.5vw,18px)", fontWeight: 500, letterSpacing: "0.06em" }}
            >
              {exp.company}
            </span>
            <span className="font-mono" style={T.meta}>{exp.role}</span>
          </div>
          {/* Badges */}
          <div className="flex flex-wrap gap-2 items-start shrink-0">
            <span className="rounded-full px-2.5 py-0.5 font-mono uppercase"
              style={{
                ...T.badge,
                color:      isCurrent ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
                background: isCurrent ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.04)",
                border:     isCurrent ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.08)",
              }}>
              {isCurrent ? "● Current" : "✓ Completed"}
            </span>
            <span className="rounded-full px-2.5 py-0.5 font-mono"
              style={{ ...T.badge, color:"rgba(255,255,255,0.35)", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" }}>
              {exp.type}
            </span>
          </div>
        </div>

        {/* Meta: duration + location */}
        <div className="flex flex-wrap gap-x-6 gap-y-1.5 mt-1">
          {[{ label:"Duration", value:exp.duration }, { label:"Location", value:exp.location }].map((m) => (
            <div key={m.label} className="flex flex-col gap-0.5">
              <span className="font-orbitron uppercase tracking-widest" style={T.label}>{m.label}</span>
              <span className="font-mono" style={T.meta}>{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px" style={{ background: T.dimLine }} />

      {/* Description */}
      <p className="font-mono" style={T.body}>{exp.description}</p>

      {/* Highlights */}
      <div className="flex flex-col gap-2">
        <span className="font-orbitron uppercase tracking-widest" style={T.label}>Key Contributions</span>
        <ul className="flex flex-col gap-2">
          {exp.highlights.map((h, i) => (
            <li key={i} className="flex gap-2.5 items-start">
              <span style={{ color:"rgba(255,255,255,0.22)", fontSize:"10px", flexShrink:0, marginTop:"3px" }}>▸</span>
              <span className="font-mono" style={{ ...T.body, color:"rgba(255,255,255,0.52)" }}>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px" style={{ background: T.dimLine }} />

      {/* Tech stack */}
      <div className="flex flex-col gap-2">
        <span className="font-orbitron uppercase tracking-widest" style={T.label}>Stack</span>
        <div className="flex flex-wrap gap-2">
          {exp.techStack.map((t) => (
            <span key={t} className="font-mono rounded-md px-3 py-1.5" style={T.chip}>{t}</span>
          ))}
        </div>
      </div>

      {/* Issuer + Certificate */}
      <div className="flex flex-wrap items-center justify-between gap-3" style={{ marginTop:"-4px" }}>
        {exp.issuer && (
          <p className="font-mono" style={{ fontSize:"clamp(10px,0.85vw,11px)", color:"rgba(255,255,255,0.2)" }}>
            {exp.issuer}
          </p>
        )}
        {exp.certificateUrl && (
          <a
            href={exp.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono rounded-md px-3 py-1.5 transition-all duration-200"
            style={{
              fontSize: "clamp(9px,0.85vw,11px)",
              color: "rgba(255,255,255,0.5)",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            View Certificate ↗
          </a>
        )}
      </div>
    </>
  );
}

// Mobile wrapper (no top accent line — left border does that job)
function MobileCardContent({ exp, isCurrent }) {
  return <CardInner exp={exp} isCurrent={isCurrent} />;
}

// Desktop wrapper (top accent line already placed by parent)
function DesktopCardContent({ exp, isCurrent }) {
  return <CardInner exp={exp} isCurrent={isCurrent} />;
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export const ExperiencePage = () => {
  const containerRef = useRef(null);
  const titleRef     = useRef(null);
  const subtitleRef  = useRef(null);
  const timelineRef  = useRef(null);
  const trackFillRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const timer = setTimeout(() => {
      gsap.set(containerRef.current, { opacity: 1, visibility: "visible" });

      const ctx = gsap.context(() => {
        const el         = containerRef.current;
        const milestones = el.querySelectorAll(".exp-milestone");

        gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 30 });
        gsap.set(milestones, { opacity: 0, y: 24 });

        gsap.to(titleRef.current, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none", id: "exp-title" },
        });
        gsap.to(subtitleRef.current, {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.15,
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none", id: "exp-sub" },
        });
        gsap.to(milestones, {
          opacity: 1, y: 0, duration: 0.65, ease: "power2.out",
          stagger: { amount: 0.55, from: "start" },
          scrollTrigger: { trigger: timelineRef.current, start: "top 78%", toggleActions: "play none none none", id: "exp-nodes" },
        });

        // Rail fill only runs on sm+ (node layout)
        if (trackFillRef.current) {
          gsap.fromTo(trackFillRef.current,
            { scaleY: 0 },
            {
              scaleY: 1, ease: "none", transformOrigin: "top center",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 70%", end: "bottom 60%",
                scrub: 0.8, id: "exp-fill",
              },
            }
          );
        }

        ScrollTrigger.refresh();
      }, containerRef);

      return () => {
        ctx.revert();
        ScrollTrigger.getAll().filter((t) => t.vars?.id?.startsWith("exp-")).forEach((t) => t.kill());
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const fillHeight = EXPERIENCES.length === 1 ? "30%" : "65%";

  return (
    <section id="experiencePage">
      <div
        ref={containerRef}
        className="relative min-h-screen w-full overflow-hidden"
        style={{ background: "#0C090D" }}
      >
        {/* Background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full"
            style={{ background:"radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)", filter:"blur(60px)" }} />
          <div className="absolute -bottom-48 -right-24 h-[420px] w-[420px] rounded-full"
            style={{ background:"radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)", filter:"blur(70px)" }} />
          <div className="absolute inset-0"
            style={{
              backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize:"48px 48px",
            }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-4 pb-20 pt-14 sm:px-8 md:px-12 lg:px-20">

          {/* Title */}
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <div ref={titleRef} className="font-orbitron uppercase tracking-[0.25em] text-white"
              style={{ fontSize:"clamp(32px,5.5vw,62px)", fontWeight:300 }}>
              EXPERIENCE
            </div>
            <div ref={subtitleRef} className="font-mono uppercase tracking-widest"
              style={{ fontSize:"clamp(10px,1.2vw,13px)", color:"rgba(255,255,255,0.35)", letterSpacing:"0.3em" }}>
              internships &amp; professional work
            </div>
            <div className="mt-2 h-px w-28"
              style={{ background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} />
          </div>

          {/* Timeline */}
          <div className="w-full max-w-3xl">

            {/* Mobile: simple stacked cards — no rail */}
            <div className="flex flex-col gap-4 sm:hidden">
              {EXPERIENCES.map((exp) => (
                <ExperienceCard key={exp.id} exp={exp} isLast={false} />
              ))}
              {EXPERIENCES.length < 2 && (
                <div className="rounded-xl px-5 py-4 flex items-center"
                  style={{ background:"rgba(255,255,255,0.01)", border:"1px dashed rgba(255,255,255,0.06)", borderLeft:"2px dashed rgba(255,255,255,0.1)" }}>
                  <span className="font-mono uppercase tracking-widest"
                    style={{ fontSize:"clamp(9px,0.9vw,11px)", color:"rgba(255,255,255,0.18)" }}>
                    More experiences coming soon...
                  </span>
                </div>
              )}
            </div>

            {/* Desktop: node + rail layout */}
            <div ref={timelineRef} className="relative flex-col hidden sm:flex">
              {/* Dim rail */}
              <div className="absolute top-[16px] w-px"
                style={{ left:"15px", bottom:"16px", background:"rgba(255,255,255,0.08)" }} />
              {/* White fill */}
              <div className="absolute top-[16px] w-px overflow-hidden"
                style={{ left:"15px", height:fillHeight, transformOrigin:"top center" }}>
                <div ref={trackFillRef} className="w-full h-full"
                  style={{
                    background:"linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 80%, transparent 100%)",
                    transformOrigin:"top center",
                    transform:"scaleY(0)",
                    boxShadow:"0 0 6px rgba(255,255,255,0.3)",
                  }} />
              </div>

              {EXPERIENCES.map((exp, i) => (
                <ExperienceCard key={exp.id} exp={exp} isLast={i === EXPERIENCES.length - 1 && EXPERIENCES.length > 1} />
              ))}

              {EXPERIENCES.length < 2 && (
                <div className="exp-milestone flex gap-5">
                  <div className="relative z-10 shrink-0 pt-1" style={{ width:"32px" }}>
                    <div className="flex items-center justify-center rounded-full"
                      style={{ width:"32px", height:"32px", border:"1px dashed rgba(255,255,255,0.13)" }}>
                      <div className="rounded-full" style={{ width:"6px", height:"6px", background:"rgba(255,255,255,0.13)" }} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 rounded-xl px-5 py-4 flex items-center"
                    style={{ background:"rgba(255,255,255,0.01)", border:"1px dashed rgba(255,255,255,0.06)" }}>
                    <span className="font-mono uppercase tracking-widest"
                      style={{ fontSize:"clamp(9px,0.9vw,11px)", color:"rgba(255,255,255,0.18)" }}>
                      More experiences coming soon...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};