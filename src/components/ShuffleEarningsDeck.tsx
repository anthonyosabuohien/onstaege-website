import React, { useState, useEffect } from 'react';
import { EarlyAccessContext } from './EarlyAccessModal';

export interface EarningsComparisonCard {
  id: string;
  category: 'Events' | 'Entertainment Venues' | 'Businesses' | 'Destinations';
  categoryIcon: string;
  title: string;
  venueExample: string;
  description: string;
  onsiteUsers: number;
  remoteUsers: number;
  earningWithoutFormatted: string;
  earningWithFormatted: string;
  multiplier: string;
  attendeeType?: string;
  multiplierNote: string;
  revenueDrivers: string[];
}

export const COMPARISON_CARDS: EarningsComparisonCard[] = [
  {
    id: 'wedding',
    category: 'Events',
    categoryIcon: 'celebration',
    title: 'Luxury Weddings & Banquets',
    venueExample: 'Royal Lekki Grand Ballroom, Lagos',
    description: 'Diaspora family & worldwide guests bless the couple and spray digital cash in real-time.',
    onsiteUsers: 700,
    remoteUsers: 3000,
    earningWithoutFormatted: '₦30,000,000 (₦30M)',
    earningWithFormatted: '₦150,000,000 (₦150M)',
    multiplier: '5x',
    attendeeType: 'guests',
    multiplierNote: '5x Earnings Surge via live digital cash spraying, overseas gift registry & remote feast gifting.',
    revenueDrivers: ['Live Cash Spraying Engine', 'Diaspora Feast Deliveries', '4K Ceremony Multi-Cam Feed']
  },
  {
    id: 'concert',
    category: 'Events',
    categoryIcon: 'festival',
    title: 'Arena Music Concerts',
    venueExample: 'Afrobeats Mega Festival, Eko Atlantic',
    description: 'Turn a physical arena into an international interactive stadium with isolated audio stem feeds.',
    onsiteUsers: 10000,
    remoteUsers: 3000000,
    earningWithoutFormatted: '₦100,000,000 (₦100M)',
    earningWithFormatted: '₦1,500,000,000 (₦1.5B)',
    multiplier: '15x',
    attendeeType: 'attendees',
    multiplierNote: '15x Earnings Surge via 3 million worldwide pay-per-view passes, live digital encores & tipping.',
    revenueDrivers: ['Digital Arena Access Passes', 'Artist Micro-Tipping Rails', 'Global Merch Instant Drops']
  },
  {
    id: 'nightclub',
    category: 'Entertainment Venues',
    categoryIcon: 'nightlife',
    title: 'VIP Nightclubs & Lounges',
    venueExample: 'Victoria Island Penthouse Club, Lagos',
    description: 'International patrons sponsor VIP bottle tables and request tracks directly to resident DJs.',
    onsiteUsers: 200,
    remoteUsers: 1500,
    earningWithoutFormatted: '₦70,000,000 (₦70M)',
    earningWithFormatted: '₦200,000,000 (₦200M)',
    multiplier: '2.9x',
    attendeeType: 'guests',
    multiplierNote: '2.9x Earnings Surge via cross-border table gifting, synchronized VIP shoutouts & DJ tips.',
    revenueDrivers: ['Remote Table Bottle Sponsorship', 'Live DJ Stream Stem Tipping', 'Virtual VIP Table Booking']
  },
  {
    id: 'hotel',
    category: 'Businesses',
    categoryIcon: 'hotel',
    title: 'Boutique Luxury Hotels & Resorts',
    venueExample: 'Ikoyi Grand Suites & Waterfront Spa, Lagos',
    description: '3D spatial walk-throughs and pre-trip concierge reservations locked before flights take off.',
    onsiteUsers: 100,
    remoteUsers: 1000,
    earningWithoutFormatted: '₦15,000,000 (₦15M)',
    earningWithFormatted: '₦50,000,000 (₦50M)',
    multiplier: '3.3x',
    attendeeType: 'guests',
    multiplierNote: '3.3x Earnings Surge via advance spatial suite reservations, bespoke culinary packages & club memberships.',
    revenueDrivers: ['Spatial 3D Pre-Booking Suite', 'Global Travel Club Memberships', 'Concierge Itinerary Upsells']
  },
  {
    id: 'restaurant',
    category: 'Businesses',
    categoryIcon: 'restaurant',
    title: 'Fine Dining Afro-Fusion Restaurants',
    venueExample: 'Nok Contemporary Bistro & Cellar, Lagos',
    description: 'Overseas diners stream masterclasses and order artisan bottled sauces shipped internationally.',
    onsiteUsers: 250,
    remoteUsers: 2000,
    earningWithoutFormatted: '₦5,000,000 (₦5M)',
    earningWithFormatted: '₦15,000,000 (₦15M)',
    multiplier: '3x',
    attendeeType: 'guests',
    multiplierNote: '3x Earnings Surge via packaged pantry exports, interactive masterclasses & digital reservations.',
    revenueDrivers: ['Packaged Condiment Global Freight', 'Executive Chef Digital Tables', 'Virtual Wine Tasting Kits']
  },
  {
    id: 'spa',
    category: 'Businesses',
    categoryIcon: 'spa',
    title: 'Signature Wellness & Rejuvenation Spas',
    venueExample: 'Zenith Botanical Sanctuary & Hammam, Ikoyi',
    description: 'Personalized organic oil formulas dispatched directly to subscribers globally.',
    onsiteUsers: 150,
    remoteUsers: 500,
    earningWithoutFormatted: '₦3,000,000 (₦3M)',
    earningWithFormatted: '₦10,000,000 (₦10M)',
    multiplier: '3.3x',
    attendeeType: 'guests',
    multiplierNote: '3.3x Earnings Surge via bespoke formulation subscriptions & spatial meditation sessions.',
    revenueDrivers: ['Custom Botanical Home-Delivery', 'Virtual Sound Bath Subscriptions', 'Aromatherapy Tele-Consults']
  },
  {
    id: 'lekki-cc',
    category: 'Destinations',
    categoryIcon: 'forest',
    title: 'Lekki Conservation Centre',
    venueExample: 'Canopy Walk & Nature Reserve, Lekki Peninsula',
    description: 'Sub-Saharan canopy eco-tours accessible to students and environmental tourists across 100+ countries.',
    onsiteUsers: 3000,
    remoteUsers: 15000,
    earningWithoutFormatted: '₦20,000,000 (₦20M)',
    earningWithFormatted: '₦80,000,000 (₦80M)',
    multiplier: '4x',
    attendeeType: 'visitors',
    multiplierNote: '4x Earnings Surge via worldwide virtual eco-passes, school group live feeds & wildlife micro-patronage.',
    revenueDrivers: ['Global Virtual Canopy Passports', 'Wildlife Tele-Adoption Badges', 'International School Field Trips']
  },
  {
    id: 'taj-mahal',
    category: 'Destinations',
    categoryIcon: 'account_balance',
    title: 'Taj Mahal Monument & Heritage',
    venueExample: 'UNESCO World Wonder, Agra, India',
    description: 'Bespoke spatial sunrise walk-throughs and real-time artisan craft orders for global heritage collectors.',
    onsiteUsers: 10000,
    remoteUsers: 50000,
    earningWithoutFormatted: '₦50,000,000 (₦50M)',
    earningWithFormatted: '₦150,000,000 (₦150M)',
    multiplier: '3x',
    attendeeType: 'visitors',
    multiplierNote: '3x Earnings Surge via 50k global virtual sunrise passes, marble craft direct trade & archival memberships.',
    revenueDrivers: ['Spatial Sunrise Heritage Strolls', 'Artisan Guild Direct Commerce', 'Archival Restoration Micro-Grants']
  }
];

