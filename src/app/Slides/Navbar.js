'use client';

import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenubar } from '../Redux/Slices/MenubarSlice';
import { gsap } from 'gsap';

const Navbar = () => {
  const isMenuOpen = useSelector((state) => state.menubar.isMenubarOpen);
  const dispatch = useDispatch();

  const navRef    = useRef(null);
  const logoRef   = useRef(null);
  const btnRef    = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      [logoRef.current, btnRef.current],
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12, delay: 0.1 }
    );
  }, []);

  const handleMenuToggle = () => dispatch(toggleMenubar());

  // animate the two bar lines on open/close
  const topBarRef = useRef(null);
  const botBarRef = useRef(null);

  useEffect(() => {
    if (!topBarRef.current) return;
    if (isMenuOpen) {
      gsap.to(topBarRef.current, { rotate: 45,  y: 4,  duration: 0.3, ease: 'power2.inOut' });
      gsap.to(botBarRef.current, { rotate: -45, y: -4, duration: 0.3, ease: 'power2.inOut' });
    } else {
      gsap.to(topBarRef.current, { rotate: 0, y: 0, duration: 0.3, ease: 'power2.inOut' });
      gsap.to(botBarRef.current, { rotate: 0, y: 0, duration: 0.3, ease: 'power2.inOut' });
    }
  }, [isMenuOpen]);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-40 w-full"
      style={{ background: '#0C090D' }}
    >
      {/* grid + top-border accent — same as page sections */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* bottom separator line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
      />

      <div className="relative z-10 flex items-center justify-between px-6 sm:px-10 md:px-14 lg:px-20 h-18 md:h-22" style={{ paddingTop: '14px', paddingBottom: '14px' }}>

        {/* ── Logo ── */}
        <div ref={logoRef} className="flex flex-col gap-1.5">
          <span
            className="font-orbitron text-white uppercase leading-none"
            style={{ fontSize: 'clamp(12px, 1.5vw, 16px)', fontWeight: 400, letterSpacing: '0.18em' }}
          >
            Aditya Narayan Mali
          </span>
          <span
            className="font-mono uppercase leading-none"
            style={{ fontSize: 'clamp(9px, 0.9vw, 11px)', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3em' }}
          >
            Code that speaks. Design that listens.
          </span>
        </div>

        {/* ── Menu button ── */}
        <div ref={btnRef} className="flex flex-col items-center gap-2">
          <button
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
            className="group relative flex flex-col items-center justify-center gap-2 cursor-pointer"
            style={{
              width: '52px',
              height: '52px',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.02)',
              outline: 'none',
            }}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', duration: 0.25 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', duration: 0.25 })}
          >
            <div
              ref={topBarRef}
              style={{ width: '20px', height: '1.5px', background: 'rgba(255,255,255,0.8)', borderRadius: '2px', transformOrigin: 'center' }}
            />
            <div
              ref={botBarRef}
              style={{ width: '20px', height: '1.5px', background: 'rgba(255,255,255,0.8)', borderRadius: '2px', transformOrigin: 'center' }}
            />
          </button>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 'clamp(8px, 0.78vw, 10px)', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.28em' }}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </span>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;