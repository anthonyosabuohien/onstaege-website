import React, { useState } from 'react';
import { BRAND_ASSETS, BUSINESS_CATEGORIES } from '../data/mockData';
import { BusinessCategory } from '../types';
import { EarlyAccessContext } from './EarlyAccessModal';

interface BusinessesSectionProps {
  onOpenEarlyAccess: (context?: EarlyAccessContext) => void;
}

export const BusinessesSection: React.FC<BusinessesSectionProps> = ({ onOpenEarlyAccess }) => {
  const [activeSector, setActiveSector] = useState<BusinessCategory>(BUSINESS_CATEGORIES[0]);

  return (
    <section id="businesses" className="w-full py-24 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-tertiary-fixed-dim/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-primary font-overline text-overline uppercase tracking-widest font-bold mb-3 shadow-xs">
              <span className="material-symbols-outlined text-[16px]">storefront</span>
              COMMERCIAL INFRASTRUCTURE
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Your business can exist beyond its physical location.
            </h2>
            <p className="font-body-lg text-body-lg text-secondary max-w-xl mt-3">
              Onstaege gives restaurants, lounges, hotels, stores, shops, offices and venues a digital experience layer where customers anywhere can interact and transact.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenEarlyAccess({
                intent: 'Business Platform Onboarding',
                role: 'business'
              })
            }
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-container to-primary text-white font-title-md text-xs font-bold hover:shadow-lg hover:scale-102 transition-all shadow-sm self-start md:self-auto cursor-pointer"
          >
            <span>Digitize your business</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* Hero Visual Card with Glassmorphism */}
        <div className="w-full rounded-3xl glass-panel p-6 sm:p-10 shadow-2xl border border-white/90 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-lg aspect-16/10 group">
              <img
                src={BRAND_ASSETS.rooftop}
                alt="Panoramic Rooftop Dining at Aura Sky Lounge"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3 py-1.5 rounded-xl glass-panel-dark text-white font-label-sm text-xs font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">stars</span>
                  <span>PREMIER HOSPITALITY PROTOCOL</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg glass-panel-dark text-white font-label-sm text-[11px] font-bold">
                  Victoria Island, Lagos
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel-dark text-white text-left">
                <h3 className="font-headline-sm text-lg sm:text-xl font-bold">
                  Aura Sky Lounge &amp; Panoramic Grill
                </h3>
                <p className="font-body-sm text-xs text-white/70 mt-1">
                  18 Tables On-Site · 1,420 Digital Tables Connecting Globally Tonight
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
                  <span>Remote Table Gifting: Active</span>
                  <span className="text-emerald-400 font-semibold font-mono">+$2,840.00 Tonight</span>
                </div>
              </div>
            </div>

            {/* Architecture Flow Box */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full text-left">
              <div>
                <span className="font-overline text-overline uppercase tracking-wider text-secondary font-bold block mb-2">
                  THE PHYSICAL TO DIGITAL EVOLUTION
                </span>
                <h3 className="font-headline-sm text-xl font-bold text-on-surface mb-4">
                  Transform fixed physical footprint into infinite reach
                </h3>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl glass-card border border-white/80">
                    <span className="text-[10px] uppercase font-bold text-primary block">01 / PHYSICAL BUSINESS</span>
                    <h5 className="font-semibold text-xs text-on-surface mt-0.5">Physical location &amp; seating capacity</h5>
                    <p className="text-[11px] text-secondary mt-0.5">Constrained by physical square footage and real estate boundary.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl glass-panel border-primary/30 ring-1 ring-primary/20">
                    <span className="text-[10px] uppercase font-bold text-primary block">02 / ONSTAEGE LAYER</span>
                    <h5 className="font-semibold text-xs text-on-surface mt-0.5">Digital services, interactions, and payments</h5>
                    <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">Synchronized with on-site staff and kitchen management POS.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl glass-card border border-white/80">
                    <span className="text-[10px] uppercase font-bold text-primary block">03 / CONTINUOUS COMMERCE</span>
                    <h5 className="font-semibold text-xs text-on-surface mt-0.5">Local on-site visitors + global remote patrons</h5>
                    <p className="text-[11px] text-secondary mt-0.5">Transact around the clock regardless of physical time zone.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Live Sector Simulator with Glassmorphic Tabs */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="font-overline text-overline uppercase tracking-wider text-secondary font-bold">
              INDUSTRY SECTOR BLUEPRINTS
            </span>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface mt-1">
              Select your business category
            </h3>
          </div>

          {/* Sector Selector Tabs */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8">
            {BUSINESS_CATEGORIES.map((sector) => {
              const isSelected = activeSector.id === sector.id;
              return (
                <button
                  key={sector.id}
                  type="button"
                  onClick={() => setActiveSector(sector)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all shrink-0 cursor-pointer text-xs font-semibold ${
                    isSelected
                      ? 'bg-black text-white border border-black shadow-md scale-102 font-bold'
                      : 'glass-card border-white/70 text-on-surface hover:bg-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{sector.icon}</span>
                  <span>{sector.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Sector Simulator Card */}
          <div className="p-8 rounded-3xl glass-panel shadow-xl border border-white/90 max-w-4xl mx-auto text-left">
            <div className="flex items-start justify-between flex-wrap gap-4 pb-6 border-b border-surface-container/60">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[24px]">{activeSector.icon}</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-lg font-bold text-on-surface">
                    {activeSector.name} Digital Layer
                  </h4>
                  <p className="text-xs text-secondary mt-0.5">{activeSector.description}</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl glass-card text-center border border-white/80">
                <span className="text-[10px] uppercase font-bold text-secondary block">Digital Superpower</span>
                <span className="text-xs font-bold text-primary">Active Mesh Integration</span>
              </div>
            </div>

            {/* Physical limitation vs Digital Superpower Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-2xl glass-card border border-error/20 bg-error/5">
                <div className="flex items-center gap-2 text-error font-bold text-xs uppercase mb-1">
                  <span className="material-symbols-outlined text-[16px]">block</span>
                  Physical Limitation
                </div>
                <p className="text-xs text-secondary leading-relaxed">
                  {activeSector.physicalLimitation}
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-primary/30 ring-1 ring-primary/20">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase mb-1">
                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                  Onstaege Digital Superpower
                </div>
                <p className="text-xs text-on-surface font-medium leading-relaxed">
                  {activeSector.digitalSuperpower}
                </p>
              </div>
            </div>

            {/* Sample items live simulation */}
            <div className="space-y-2 mb-6">
              <span className="text-[10px] uppercase font-bold text-secondary tracking-wider block">
                Synchronized Service Menu &amp; Remote Commerce
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {activeSector.sampleItems.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl glass-card border border-white/80 flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-xs text-on-surface block leading-tight">{item.name}</span>
                      <span className="text-primary font-mono font-bold text-xs mt-1 block">{item.price}</span>
                    </div>
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="mt-3 py-1.5 px-2 rounded-lg bg-neutral-200/70 text-neutral-500 border border-neutral-300/60 text-[11px] font-medium text-center cursor-not-allowed pointer-events-none select-none shadow-none"
                    >
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Button opens early access */}
            <div className="pt-4 border-t border-surface-container/60 flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs text-secondary">
                Ready to deploy for your {activeSector.name.toLowerCase()}?
              </div>
              <button
                type="button"
                onClick={() =>
                  onOpenEarlyAccess({
                    intent: `Deploy ${activeSector.name} Digital Suite`,
                    role: 'business'
                  })
                }
                className="px-6 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>Get early access</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
