import React, { useEffect } from 'react';
import { EarlyAccessContext } from './EarlyAccessModal';

interface VisionPageProps {
  onNavigate: (view: 'home' | 'about' | 'vision') => void;
  onOpenEarlyAccess: (context?: EarlyAccessContext) => void;
}

export const VisionPage: React.FC<VisionPageProps> = ({ onNavigate, onOpenEarlyAccess }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#06080e] text-white pt-24 pb-20 relative overflow-hidden">
      {/* Dynamic ambient backgrounds */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-purple-700/20 via-blue-600/15 to-transparent blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-primary/15 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-12 border-b border-white/10">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span>Back to Home Experience</span>
          </button>

          {/* Quick view switcher tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
            <button
              onClick={() => onNavigate('about')}
              className="px-3.5 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              ← About &amp; Origin Story
            </button>
            <button
              onClick={() => onNavigate('vision')}
              className="px-3.5 py-1.5 rounded-lg bg-white/15 text-white font-semibold shadow-xs"
            >
              Vision &amp; Architecture
            </button>
          </div>
        </div>

        {/* Vision Hero Header */}
        <div className="text-center space-y-6 max-w-4xl mx-auto mb-20">
          <h1 className="font-headline-lg text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight uppercase">
            Our Biggest <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Bet</span>
          </h1>

          <div className="py-6 space-y-3">
            <div className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-purple-300 font-headline-md">
              AI WILL CREATE MORE FREE TIME.
            </div>
            <div className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-blue-400 font-headline-md">
              HUMANS WILL SEEK MORE EXPERIENCES.
            </div>
          </div>

          <p className="font-body-lg text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            As repetitive work dissolves, humanity’s hunger for live culture, shared moments, and global presence explodes exponentially.
          </p>
        </div>

        {/* Twin Theses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
          
          <div className="lg:col-span-6 space-y-6 text-sm sm:text-base leading-relaxed text-white/80 text-left">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <p>
                Artificial Intelligence is rapidly automating repetitive work and increasing productivity across industries. As people gain more free time, demand for meaningful social interaction, live entertainment, experiences, travel, communities, and events will continue to grow.
              </p>
              <p>
                This shift is already happening. Live experiences have become one of the fastest-growing sectors globally as people increasingly value moments they can share rather than possessions they can own.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/20 via-purple-900/30 to-black border border-primary/30 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-primary-fixed-dim font-bold">
                OUR CORE PRINCIPLE
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">
                Every physical experience should have an unlimited digital audience.
              </div>
              <p className="text-xs text-white/60">
                Onstaege is building the infrastructure positioned to capture that opportunity.
              </p>
            </div>
          </div>

          {/* Interactive Inflows & Sector Diagram */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/15 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-primary-fixed-dim">
                    ONSTAEGE INFLOW ARCHITECTURE
                  </div>
                  <div className="text-lg font-bold text-white">Real-Time Growth Sectors</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Sectors Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors">
                  <span className="material-symbols-outlined text-purple-400 text-2xl mb-2 block">
                    nightlife
                  </span>
                  <div className="text-xs font-mono uppercase text-white/50">SECTOR 01</div>
                  <div className="text-sm font-bold text-white">Live Venues &amp; Clubs</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition-colors">
                  <span className="material-symbols-outlined text-pink-400 text-2xl mb-2 block">
                    theater_comedy
                  </span>
                  <div className="text-xs font-mono uppercase text-white/50">SECTOR 02</div>
                  <div className="text-sm font-bold text-white">Creator Economy</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
                  <span className="material-symbols-outlined text-blue-400 text-2xl mb-2 block">
                    stadium
                  </span>
                  <div className="text-xs font-mono uppercase text-white/50">SECTOR 03</div>
                  <div className="text-sm font-bold text-white">Sports &amp; Arenas</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400 transition-colors">
                  <span className="material-symbols-outlined text-amber-400 text-2xl mb-2 block">
                    flight_takeoff
                  </span>
                  <div className="text-xs font-mono uppercase text-white/50">SECTOR 04</div>
                  <div className="text-sm font-bold text-white">Global Tourism &amp; Heritage</div>
                </div>
              </div>

              {/* Central Neural Hub Node */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-black border border-white/20 text-center">
                <div className="text-[10px] font-mono text-primary-fixed-dim uppercase tracking-widest font-bold">
                  CENTRAL ONSTAEGE PLATFORM
                </div>
                <div className="text-xs text-white/80 mt-1">
                  Synchronous Real-Time Immersion · Zero Distance Friction
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-headline-md">
              100%
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-white/60 mt-2">
              Global Audience
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-headline-md">
              ∞
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-white/60 mt-2">
              Unlimited Reach
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-headline-md">
              8ms
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-white/60 mt-2">
              Real-Time Immersion
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 font-headline-md">
              4x
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-white/60 mt-2">
              New Revenue Streams
            </div>
          </div>
        </div>

        {/* Section 03: The Borderless Future */}
        <div className="pt-8 mb-20">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h2 className="font-headline-lg text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              Building A World Without Physical Boundaries
            </h2>
            <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              MAKE THE WORLD YOUR BUSINESS PREMISES.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Transformation Visual Diagram */}
            <div className="lg:col-span-6 p-8 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/15 shadow-2xl">
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6 text-xs font-mono uppercase tracking-wider">
                <span className="text-white/60">PHYSICAL STORE FRONT</span>
                <span className="material-symbols-outlined text-purple-400 text-lg">
                  trending_flat
                </span>
                <span className="text-primary-fixed font-bold">DIGITAL IMMERSIVE OUTLET</span>
              </div>

              <div className="space-y-4 text-xs font-mono text-white/70">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span>Physical Seating / Foot Traffic</span>
                  <span className="text-rose-400 font-bold">Hard Cap (50 - 500 cap)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-between text-white">
                  <span>Onstaege Digital Presence</span>
                  <span className="text-emerald-400 font-bold">Uncapped (Global 86+ Countries)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span>Audience Geographic Radius</span>
                  <span className="text-rose-400 font-bold">5 - 15 km Commute</span>
                </div>
                <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-between text-white">
                  <span>Onstaege Virtual Radius</span>
                  <span className="text-emerald-400 font-bold">Worldwide Instantaneous Access</span>
                </div>
              </div>
            </div>

            {/* Vision Manifesto */}
            <div className="lg:col-span-6 space-y-6 text-sm sm:text-base leading-relaxed text-white/80 text-left">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <p>
                  We envision a future where businesses no longer serve only the people who walk through their doors. A customer can experience a fashion store without visiting it. Attend a concert without travelling. Receive quality education without entering a physical classroom.
                </p>
                <p>
                  Consult a healthcare professional, join a cultural festival from another continent, participate in a family celebration from anywhere, and support creators in real time.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 via-blue-950/40 to-black border border-purple-500/30 space-y-3">
                <div className="font-overline text-xs uppercase tracking-widest text-purple-300 font-bold">
                  THE NEW REALITY
                </div>
                <div className="text-lg sm:text-xl font-bold text-white">
                  In the future we are building, physical presence becomes optional, not mandatory.
                </div>
                <p className="text-xs sm:text-sm text-white/70">
                  Virtual participation will become as immersive, interactive, and rewarding as being there in person. Every business will be able to extend its services beyond its shop, office, venue, or physical boundaries. Every creator will reach a global audience. Every event will have unlimited capacity.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Navigation & CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/15 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-primary/10 to-transparent pointer-events-none" />
          <h3 className="font-headline-md text-2xl sm:text-3xl font-bold text-white mb-3">
            Build with us on the experiential frontier
          </h3>
          <p className="font-body-sm text-sm text-white/70 max-w-xl mx-auto mb-6">
            Explore partnership programs, pilot your venue or enterprise, and connect directly with our engineering team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenEarlyAccess({ intent: 'Strategic Architecture & Deployment' })}
              className="px-6 py-3 rounded-xl bg-black text-white hover:bg-neutral-900 border border-neutral-700 font-title-md text-sm font-semibold transition-all shadow-md cursor-pointer"
            >
              Request Access →
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-title-md text-sm font-semibold transition-all cursor-pointer"
            >
              ← Read Founder Origin Story
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
