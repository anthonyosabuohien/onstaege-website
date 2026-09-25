import React, { useState } from 'react';
import { BRAND_ASSETS, INITIAL_REACTIONS } from '../data/mockData';
import { EarlyAccessContext } from './EarlyAccessModal';

interface HeroSectionProps {
  onOpenEarlyAccess: (context?: EarlyAccessContext) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenEarlyAccess }) => {
  const [heroEmail, setHeroEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroEmail) return;
    onOpenEarlyAccess({ email: heroEmail, intent: 'Founder Tier Early Access' });
  };

  const aiCapabilities = [
    { label: 'Multi-Camera 4K Sync', icon: 'videocam', count: '3 Feeds' },
    { label: 'Diaspora Spraying Protocol', icon: 'payments', count: '$18.4k' },
    { label: 'Synced Doorstep Catering', icon: 'dinner_dining', count: '86 Cities' },
    { label: 'Isolated Stage Stems', icon: 'headphones', count: 'Zero-Latency' },
  ];

  return (
    <section id="hero" className="w-full pt-8 pb-20 relative overflow-hidden">
      {/* Ambient background glow orbs for glassmorphism */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-primary/15 via-primary-container/10 to-tertiary-fixed-dim/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-[350px] h-[350px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[350px] h-[350px] bg-tertiary-fixed-dim/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Hero Headline */}
        <h1 className="font-display-hero text-display-hero text-center text-on-surface max-w-4xl mx-auto tracking-tight mb-6">
          Making the physical world{' '}
          <span className="bg-gradient-to-r from-primary via-primary-container to-tertiary-container bg-clip-text text-transparent">
            digitally accessible.
          </span>
        </h1>

        {/* Value Proposition Description */}
        <p className="font-body-lg text-body-lg text-center text-secondary max-w-2xl mx-auto mb-4 leading-relaxed">
          Onstaege is the infrastructure that allows businesses, events and destinations to take their services and experiences digital so anyone can explore, interact, participate and transact from anywhere.
        </p>

        {/* AI Tagline */}
        <div className="flex items-center justify-center mb-10 text-primary font-title-md text-sm font-semibold">
          <span>Powered by multi-modal AI that continuously personalizes the experience around you.</span>
        </div>

        {/* Glassmorphic Early Access Form Bar */}
        <div className="max-w-lg mx-auto mb-16">
          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col sm:flex-row gap-2.5 p-2 rounded-2xl glass-panel shadow-lg border border-white/90"
          >
            <input
              type="email"
              value={heroEmail}
              onChange={(e) => setHeroEmail(e.target.value)}
              placeholder="Enter your email to request private access"
              required
              className="flex-1 px-4 py-3 rounded-xl glass-input text-on-surface placeholder:text-outline font-body-md text-xs sm:text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black font-title-md text-xs font-bold hover:shadow-md hover:scale-102 transition-all duration-150 shadow-sm shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Get Early Access</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </form>
        </div>

        {/* Split-World Interactive Showcase with Glassmorphism */}
        <div className="w-full rounded-3xl glass-panel p-4 sm:p-8 shadow-2xl border border-white/80 overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Physical World (Col 1-5) */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md aspect-4/3 sm:aspect-16/10 group">
              <img
                src={BRAND_ASSETS.wedding}
                alt="Physical World Banquet in Lagos"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

              {/* Top Glass Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3 py-1.5 rounded-xl glass-pill text-on-surface font-label-sm text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                  <span>PHYSICAL WORLD</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-emerald-500/90 text-white font-label-sm text-[10px] font-bold flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>ON-SITE · LAGOS</span>
                </div>
              </div>

              {/* Bottom Info Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel-dark text-white text-left">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-title-lg text-sm sm:text-base font-bold">
                    Tunde &amp; Amina's Reception
                  </h4>
                  <span className="text-xs text-tertiary-fixed-dim font-mono font-semibold">240 Guests</span>
                </div>
                <p className="font-body-sm text-xs text-white/70">
                  Grand Ballroom · Victoria Island, Lagos
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/80">
                  <span>Physical Venue Capacity: 100% Full</span>
                  <span className="text-emerald-400 font-semibold">Spatial Beacons Live</span>
                </div>
              </div>
            </div>

            {/* Center: Infographic Connector (Col 6-7) */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 text-center">
              {/* Infographic telemetry chip */}
              <div className="p-2 rounded-xl glass-card text-[11px] text-secondary border border-white/70 w-full max-w-[160px]">
                <div className="text-primary font-bold font-mono text-xs">+5,087%</div>
                <div className="text-[9px] uppercase tracking-wider font-semibold">Audience Multiplier</div>
              </div>

              <div className="my-3 hidden lg:flex flex-col items-center gap-1 text-primary">
                <span className="w-0.5 h-6 bg-gradient-to-b from-primary to-transparent" />
                <span className="material-symbols-outlined text-[20px] animate-bounce">sync_alt</span>
                <span className="w-0.5 h-6 bg-gradient-to-t from-primary to-transparent" />
              </div>
            </div>

            {/* Right: Digital World Layer (Col 8-12) */}
            <div className="lg:col-span-5 p-5 rounded-2xl glass-card border border-white/90 text-left relative flex flex-col justify-between shadow-sm">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-surface-container/60 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse" />
                    <span className="font-title-md text-xs font-bold text-on-surface uppercase tracking-wider">
                      DIGITAL LAYER · LIVE HUD
                    </span>
                  </div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary font-bold">
                    12,450 Global Patrons
                  </span>
                </div>

                {/* Live Spraying Telemetry */}
                <div className="p-3.5 rounded-xl glass-panel mb-3 border border-primary/20">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-primary uppercase">
                      Diaspora Currency Spraying
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                      Live Stream Sync
                    </span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-on-surface">
                    $18,420.00{' '}
                    <span className="text-xs text-secondary font-sans font-normal">sprayed tonight</span>
                  </div>
                </div>

                {/* Live Reactions Feed Preview */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] uppercase font-bold text-secondary tracking-wider block">
                    Global Reactions Feed (86 Countries)
                  </span>
                  {INITIAL_REACTIONS.slice(0, 2).map((r) => (
                    <div key={r.id} className="p-2 rounded-lg glass-card text-xs flex items-center justify-between">
                      <div>
                        <span className="font-bold text-primary text-[11px]">{r.sender} ({r.location}):</span>{' '}
                        <span className="text-on-surface text-[11px]">{r.message}</span>
                      </div>
                      {r.amount && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          +${r.amount}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Infographic Capability Badges */}
          <div className="mt-6 pt-5 border-t border-surface-container/60 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {aiCapabilities.map((cap) => (
              <div
                key={cap.label}
                className="p-2.5 rounded-xl glass-card flex items-center text-left border border-white/70 select-none"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">{cap.icon}</span>
                  <div>
                    <span className="text-xs font-semibold text-on-surface block leading-tight">{cap.label}</span>
                    <span className="text-[10px] text-secondary font-mono">{cap.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Anchor Statement */}
        <div className="text-center mt-12">
          <p className="font-headline-sm text-lg sm:text-2xl text-on-surface font-semibold tracking-tight">
            The real world,{' '}
            <span className="text-primary italic">expanded.</span>
          </p>
          <p className="font-body-sm text-secondary mt-1 max-w-xl mx-auto">
            Not a metaverse replacement. A digital infrastructure layer for existing physical spaces.
          </p>
        </div>

      </div>
    </section>
  );
};
