"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── SKILL DATA ────────────────────────────────────────────────────────────────
const SKILL_CATEGORIES = [
  {
    id: "languages",
    label: "Programming Languages",
    accent: "#e2e8f0",
    accentDim: "#94a3b812",
    barFrom: "#64748b",
    barTo: "#cbd5e1",
  },
  {
    id: "frameworks",
    label: "Libraries / Frameworks",
    accent: "#cbd5e1",
    accentDim: "#64748b10",
    barFrom: "#475569",
    barTo: "#e2e8f0",
  },
  {
    id: "databases",
    label: "Databases",
    accent: "#d1d5db",
    accentDim: "#6b728010",
    barFrom: "#4b5563",
    barTo: "#e5e7eb",
  },
  {
    id: "integrations",
    label: "Integrations",
    accent: "#e2e8f0",
    accentDim: "#94a3b812",
    barFrom: "#64748b",
    barTo: "#cbd5e1",
  },
  {
    id: "tools",
    label: "Tools / Platforms",
    accent: "#f8fafc",
    accentDim: "#94a3b80e",
    barFrom: "#64748b",
    barTo: "#f1f5f9",
  },
];

SKILL_CATEGORIES[0].items = [
  { id: "c",   name: "C",           proficiency: 85 },
  { id: "cpp", name: "C++",         proficiency: 70 },
  { id: "js",  name: "JavaScript",  proficiency: 90 },
  { id: "python",  name: "Python",  proficiency: 75 },
];
SKILL_CATEGORIES[1].items = [
  { id: "htmlcss",  name: "HTML & CSS",   proficiency: 95 },
  { id: "react",    name: "React JS",        proficiency: 95 },
  { id: "nextjs",   name: "Next.js",      proficiency: 90 },
  { id: "tailwind", name: "Tailwind CSS", proficiency: 95 },
  { id: "nodejs",   name: "Node JS",      proficiency: 78 },
  { id: "express",  name: "Express JS",   proficiency: 75 },
  { id: "redux",    name: "Redux",        proficiency: 85 },
];
SKILL_CATEGORIES[4].items = [
  { id: "github", name: "GitHub", proficiency: 88 },
  { id: "git",    name: "Git",    proficiency: 85 },
  { id: "vscode", name: "VSCode", proficiency: 92 },
];
SKILL_CATEGORIES[2].items = [
  { id: "sql",     name: "SQL",     proficiency: 72 },
  { id: "mongodb", name: "MongoDB", proficiency: 80 },
];
SKILL_CATEGORIES[3].items = [
  { id: "paymentGateway",   name: "Payment Gateways [ Stripe, Razorpay ]",        proficiency: 90 },
  { id: "aiapi",   name: "AI APIs [ OpenAI, Gemini ]",        proficiency: 95 },
];



function proficiencyLabel(pct) {
  if (pct >= 90) return "Expert";
  if (pct >= 75) return "Advanced";
  if (pct >= 60) return "Intermediate";
  return "Beginner";
}

