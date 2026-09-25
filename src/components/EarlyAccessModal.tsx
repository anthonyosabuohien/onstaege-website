import React, { useState, useEffect } from 'react';
import { BRAND_ASSETS } from '../data/mockData';
import { sendAutomaticEarlyAccessAlert } from '../services/notificationService';

export interface EarlyAccessContext {
  email?: string;
  role?: 'organizer' | 'business' | 'destination' | 'visitor';
  intent?: string;
}

interface EarlyAccessModalProps {
  context?: EarlyAccessContext;
  onClose: () => void;
}

export const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({
  context,
  onClose
}) => {
  const [email, setEmail] = useState(context?.email || '');
  const [role, setRole] = useState<'organizer' | 'business' | 'destination' | 'visitor'>(
    context?.role || 'organizer'
  );
  const [spaceName, setSpaceName] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId] = useState(() => 'OSTG-' + Math.floor(100000 + Math.random() * 900000));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (context?.email) setEmail(context.email);
    if (context?.role) setRole(context.role);
  }, [context]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const submission = {
      ticketId,
      email: email.trim(),
      role,
      spaceName: spaceName.trim(),
      city: city.trim(),
      intent: context?.intent || 'General Early Access',
      submittedAt: new Date().toISOString(),
    };

    // 1. Save locally so data is never lost
    try {
      const stored = JSON.parse(localStorage.getItem('onstaege_early_access_submissions') || '[]');
      stored.unshift(submission);
      localStorage.setItem('onstaege_early_access_submissions', JSON.stringify(stored));
    } catch {
      // safely handle localStorage unavailability
    }

    // 2. Automatically dispatch copy to founder email (anthonyosabuohien101@gmail.com)
    sendAutomaticEarlyAccessAlert(submission);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleCopyDetails = () => {
    const text = `Onstaege Early Access Application\nPass ID: ${ticketId}\nEmail: ${email}\nRole: ${role}\nVenue/Space: ${spaceName || 'N/A'}\nCity: ${city || 'N/A'}\nIntent: ${context?.intent || 'General Early Access'}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/60 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background glow orbs */}
      <div className="absolute w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-tertiary-fixed-dim/20 blur-[100px] rounded-full pointer-events-none translate-x-32 translate-y-32" />

      <div className="relative glass-panel rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-white/80 text-left overflow-hidden">
        {/* Top gradient highlight strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary-container to-tertiary-fixed-dim" />

        <div className="flex items-center justify-between pb-4 border-b border-surface-container/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black border border-white/20 flex items-center justify-center p-0.5 shadow-xs overflow-hidden">
              <img src={BRAND_ASSETS.logo} alt="Onstaege Logo" className="w-full h-full object-contain rounded-lg" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
                Get Early Access
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-card hover:bg-surface-container flex items-center justify-center text-secondary hover:text-on-surface transition-colors cursor-pointer text-lg"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center text-3xl font-bold shadow-sm animate-in zoom-in-75">
              ✓
            </div>
            <div>
              <h4 className="font-title-lg font-bold text-on-surface text-xl">Early Access Reserved!</h4>
              <p className="text-body-sm text-secondary mt-1.5 max-w-sm mx-auto text-xs leading-relaxed">
                Your application has been received and saved successfully. Invitation and onboarding pass allocated to <strong className="text-on-surface font-semibold">{email}</strong>.
              </p>
            </div>

            {/* Infographic Ticket */}
            <div className="glass-card p-4 rounded-2xl border border-primary/20 text-left space-y-2 max-w-sm mx-auto shadow-sm">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-primary uppercase tracking-wider">Priority Access Pass</span>
                <span className="text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full text-[10px]">CONFIRMED</span>
              </div>
              <div className="text-lg font-mono font-bold text-on-surface tracking-tight">
                {ticketId}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-surface-container/60 text-[11px] text-secondary">
                <div>
                  <span className="block text-[9px] uppercase font-bold text-outline">Category</span>
                  <span className="font-semibold text-on-surface capitalize">{role}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-outline">Location</span>
                  <span className="font-semibold text-on-surface truncate">{city || 'Global Remote'}</span>
                </div>
              </div>
            </div>

            {/* User pass actions */}
            <div className="pt-2 max-w-sm mx-auto">
              <button
                type="button"
                onClick={handleCopyDetails}
                className="w-full py-2.5 px-3 rounded-xl glass-card hover:bg-white/80 text-on-surface text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-surface-container cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">{copied ? 'check' : 'content_copy'}</span>
                <span>{copied ? 'Pass Copied to Clipboard!' : 'Copy Pass Details'}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="mt-2 w-full max-w-sm py-3 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black font-title-md text-xs font-semibold transition-all shadow-md cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            {/* Infographic quick bar */}
            <div className="grid grid-cols-2 gap-2 py-2 px-3 rounded-xl glass-card text-center border border-white/60">
              <div>
                <span className="text-primary font-bold text-xs block font-mono">120+</span>
                <span className="text-[10px] text-secondary block">Active Spaces</span>
              </div>
              <div className="border-l border-surface-container">
                <span className="text-primary font-bold text-xs block font-mono">15k+</span>
                <span className="text-[10px] text-secondary block">Global Members</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">
                Your Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-on-surface placeholder:text-outline text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">
                Select Your Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'organizer', label: 'Event / Concert / Festival', icon: 'celebration' },
                  { id: 'business', label: 'Restaurant / Venue / Retail', icon: 'storefront' },
                  { id: 'destination', label: 'City / Tourism Destination', icon: 'explore' },
                  { id: 'visitor', label: 'Global Attendee / Explorer', icon: 'public' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id as any)}
                    className={`p-2.5 rounded-xl text-left border flex items-center gap-2 cursor-pointer transition-all ${
                      role === item.id
                        ? 'bg-black text-white border-black shadow-sm font-semibold'
                        : 'glass-card border-white/60 text-on-surface hover:bg-white/80'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1">
                  Name of Venue / Space (Optional)
                </label>
                <input
                  type="text"
                  value={spaceName}
                  onChange={(e) => setSpaceName(e.target.value)}
                  placeholder="e.g. Aura Lounge"
                  className="w-full px-3 py-2 text-xs rounded-xl glass-input text-on-surface placeholder:text-outline focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Lagos, London, Tokyo"
                  className="w-full px-3 py-2 text-xs rounded-xl glass-input text-on-surface placeholder:text-outline focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black font-title-md text-xs font-bold hover:opacity-95 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Reserving Your Access...' : 'Submit Early Access Request'}</span>
              <span className="material-symbols-outlined text-[16px]">
                {isSubmitting ? 'hourglass_top' : 'arrow_forward'}
              </span>
            </button>

            <p className="text-[11px] text-center text-secondary">
              🔒 Private onboarding batch. Instant confirmation and pass generation.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
