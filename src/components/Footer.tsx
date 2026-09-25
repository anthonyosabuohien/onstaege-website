import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/mockData';
import { EarlyAccessContext } from './EarlyAccessModal';
import { sendAutomaticNewsletterAlert } from '../services/notificationService';

interface FooterProps {
  onOpenEarlyAccess: (context?: EarlyAccessContext) => void;
  onNavigate?: (view: 'home' | 'about' | 'vision') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenEarlyAccess,
  onNavigate,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || newsletterSubmitting) return;
    setNewsletterSubmitting(true);

    const subscription = {
      email: newsletterEmail.trim(),
      source: 'Website Footer',
      subscribedAt: new Date().toISOString(),
    };

    try {
      const subscribers = JSON.parse(localStorage.getItem('onstaege_newsletter_subscribers') || '[]');
      subscribers.unshift(subscription);
      localStorage.setItem('onstaege_newsletter_subscribers', JSON.stringify(subscribers));
    } catch {
      // ignore
    }

    // Automatically send alert to founder email
    sendAutomaticNewsletterAlert(subscription);

    setTimeout(() => {
      setNewsletterSubmitting(false);
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }, 300);
  };

  return (
    <footer className="w-full bg-[#0d131f] text-white py-16 relative overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10 text-left">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-black overflow-hidden flex items-center justify-center p-0.5 border border-white/20">
                  <img
                    alt="Onstaege Portal Logo"
                    className="w-full h-full object-contain rounded-lg"
                    src={BRAND_ASSETS.logo}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-title-lg text-lg font-bold tracking-tight uppercase">
                  ONSTAEGE
                </span>
              </div>
              <span className="font-overline text-[10px] uppercase tracking-widest text-primary-fixed-dim font-bold block mb-3">
                ENTER INTO THE REAL WORLD.
              </span>
              <p className="font-body-sm text-xs text-white/70 leading-relaxed max-w-sm">
                Onstaege is the AI-powered digital experiential layer for the physical world, enabling businesses, events and destinations to digitize their services and experiences for local and global audiences.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <span className="font-overline text-[10px] uppercase tracking-wider text-white/40 font-bold block mb-4">
              COMPANY
            </span>
            <ul className="space-y-2.5 font-body-sm text-xs text-white/70">
              <li>
                <button
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('about');
                    } else {
                      onOpenEarlyAccess({ intent: 'About Onstaege' });
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('vision');
                    } else {
                      onOpenEarlyAccess({ intent: 'Vision & Architecture' });
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Vision
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setShowContactDetails(!showContactDetails)}
                  className={`hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 ${
                    showContactDetails ? 'text-primary-fixed font-semibold' : ''
                  }`}
                  aria-expanded={showContactDetails}
                >
                  <span>Contact</span>
                  <span className={`material-symbols-outlined text-[14px] transition-transform duration-200 ${showContactDetails ? 'rotate-180 text-primary-fixed' : 'text-white/50'}`}>
                    expand_more
                  </span>
                </button>

                {showContactDetails && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-2.5 text-left w-64 -ml-2 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="font-overline text-[9px] uppercase tracking-wider text-primary-fixed-dim font-bold">
                        DIRECT CONTACT
                      </span>
                      <span className="text-[10px] text-white/50">Online</span>
                    </div>

                    {/* WhatsApp */}
                    <div className="p-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 transition-all">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#25D366] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">chat</span>
                          WhatsApp
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleCopy('09064892756', 'whatsapp', e)}
                          className="text-[10px] text-white/60 hover:text-white transition-colors cursor-pointer"
                          title="Copy phone number"
                        >
                          {copiedType === 'whatsapp' ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                      <a
                        href="https://wa.me/2349064892756"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between text-xs font-semibold text-white hover:text-[#25D366] transition-colors"
                      >
                        <span>09064892756</span>
                        <span className="text-[10px] font-normal underline text-white/70">Message →</span>
                      </a>
                    </div>

                    {/* Call */}
                    <div className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary-fixed flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">call</span>
                          Call
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleCopy('08107224785', 'call', e)}
                          className="text-[10px] text-white/60 hover:text-white transition-colors cursor-pointer"
                          title="Copy phone number"
                        >
                          {copiedType === 'call' ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                      <a
                        href="tel:08107224785"
                        className="flex items-center justify-between text-xs font-semibold text-white hover:text-primary-fixed transition-colors"
                      >
                        <span>08107224785</span>
                        <span className="text-[10px] font-normal underline text-white/70">Call now →</span>
                      </a>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <span className="font-overline text-[10px] uppercase tracking-wider text-white/40 font-bold block mb-4">
              CONNECT
            </span>
            <ul className="space-y-2.5 font-body-sm text-xs text-white/70">
              <li><a className="hover:text-white transition-colors" href="https://www.instagram.com/techthoni?stkn=MTF3dTN4bmxma2V6aw%3D%3D&amp;utm_source=qr" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a className="hover:text-white transition-colors" href="https://www.linkedin.com/in/anthony-osabuohien?utm_source=share_via&amp;utm_content=profile&amp;utm_medium=member_ios" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>

          {/* Inline Early Access Form with Glassmorphism */}
          <div className="lg:col-span-3">
            <span className="font-overline text-[10px] uppercase tracking-wider text-white/40 font-bold block mb-4">
              EARLY ACCESS
            </span>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                required
                disabled={newsletterSubmitting}
                className="w-full px-3 py-2.5 rounded-xl bg-white/10 backdrop-blur-md text-white placeholder:text-white/40 text-xs border border-white/15 focus:outline-none focus:ring-1 focus:ring-primary-container disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={newsletterSubmitting}
                className="w-full py-2.5 rounded-xl bg-black text-white hover:bg-neutral-900 border border-neutral-700 font-title-md text-xs font-semibold transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {newsletterSubmitting
                  ? 'Saving to Firestore...'
                  : newsletterSubscribed
                  ? '✓ Joined Successfully!'
                  : 'Join Early Access →'}
              </button>
              {newsletterSubscribed && (
                <p className="text-[10px] text-emerald-400 font-medium">
                  ✓ Priority batch entry confirmed in Firestore.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>© 2026 Onstaege Inc. All Rights Reserved.</div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => onOpenEarlyAccess({ intent: 'Privacy Policy Inquiries' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenEarlyAccess({ intent: 'Terms of Service Inquiries' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenEarlyAccess({ intent: 'Security Architecture Review' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Security
            </button>
            <button
              onClick={() => onOpenEarlyAccess({ intent: 'Cookie Policy' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookie Settings
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
