'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { gsap } from 'gsap';

const SKILLS = [
  { label: 'Frontend' },
  { label: 'Backend' },
  { label: 'Animated Websites', hideOnMobile: true },
  { label: 'DSA' },
];

export const LandingPage = () => {
  const isMenuOpen = useSelector((state) => state.menubar.isMenubarOpen);
  const [isClient, setIsClient] = useState(false);

  const containerRef  = useRef(null);
  const imageRef      = useRef(null);
  const badgeRef      = useRef(null);
  const line1Ref      = useRef(null);
  const line2Ref      = useRef(null);
  const dividerRef    = useRef(null);
  const skillsRef     = useRef(null);
  const scrollHintRef = useRef(null);

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const timer = setTimeout(() => {
      gsap.set(containerRef.current, { opacity: 1, visibility: 'visible' });

      const ctx = gsap.context(() => {
        // ── initial states ──
        gsap.set(
          [badgeRef.current, line1Ref.current, line2Ref.current, dividerRef.current, skillsRef.current, scrollHintRef.current],
          { opacity: 0, y: 28 }
        );
        gsap.set(imageRef.current, { opacity: 0, scale: 0.88, rotation: -4 });

        // ── entrance timeline ──
        const tl = gsap.timeline({ delay: 0.05 });
        tl.to(imageRef.current, { opacity: 1, scale: 1, rotation: 0, duration: 1.1, ease: 'power3.out' })
          .to(badgeRef.current,      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.7')
          .to(line1Ref.current,      { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=0.4')
          .to(line2Ref.current,      { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=0.55')
          .to(dividerRef.current,    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.4')
          .to(skillsRef.current,     { opacity: 1, y: 0, duration: 0.6,  ease: 'power2.out' }, '-=0.35')
          .to(scrollHintRef.current, { opacity: 1, y: 0, duration: 0.5,  ease: 'power2.out' }, '-=0.3');

        // ── image float ──
        gsap.to(imageRef.current, { y: -12, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        gsap.to(imageRef.current, { scale: 1.015, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 });
      }, containerRef);

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(timer);
  }, [isClient]);

  const onTextEnter = (el) => {
    if (!isClient) return;
    gsap.to(el, { letterSpacing: '0.04em', duration: 0.35, ease: 'power2.out' });
  };
  const onTextLeave = (el) => {
    if (!isClient) return;
    gsap.to(el, { letterSpacing: '0em', duration: 0.35, ease: 'power2.out' });
  };
  const onSkillEnter = (el) => {
    if (!isClient) return;
    gsap.to(el, { y: -4, color: 'rgba(255,255,255,0.95)', duration: 0.25, ease: 'power2.out' });
  };
  const onSkillLeave = (el) => {
    if (!isClient) return;
    gsap.to(el, { y: 0, color: 'rgba(255,255,255,0.55)', duration: 0.25, ease: 'power2.out' });
  };

  return (
    <section id="homePage">
      <div
        ref={containerRef}
        className="relative w-full overflow-x-hidden"
        style={{ background: '#0C090D', opacity: 0, visibility: 'hidden' }}
      >

        {/* ── Background ── */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
          <div
            className="absolute -bottom-48 -right-24 h-[420px] w-[420px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', filter: 'blur(70px)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        {/* ── Main content — full viewport height, zero extra padding ── */}
        <div className="relative z-10 flex h-screen items-center px-4 sm:px-8 md:px-12 lg:px-20">

          <div className="flex w-full max-w-6xl  flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-0">

            {/* LEFT — Image */}
            <div className="flex w-full justify-center lg:w-1/2">
              <div
                ref={imageRef}
                className="group relative cursor-pointer"
                style={{ width: 'clamp(220px, 38vw, 480px)', aspectRatio: '1' }}
                onMouseEnter={(e) => isClient && gsap.to(e.currentTarget, { scale: 1.05, duration: 0.4, ease: 'power2.out' })}
                onMouseLeave={(e) => isClient && gsap.to(e.currentTarget, { scale: 1.015, duration: 0.4, ease: 'power2.out' })}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: '0 0 60px rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <div
                  className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
                />
                <Image
                  src="/final img .jpg"
                  alt="Aditya Narayan Mali"
                  fill
                  className="rounded-2xl object-cover"
                  priority
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                />
              </div>
            </div>

            {/* RIGHT — Text */}
            <div className="flex w-full flex-col items-center gap-4 text-center lg:w-1/2 lg:items-start lg:pl-12 lg:text-left">

              {/* Badge */}
              <div ref={badgeRef} className="flex items-center gap-3">
                <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))' }} />
                <span
                  className="font-mono uppercase tracking-widest"
                  style={{ fontSize: 'clamp(9px, 1vw, 11px)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.3em' }}
                >
                  Portfolio — 2026
                </span>
                <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)' }} />
              </div>

              {/* Headline */}
              <div className="flex flex-col gap-0 leading-none select-none">
                <div
                  ref={line1Ref}
                  className="font-orbitron text-white cursor-pointer"
                  style={{ fontSize: 'clamp(36px, 6vw, 84px)', fontWeight: 300, letterSpacing: '0em' }}
                  onMouseEnter={(e) => onTextEnter(e.currentTarget)}
                  onMouseLeave={(e) => onTextLeave(e.currentTarget)}
                >
                  FULLSTACK
                </div>
                <div
                  ref={line2Ref}
                  className="font-orbitron cursor-pointer"
                  style={{ fontSize: 'clamp(36px, 6vw, 84px)', fontWeight: 300, letterSpacing: '0em', color: 'rgba(255,255,255,0.45)' }}
                  onMouseEnter={(e) => onTextEnter(e.currentTarget)}
                  onMouseLeave={(e) => onTextLeave(e.currentTarget)}
                >
                  DEVELOPER
                </div>
              </div>

              {/* Divider */}
              <div
                ref={dividerRef}
                className="w-20"
                style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.4), transparent)' }}
              />

              {/* Skill chips */}
              <div ref={skillsRef} className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {SKILLS.map((s) => (
                  <span
                    key={s.label}
                    className={`font-mono uppercase cursor-pointer${s.hideOnMobile ? ' hidden md:inline-flex' : ''}`}
                    style={{
                      fontSize: 'clamp(9px, 0.9vw, 11px)',
                      letterSpacing: '0.25em',
                      color: 'rgba(255,255,255,0.55)',
                      padding: '6px 14px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '999px',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                    onMouseEnter={(e) => onSkillEnter(e.currentTarget)}
                    onMouseLeave={(e) => onSkillLeave(e.currentTarget)}
                  >
                    {s.label}
                  </span>
                ))}
              </div>

              {/* Scroll hint */}
              <div
                ref={scrollHintRef}
                className="flex items-center gap-2 mt-1"
                style={{ color: 'rgba(255,255,255,0.22)' }}
              >
                <div style={{ width: '1px', height: '28px', background: 'linear-gradient(180deg, rgba(255,255,255,0.3), transparent)' }} />
                <span
                  className="font-mono uppercase tracking-widest"
                  style={{ fontSize: 'clamp(8px, 0.8vw, 10px)', letterSpacing: '0.28em' }}
                >
                  Scroll to explore
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};