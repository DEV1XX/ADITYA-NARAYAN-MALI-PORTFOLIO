"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── EDUCATION DATA ────────────────────────────────────────────────────────────
const EDUCATION = [
  {
    id: "tenth",
    level: "10th Grade",
    institution: "Kendriya Vidyalaya Nabarangpur",
    board: "CBSE Board",
    year: "2020",
    score: "96.8%",
    status: "completed",
    detail: "Central Board of Secondary Education",
  },
  {
    id: "twelfth",
    level: "12th Grade",
    institution: "Kendriya Vidyalaya Nabarangpur",
    board: "CBSE Board",
    year: "2022",
    score: "94.4%",
    status: "completed",
    detail: "Science Stream — PCM with CS",
  },
  {
    id: "btech",
    level: "B.Tech — Information Technology",
    institution: "OUTR, Bhubaneswar",
    board: "Odisha University of Technology and Research",
    year: "2023 – Present",
    score: "3rd Year",
    cgpa: "9.28",
    status: "inprogress",
    detail: "Currently pursuing — expected 2027",
  },
];

const META = [
  { label: "Location",   value: "Nabarangpur, Odisha" },
  { label: "Degree",     value: "B.Tech — IT" },
  { label: "University", value: "OUTR, Bhubaneswar" },
  { label: "Focus",      value: "Full Stack Development | DSA | AI/ML" },
];