interface ShuffleEarningsDeckProps {
  onOpenEarlyAccess: (context?: EarlyAccessContext) => void;
}

export const ShuffleEarningsDeck: React.FC<ShuffleEarningsDeckProps> = ({ onOpenEarlyAccess }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAutoShuffling, setIsAutoShuffling] = useState(true);
  const [isShufflingAnim, setIsShufflingAnim] = useState(false);

  const categories = ['All', 'Events', 'Entertainment Venues', 'Businesses', 'Destinations'];

  const filteredCards = selectedCategory === 'All'
    ? COMPARISON_CARDS
    : COMPARISON_CARDS.filter((c) => c.category === selectedCategory);

  // Auto shuffle cycle every 6 seconds if enabled
  useEffect(() => {
    if (!isAutoShuffling) return;
    const interval = setInterval(() => {
      handleNextCard();
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoShuffling, filteredCards.length, currentIndex]);

  const handleNextCard = () => {
    setIsShufflingAnim(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
      setIsShufflingAnim(false);
    }, 200);
  };

  const handlePrevCard = () => {
    setIsShufflingAnim(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
      setIsShufflingAnim(false);
    }, 200);
  };

  const currentCard = filteredCards[currentIndex % filteredCards.length] || COMPARISON_CARDS[0];

  return (
    <div className="w-full my-12 rounded-3xl glass-panel p-6 sm:p-10 shadow-2xl border border-white/90 relative overflow-hidden text-left">
      
      {/* Ambient background glow accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />

      {/* Header bar with title and auto-shuffle control */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-surface-container/70 relative z-10">
        <div>
          <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
            Earnings: Without Onstaege vs. With Onstaege
          </h3>
          <p className="text-xs sm:text-sm text-secondary mt-1 max-w-2xl leading-relaxed">
            Realized physical revenue multiplied by global digital access. Experience 10x remote audience scale and 100x financial uplift across events, nightlife, businesses, and world destinations.
          </p>
        </div>

        {/* Shuffle Deck Controls (hidden from view, works continuously in background) */}
        <div className="hidden" aria-hidden="true">
          <button
            type="button"
            onClick={() => setIsAutoShuffling(!isAutoShuffling)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isAutoShuffling
                ? 'bg-primary-container/15 text-primary border border-primary/30'
                : 'glass-card text-secondary hover:text-on-surface'
            }`}
            title={isAutoShuffling ? 'Pause Auto Shuffle' : 'Resume Auto Shuffle'}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isAutoShuffling ? 'pause_circle' : 'play_circle'}
            </span>
            <span>{isAutoShuffling ? 'Auto-Shuffle Active' : 'Auto-Shuffle Paused'}</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrevCard}
              className="w-10 h-10 rounded-xl glass-card hover:bg-white text-on-surface flex items-center justify-center cursor-pointer transition-all shadow-xs"
              aria-label="Previous card"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={handleNextCard}
              className="px-4 h-10 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black text-xs font-bold flex items-center gap-2 shadow-sm hover:shadow-md cursor-pointer transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">shuffle</span>
              <span>Shuffle Next</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 relative z-10 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              selectedCategory === cat
                ? 'bg-black text-white border border-black shadow-xs scale-102'
                : 'glass-card text-secondary hover:text-on-surface hover:bg-white'
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="text-[11px] text-secondary font-mono ml-auto hidden sm:inline-block">
          Card {((currentIndex % filteredCards.length) + 1)} of {filteredCards.length}
        </span>
      </div>

      {/* Interactive Shuffling Card Presentation Deck */}
      <div className="mt-4 relative z-10">
        <div
          className={`transition-all duration-300 transform ${
            isShufflingAnim ? 'opacity-40 scale-98 translate-y-1' : 'opacity-100 scale-100 translate-y-0'
          }`}
        >
          <div className="rounded-3xl glass-card border border-white/90 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            
            {/* Top Card Badge & Venue Identity */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-surface-container/60">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-container to-primary text-white flex items-center justify-center shadow-md shrink-0">
                  <span className="material-symbols-outlined text-[24px]">
                    {currentCard.categoryIcon}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-mono">
                      {currentCard.category}
                    </span>
                    <span className="text-[11px] text-secondary">·</span>
                    <span className="text-[11px] text-secondary font-medium">{currentCard.venueExample}</span>
                  </div>
                  <h4 className="font-headline-sm text-lg sm:text-2xl font-bold text-on-surface mt-0.5">
                    {currentCard.title}
                  </h4>
                </div>
              </div>

              {/* Dynamic Multiplier Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 font-bold text-xs self-start sm:self-auto shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="material-symbols-outlined text-[18px]">trending_up</span>
                <span>{currentCard.multiplier} Revenue Multiplier</span>
              </div>
            </div>

            {/* Core Comparative Columns: Without Onstaege vs With Onstaege */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-stretch">
              
              {/* LEFT COLUMN: Without Onstaege (Physical Constraints) */}
              <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl glass-panel border border-outline-variant/30 flex flex-col justify-between relative bg-white/40">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-secondary">location_off</span>
                      WITHOUT ONSTAEGE
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-surface-container text-secondary">
                      Physical Boundary Only
                    </span>
                  </div>

                  {/* Earnings display */}
                  <div className="mb-5">
                    <span className="text-xs text-secondary block mb-1">Local Physical Revenue:</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-on-surface font-mono tracking-tight">
                      {currentCard.earningWithoutFormatted}
                    </div>
                    <span className="text-[11px] text-secondary mt-1 block">
                      Bounded by four walls &amp; on-site cash limits
                    </span>
                  </div>

                  {/* Onsite user count */}
                  <div className="p-3 rounded-xl glass-card border border-white/70 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-secondary font-medium">On-Site Verified Attendees:</span>
                      <span className="font-bold text-on-surface font-mono text-sm">
                        {currentCard.onsiteUsers.toLocaleString()} {currentCard.attendeeType || 'guests'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-surface-container/60 text-[11px] text-outline">
                  Zero diaspora monetization · Finite physical capacity limit
                </div>
              </div>

              {/* CENTER DIVIDER: VS Multiplier Arrow */}
              <div className="lg:col-span-2 flex flex-row lg:flex-col items-center justify-center gap-2 py-2">
                <div className="hidden lg:block w-px flex-1 bg-surface-container" />
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-container to-primary text-white flex items-center justify-center font-bold text-xs shadow-md shrink-0">
                  VS
                </div>
                <div className="hidden lg:block w-px flex-1 bg-surface-container" />
              </div>

              {/* RIGHT COLUMN: With Onstaege (Physical + Digital + Multi-Modal AI) */}
              <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl glass-card border border-emerald-500/40 ring-2 ring-emerald-500/20 shadow-lg flex flex-col justify-between relative bg-gradient-to-br from-white/90 via-emerald-50/20 to-white/90">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-emerald-600">auto_awesome</span>
                      WITH ONSTAEGE
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Physical + Remote Global Reach
                    </span>
                  </div>

                  {/* Earnings display (Multiplied) */}
                  <div className="mb-5">
                    <span className="text-xs text-emerald-800 font-semibold block mb-1">
                      Total Digital + Physical Revenue ({currentCard.multiplier}):
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono tracking-tight">
                      {currentCard.earningWithFormatted}
                    </div>
                    <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
                      {currentCard.multiplierNote}
                    </span>
                  </div>

                  {/* Users counts: Onsite + Remote */}
                  <div className="space-y-2 mb-4">
                    <div className="p-2.5 rounded-xl glass-panel border border-emerald-500/20 flex items-center justify-between text-xs">
                      <span className="text-on-surface font-medium flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                        On-Site Users:
                      </span>
                      <span className="font-bold text-on-surface font-mono">
                        {currentCard.onsiteUsers.toLocaleString()} {currentCard.attendeeType || 'guests'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                      <span className="text-emerald-900 font-bold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-emerald-600">public</span>
                        Remote Global Reach:
                      </span>
                      <span className="font-black text-emerald-700 font-mono text-sm">
                        {currentCard.remoteUsers.toLocaleString()} {currentCard.attendeeType || 'remote'} worldwide
                      </span>
                    </div>
                  </div>

                  {/* Active Revenue Channels */}
                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-secondary block mb-2">
                      ACTIVE DIGITAL VALUE RAILS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentCard.revenueDrivers.map((driver, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-1 rounded-lg glass-panel font-medium text-on-surface border border-white/80"
                        >
                          ✓ {driver}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-500/20 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Instant Onstaege Settlement
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenEarlyAccess({
                        intent: `Value Simulator Access: ${currentCard.title}`,
                        role: 'business'
                      })
                    }
                    className="px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black font-title-md text-xs font-bold hover:shadow-md cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Get early access</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
