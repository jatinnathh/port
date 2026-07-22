'use client';

import { useState, useEffect, useCallback } from 'react';
import GooeyNav from './GooeyNav';
import { CreepyButton } from './ui/creepy-button';
import './Navbar.css';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const gooeyItems = navLinks.filter(link => link.label !== 'Contact').map((link) => ({
    label: link.label,
    href: link.href,
    onClick: handleNavClick,
  }));

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#home" className="navbar__brand" onClick={() => handleNavClick('#home')}>
          JN
        </a>

        {/* Desktop: GooeyNav */}
        <div className="navbar__gooey-wrap">
          <GooeyNav
            items={gooeyItems}
            particleCount={20}
            particleDistances={[90, 10]}
            particleR={300}
            initialActiveIndex={activeIndex}
            animationTime={600}
            timeVariance={800}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
          <div className="hidden md:block" style={{ marginLeft: '1rem' }}>
            <CreepyButton onClick={() => handleNavClick('#contact')}>
              Contact
            </CreepyButton>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <ul className={`navbar__menu ${mobileOpen ? 'navbar__menu--open' : ''}`}>
        {navLinks.map((link, i) => (
          <li key={link.href}>
            {link.label === 'Contact' ? (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', width: '100%' }}>
                <CreepyButton onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}>
                  Contact
                </CreepyButton>
              </div>
            ) : (
              <a
                href={link.href}
                className={`navbar__link ${activeIndex === i ? 'navbar__link--active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>

      {mobileOpen && (
        <div className="navbar__overlay" onClick={() => setMobileOpen(false)} />
      )}
    </nav>
  );
}
