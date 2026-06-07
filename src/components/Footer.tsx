import { Sparkles, Globe, Heart, Shield, RefreshCw } from "lucide-react";
import { Theme } from "../types";

interface FooterProps {
  theme: Theme;
  onPageChange?: (page: "home" | "about") => void;
}

export default function Footer({ theme, onPageChange }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" }
      ]
    }
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/onstaege?igsh=aHZzaWduc2owZHJy&utm_source=qr" },
    { label: "TikTok", href: "https://www.tiktok.com/@onstaege?_r=1&_t=ZS-970nzeoRC3Y" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/anthony-osabuohien?utm_source=share_via&utm_content=profile&utm_medium=member_ios" }
  ];

  return (
    <footer className={`relative z-10 pt-20 pb-12 border-t overflow-hidden ${
      theme === "dark"
        ? "bg-[#090909] border-white/5 text-zinc-400"
        : "bg-[#FAFAFA] border-zinc-200 text-zinc-650"
    }`}>
      
      {/* Visual background lights */}
      <div className="absolute bottom-0 right-[10%] w-80 h-80 bg-brand-purple/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Dynamic Tagline Showcase Area */}
        <div className="text-center space-y-6 pb-16 border-b border-zinc-805 dark:border-white/5">
          <div className="flex justify-center items-center space-x-2.5">
            <div className="relative w-[38px] h-[38px] flex items-center justify-center rounded-xl overflow-hidden shadow-lg shadow-black/40 border border-white/10">
              <svg viewBox="0 0 100 100" className="w-full h-full bg-black" aria-hidden="true">
                <defs>
                  <linearGradient id="footer-spotlight-beam-left" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffffdd" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="footer-spotlight-beam-right" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffffdd" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient id="footer-stage-pool" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="40%" stopColor="#ffffee" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#ffffee" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="footer-curtain-grad-1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7a0000" />
                    <stop offset="40%" stopColor="#c80000" />
                    <stop offset="100%" stopColor="#3d0000" />
                  </linearGradient>
                  <linearGradient id="footer-curtain-grad-2" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stopColor="#7a0000" />
                    <stop offset="40%" stopColor="#c80000" />
                    <stop offset="100%" stopColor="#3d0000" />
                  </linearGradient>
                </defs>
                <rect width="100" height="100" fill="#000" />
                <polygon points="30,22 50,85 64,85 36,22" fill="url(#footer-spotlight-beam-left)" opacity="0.65" />
                <polygon points="70,22 50,85 36,85 64,22" fill="url(#footer-spotlight-beam-right)" opacity="0.65" />
                <ellipse cx="50" cy="85" rx="19" ry="5" fill="url(#footer-stage-pool)" />
                <path d="M 0,15 Q 25,23 50,15 Q 75,23 100,15 L 100,0 L 0,0 Z" fill="#5c0000" />
                <path d="M 0,15 Q 25,20 50,15 Q 75,20 100,15 L 100,0 L 0,0 Z" fill="#800000" />
                {/* Left drape */}
                <path d="M 0,15 C 22,15 26,32 18,55 C 14,70 10,95 0,95 Z" fill="#290000" />
                <path d="M 0,15 C 18,15 21,30 15,52 C 11,65 7,95 0,95 Z" fill="url(#footer-curtain-grad-1)" />
                <path d="M 0,15 C 12,15 14,28 9,50 C 6,62 3,95 0,95 Z" fill="#990000" />
                <path d="M 0,15 C 8,15 9,25 6,50 C 4,60 1,95 0,95 Z" fill="#e60000" />
                {/* Right drape */}
                <path d="M 100,15 C 78,15 74,32 82,55 C 86,70 91,95 100,95 Z" fill="#290000" />
                <path d="M 100,15 C 82,15 79,30 85,52 C 89,65 93,95 100,95 Z" fill="url(#footer-curtain-grad-2)" />
                <path d="M 100,15 C 88,15 86,28 91,50 C 94,62 97,95 100,95 Z" fill="#990000" />
                <path d="M 100,15 C 92,15 91,25 94,50 C 96,60 99,95 100,95 Z" fill="#e60000" />
              </svg>
            </div>
            <span className="font-display font-black tracking-widest text-3xl bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent dark:from-white dark:via-zinc-200 dark:to-zinc-100">
              ONSTAEGE
            </span>
          </div>

          <div className="space-y-2">
            <h2 className={`font-display text-2xl sm:text-3xl font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              EXPERIENCE BEYOND PRESENCE.
            </h2>
          </div>
        </div>

        {/* Sitemap Grid (4 columns) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-left">
          
          {/* Column 1 - Brand Summary */}
          <div className="col-span-2 space-y-4">
            <p className={`font-sans text-xs leading-relaxed max-w-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
              Onstaege is a real-time immersive experience infrastructure built to bridge physical presentation limitations with unlimited global monetization.
            </p>

            <div className="space-y-1 text-xs">
              <p className={`font-bold ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-900'}`}>For Partnership:</p>
              <p className="text-brand-blue font-semibold">watchers101@gmail.com</p>
            </div>
          </div>

          {/* Columns 2-4 - Structured content maps */}
          {columns.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className={`font-display text-xs font-black tracking-widest uppercase ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                {col.title}
              </h4>
              <ul className="space-y-2 text-xs font-semibold">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.label === "About Us" && onPageChange) {
                          e.preventDefault();
                          onPageChange("about");
                        }
                      }}
                      className="hover:text-brand-purple transition-colors duration-300 leading-relaxed"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 5: Social channels & Apps */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className={`font-display text-xs font-black tracking-widest uppercase ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Social Focus
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="hover:text-brand-blue text-left transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile outlets removed as requested */}
          </div>

        </div>

        {/* Decal rights section */}
        <div className="pt-8 border-t border-zinc-805 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-500 font-mono">
          <p>© {currentYear} Onstaege Events Tech Ltd. All sovereign rights reserved digitally.</p>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 hover:text-brand-blue">
              <Globe className="w-3 h-3" />
              <span>SaaS Network Integration</span>
            </span>
            <span className="flex items-center space-x-1 hover:text-brand-purple">
              <Shield className="w-3 h-3" />
              <span>0.2s latency verified</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
