import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/mockData';
import { EarlyAccessContext } from './EarlyAccessModal';

interface EarlyAccessSectionProps {
  onOpenEarlyAccess: (context?: EarlyAccessContext) => void;
}

export const EarlyAccessSection: React.FC<EarlyAccessSectionProps> = ({ onOpenEarlyAccess }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'organizer' | 'business' | 'destination' | 'visitor'>('organizer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onOpenEarlyAccess({ email, role, intent: 'Founder Batch Early Access Pass' });
  };

  return (
    <section
      id="early-access"
      className="w-full py-28 relative overflow-hidden bg-gradient-to-br from-primary via-[#453b9e] to-primary-container text-white"
    >
      {/* Glowing frosted glass rings */}
      <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full border-[32px] border-white/10 pointer-events-none blur-sm" />
      <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full border-[24px] border-white/10 pointer-events-none" />
      <div className="absolute -left-24 -top-24 w-80 h-80 rounded-full border-[28px] border-white/10 pointer-events-none blur-sm" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        {/* Glassmorphic Brand Logo Card */}
        <div className="w-18 h-18 mx-auto mb-6 rounded-3xl bg-black/80 p-2.5 shadow-2xl flex items-center justify-center border border-white/20 overflow-hidden">
          <img
            alt="Onstaege Portal Brand Icon"
            className="w-full h-full object-contain rounded-2xl"
            src={BRAND_ASSETS.logo}
            referrerPolicy="no-referrer"
          />
        </div>

        <h2 className="font-display-hero text-display-hero font-semibold tracking-tight text-white mb-6">
          Take your physical world digital.
        </h2>

        <p className="font-body-lg text-body-lg text-primary-fixed max-w-2xl mx-auto leading-relaxed mb-8">
          Join the early-access list and be among the first businesses, events and destinations building their digital experience with Onstaege.
        </p>

        {/* Role Segmenter with Glassmorphism */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'organizer', label: 'Event Organizer' },
            { id: 'business', label: 'Business Owner' },
            { id: 'destination', label: 'Tourism / Destination' },
            { id: 'visitor', label: 'Global Attendee' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setRole(item.id as any);
                onOpenEarlyAccess({ role: item.id as any, intent: `Join as ${item.label}` });
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                role === item.id
                  ? 'bg-black text-white border border-black shadow-lg scale-105 font-bold'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/15 backdrop-blur-md'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 mb-6"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 px-5 py-3.5 rounded-xl bg-white text-on-surface placeholder:text-outline font-body-md text-xs sm:text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black font-title-md text-xs font-bold hover:shadow-lg transition-all shadow-md shrink-0 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>GET EARLY ACCESS</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </form>

      </div>
    </section>
  );
};
