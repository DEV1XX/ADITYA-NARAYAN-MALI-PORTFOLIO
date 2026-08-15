"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── SKILL DATA ────────────────────────────────────────────────────────────────
// proficiency: category-level overall score (0–100)
// items: flat list of skill name tags — no individual levels
const SKILL_CATEGORIES = [
  {
    id: "languages",
    label: "Programming Languages",
    proficiency: 85,
    barFrom: "#64748b",
    barTo: "#cbd5e1",
    items: ["C", "C++", "JavaScript", "Python"],
  },
  {
    id: "agentic",
    label: "Agentic AI / GenAI",
    proficiency: 85,
    barFrom: "#64748b",
    barTo: "#cbd5e1",
    items: [
      "LangGraph", "LangChain", "RAG",
      "Vector Databases · Qdrant",
      "Model Context Protocol (MCP)",
      "LLM APIs · OpenAI · Gemini",
      "Prompt Engineering",
    ],
  },
  {
    id: "frameworks",
    label: "Libraries / Frameworks",
    proficiency: 88,
    barFrom: "#475569",
    barTo: "#e2e8f0",
    items: ["HTML & CSS", "React JS", "Next.js", "Tailwind CSS", "Node JS", "Express JS", "Redux"],
  },
  {
    id: "integrations",
    label: "Integrations",
    proficiency: 92,
    barFrom: "#64748b",
    barTo: "#cbd5e1",
    items: ["Stripe", "Razorpay", "LLM API(OpenAI, Gemini, Groq)", ],
  },
  {
    id: "databases",
    label: "Databases",
    proficiency: 76,
    barFrom: "#4b5563",
    barTo: "#e5e7eb",
    items: ["SQL", "MongoDB"],
  },
  {
    id: "tools",
    label: "Tools / Platforms",
    proficiency: 88,
    barFrom: "#64748b",
    barTo: "#f1f5f9",
    items: ["GitHub", "Git", "VSCode"],
  },
];

function proficiencyLabel(pct) {
  if (pct >= 90) return "Expert";
  if (pct >= 75) return "Advanced";
  if (pct >= 60) return "Intermediate";
  return "Beginner";
}

// ─── CATEGORY BLOCK ────────────────────────────────────────────────────────────
function CategoryBlock({ category }) {
  return (
    <div className="category-block relative rounded-xl p-6 sm:p-7 flex flex-col gap-5"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px rounded-t-xl"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }}
      />

      {/* Header row: label + proficiency badge + bar */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          {/* Category label */}
          <span
            className="font-orbitron uppercase tracking-widest"
            style={{ fontSize: "clamp(10px, 1.1vw, 13px)", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}
          >
            {category.label}
          </span>

          {/* Proficiency badge */}
          <span
            className="shrink-0 rounded-full px-3 py-1 font-mono"
            style={{
              fontSize: "clamp(9px, 0.95vw, 11px)",
              color: "rgba(255,255,255,0.5)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              letterSpacing: "0.04em",
            }}
          >
            {proficiencyLabel(category.proficiency)} · <span className="cat-pct" data-target={category.proficiency}>0%</span>
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="relative w-full overflow-hidden rounded-full"
          style={{ height: "1.5px", background: "rgba(255,255,255,0.07)" }}
        >
          <div
            className="cat-bar absolute left-0 top-0 h-full rounded-full"
            data-target={category.proficiency}
            style={{
              width: "0%",
              background: `linear-gradient(90deg, ${category.barFrom}, ${category.barTo})`,
            }}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2">
        {category.items.map((name) => (
          <span
            key={name}
            className="font-mono rounded-md px-3 py-1.5 transition-colors duration-200"
            style={{
              fontSize: "clamp(10px, 0.95vw, 12px)",
              color: "rgba(255,255,255,0.55)",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              letterSpacing: "0.02em",
            }}
          >
            {name}
          </span>
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
        const cats  = el.querySelectorAll(".category-block");

        gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 30 });
        gsap.set(cats, { opacity: 0, y: 24 });

        gsap.to(titleRef.current, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none", id: "sk-title" },
        });
        gsap.to(subtitleRef.current, {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.15,
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none", id: "sk-sub" },
        });
        gsap.to(cats, {
          opacity: 1, y: 0, duration: 0.55, ease: "power2.out",
          stagger: { amount: 0.6, from: "start" },
          scrollTrigger: { trigger: el, start: "top 72%", toggleActions: "play none none none", id: "sk-cats" },
        });

        // Animate category-level bars + percentages
        ScrollTrigger.create({
          trigger: el, start: "top 68%", id: "sk-bars",
          onEnter: () => {
            el.querySelectorAll(".cat-bar").forEach((bar) => {
              gsap.to(bar, { width: `${bar.dataset.target}%`, duration: 1.2, ease: "power2.out", delay: 0.3 });
            });
            el.querySelectorAll(".cat-pct").forEach((pct) => {
              const target = parseFloat(pct.dataset.target);
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target, duration: 1.2, ease: "power2.out", delay: 0.3,
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

          {/* Two-column grid on md+, single column on mobile */}
          <div
            className="w-full max-w-5xl grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(420px, 100%), 1fr))" }}
          >
            {SKILL_CATEGORIES.map((cat) => (
              <CategoryBlock key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};