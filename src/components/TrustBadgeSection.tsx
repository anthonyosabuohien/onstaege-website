import React, { useState } from 'react';
import { EarlyAccessContext } from './EarlyAccessModal';
import timelessLogo from '../assets/images/timeless_luxury_logo_1790182483308.jpg';
import residenceLogo from '../assets/images/residence_social_logo_1790182494978.jpg';
import lugbeLogo from '../assets/images/lugbe_ratels_logo_1790270384969.jpg';

export interface PartnerReview {
  id: string;
  name: string;
  category: string;
  city: string;
  url?: string;
  logoText: string;
  logoUrl: string;
  metric: string;
  metricLabel: string;
  quote: string;
  author: string;
  role: string;
  verifiedStatus: string;
  growthGauge: number;
}

export const PARTNER_REVIEWS: PartnerReview[] = [
  {
    id: 'timeless-luxury',
    name: 'Timeless Luxury',
    category: '5-Star Hotel, Rooftop Lounge & Nightclub',
    city: 'Benin City, Edo State',
    url: 'https://www.timelessluxurybenin.com/',
    logoText: 'TIMELESS LUXURY',
    logoUrl: timelessLogo,
    metric: '+178%',
    metricLabel: 'Guests spend',
    quote:
      'Using Onstaege at Timeless Luxury helped us reach guests beyond our physical location. People in London, Atlanta, and Lagos could join remotely, while digital orders, reservations, and VIP bookings created new ways for us to serve customers and grow revenue.',
    author: 'Management',
    role: 'Timeless Luxury Nightlife',
    verifiedStatus: 'Verified Onstaege Luxury Hospitality Partner',
    growthGauge: 80
  },
  {
    id: 'residence-social-house',
    name: 'The Residence Social House',
    category: 'Private Social Club, Dining & Curated Resets',
    city: 'GRA, Benin City',
    url: 'https://www.timelessluxurybenin.com/',
    logoText: 'THE RESIDENCE',
    logoUrl: residenceLogo,
    metric: '3.4x',
    metricLabel: 'Guests spend',
    quote:
      'With Onstaege, we were able to bridge our events with global members. Overseas attendees now join our social gatherings, sponsor tables, connect with on-site members and participate in ongoing discussions.',
    author: 'Management',
    role: 'The Residence Social House',
    verifiedStatus: 'Verified Onstaege Social Club Partner',
    growthGauge: 95
  },
  {
    id: 'lugbe-ratels',
    name: 'Lugbe Ratels Community',
    category: 'Civic Action & Community Environmental Initiative',
    city: 'Lugbe, Abuja',
    logoText: 'LUGBE RATELS',
    logoUrl: lugbeLogo,
    metric: '+320%',
    metricLabel: 'Remote community engagement',
    quote:
      'Onstaege helped us take our monthly cleanup beyond Lugbe. Members and supporters who couldn’t join us physically were able to participate remotely, send gifts, and support those working on-site, making the exercise more inclusive and connected.',
    author: 'Group Leader',
    role: 'Lugbe Ratels Community',
    verifiedStatus: 'Verified Onstaege Community Initiative',
    growthGauge: 92
  }
];

interface TrustBadgeSectionProps {
  onOpenEarlyAccess: (context?: EarlyAccessContext) => void;
}