export const AboutPage = () => {
  const containerRef = useRef(null);
  const titleRef     = useRef(null);
  const subtitleRef  = useRef(null);
  const dividerRef   = useRef(null);
  const paragraphRef = useRef(null);
  const metaRef      = useRef(null);
  const rollingRef    = useRef(null);
  const eduRef        = useRef(null);
  const trackFillRef  = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const timer = setTimeout(() => {
      gsap.set(containerRef.current, { opacity: 1, visibility: "visible" });

      const ctx = gsap.context(() => {
        const el = containerRef.current;

        // initial states
        gsap.set([titleRef.current, subtitleRef.current, dividerRef.current], { opacity: 0, y: 32 });
        gsap.set(paragraphRef.current, { opacity: 0, y: 24 });
        gsap.set(metaRef.current, { opacity: 0, y: 20 });
        if (rollingRef.current) gsap.set(rollingRef.current, { opacity: 0, y: 40 });

        // entrance timeline
        const tl = gsap.timeline({ delay: 0.05 });
        tl.to(titleRef.current,    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
          .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.5")
          .to(dividerRef.current,  { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.4")
          .to(paragraphRef.current,{ opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
          .to(metaRef.current,     { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");

        if (rollingRef.current) {
          tl.to(rollingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
        }

        // char-by-char reveal on scroll
        if (paragraphRef.current) {
          const text = paragraphRef.current.innerText;
          paragraphRef.current.innerHTML = text
            .split("")
            .map((c) => (c === " " ? " " : `<span class="ab-char">${c}</span>`))
            .join("");

          gsap.fromTo(
            el.querySelectorAll(".ab-char"),
            { opacity: 0.2 },
            {
              opacity: 1,
              stagger: 0.012,
              scrollTrigger: {
                trigger: paragraphRef.current,
                start: "top 78%",
                end: "bottom 30%",
                scrub: 1,
                id: "ab-chars",
              },
            }
          );
        }

        // education milestones stagger on scroll
        const milestones = el.querySelectorAll(".edu-milestone");
        if (milestones.length) {
          gsap.set(milestones, { opacity: 0, x: 28 });
          gsap.to(milestones, {
            opacity: 1,
            x: 0,
            duration: 0.65,
            ease: "power2.out",
            stagger: { amount: 0.7, from: "start" },
            scrollTrigger: {
              trigger: eduRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
              id: "ab-edu",
            },
          });
        }

        // scroll-driven fill line — grows from top, stops ~65% (between 12th and btech nodes)
        if (trackFillRef.current) {
          gsap.fromTo(
            trackFillRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top center",
              scrollTrigger: {
                trigger: eduRef.current,
                start: "top 70%",
                end: "bottom 60%",
                scrub: 0.8,
                id: "ab-fill",
              },
            }
          );
        }

        // rolling text — faster scrub + larger x travel
        if (rollingRef.current) {
          gsap.to(rollingRef.current, {
            x: "-50%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.3,
              id: "ab-roll",
            },
          });
        }

        ScrollTrigger.refresh();
      }, containerRef);

      return () => {
        ctx.revert();
        ScrollTrigger.getAll()
          .filter((t) => t.vars?.id?.startsWith("ab-"))
          .forEach((t) => t.kill());
      };
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="aboutPage">
      <div
        ref={containerRef}
        className="relative w-full overflow-x-hidden"
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
        <div className="relative z-10 flex flex-col items-center px-4 pb-0 pt-14 sm:px-8 md:px-12 lg:px-20">

          {/* Title block */}
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <div
              ref={titleRef}
              className="font-orbitron uppercase tracking-[0.25em] text-white"
              style={{ fontSize: "clamp(32px, 5.5vw, 62px)", fontWeight: 300 }}
            >
              ABOUT ME
            </div>
            <div
              ref={subtitleRef}
              className="font-mono uppercase tracking-widest"
              style={{ fontSize: "clamp(10px, 1.2vw, 13px)", color: "rgba(255,255,255,0.45)", letterSpacing: "0.3em" }}
            >
              developer &amp; problem solver
            </div>
            <div
              ref={dividerRef}
              className="mt-2 h-px w-28"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
            />
          </div>

          {/* ── Two-column layout ── */}
          <div className="w-full max-w-5xl flex flex-col gap-8">

            {/* Row 1: Bio + Education side by side on md+ */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-start">

              {/* LEFT — Bio + Meta */}
              <div className="flex flex-col gap-5 flex-1 min-w-0">

                {/* Bio card */}
                <div
                  className="relative rounded-xl p-6 sm:p-8"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px rounded-t-xl"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
                  />

                  {/* Section label */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)" }} />
                    <span
                      className="font-orbitron uppercase tracking-widest shrink-0"
                      style={{ fontSize: "clamp(10px, 1.1vw, 12px)", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}
                    >
                      Background
                    </span>
                    <div className="h-px w-6 shrink-0" style={{ background: "rgba(255,255,255,0.12)" }} />
                  </div>

                  <p
                    ref={paragraphRef}
                    className="font-mono text-justify leading-relaxed"
                    style={{
                      fontSize: "clamp(12px, 1.1vw, 14px)",
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: "1.9",
                    }}
                  >
                    Hello! I'm Aditya Narayan Mali, a passionate Full Stack Developer from Nabarangpur, Odisha.
                    I have completed my schooling from Kendriya Vidyalaya Nabarangpur, and am pursuing my
                    Bachelor's degree in Information Technology from Odisha University of Technology and Research,
                    Bhubaneswar. With a knack for turning complex problems into simple, beautiful, and intuitive
                    solutions, I thrive at the intersection of design and development. Growing up in the vibrant
                    landscapes of Odisha, I developed a curiosity for technology early on. This curiosity soon
                    turned into a passion, leading me to explore the world of coding and software development.
                    Over the years, I have honed my skills in both front-end and back-end technologies, allowing
                    me to build seamless, responsive, and user-friendly web applications.
                  </p>
                </div>

                {/* Meta chips */}
                <div
                  ref={metaRef}
                  className="grid gap-3"
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))" }}
                >
                  {META.map((item) => (
                    <div
                      key={item.label}
                      className="group relative flex flex-col gap-1.5 rounded-xl p-5 transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <span
                        className="font-orbitron uppercase tracking-widest"
                        style={{ fontSize: "clamp(8px, 0.85vw, 10px)", color: "rgba(255,255,255,0.3)" }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="font-mono leading-snug"
                        style={{ fontSize: "clamp(11px, 1.05vw, 13px)", color: "rgba(255,255,255,0.75)" }}
                      >
                        {item.value}
                      </span>
                      <div
                        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — Education timeline */}
              <div
                ref={eduRef}
                className="flex flex-col gap-0 md:w-[42%] shrink-0"
              >
                {/* Section label */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)" }} />
                  <span
                    className="font-orbitron uppercase tracking-widest shrink-0"
                    style={{ fontSize: "clamp(10px, 1.1vw, 12px)", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}
                  >
                    Education
                  </span>
                  <div className="h-px w-6 shrink-0" style={{ background: "rgba(255,255,255,0.12)" }} />
                </div>

                {/* Timeline track */}
                <div className="relative flex flex-col">

                  {/* Track: dim background rail */}
                  <div
                    className="absolute left-[17px] top-[18px] w-px"
                    style={{
                      bottom: "18px",
                      background: "rgba(255,255,255,0.08)",
                    }}
                  />

                  {/* Fill: white line that grows on scroll, stops ~65% down (between 12th and btech) */}
                  <div
                    className="absolute left-[17px] top-[18px] w-px overflow-hidden"
                    style={{ height: "65%", transformOrigin: "top center" }}
                  >
                    <div
                      ref={trackFillRef}
                      className="w-full h-full"
                      style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 80%, rgba(255,255,255,0.1) 100%)",
                        transformOrigin: "top center",
                        transform: "scaleY(0)",
                        boxShadow: "0 0 6px rgba(255,255,255,0.4)",
                      }}
                    />
                  </div>

                  {EDUCATION.map((edu, i) => {
                    const isProgress = edu.status === "inprogress";
                    const isLast = i === EDUCATION.length - 1;

                    return (
                      <div key={edu.id} className={`edu-milestone flex gap-4 ${isLast ? "" : "mb-5"}`}>

                        {/* Node column */}
                        <div className="relative z-10 flex flex-col items-center shrink-0 pt-1" style={{ width: "36px" }}>

                          {/* Outer ring */}
                          <div
                            className="relative flex items-center justify-center rounded-full"
                            style={{
                              width: "36px",
                              height: "36px",
                              background: isProgress ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
                              border: isProgress ? "1px solid rgba(255,255,255,0.35)" : "1px solid rgba(255,255,255,0.18)",
                            }}
                          >
                            {/* Inner dot */}
                            <div
                              className="rounded-full"
                              style={{
                                width: "10px",
                                height: "10px",
                                background: isProgress ? "#ffffff" : "rgba(255,255,255,0.55)",
                                boxShadow: isProgress ? "0 0 12px rgba(255,255,255,0.7), 0 0 24px rgba(255,255,255,0.2)" : "none",
                              }}
                            />

                            {/* Pulsing ring for in-progress */}
                            {isProgress && (
                              <div
                                className="absolute inset-0 rounded-full animate-ping"
                                style={{
                                  border: "1px solid rgba(255,255,255,0.25)",
                                  animationDuration: "2s",
                                }}
                              />
                            )}
                          </div>
                        </div>

                        {/* Content card */}
                        <div
                          className="group relative flex-1 rounded-xl p-5 pb-6 transition-all duration-300"
                          style={{
                            background: isProgress ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.02)",
                            border: isProgress ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          {/* Top accent */}
                          <div
                            className="absolute top-0 left-0 right-0 h-px rounded-t-xl"
                            style={{
                              background: isProgress
                                ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)"
                                : "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                            }}
                          />

                          {/* Header: level + status */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span
                              className="font-orbitron text-white leading-snug"
                              style={{ fontSize: "clamp(11px, 1.2vw, 14px)", fontWeight: 500, letterSpacing: "0.05em" }}
                            >
                              {edu.level}
                            </span>
                            <span
                              className="shrink-0 rounded-full px-2.5 py-0.5 font-mono uppercase"
                              style={{
                                fontSize: "clamp(8px, 0.78vw, 9px)",
                                letterSpacing: "0.07em",
                                color: isProgress ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
                                background: isProgress ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.04)",
                                border: isProgress ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.08)",
                              }}
                            >
                              {isProgress ? "● Live" : "✓ Done"}
                            </span>
                          </div>

                          {/* Institution */}
                          <div
                            className="font-mono mb-0.5"
                            style={{ fontSize: "clamp(11px, 1vw, 13px)", color: "rgba(255,255,255,0.7)" }}
                          >
                            {edu.institution}
                          </div>

                          {/* Board */}
                          {/* <div
                            className="font-mono mb-4"
                            style={{ fontSize: "clamp(9px, 0.82vw, 11px)", color: "rgba(255,255,255,0.35)" }}
                          >
                            {edu.board}
                          </div> */}

                          <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.06)" }} />

                          {/* Score + Year */}
                          <div className="flex items-end justify-between">
                            <div className="flex flex-col gap-0.5">
                              <span
                                className="font-orbitron uppercase tracking-widest"
                                style={{ fontSize: "clamp(7px, 0.72vw, 9px)", color: "rgba(255,255,255,0.25)" }}
                              >
                                {isProgress ? "Current" : "Score"}
                              </span>
                              <span
                                className="font-orbitron"
                                style={{
                                  fontSize: "clamp(18px, 2vw, 26px)",
                                  fontWeight: 300,
                                  color: isProgress ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)",
                                  letterSpacing: "0.04em",
                                }}
                              >
                                {edu.score}
                              </span>
                              {/* CGPA line for btech */}
                              {edu.cgpa && (
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span
                                    className="font-orbitron uppercase tracking-widest"
                                    style={{ fontSize: "clamp(7px, 0.72vw, 9px)", color: "rgba(255,255,255,0.25)" }}
                                  >
                                    CGPA
                                  </span>
                                  <span
                                    className="font-orbitron"
                                    style={{
                                      fontSize: "clamp(13px, 1.4vw, 17px)",
                                      fontWeight: 400,
                                      color: "rgba(255,255,255,0.85)",
                                      letterSpacing: "0.04em",
                                    }}
                                  >
                                    {edu.cgpa}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-0.5 items-end">
                              <span
                                className="font-orbitron uppercase tracking-widest"
                                style={{ fontSize: "clamp(7px, 0.72vw, 9px)", color: "rgba(255,255,255,0.25)" }}
                              >
                                Year
                              </span>
                              <span
                                className="font-mono"
                                style={{ fontSize: "clamp(11px, 1vw, 13px)", color: "rgba(255,255,255,0.55)" }}
                              >
                                {edu.year}
                              </span>
                            </div>
                          </div>

                          {/* Detail */}
                          <div
                            className="mt-3 font-mono"
                            style={{ fontSize: "clamp(9px, 0.82vw, 11px)", color: "rgba(255,255,255,0.32)" }}
                          >
                            {edu.detail}
                          </div>

                          {/* Hover border */}
                          <div
                            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{ border: "1px solid rgba(255,255,255,0.11)" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Rolling text ── */}
        <div className="relative w-full overflow-hidden hidden md:block mt-14">
          <div
            ref={rollingRef}
            className="whitespace-nowrap font-orbitron"
            style={{
              fontSize: "clamp(60px, 10vw, 130px)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.22)",
              letterSpacing: "0.1em",
              paddingLeft: "4vw",
              paddingBottom: "4vw",
              userSelect: "none",
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PASSIONATE DEVELOPER &nbsp;&nbsp;&nbsp;&nbsp; A PASSIONATE FULL STACK DEVELOPER &nbsp;&nbsp;&nbsp;&nbsp; A PASSIONATE FULL STACK DEVELOPER
          </div>
        </div>

      </div>
    </section>
  );
};