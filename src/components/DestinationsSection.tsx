import React, { useState } from 'react';
import { SAMPLE_ITINERARIES } from '../data/mockData';
import { EarlyAccessContext } from './EarlyAccessModal';

interface DestinationsSectionProps {
  onOpenEarlyAccess: (context?: EarlyAccessContext) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onOpenEarlyAccess
}) => {
  const [activeCity, setActiveCity] = useState<'lagos' | 'tokyo'>('lagos');
  const itinerary = SAMPLE_ITINERARIES[activeCity] || SAMPLE_ITINERARIES.lagos;

  return (
    <section id="destinations" className="w-full py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-tertiary-fixed-dim/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-primary font-overline text-overline uppercase tracking-widest font-bold mb-3 shadow-xs">
              <span className="material-symbols-outlined text-[16px]">explore</span>
              DESTINATIONS &amp; CITIES
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Destinations can go digital too.
            </h2>
            <p className="font-body-lg text-body-lg text-secondary max-w-xl mt-3">
              Onstaege gives entire destinations a digital layer where people can explore, experience, interact with, and participate before eventual physical travel.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenEarlyAccess({
                intent: 'Destination Platform Onboarding Request',
                role: 'destination'
              })
            }
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-container to-primary text-white font-title-md text-xs font-bold hover:shadow-lg hover:scale-102 transition-all shadow-sm self-start md:self-auto cursor-pointer"
          >
            <span>Digitize Your Destination</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* 3-Column Audience & AI Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: For Visitors On-Site */}
          <div className="lg:col-span-4 p-8 rounded-3xl glass-panel shadow-md flex flex-col justify-between h-full border border-white/90 text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center mb-6 border border-emerald-500/20">
                <span className="material-symbols-outlined text-[28px]">explore</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-2">
                For Visitors On-Site
              </h3>
              <p className="font-body-sm text-xs text-secondary mb-6 leading-relaxed">
                Enhance physical travel with ambient spatial guidance and direct local merchant commerce.
              </p>
              <ul className="space-y-3 font-body-md text-xs text-on-surface">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  <span>Real-time digital audio guides linked to historic landmarks</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  <span>Curated hidden gems verified by resident tastemakers</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  <span>Instant reservations with independent local artisans</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  <span>Spatial offline wayfinding without roaming cellular fees</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-surface-container/60 flex items-center justify-between">
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live on-site geolocation
              </span>
              <button
                type="button"
                onClick={() =>
                  onOpenEarlyAccess({
                    intent: 'On-Site Explorer Pass Access',
                    role: 'visitor'
                  })
                }
                className="text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                Get early access →
              </button>
            </div>
          </div>

          {/* Column 2: For Global Audiences */}
          <div className="lg:col-span-4 p-8 rounded-3xl glass-panel shadow-md flex flex-col justify-between h-full border border-white/90 text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
                <span className="material-symbols-outlined text-[28px]">public</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-2">
                For Global Audiences
              </h3>
              <p className="font-body-sm text-xs text-secondary mb-6 leading-relaxed">
                Experience heritage, street markets, and live festivals from any screen.
              </p>
              <ul className="space-y-3 font-body-md text-xs text-on-surface">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  <span>Remote cultural exploration and historic 3D spatial archives</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  <span>Interact with authentic local merchants in live markets</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  <span>Pre-trip experiential booking and bespoke itineraries</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  <span>Purchase physical souvenirs delivered to your doorstep</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-surface-container/60 flex items-center justify-end">
              <button
                type="button"
                onClick={() =>
                  onOpenEarlyAccess({
                    intent: 'Global Remote Tourism Suite Access',
                    role: 'visitor'
                  })
                }
                className="text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                Get early access →
              </button>
            </div>
          </div>

          {/* Column 3: INFOGRAPHIC AI Itinerary */}
          <div className="lg:col-span-4 p-8 rounded-3xl glass-panel shadow-xl flex flex-col justify-between border border-primary/30 text-left relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                  <span className="font-overline text-overline uppercase tracking-widest font-bold text-[10px]">
                    YOUR ONSTAEGE DAY
                  </span>
                </div>

                {/* City Toggle */}
                <div className="flex gap-1 text-xs">
                  <button
                    onClick={() => setActiveCity('lagos')}
                    className={`px-2 py-0.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                      activeCity === 'lagos' ? 'bg-black text-white shadow-xs' : 'glass-card text-secondary'
                    }`}
                  >
                    Lagos
                  </button>
                  <button
                    onClick={() => setActiveCity('tokyo')}
                    className={`px-2 py-0.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                      activeCity === 'tokyo' ? 'bg-black text-white shadow-xs' : 'glass-card text-secondary'
                    }`}
                  >
                    Tokyo
                  </button>
                </div>
              </div>

              <h3 className="font-title-lg text-base font-bold text-on-surface mb-4">
                AI builds an experience around you
              </h3>

              {/* Infographic Timeline */}
              <div className="space-y-3.5 relative pl-4 border-l-2 border-primary/30">
                {itinerary.map((slot, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      onOpenEarlyAccess({
                        intent: `Book Itinerary Slot: ${slot.title}`,
                        role: 'visitor'
                      })
                    }
                    className="relative cursor-pointer group rounded-xl p-2 -ml-2 glass-card-hover transition-all"
                  >
                    <span className="absolute -left-[23px] top-2.5 w-3 h-3 rounded-full bg-primary ring-4 ring-surface-container group-hover:scale-125 transition-transform" />
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-primary">{slot.time}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded glass-card text-secondary font-semibold">
                        {slot.badge}
                      </span>
                    </div>
                    <p className="font-body-sm text-xs font-bold text-on-surface group-hover:text-primary transition-colors mt-0.5">
                      {slot.title}
                    </p>
                    <p className="text-[11px] text-secondary line-clamp-1">{slot.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Button opens early access form */}
            <button
              type="button"
              onClick={() =>
                onOpenEarlyAccess({
                  intent: `Generate Custom Itinerary for ${activeCity.toUpperCase()}`,
                  role: 'visitor'
                })
              }
              className="mt-8 w-full py-3 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black font-title-md text-xs font-bold hover:shadow-md transition-all text-center shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Get early access</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
