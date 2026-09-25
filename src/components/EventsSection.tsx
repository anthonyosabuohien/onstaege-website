import React, { useState } from 'react';
import { BRAND_ASSETS, USE_CASES } from '../data/mockData';
import { EarlyAccessContext } from './EarlyAccessModal';
import { ShuffleEarningsDeck } from './ShuffleEarningsDeck';

interface EventsSectionProps {
  onOpenEarlyAccess: (context?: EarlyAccessContext) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onOpenEarlyAccess }) => {
  const [attendeeState, setAttendeeState] = useState<'onsite' | 'remote'>('onsite');

  return (
    <section id="events" className="w-full py-24 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-tertiary-fixed-dim/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Every event can go digital.
            </h2>
            <p className="font-body-lg text-body-lg text-secondary max-w-xl mt-3">
              Onstaege gives physical events a digital presence that allows people anywhere to participate, experience and engage in real time.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenEarlyAccess({
                intent: 'Event Digitization Protocol Access',
                role: 'organizer'
              })
            }
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-container to-primary text-white font-title-md text-xs font-bold hover:shadow-lg hover:scale-102 transition-all shadow-sm self-start md:self-auto cursor-pointer"
          >
            <span>Digitize Your Event</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* Featured Live Event Showcase Card with Glassmorphism */}
        <div className="w-full rounded-3xl glass-panel p-6 sm:p-10 shadow-2xl border border-white/90 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Section (Col 1-7) */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-lg aspect-16/10 group">
              <img
                src={BRAND_ASSETS.concert}
                alt="Live Afrobeats Festival Arena"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3 py-1 rounded-xl glass-panel-dark text-white font-label-sm text-xs font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
                  <span>ONSTAEGE LIVE STREAMING</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg glass-panel-dark text-white font-label-sm text-[11px] font-bold">
                  Eko Arena · Lagos
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel-dark text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary-fixed-dim block mb-1">
                  ARENA LIVE BROADCAST
                </span>
                <h3 className="font-headline-sm text-lg sm:text-xl font-bold">
                  Afrobeats Festival Lagos · Headline Stage
                </h3>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
                  <span>35,000 In Arena · 420,000 Remote Viewers</span>
                  <span className="text-emerald-400 font-semibold">Stage Stem 01 Active</span>
                </div>
              </div>
            </div>

            {/* Interactive Dual-State Console (Col 8-12) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full text-left">
              <div>
                <span className="font-overline text-overline uppercase tracking-wider text-secondary font-bold block mb-2">
                  INTERACTIVE PARTICIPATION SWITCHER
                </span>

                {/* Glass Pill Dual-State Toggle */}
                <div className="flex p-1.5 rounded-2xl glass-card border border-white/80 mb-6">
                  <button
                    type="button"
                    onClick={() => setAttendeeState('onsite')}
                    className={`flex-1 py-2.5 rounded-xl font-title-md text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      attendeeState === 'onsite'
                        ? 'bg-black text-white shadow-sm'
                        : 'text-on-surface hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    <span>State 1: "I'm here"</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendeeState('remote')}
                    className={`flex-1 py-2.5 rounded-xl font-title-md text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      attendeeState === 'remote'
                        ? 'bg-black text-white shadow-sm'
                        : 'text-on-surface hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">public</span>
                    <span>State 2: "I'm joining remotely"</span>
                  </button>
                </div>

                {/* State Content */}
                <div className="p-5 rounded-2xl glass-card border border-white/80 transition-all duration-300">
                  {attendeeState === 'onsite' ? (
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary uppercase">On-Site Location Verified</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-semibold">
                          Eko Atlantic Beacon #14
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary uppercase">Remote Global Participant</span>
                        <span className="text-[10px] text-primary bg-primary-fixed px-2 py-0.5 rounded font-semibold">
                          Low Latency 4K
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 4 Use Case Blueprints Grid */}
        <div className="mb-14">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="font-overline text-overline uppercase tracking-wider text-secondary font-bold">
              EVENT TAXONOMY ARCHITECTURE
            </span>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface mt-1">
              Purpose-built for every format
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {USE_CASES.map((uc) => (
              <div
                key={uc.id}
                className="p-6 rounded-3xl glass-card glass-card-hover border border-white/80 shadow-xs flex flex-col justify-between text-left"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center mb-4 shadow-xs">
                    <span className="material-symbols-outlined text-[20px]">{uc.icon}</span>
                  </div>
                  <h4 className="font-title-lg text-base font-bold text-on-surface mb-2">
                    {uc.title}
                  </h4>
                  <p className="font-body-sm text-xs text-secondary mb-4 leading-relaxed">
                    {uc.description}
                  </p>
                  <ul className="space-y-2 text-xs text-on-surface font-medium">
                    {uc.physicalFeatures.slice(0, 2).map((feat, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-primary font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                    {uc.globalFeatures.slice(0, 1).map((feat, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">★</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Shuffling Earnings Comparison Deck */}
        <ShuffleEarningsDeck onOpenEarlyAccess={onOpenEarlyAccess} />

      </div>
    </section>
  );
};