export const TrustBadgeSection: React.FC<TrustBadgeSectionProps> = ({ onOpenEarlyAccess }) => {
  const [selectedPartner, setSelectedPartner] = useState<PartnerReview>(PARTNER_REVIEWS[0]);

  return (
    <section className="w-full py-16 relative overflow-hidden border-b border-surface-container/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-96 h-96 bg-tertiary-fixed-dim/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header & Infographic Network Highlights */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-primary font-overline text-overline uppercase tracking-widest font-bold mb-3 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            TRUSTED BY ICONIC PHYSICAL SPACES
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
            Premier venues and communities already live on Onstaege
          </h2>
          <p className="font-body-sm text-body-sm text-secondary mt-2">
            Connecting on-site attendees with active global participants across 86 countries.
          </p>
        </div>

        {/* INFOGRAPHIC: Platform Telemetry Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {[
            { metric: '$4.2M+', label: 'Global Remote Volume', icon: 'payments' },
            { metric: '< 80ms', label: 'Average Sync Latency', icon: 'speed' },
            { metric: '99.4%', label: 'Partner Retention Rate', icon: 'trending_up' },
            { metric: '86', label: 'Countries Connected', icon: 'public' }
          ].map((inf, i) => (
            <div key={i} className="p-3.5 rounded-2xl glass-card text-center border border-white/80">
              <span className="material-symbols-outlined text-primary text-[20px] mb-1">{inf.icon}</span>
              <div className="font-headline-sm text-xl font-bold font-mono text-on-surface">{inf.metric}</div>
              <div className="text-[11px] text-secondary font-medium mt-0.5">{inf.label}</div>
            </div>
          ))}
        </div>

        {/* Scrolling Partner Logo Ticker */}
        <div className="relative w-full mb-10 overflow-hidden py-2">
          {/* Edge gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f7f9fd] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f7f9fd] to-transparent z-10 pointer-events-none" />

          {/* Interactive Logo Strip */}
          <div className="flex items-center justify-center gap-4 flex-wrap pb-2">
            {PARTNER_REVIEWS.map((partner) => {
              const isSelected = selectedPartner.id === partner.id;
              return (
                <button
                  key={partner.id}
                  type="button"
                  onClick={() => setSelectedPartner(partner)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'glass-panel border-primary ring-2 ring-primary/30 shadow-md scale-102'
                      : 'glass-card border-white/70 hover:bg-white/90'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-black/10 shadow-xs bg-black">
                    <img
                      src={partner.logoUrl}
                      alt={`${partner.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-title-md text-sm font-bold text-on-surface block tracking-tight">
                      {partner.logoText}
                    </span>
                    <span className="font-label-sm text-xs text-secondary block">
                      {partner.name} · {partner.city.split(',')[0]}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Highlighted Partner Review Spotlight Card with Glassmorphism */}
        <div className="max-w-4xl mx-auto rounded-3xl glass-panel p-6 sm:p-8 shadow-xl border border-white/90 text-left relative transition-all duration-300">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Metric & Venue Identity */}
            <div className="md:col-span-4 p-5 rounded-2xl glass-card border border-white/80 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-xs border border-black/10 shrink-0 bg-black">
                    <img
                      src={selectedPartner.logoUrl}
                      alt={`${selectedPartner.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-title-md text-sm sm:text-base font-bold text-on-surface leading-tight">
                        {selectedPartner.name}
                      </h4>
                    </div>
                    <span className="text-xs text-secondary block mt-0.5">{selectedPartner.city}</span>
                    <span className="text-[10px] text-primary font-semibold block">{selectedPartner.category}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-container/60">
                  <span className="font-display-hero-mobile text-3xl font-bold text-primary block leading-none font-mono">
                    {selectedPartner.metric}
                  </span>
                  <span className="font-label-sm text-xs font-semibold text-on-surface mt-1.5 block">
                    {selectedPartner.metricLabel}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-surface-container/60 text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{selectedPartner.verifiedStatus}</span>
              </div>
            </div>

            {/* Right: Attributable Quote & Review Details */}
            <div className="md:col-span-8 flex flex-col justify-between py-1">
              <div>
                <div className="flex items-center gap-1 text-tertiary mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px] text-amber-500 fill-1">
                      star
                    </span>
                  ))}
                  <span className="text-xs font-semibold text-secondary ml-1.5">
                    Verified Venue Integration
                  </span>
                </div>

                <blockquote className="font-title-lg text-base sm:text-lg text-on-surface font-medium leading-relaxed italic mb-6">
                  “{selectedPartner.quote}”
                </blockquote>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-surface-container/60 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center font-bold text-primary text-sm shadow-xs border border-white/80">
                    {selectedPartner.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="font-title-md text-sm font-bold text-on-surface">
                      {selectedPartner.author}
                    </div>
                    <div className="text-xs text-secondary">
                      {selectedPartner.role}
                    </div>
                  </div>
                </div>

                {/* Button that opens early access with venue integration intent */}
                <button
                  type="button"
                  onClick={() =>
                    onOpenEarlyAccess({
                      intent: `Venue Integration Partnership: ${selectedPartner.name}`,
                      role: 'business'
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black text-xs font-semibold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>Get early access</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
