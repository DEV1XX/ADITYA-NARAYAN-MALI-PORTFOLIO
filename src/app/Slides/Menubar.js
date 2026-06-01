'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenubar } from '../Redux/Slices/MenubarSlice';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { text: 'Home',             id: '#homePage' },
  { text: 'About Me',         id: '#aboutPage' },
  { text: 'Skills',           id: '#skillsPage' },
  { text: 'Projects',         id: '#projectsPage' },
  { text: 'Contact Me',       id: '#contactPage' },
  { text: 'My Resume',        href: 'https://drive.google.com/file/d/1pg6oSDZIoqyiozs6_h3gtO1YOesnFHbj/view?usp=drive_link', newTab: true },
  { text: 'Download Resume',  href: '/resume-aditya-narayan-mali.pdf', download: true },
];

const Menubar = () => {
  const isMenuOpen = useSelector((state) => state.menubar.isMenubarOpen);
  const dispatch   = useDispatch();
  const [isClient, setIsClient] = useState(false);

  const overlayRef  = useRef(null);
  const panelRef    = useRef(null);
  const linksRef    = useRef([]);
  const metaRef     = useRef(null);
  const dividerRef  = useRef(null);

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (!isClient) return;

    if (isMenuOpen) {
      // panel slide in
      gsap.fromTo(panelRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.55, ease: 'power3.inOut' }
      );
      // backdrop fade in
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      // divider draw
      gsap.fromTo(dividerRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.6, ease: 'power2.out', delay: 0.25, transformOrigin: 'top center' }
      );
      // links stagger
      gsap.fromTo(linksRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.07, delay: 0.3 }
      );
      // meta fade
      gsap.fromTo(metaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.7 }
      );
    } else {
      gsap.to(panelRef.current,   { x: '100%', duration: 0.45, ease: 'power3.inOut' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.35, ease: 'power2.in' });
    }
  }, [isMenuOpen, isClient]);

  const close = () => dispatch(toggleMenubar());

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    close();
  };

  const onLinkEnter = (el, index) => {
    if (!isClient) return;
    gsap.to(el, { x: 10, color: 'rgba(255,255,255,1)', duration: 0.25, ease: 'power2.out' });
    // animate the index number too
    const num = el.previousSibling;
    if (num) gsap.to(num, { opacity: 1, duration: 0.2 });
  };

  const onLinkLeave = (el) => {
    if (!isClient) return;
    gsap.to(el, { x: 0, color: 'rgba(255,255,255,0.6)', duration: 0.25, ease: 'power2.out' });
    const num = el.previousSibling;
    if (num) gsap.to(num, { opacity: 0.3, duration: 0.2 });
  };

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(0,0,0,0.45)', opacity: 0, pointerEvents: isMenuOpen ? 'auto' : 'none' }}
        onClick={close}
      />

      {/* ── Panel ── */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-full z-50 flex flex-col"
        style={{
          width: 'clamp(280px, 55vw, 480px)',
          transform: 'translateX(100%)',
          background: 'rgba(30, 26, 32, 0.6)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          borderLeft: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* grid overlay inside panel */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        {/* top-edge shimmer */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}
        />

        {/* ── Header row ── */}
        <div className="relative z-10 flex items-center justify-between px-8 md:px-10 pt-7 pb-6">
          <div>
            <div
              className="font-orbitron text-white uppercase leading-none"
              style={{ fontSize: 'clamp(9px, 1vw, 11px)', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.35)' }}
            >
              Navigation
            </div>
          </div>

          {/* close button */}
          <div className="flex flex-col items-center gap-1.5">
            <button
              onClick={close}
              aria-label="Close menu"
              style={{
                width: '46px', height: '46px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.03)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                outline: 'none',
              }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { borderColor: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.07)', duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { borderColor: 'rgba(255,255,255,0.1)',  background: 'rgba(255,255,255,0.03)', duration: 0.2 })}
            >
              {/* × drawn with two spans so we can avoid emoji */}
              <div style={{ position: 'relative', width: '16px', height: '16px' }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '1.5px', background: 'rgba(255,255,255,0.8)', transform: 'translateY(-50%) rotate(45deg)', borderRadius: '2px' }} />
                <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '1.5px', background: 'rgba(255,255,255,0.8)', transform: 'translateY(-50%) rotate(-45deg)', borderRadius: '2px' }} />
              </div>
            </button>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 'clamp(7px, 0.7vw, 9px)', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.28em' }}
            >
              Close
            </span>
          </div>
        </div>

        {/* ── Vertical divider on left of links ── */}
        <div className="relative z-10 flex flex-1 overflow-hidden">
          <div
            ref={dividerRef}
            className="absolute left-8 md:left-10 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))', transformOrigin: 'top center' }}
          />

          {/* ── Links ── */}
          <div className="flex flex-col justify-center pl-14 md:pl-16 pr-8 md:pr-10 gap-1 w-full">
            {NAV_LINKS.map((link, i) => (
              <div key={link.text} className="flex items-center gap-4 py-2.5 group">
                {/* index number */}
                <span
                  className="font-mono shrink-0"
                  style={{
                    fontSize: 'clamp(9px, 0.8vw, 10px)',
                    color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.1em',
                    minWidth: '20px',
                    opacity: 0.3,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {link.newTab ? (
                  <a
                    ref={(el) => (linksRef.current[i] = el)}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-orbitron uppercase cursor-pointer select-none"
                    style={{
                      fontSize: 'clamp(16px, 2.2vw, 26px)',
                      fontWeight: 300,
                      letterSpacing: '0.08em',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      lineHeight: 1.1,
                    }}
                    onMouseEnter={(e) => onLinkEnter(e.currentTarget, i)}
                    onMouseLeave={(e) => onLinkLeave(e.currentTarget)}
                  >
                    {link.text}
                  </a>
                ) : link.download ? (
                  <a
                    ref={(el) => (linksRef.current[i] = el)}
                    href={link.href}
                    download
                    className="font-orbitron uppercase cursor-pointer select-none"
                    style={{
                      fontSize: 'clamp(16px, 2.2vw, 26px)',
                      fontWeight: 300,
                      letterSpacing: '0.08em',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      lineHeight: 1.1,
                    }}
                    onMouseEnter={(e) => onLinkEnter(e.currentTarget, i)}
                    onMouseLeave={(e) => onLinkLeave(e.currentTarget)}
                  >
                    {link.text}
                  </a>
                ) : (
                  <button
                    ref={(el) => (linksRef.current[i] = el)}
                    onClick={() => scrollToSection(link.id)}
                    className="font-orbitron uppercase cursor-pointer select-none text-left"
                    style={{
                      fontSize: 'clamp(16px, 2.2vw, 26px)',
                      fontWeight: 300,
                      letterSpacing: '0.08em',
                      color: 'rgba(255,255,255,0.6)',
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                      padding: 0,
                      lineHeight: 1.1,
                    }}
                    onMouseEnter={(e) => onLinkEnter(e.currentTarget, i)}
                    onMouseLeave={(e) => onLinkLeave(e.currentTarget)}
                  >
                    {link.text}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer meta ── */}
        <div
          ref={metaRef}
          className="relative z-10 px-8 md:px-10 pb-8 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.1), transparent)' }} />
            <span
              className="font-mono uppercase tracking-widest"
              style={{ fontSize: 'clamp(8px, 0.75vw, 9px)', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.3em' }}
            >
              Aditya Narayan Mali
            </span>
          </div>
          <span
            className="font-mono"
            style={{ fontSize: 'clamp(8px, 0.75vw, 9px)', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.15em' }}
          >
            Fullstack Developer · OUTR, Bhubaneswar
          </span>
        </div>
      </div>
    </>
  );
};

export default Menubar;