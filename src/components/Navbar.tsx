import React, { useState, useEffect } from 'react';
import { BRAND_ASSETS } from '../data/mockData';
import { EarlyAccessContext } from './EarlyAccessModal';

interface NavbarProps {
  onOpenEarlyAccess: (context?: EarlyAccessContext) => void;
  currentView?: 'home' | 'about' | 'vision';
  onNavigate?: (view: 'home' | 'about' | 'vision') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEarlyAccess,
  currentView = 'home',
  onNavigate,
}) => {
  const [activeSection, setActiveSection] = useState<string>('what-is-onstaege');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (currentView !== 'home') return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['what-is-onstaege', 'events', 'businesses', 'destinations', 'how-it-works', 'comparison'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section === 'what-is-onstaege' ? 'hero' : section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const navLinks = [
    { label: 'What is Onstaege', href: '#hero', path: 'what-is-onstaege', view: 'home' },
    { label: 'Events', href: '#events', path: 'events', view: 'home' },
    { label: 'Businesses', href: '#businesses', path: 'businesses', view: 'home' },
    { label: 'Destinations', href: '#destinations', path: 'destinations', view: 'home' },
    { label: 'How It Works', href: '#how-it-works', path: 'how-it-works', view: 'home' },
    { label: 'Comparison', href: '#comparison', path: 'comparison', view: 'home' },
    { label: 'About', href: '#about', path: 'about', view: 'about' },
    { label: 'Vision', href: '#vision', path: 'vision', view: 'vision' },
  ];

  const handleNavClick = (link: { href: string; path: string; view?: string }) => {
    if (link.view === 'about') {
      onNavigate?.('about');
      return;
    }
    if (link.view === 'vision') {
      onNavigate?.('vision');
      return;
    }
    // Navigate home if on about or vision
    if (currentView !== 'home') {
      onNavigate?.('home');
      setTimeout(() => {
        const targetId = link.path === 'what-is-onstaege' ? 'hero' : link.path;
        const el = document.getElementById(targetId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const targetId = link.path === 'what-is-onstaege' ? 'hero' : link.path;
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(link.path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-8 pt-3">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-5 sm:px-6 h-16 sm:h-18 flex items-center justify-between ${
          scrolled ? 'glass-panel shadow-lg border border-white/80' : 'glass-panel border border-white/60 shadow-sm'
        }`}
      >
        {/* Brand Zone */}
        <button
          type="button"
          onClick={() => {
            onNavigate?.('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 shrink-0 group focus:outline-none cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-black overflow-hidden flex items-center justify-center p-0.5 shadow-xs border border-white/20 group-hover:scale-105 transition-transform">
            <img
              alt="Onstaege Portal Logo"
              className="w-full h-full object-contain rounded-lg"
              src={BRAND_ASSETS.logo}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-title-lg text-title-lg tracking-tight uppercase text-on-surface font-bold leading-tight">
              ONSTAEGE
            </span>
          </div>
        </button>

        {/* Center Nav Links with Glassmorphism */}
        <nav className="hidden xl:flex items-center gap-1.5 p-1 rounded-xl glass-card border border-white/60">
          {navLinks.map((link) => {
            const isActive =
              link.view === 'about'
                ? currentView === 'about'
                : link.view === 'vision'
                ? currentView === 'vision'
                : currentView === 'home' && activeSection === link.path;
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => handleNavClick(link)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-black text-white shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Zone */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Early Access CTA */}
          <button
            type="button"
            onClick={() => onOpenEarlyAccess({ intent: 'Navbar Early Access CTA' })}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <span>Get Early Access</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl glass-card text-on-surface hover:bg-white focus:outline-none cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-2 max-w-7xl mx-auto rounded-2xl glass-panel p-5 border border-white/80 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.view === 'about'
                  ? currentView === 'about'
                  : link.view === 'vision'
                  ? currentView === 'vision'
                  : currentView === 'home' && activeSection === link.path;
              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => {
                    handleNavClick(link);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-on-surface hover:bg-white/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-3 mt-2 border-t border-surface-container">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEarlyAccess({ intent: 'Early Access · Mobile Access' });
                }}
                className="w-full py-3 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black font-title-md text-xs font-bold text-center block shadow-md cursor-pointer"
              >
                Get Early Access →
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
