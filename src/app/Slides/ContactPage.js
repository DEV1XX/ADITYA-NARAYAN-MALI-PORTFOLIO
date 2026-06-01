"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── CONTACT INFO DATA ─────────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    id: "email",
    label: "Email",
    value: "adityanarayanmali2020@gmail.com",
    link: "mailto:adityanarayanmali2020@gmail.com",
  },
  {
    id: "phone",
    label: "Phone",
    value: "+91 7749081504",
    link: "tel:+917749081504",
  },
  {
    id: "location",
    label: "Location",
    value: "Bhubaneswar, Odisha",
    link: "",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "aditya-narayan-mali",
    link: "https://linkedin.com/in/aditya-narayan-mali",
  },
];

const SOCIAL_LINKS = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/DEV1XX",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/aditya-narayan-mali/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/the_aditya_narayan/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

// ─── INPUT FIELD ───────────────────────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className="font-orbitron uppercase tracking-widest"
        style={{ fontSize: "clamp(8px, 0.85vw, 10px)", color: "rgba(255,255,255,0.9)" }}
      >
        {label}{required && " *"}
      </span>
      {children}
    </div>
  );
}

const inputStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  color: "rgba(255,255,255,0.85)",
  outline: "none",
  width: "100%",
  fontFamily: "monospace",
  fontSize: "clamp(12px, 1.05vw, 14px)",
  padding: "12px 14px",
  transition: "border-color 0.2s",
};

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export const ContactPage = () => {
  const containerRef = useRef(null);
  const titleRef     = useRef(null);
  const subtitleRef  = useRef(null);

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focused, setFocused] = useState("");

  const EMAILJS_SERVICE_ID          = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID          || "portfolioContactService";
  const EMAILJS_TEMPLATE_ID         = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID         || "ContactServiceTemplate";
  const EMAILJS_PUBLIC_KEY          = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY          || "N57sWKxzY5UaOVYi-";
  const EMAILJS_AUTO_REPLY_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID || "AutoReplyTemp";

  useEffect(() => { emailjs.init(EMAILJS_PUBLIC_KEY); }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const timer = setTimeout(() => {
      gsap.set(containerRef.current, { opacity: 1, visibility: "visible" });

      const ctx = gsap.context(() => {
        const el    = containerRef.current;
        const items = el.querySelectorAll(".ct-item");

        gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 30 });
        gsap.set(items, { opacity: 0, y: 36 });

        gsap.to(titleRef.current, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none", id: "ct-title" },
        });
        gsap.to(subtitleRef.current, {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.15,
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none", id: "ct-sub" },
        });
        gsap.to(items, {
          opacity: 1, y: 0, duration: 0.55, ease: "power2.out",
          stagger: { amount: 0.6, from: "start" },
          scrollTrigger: { trigger: el, start: "top 72%", toggleActions: "play none none none", id: "ct-items" },
        });

        ScrollTrigger.refresh();
      }, containerRef);

      return () => {
        ctx.revert();
        ScrollTrigger.getAll().filter((t) => t.vars?.id?.startsWith("ct-")).forEach((t) => t.kill());
      };
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const toastStyle = (color) => ({
    style: {
      background: `rgba(${color}, 0.15)`,
      border: `1px solid rgba(${color}, 0.25)`,
      color: "#fff",
      fontFamily: "monospace",
      fontSize: "13px",
    },
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields.", toastStyle("220,38,38"));
      return;
    }
    setIsSubmitting(true);
    const loadingId = toast.loading("Sending your message...", toastStyle("255,255,255"));
    try {
      const res = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      if (EMAILJS_AUTO_REPLY_TEMPLATE && EMAILJS_AUTO_REPLY_TEMPLATE !== "AutoReplyTemp") {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTO_REPLY_TEMPLATE, {
          to_email: formData.email,
          to_name: formData.name,
          subject: formData.subject,
        }).catch(() => {});
      }
      toast.dismiss(loadingId);
      if (res.status === 200) {
        toast.success("Message sent! I'll get back to you soon.", { duration: 5000, ...toastStyle("134,239,172") });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else throw new Error();
    } catch {
      toast.dismiss(loadingId);
      toast.error("Couldn't send message. Please try again.", toastStyle("220,38,38"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const focusStyle = (field) => ({
    ...inputStyle,
    borderColor: focused === field ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
  });

  return (
    <section id="contactPage">
      <div
        ref={containerRef}
        className="relative min-h-screen w-full overflow-hidden"
        style={{ background: "#0C090D" }}
      >
        <Toaster position="top-right" />

        {/* ── Background ── */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute -bottom-48 -right-24 h-[420px] w-[420px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)", filter: "blur(70px)" }} />
          <div className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }} />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col items-center px-4 pb-20 pt-14 sm:px-8 md:px-12 lg:px-20">

          {/* Title block */}
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <div ref={titleRef} className="font-orbitron uppercase tracking-[0.25em] text-white"
              style={{ fontSize: "clamp(32px, 5.5vw, 62px)", fontWeight: 300 }}>
              CONTACT ME
            </div>
            <div ref={subtitleRef} className="font-mono uppercase tracking-widest"
              style={{ fontSize: "clamp(10px, 1.2vw, 13px)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.3em" }}>
              let's build something together
            </div>
            <div className="mt-2 h-px w-28"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} />
          </div>

          {/* ── Two-column grid ── */}
          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-8 lg:items-start">

            {/* LEFT — Contact form */}
            <div
              className="ct-item relative rounded-xl p-6 sm:p-8 flex flex-col gap-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px rounded-t-xl"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />

              {/* Section label */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)" }} />
                <span className="font-orbitron uppercase tracking-widest shrink-0"
                  style={{ fontSize: "clamp(10px, 1.1vw, 12px)", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>
                  Send a Message
                </span>
                <div className="h-px w-6 shrink-0" style={{ background: "rgba(255,255,255,0.12)" }} />
              </div>

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Name" required>
                  <input type="text" name="name" value={formData.name} onChange={handleChange}
                    placeholder="Your name"
                    onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                    style={focusStyle("name")} />
                </Field>
                <Field label="Email" required>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="your@email.com"
                    onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                    style={focusStyle("email")} />
                </Field>
              </div>

              <Field label="Subject" required>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                  placeholder="What's this about?"
                  onFocus={() => setFocused("subject")} onBlur={() => setFocused("")}
                  style={focusStyle("subject")} />
              </Field>

              <Field label="Message" required>
                <textarea name="message" value={formData.message} onChange={handleChange}
                  placeholder="Tell me about your project or just say hello..."
                  rows={6}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused("")}
                  style={{ ...focusStyle("message"), resize: "vertical" }} />
              </Field>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="relative w-full rounded-xl font-orbitron uppercase tracking-widest
                  transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  padding: "14px 24px",
                  fontSize: "clamp(11px, 1.1vw, 13px)",
                  letterSpacing: "0.15em",
                  color: isSubmitting ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.85)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE ↗"}
              </button>
            </div>

            {/* RIGHT column — stacked info cards */}
            <div className="flex flex-col gap-5" style={{ minWidth: "min(100%, 300px)" }}>

              {/* Contact info card */}
              <div
                className="ct-item relative rounded-xl p-6 flex flex-col gap-5"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-xl"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)" }} />
                  <span className="font-orbitron uppercase tracking-widest shrink-0"
                    style={{ fontSize: "clamp(10px, 1.1vw, 12px)", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>
                    Contact Info
                  </span>
                  <div className="h-px w-6 shrink-0" style={{ background: "rgba(255,255,255,0.12)" }} />
                </div>

                <div className="flex flex-col gap-4">
                  {CONTACT_INFO.map((info) => (
                    <div key={info.id} className="flex flex-col gap-0.5">
                      <span className="font-orbitron uppercase tracking-widest"
                        style={{ fontSize: "clamp(8px, 0.8vw, 9px)", color: "rgba(255,255,255,0.25)" }}>
                        {info.label}
                      </span>
                      {info.link ? (
                        <a href={info.link} target={info.link.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="font-mono transition-colors duration-200"
                          style={{ fontSize: "clamp(11px, 1vw, 13px)", color: "rgba(255,255,255,0.7)" }}
                          onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,1)"}
                          onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
                          {info.value}
                        </a>
                      ) : (
                        <span className="font-mono"
                          style={{ fontSize: "clamp(11px, 1vw, 13px)", color: "rgba(255,255,255,0.7)" }}>
                          {info.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links card */}
              <div
                className="ct-item relative rounded-xl p-6 flex flex-col gap-5"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-xl"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)" }} />
                  <span className="font-orbitron uppercase tracking-widest shrink-0"
                    style={{ fontSize: "clamp(10px, 1.1vw, 12px)", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>
                    Socials
                  </span>
                  <div className="h-px w-6 shrink-0" style={{ background: "rgba(255,255,255,0.12)" }} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.id}
                      href={s.url || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        opacity: s.url ? 1 : 0.4,
                        pointerEvents: s.url ? "auto" : "none",
                        color: "rgba(255,255,255,0.55)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                      }}
                    >
                      {s.icon}
                      <span className="font-orbitron uppercase tracking-wider"
                        style={{ fontSize: "clamp(9px, 0.85vw, 11px)" }}>
                        {s.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response time chip */}
              <div
                className="ct-item relative rounded-xl px-6 py-5 flex items-center gap-4"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-xl"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />
                {/* pulsing dot */}
                <div className="relative shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(134,239,172,0.9)" }} />
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full animate-ping"
                    style={{ background: "rgba(134,239,172,0.4)", animationDuration: "2s" }} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-orbitron uppercase tracking-widest"
                    style={{ fontSize: "clamp(9px, 0.9vw, 11px)", color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
                    Quick Response
                  </span>
                  <span className="font-mono"
                    style={{ fontSize: "clamp(10px, 0.9vw, 12px)", color: "rgba(255,255,255,0.35)" }}>
                    Typically replies within 24 hours
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};