// ─── SKILL CARD ────────────────────────────────────────────────────────────────
function SkillCard({ skill, accent, accentDim, barFrom, barTo }) {
  return (
    <div
      className="skill-card group relative flex flex-col gap-3 rounded-xl p-5 transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Skill name + proficiency label */}
      <div className="flex items-start justify-between gap-2">
        <span
          className="font-orbitron text-white leading-tight"
          style={{ fontSize: "clamp(12px, 1.4vw, 15px)", fontWeight: 500, letterSpacing: "0.05em" }}
        >
          {skill.name}
        </span>
        <span
          className="shrink-0 rounded-full px-2.5 py-1 font-mono"
          style={{
            fontSize: "clamp(9px, 1vw, 11px)",
            color: "rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            letterSpacing: "0.04em",
          }}
        >
          {proficiencyLabel(skill.proficiency)}
        </span>
      </div>

      {/* Progress bar track */}
      <div
        className="relative w-full overflow-hidden rounded-full"
        style={{ background: "rgba(255,255,255,0.08)", height: "2px" }}
      >
        <div
          className="skill-bar absolute left-0 top-0 h-full rounded-full"
          data-target={skill.proficiency}
          style={{
            width: "0%",
            background: `linear-gradient(90deg, ${barFrom}, ${barTo})`,
          }}
        />
      </div>

      {/* Percentage */}
      <div className="flex justify-end">
        <span
          className="skill-pct font-mono"
          data-target={skill.proficiency}
          style={{ fontSize: "clamp(9px, 0.95vw, 11px)", color: "rgba(255,255,255,0.25)" }}
        >
          0%
        </span>
      </div>

      {/* Hover border brightening */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
      />
    </div>
  );
}

// ─── CATEGORY BLOCK ────────────────────────────────────────────────────────────
function CategoryBlock({ category }) {
  return (
    <div className="category-block flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)" }}
        />
        <span
          className="font-orbitron shrink-0 uppercase tracking-widest"
          style={{
            fontSize: "clamp(10px, 1.1vw, 13px)",
            color: "rgba(255,255,255,0.5)",
            fontWeight: 600,
          }}
        >
          {category.label}
        </span>
        <div
          className="h-px w-6 shrink-0"
          style={{ background: "rgba(255,255,255,0.12)" }}
        />
      </div>

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))" }}
      >
        {category.items.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            accent={category.accent}
            accentDim={category.accentDim}
            barFrom={category.barFrom}
            barTo={category.barTo}
          />
        ))}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export const SkillsPage = () => {
  const containerRef = useRef(null);
  const titleRef     = useRef(null);
  const subtitleRef  = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const timer = setTimeout(() => {
      gsap.set(containerRef.current, { opacity: 1, visibility: "visible" });

      const ctx = gsap.context(() => {
        const el    = containerRef.current;
        const cat   = el.querySelectorAll(".category-block");
        const cards = el.querySelectorAll(".skill-card");

        gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 30 });
        gsap.set(cat,   { opacity: 0, y: 24 });
        gsap.set(cards, { opacity: 0, scale: 0.94 });

        gsap.to(titleRef.current, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none", id: "sk-title" },
        });
        gsap.to(subtitleRef.current, {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.15,
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none", id: "sk-sub" },
        });
        gsap.to(cat, {
          opacity: 1, y: 0, duration: 0.55, ease: "power2.out",
          stagger: { amount: 0.5, from: "start" },
          scrollTrigger: { trigger: el, start: "top 72%", toggleActions: "play none none none", id: "sk-cats" },
        });
        gsap.to(cards, {
          opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.4)",
          stagger: { amount: 0.9, from: "start" },
          scrollTrigger: { trigger: el, start: "top 68%", toggleActions: "play none none none", id: "sk-cards" },
        });

        ScrollTrigger.create({
          trigger: el, start: "top 68%", id: "sk-bars",
          onEnter: () => {
            el.querySelectorAll(".skill-bar").forEach((bar) => {
              gsap.to(bar, { width: `${bar.dataset.target}%`, duration: 1.1, ease: "power2.out", delay: 0.4 });
            });
            el.querySelectorAll(".skill-pct").forEach((pct) => {
              const target = parseFloat(pct.dataset.target);
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target, duration: 1.1, ease: "power2.out", delay: 0.4,
                onUpdate: () => { pct.textContent = `${Math.round(obj.val)}%`; },
              });
            });
          },
        });

        ScrollTrigger.refresh();
      }, containerRef);

      return () => {
        ctx.revert();
        ScrollTrigger.getAll()
          .filter((t) => t.vars?.id?.startsWith("sk-"))
          .forEach((t) => t.kill());
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skillsPage">
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
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <div
              ref={titleRef}
              className="font-orbitron uppercase tracking-[0.25em] text-white"
              style={{ fontSize: "clamp(32px, 5.5vw, 62px)", fontWeight: 300 }}
            >
              SKILLS
            </div>
            <div
              ref={subtitleRef}
              className="font-mono uppercase tracking-widest"
              style={{ fontSize: "clamp(10px, 1.2vw, 13px)", color: "rgba(255,255,255,0.3)", letterSpacing: "0.3em" }}
            >
              technologies &amp; proficiencies
            </div>
            <div
              className="mt-2 h-px w-28"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
            />
          </div>

          <div className="w-full max-w-5xl flex flex-col gap-10">
            {SKILL_CATEGORIES.map((cat) => (
              <CategoryBlock key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};