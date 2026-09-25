import React, { useEffect } from 'react';
import founderImg from '../assets/images/founder.jpg';
import { EarlyAccessContext } from './EarlyAccessModal';

interface AboutPageProps {
  onNavigate: (view: 'home' | 'about' | 'vision') => void;
  onOpenEarlyAccess: (context?: EarlyAccessContext) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenEarlyAccess }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#06080e] text-white pt-24 pb-20 relative overflow-hidden">
      {/* Ambient background glow effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-primary/20 via-purple-600/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 blur-[130px] pointer-events-none" />

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
              className="px-3.5 py-1.5 rounded-lg bg-white/15 text-white font-semibold shadow-xs"
            >
              About & Story
            </button>
            <button
              onClick={() => onNavigate('vision')}
              className="px-3.5 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              Vision & Architecture →
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-20">
          <h1 className="font-headline-lg text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Beyond Physical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400">Presence.</span>
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-white/70 leading-relaxed">
            Building the infrastructure that extends experiences, services, businesses, and communities far beyond physical boundaries.
          </p>
        </div>

        {/* Section 01: Founder Story */}
        <div id="founder-story" className="pt-12 mb-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-primary-fixed-dim font-bold">
              SECTION 01 / STORY
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <h2 className="font-headline-md text-2xl sm:text-4xl font-bold tracking-tight text-white mb-12">
            The Experience That Started Everything
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Founder Portrait Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-[#0c101a] shadow-2xl group">
                <div className="aspect-[4/5] w-full overflow-hidden relative">
                  <img
                    src={founderImg}
                    alt="Anthony Osabuohien Portrait"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=600&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                  
                  {/* Founder badge info */}
                  <div className="absolute bottom-6 left-6 right-6 text-left">
                    <div className="text-white text-xl font-bold tracking-tight">
                      Anthony Osabuohien
                    </div>
                    <div className="flex items-center justify-between mt-1 text-xs text-primary-fixed-dim font-mono">
                      <span>Founder &amp; CEO, Onstaege</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/20">
                        Lagos · Global
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center italic text-xs text-white/60 leading-relaxed">
                “In 2025, a family celebration thousands of miles away sparked the blueprint for real-time human immersion.”
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-7 space-y-6 text-sm sm:text-base leading-relaxed text-white/80 text-left">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <p className="text-white font-medium text-lg leading-snug">
                  In 2025, one experience changed the way I thought about human connection.
                </p>
                <p>
                  My sibling, who was studying in the United Kingdom, got married. As a family, we desperately wanted to be there, but the realities of travel costs, visa restrictions, distance, and logistics made it impossible.
                </p>
                <p>
                  Like many families around the world, we settled for watching a livestream from Nigeria.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <p className="italic text-white/90">
                  Although we could see what was happening, we couldn’t truly participate. We couldn’t interact with our new in-laws. We couldn’t celebrate with friends and relatives.
                </p>
                <p>
                  We couldn’t contribute to the conversations, traditions, laughter, or shared moments that make African weddings unforgettable.
                </p>
                <div className="p-4 rounded-xl bg-primary/10 border-l-4 border-primary text-white font-semibold">
                  We were present, but we weren’t actually there.
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <p className="text-primary-fixed font-semibold text-lg">
                  That experience made me ask a simple question: Why should physical distance prevent meaningful participation?
                </p>
                <p>
                  The more I researched, the more I realized this wasn’t just an events problem. The same limitation exists across commerce, tourism, entertainment, healthcare, education, nightlife, sports, and countless other sectors.
                </p>
                <p>
                  Every day, millions of people miss opportunities, experiences, relationships, and revenue simply because they cannot physically show up. Even businesses lose access to global customers because their services stop at their physical location.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 via-purple-900/30 to-black border border-primary/40 space-y-4 shadow-xl">
                <div className="font-overline text-xs uppercase tracking-widest text-primary-fixed-dim font-bold">
                  THE BREAKTHROUGH
                </div>
                <p className="text-white font-semibold text-lg">
                  I realized the world needed something bigger than another livestream platform. It needed infrastructure that makes virtual participation feel immersive, interactive, and rewarding.
                </p>
                <p className="text-primary-fixed text-base font-medium">
                  That’s why I built Onstaege.
                </p>
                <p className="text-sm text-white/70">
                  A real-time immersive experience platform designed to take participation beyond physical venues and connect people to experiences anywhere in the world.
                </p>
              </div>

              {/* Founder Quote Card */}
              <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-950/50 to-blue-950/40 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-left">
                  <p className="text-lg sm:text-xl font-bold italic text-white leading-snug">
                    “Distance should never determine who gets to experience life’s most important moments.”
                  </p>
                  <span className="font-mono text-xs text-primary-fixed-dim block uppercase font-semibold">
                    Anthony Osabuohien — Founder &amp; CEO
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('vision')}
                  className="shrink-0 px-5 py-2.5 rounded-xl bg-white text-black font-title-md text-xs font-bold hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
                >
                  Explore Our Vision →
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Call to Action banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/15 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-600/10 to-transparent pointer-events-none" />
          <h3 className="font-headline-md text-2xl sm:text-3xl font-bold text-white mb-3">
            Be part of the borderless experience revolution
          </h3>
          <p className="font-body-sm text-sm text-white/70 max-w-xl mx-auto mb-6">
            Join visionary venue operators, festival organizers, creators, and global participants deploying on Onstaege.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenEarlyAccess({ intent: 'Direct Founder Partnership' })}
              className="px-6 py-3 rounded-xl bg-black text-white hover:bg-neutral-900 border border-neutral-700 font-title-md text-sm font-semibold transition-all shadow-md cursor-pointer"
            >
              Request Access →
            </button>
            <button
              onClick={() => onNavigate('vision')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-title-md text-sm font-semibold transition-all cursor-pointer"
            >
              View Strategic Vision &amp; Bets →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
