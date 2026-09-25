import React from 'react';
import { EarlyAccessContext } from './EarlyAccessModal';

interface ComparisonSectionProps {
  onOpenEarlyAccess: (context?: EarlyAccessContext) => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onOpenEarlyAccess }) => {
  return (
    <section id="comparison" className="w-full py-24 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-tertiary-fixed-dim/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-primary font-overline text-overline uppercase tracking-widest font-bold mb-3 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
            PARADIGM SHIFT
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            Your experiences shouldn't stop at your physical location.
          </h2>
          <p className="font-body-lg text-body-lg text-secondary mt-2">
            See the structural shift when physical spaces deploy the Onstaege digital infrastructure.
          </p>
        </div>

        {/* High-Contrast 2-Column Comparison with Glassmorphism */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 text-left">
          
          {/* Column 1: WITHOUT ONSTAEGE */}
          <div className="p-8 lg:p-10 rounded-3xl glass-card border border-white/80 shadow-md">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-surface-container/60">
              <div className="w-10 h-10 rounded-2xl bg-error-container text-on-error-container flex items-center justify-center font-bold text-lg shadow-xs">
                ✕
              </div>
              <div>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                  WITHOUT ONSTAEGE
                </h3>
                <span className="font-label-sm text-xs text-secondary">
                  The traditional physical limitation
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <span className="font-overline text-[10px] font-bold uppercase text-secondary">
                  BUSINESS
                </span>
                <p className="font-body-md text-xs sm:text-sm text-on-surface mt-1">
                  Limited entirely to patrons who physically step through the door.
                </p>
              </div>

              <div>
                <span className="font-overline text-[10px] font-bold uppercase text-secondary">
                  EVENT
                </span>
                <p className="font-body-md text-xs sm:text-sm text-on-surface mt-1">
                  Confined by physical square footage and venue fire codes.
                </p>
              </div>

              <div>
                <span className="font-overline text-[10px] font-bold uppercase text-secondary">
                  DESTINATION
                </span>
                <p className="font-body-md text-xs sm:text-sm text-on-surface mt-1">
                  Only accessible to visitors who can afford flights and lodging.
                </p>
              </div>

              <div>
                <span className="font-overline text-[10px] font-bold uppercase text-secondary">
                  CUSTOMER
                </span>
                <p className="font-body-md text-xs sm:text-sm text-on-surface mt-1">
                  Must be geographically co-located to experience or buy.
                </p>
              </div>

              <div>
                <span className="font-overline text-[10px] font-bold uppercase text-secondary">
                  EXPERIENCE
                </span>
                <p className="font-body-md text-xs sm:text-sm text-on-surface mt-1">
                  Stops abruptly the second the visitor exits the premises.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: WITH ONSTAEGE */}
          <div className="p-8 lg:p-10 rounded-3xl glass-panel text-on-surface shadow-2xl relative overflow-hidden border border-primary/40">
            <div className="absolute top-0 right-0 px-5 py-2 bg-gradient-to-r from-primary to-primary-container text-white font-label-sm text-[11px] font-bold rounded-bl-2xl shadow-sm">
              DIGITAL LAYER ACTIVE
            </div>

            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-primary/20">
              <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm">
                ✓
              </div>
              <div>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                  WITH ONSTAEGE
                </h3>
                <span className="font-label-sm text-xs text-primary font-semibold">
                  Continuous physical + digital presence
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <span className="font-overline text-[10px] font-bold uppercase text-primary">
                  BUSINESS
                </span>
                <p className="font-body-md text-xs sm:text-sm font-semibold text-on-surface mt-1">
                  Reach and transact with customers far beyond physical walls globally.
                </p>
              </div>

              <div>
                <span className="font-overline text-[10px] font-bold uppercase text-primary">
                  EVENT
                </span>
                <p className="font-body-md text-xs sm:text-sm font-semibold text-on-surface mt-1">
                  Extend live interactive participation to unlimited global audiences.
                </p>
              </div>

              <div>
                <span className="font-overline text-[10px] font-bold uppercase text-primary">
                  DESTINATION
                </span>
                <p className="font-body-md text-xs sm:text-sm font-semibold text-on-surface mt-1">
                  Digitally accessible and interactive from anywhere on Earth.
                </p>
              </div>

              <div>
                <span className="font-overline text-[10px] font-bold uppercase text-primary">
                  CUSTOMER
                </span>
                <p className="font-body-md text-xs sm:text-sm font-semibold text-on-surface mt-1">
                  Seamless access whether standing on-site or 6,000 miles away.
                </p>
              </div>

              <div>
                <span className="font-overline text-[10px] font-bold uppercase text-primary">
                  EXPERIENCE
                </span>
                <p className="font-body-md text-xs sm:text-sm font-semibold text-on-surface mt-1">
                  Continues before, during, and long after physical attendance.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-primary/20">
              <button
                type="button"
                onClick={() =>
                  onOpenEarlyAccess({
                    intent: 'Activate Persistent Digital Layer',
                    role: 'organizer'
                  })
                }
                className="w-full py-3 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black font-title-md text-xs font-bold hover:shadow-lg transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Get early access</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

        </div>

        {/* INFOGRAPHIC: Pipeline Transformation Banner */}
        <div className="p-6 rounded-2xl glass-panel shadow-sm mb-12 text-center flex flex-wrap items-center justify-center gap-3 border border-white/80">
          <span className="font-label-md text-xs font-bold text-secondary">
            PHYSICAL WORLD
          </span>
          <span className="text-outline">→</span>
          <span className="font-label-md text-xs text-secondary">
            WITHOUT ONSTAEGE (Location Bounded)
          </span>
          <span className="text-outline">→</span>
          <span className="font-label-md text-xs font-bold text-primary">
            WITH ONSTAEGE (Physical + Digital + AI)
          </span>
          <span className="text-outline">→</span>
          <span className="font-label-md text-xs font-bold text-on-surface">
            BORDERLESS CONTINUOUS REACH
          </span>
        </div>

        {/* Key Quote Card */}
        <div className="max-w-3xl mx-auto p-8 rounded-3xl glass-card text-center border border-white/80 shadow-xs">
          <span className="material-symbols-outlined text-primary text-[36px] mb-2">
            format_quote
          </span>
          <blockquote className="font-headline-sm text-base sm:text-xl text-on-surface font-semibold italic">
            “Onstaege doesn't replace the physical world. It gives the physical world a digital experiential layer.”
          </blockquote>
        </div>

      </div>
    </section>
  );
};
