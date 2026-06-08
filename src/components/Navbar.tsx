import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Theme } from "../types";

interface NavbarProps {
  theme: Theme;
  currentPage?: "home" | "about";
  onPageChange?: (page: "home" | "about") => void;
}

export default function Navbar({ theme, currentPage = "home", onPageChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Earnings", href: "#earnings" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "About", href: "#about" }
  ];

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string, href: string) => {
    if (label === "About") {
      e.preventDefault();
      if (onPageChange) onPageChange("about");
    } else if (href.startsWith("#")) {
      if (currentPage === "about") {
        e.preventDefault();
        if (onPageChange) onPageChange("home");
        
        const targetId = href.substring(1);
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 120);
      }
    }
  };

  return (
    <nav
      id="onstaege-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === "dark"
            ? "bg-[#090909]/80 backdrop-blur-md border-b border-white/5 py-4 shadow-lg shadow-black/20"
            : "bg-white/80 backdrop-blur-md border-b border-black/5 py-4 shadow-sm shadow-black/5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left Side: Logo */}
        <a 
          href="/" 
          onClick={(e) => {
            if (onPageChange) {
              e.preventDefault();
              onPageChange("home");
            }
          }}
          className="flex items-center space-x-2.5 group"
        >
          <div className="relative w-[38px] h-[38px] flex items-center justify-center rounded-xl overflow-hidden cursor-pointer shadow-lg shadow-black/40 border border-white/10 group-hover:scale-105 transition duration-300">
            <svg viewBox="0 0 100 100" className="w-full h-full bg-black" aria-hidden="true">
              <defs>
                <linearGradient id="nav-spotlight-beam-left" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ffffdd" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="nav-spotlight-beam-right" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ffffdd" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="nav-stage-pool" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#ffffee" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#ffffee" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="nav-curtain-grad-1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7a0000" />
                  <stop offset="40%" stopColor="#c80000" />
                  <stop offset="100%" stopColor="#3d0000" />
                </linearGradient>
                <linearGradient id="nav-curtain-grad-2" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#7a0000" />
                  <stop offset="40%" stopColor="#c80000" />
                  <stop offset="100%" stopColor="#3d0000" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" fill="#000" />
              <polygon points="30,22 50,85 64,85 36,22" fill="url(#nav-spotlight-beam-left)" opacity="0.65" />
              <polygon points="70,22 50,85 36,85 64,22" fill="url(#nav-spotlight-beam-right)" opacity="0.65" />
              <ellipse cx="50" cy="85" rx="19" ry="5" fill="url(#nav-stage-pool)" />
              <path d="M 0,15 Q 25,23 50,15 Q 75,23 100,15 L 100,0 L 0,0 Z" fill="#5c0000" />
              <path d="M 0,15 Q 25,20 50,15 Q 75,20 100,15 L 100,0 L 0,0 Z" fill="#800000" />
              {/* Left drape */}
              <path d="M 0,15 C 22,15 26,32 18,55 C 14,70 10,95 0,95 Z" fill="#290000" />
              <path d="M 0,15 C 18,15 21,30 15,52 C 11,65 7,95 0,95 Z" fill="url(#nav-curtain-grad-1)" />
              <path d="M 0,15 C 12,15 14,28 9,50 C 6,62 3,95 0,95 Z" fill="#990000" />
              <path d="M 0,15 C 8,15 9,25 6,50 C 4,60 1,95 0,95 Z" fill="#e60000" />
              {/* Right drape */}
              <path d="M 100,15 C 78,15 74,32 82,55 C 86,70 91,95 100,95 Z" fill="#290000" />
              <path d="M 100,15 C 82,15 79,30 85,52 C 89,65 93,95 100,95 Z" fill="url(#nav-curtain-grad-2)" />
              <path d="M 100,15 C 88,15 86,28 91,50 C 94,62 97,95 100,95 Z" fill="#990000" />
              <path d="M 100,15 C 92,15 91,25 94,50 C 96,60 99,95 100,95 Z" fill="#e60000" />
            </svg>
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-purple opacity-0 group-hover:opacity-25 blur-sm transition duration-300 pointer-events-none"></div>
          </div>
          <span className="font-display font-black tracking-widest text-2xl bg-gradient-to-r from-white via-indigo-200 to-indigo-100 bg-clip-text text-transparent dark:from-white dark:via-zinc-200 dark:to-zinc-300 dark:bg-clip-text">
            ONSTAEGE
          </span>
        </a>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = link.label === "About" ? currentPage === "about" : false;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.label, link.href)}
                className={`font-sans font-medium text-sm transition-colors duration-300 ${
                  isActive
                    ? "text-brand-purple font-bold"
                    : theme === "dark"
                    ? "text-zinc-400 hover:text-white"
                    : "text-zinc-600 hover:text-black"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right Buttons Only (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#contact"
            className="px-4 py-2 rounded-xl font-sans font-semibold text-xs bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg shadow-brand-purple/20 hover:shadow-brand-purple/40 hover:scale-[1.02] transition-all duration-300"
          >
            Request Demo
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl ${
              theme === "dark"
                ? "bg-zinc-900 text-zinc-400 hover:text-white"
                : "bg-zinc-100 text-zinc-600 hover:text-black"
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div
          className={`absolute top-full left-0 right-0 py-6 px-6 flex flex-col space-y-4 shadow-xl border-t border-b ${
            theme === "dark"
              ? "bg-[#0c0c0c] border-white/5 shadow-black/80"
              : "bg-white border-black/5 shadow-zinc-100"
          }`}
        >
          {navLinks.map((link) => {
            const isActive = link.label === "About" ? currentPage === "about" : false;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavLinkClick(e, link.label, link.href);
                }}
                className={`font-sans font-medium text-base py-1 transition-colors duration-200 ${
                  isActive
                    ? "text-brand-purple font-bold"
                    : theme === "dark" 
                    ? "text-zinc-400 hover:text-white" 
                    : "text-zinc-600 hover:text-black"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-4 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl font-sans font-semibold text-sm bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg"
            >
              Request Demo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
