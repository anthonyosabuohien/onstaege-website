/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustBadgeSection } from './components/TrustBadgeSection';
import { EventsSection } from './components/EventsSection';
import { BusinessesSection } from './components/BusinessesSection';
import { DestinationsSection } from './components/DestinationsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ComparisonSection } from './components/ComparisonSection';
import { EarlyAccessSection } from './components/EarlyAccessSection';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { VisionPage } from './components/VisionPage';
import { EarlyAccessModal, EarlyAccessContext } from './components/EarlyAccessModal';

export default function App() {
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);
  const [earlyAccessContext, setEarlyAccessContext] = useState<EarlyAccessContext>({
    intent: 'General Priority Early Access'
  });
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'vision'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#about') return 'about';
      if (hash === '#vision') return 'vision';
    }
    return 'home';
  });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#about') {
        setCurrentView('about');
      } else if (hash === '#vision') {
        setCurrentView('vision');
      } else if (hash === '#home' || hash === '' || hash.startsWith('#hero')) {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (view: 'home' | 'about' | 'vision') => {
    setCurrentView(view);
    if (view === 'about') {
      window.location.hash = '#about';
    } else if (view === 'vision') {
      window.location.hash = '#vision';
    } else {
      window.location.hash = '#hero';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEarlyAccess = (context?: EarlyAccessContext) => {
    if (context) {
      setEarlyAccessContext(context);
    } else {
      setEarlyAccessContext({ intent: 'General Priority Early Access' });
    }
    setEarlyAccessOpen(true);
  };

  return (
    <div className="min-h-screen font-body text-on-surface antialiased flex flex-col relative overflow-x-hidden bg-background">
      
      {/* Top Floating Glassmorphic Navbar */}
      <Navbar
        onOpenEarlyAccess={handleOpenEarlyAccess}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      {currentView === 'about' ? (
        <main className="w-full flex-1 relative z-10">
          <AboutPage
            onNavigate={handleNavigate}
            onOpenEarlyAccess={handleOpenEarlyAccess}
          />
        </main>
      ) : currentView === 'vision' ? (
        <main className="w-full flex-1 relative z-10">
          <VisionPage
            onNavigate={handleNavigate}
            onOpenEarlyAccess={handleOpenEarlyAccess}
          />
        </main>
      ) : (
        <main className="w-full pt-20 flex-1 relative z-10">
          {/* Section 1: Hero with Glassmorphism & Infographic Flow */}
          <HeroSection onOpenEarlyAccess={handleOpenEarlyAccess} />

          {/* Section 2: Trust Badges & Partner Venue Reviews */}
          <TrustBadgeSection onOpenEarlyAccess={handleOpenEarlyAccess} />

          {/* Section 3: Events with Dual-State Architecture */}
          <EventsSection onOpenEarlyAccess={handleOpenEarlyAccess} />

          {/* Section 4: Businesses with 5-Step Value Funnel Infographic */}
          <BusinessesSection onOpenEarlyAccess={handleOpenEarlyAccess} />

          {/* Section 5: Destinations with 24-Hr Daily Timeline */}
          <DestinationsSection onOpenEarlyAccess={handleOpenEarlyAccess} />

          {/* Section 6: How It Works & Multimodal AI Neural Diagram */}
          <HowItWorksSection onOpenEarlyAccess={handleOpenEarlyAccess} />

          {/* Section 7: Without Onstaege vs With Onstaege Infographic */}
          <ComparisonSection onOpenEarlyAccess={handleOpenEarlyAccess} />

          {/* Section 8: Final Early Access Gradient Banner */}
          <EarlyAccessSection onOpenEarlyAccess={handleOpenEarlyAccess} />
        </main>
      )}

      {/* Section 9: Dark Glassmorphic Footer */}
      <Footer
        onOpenEarlyAccess={handleOpenEarlyAccess}
        onNavigate={handleNavigate}
      />

      {/* Central Glassmorphic Early Access Modal */}
      {earlyAccessOpen && (
        <EarlyAccessModal
          context={earlyAccessContext}
          onClose={() => setEarlyAccessOpen(false)}
        />
      )}
    </div>
  );
}
