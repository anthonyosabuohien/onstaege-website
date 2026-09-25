/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DeferredSection } from './components/DeferredSection';
import { Footer } from './components/Footer';
import type { EarlyAccessContext } from './components/EarlyAccessModal';

const TrustBadgeSection = lazy(() => import('./components/TrustBadgeSection').then((module) => ({ default: module.TrustBadgeSection })));
const EventsSection = lazy(() => import('./components/EventsSection').then((module) => ({ default: module.EventsSection })));
const BusinessesSection = lazy(() => import('./components/BusinessesSection').then((module) => ({ default: module.BusinessesSection })));
const DestinationsSection = lazy(() => import('./components/DestinationsSection').then((module) => ({ default: module.DestinationsSection })));
const HowItWorksSection = lazy(() => import('./components/HowItWorksSection').then((module) => ({ default: module.HowItWorksSection })));
const ComparisonSection = lazy(() => import('./components/ComparisonSection').then((module) => ({ default: module.ComparisonSection })));
const EarlyAccessSection = lazy(() => import('./components/EarlyAccessSection').then((module) => ({ default: module.EarlyAccessSection })));
const AboutPage = lazy(() => import('./components/AboutPage').then((module) => ({ default: module.AboutPage })));
const VisionPage = lazy(() => import('./components/VisionPage').then((module) => ({ default: module.VisionPage })));
const EarlyAccessModal = lazy(() => import('./components/EarlyAccessModal').then((module) => ({ default: module.EarlyAccessModal })));

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
          <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
            <AboutPage onNavigate={handleNavigate} onOpenEarlyAccess={handleOpenEarlyAccess} />
          </Suspense>
        </main>
      ) : currentView === 'vision' ? (
        <main className="w-full flex-1 relative z-10">
          <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
            <VisionPage onNavigate={handleNavigate} onOpenEarlyAccess={handleOpenEarlyAccess} />
          </Suspense>
        </main>
      ) : (
        <main className="w-full pt-20 flex-1 relative z-10">
          {/* Section 1: Hero with Glassmorphism & Infographic Flow */}
          <HeroSection onOpenEarlyAccess={handleOpenEarlyAccess} />

          {/* Section 2: Trust Badges & Partner Venue Reviews */}
          <DeferredSection minHeight={760} component={TrustBadgeSection} onOpenEarlyAccess={handleOpenEarlyAccess} />

          {/* Section 3: Events with Dual-State Architecture */}
          <DeferredSection id="events" minHeight={1100} component={EventsSection} onOpenEarlyAccess={handleOpenEarlyAccess} />

          {/* Section 4: Businesses with 5-Step Value Funnel Infographic */}
          <DeferredSection id="businesses" minHeight={1100} component={BusinessesSection} onOpenEarlyAccess={handleOpenEarlyAccess} />

          {/* Section 5: Destinations with 24-Hr Daily Timeline */}
          <DeferredSection id="destinations" minHeight={1000} component={DestinationsSection} onOpenEarlyAccess={handleOpenEarlyAccess} />

          {/* Section 6: How It Works & Multimodal AI Neural Diagram */}
          <DeferredSection id="how-it-works" minHeight={900} component={HowItWorksSection} onOpenEarlyAccess={handleOpenEarlyAccess} />

          {/* Section 7: Without Onstaege vs With Onstaege Infographic */}
          <DeferredSection id="comparison" minHeight={900} component={ComparisonSection} onOpenEarlyAccess={handleOpenEarlyAccess} />

          {/* Section 8: Final Early Access Gradient Banner */}
          <DeferredSection minHeight={520} component={EarlyAccessSection} onOpenEarlyAccess={handleOpenEarlyAccess} />
        </main>
      )}

      {/* Section 9: Dark Glassmorphic Footer */}
      <Footer
        onOpenEarlyAccess={handleOpenEarlyAccess}
        onNavigate={handleNavigate}
      />

      {/* Central Glassmorphic Early Access Modal */}
      {earlyAccessOpen && (
        <Suspense fallback={null}>
          <EarlyAccessModal context={earlyAccessContext} onClose={() => setEarlyAccessOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
