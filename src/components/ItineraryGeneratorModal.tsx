import React, { useState } from 'react';
import { DayItinerarySlot } from '../types';

interface ItineraryGeneratorModalProps {
  onClose: () => void;
}

export const ItineraryGeneratorModal: React.FC<ItineraryGeneratorModalProps> = ({ onClose }) => {
  const [city, setCity] = useState<'lagos' | 'tokyo' | 'paris' | 'marrakech'>('lagos');
  const [vibe, setVibe] = useState<'culture' | 'nightlife' | 'culinary' | 'relaxation'>('culinary');
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPlan, setCustomPlan] = useState<DayItinerarySlot[] | null>(null);

  const cityOptions = [
    { id: 'lagos', name: 'Lagos, Nigeria', badge: 'West Africa Hub' },
    { id: 'tokyo', name: 'Tokyo, Japan', badge: 'East Asia Hub' },
    { id: 'paris', name: 'Paris, France', badge: 'European Capital' },
    { id: 'marrakech', name: 'Marrakech, Morocco', badge: 'North Africa Oasis' }
  ];

  const vibeOptions = [
    { id: 'culinary', label: 'Gastronomy & Local Chefs', icon: 'restaurant' },
    { id: 'nightlife', label: 'Afrohouse & Rooftops', icon: 'local_bar' },
    { id: 'culture', label: 'Galleries & Artisan Ateliers', icon: 'palette' },
    { id: 'relaxation', label: 'Coastal Spas & Escapes', icon: 'spa' }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCustomPlan([
        {
          time: '09:30',
          title: `Curated Morning Roastery at ${city === 'lagos' ? 'Victoria Island' : city === 'tokyo' ? 'Ginza' : 'Le Marais'}`,
          description: 'Private single-origin tasting and pastry pairing reserved via your Onstaege profile.',
          category: 'Morning Epicure',
          badge: 'Reserved · 09:30',
          actionPrompt: 'View Roaster Notes'
        },
        {
          time: '12:00',
          title: `Master Artisan Workshop & Private Showcase`,
          description: 'Live hands-on access to master craftsmen with spatial AR background guidance.',
          category: 'Cultural Immersion',
          badge: 'VIP Pass Active',
          actionPrompt: 'Open AR Guide'
        },
        {
          time: '15:30',
          title: `Secret Chef Table Experience`,
          description: 'Hidden 5-course seasonal menu with synchronized ingredient lineage.',
          category: 'Culinary Masterclass',
          badge: 'Fast-Track Confirmed',
          actionPrompt: 'Browse Wine Pairing'
        },
        {
          time: '18:30',
          title: `Panoramic Sunset Lounge Access`,
          description: 'Pre-reserved terrace cabana overlooking the skyline with live DJ soundtrack.',
          category: 'Sunset Atmosphere',
          badge: 'Terrace Spot 02',
          actionPrompt: 'Order Pre-Arrival Drink'
        },
        {
          time: '21:30',
          title: `Late Night Acoustic Session & Tasting`,
          description: 'Intimate listening bar reservation with stem mixer audio sync on your device.',
          category: 'Nightlife',
          badge: 'Backstage Token',
          actionPrompt: 'Access Audio Stems'
        }
      ]);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-surface-container-lowest rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-outline-variant/30 text-left max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-surface-container">
          <div className="flex items-center gap-2.5 text-primary">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Onstaege AI Day Generator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-secondary hover:bg-surface-container text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="py-5 space-y-6">
          {/* Destination Selection */}
          <div>
            <span className="font-overline text-overline font-bold uppercase text-secondary block mb-2">
              1. Choose Destination
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {cityOptions.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setCity(c.id as any);
                    setCustomPlan(null);
                  }}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    city === c.id
                      ? 'bg-black text-white border-black shadow-sm scale-102'
                      : 'bg-surface-container-low border-outline-variant/30 text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <div className="font-bold text-xs truncate">{c.name}</div>
                  <div className={`text-[10px] mt-0.5 ${city === c.id ? 'text-primary-fixed' : 'text-secondary'}`}>
                    {c.badge}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Vibe Selection */}
          <div>
            <span className="font-overline text-overline font-bold uppercase text-secondary block mb-2">
              2. Select Experience Focus
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {vibeOptions.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    setVibe(v.id as any);
                    setCustomPlan(null);
                  }}
                  className={`p-3 rounded-xl text-left border flex items-center gap-3 transition-all cursor-pointer ${
                    vibe === v.id
                      ? 'bg-surface-container-lowest border-primary ring-2 ring-primary/20 shadow-sm'
                      : 'bg-surface-container-low border-outline-variant/20 hover:bg-surface-container'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[20px] ${vibe === v.id ? 'text-primary' : 'text-secondary'}`}>
                    {v.icon}
                  </span>
                  <span className="font-title-md text-xs font-semibold text-on-surface">
                    {v.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3.5 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black font-title-md font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">psychology</span>
            <span>{isGenerating ? 'Synthesizing Hyper-Personalized Day...' : 'Generate Custom Day'}</span>
          </button>

          {/* Generated Plan */}
          {customPlan && (
            <div className="p-5 rounded-2xl bg-surface-container border border-primary/20 animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="font-overline text-overline font-bold text-primary uppercase">
                  Your Bespoke AI Schedule
                </span>
                <span className="text-xs text-emerald-700 font-semibold">100% Instant Pass Compatibility</span>
              </div>
              <div className="space-y-3">
                {customPlan.map((slot, i) => (
                  <div key={i} className="p-3 rounded-xl bg-surface-container-lowest shadow-xs flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-primary">{slot.time}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-container text-secondary font-medium">
                          {slot.category}
                        </span>
                      </div>
                      <h5 className="font-semibold text-xs text-on-surface mt-0.5">{slot.title}</h5>
                      <p className="text-[11px] text-secondary mt-0.5">{slot.description}</p>
                    </div>
                    <button
                      onClick={() => alert(`Pre-booking confirmed for "${slot.title}"! Ticket added to your Onstaege Pass.`)}
                      className="px-2.5 py-1 rounded bg-black text-white hover:bg-neutral-900 border border-black text-[11px] font-semibold transition-colors shrink-0 cursor-pointer"
                    >
                      Book Slot
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
