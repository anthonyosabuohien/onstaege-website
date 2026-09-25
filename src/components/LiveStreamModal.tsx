import React, { useState } from 'react';
import { BRAND_ASSETS, INITIAL_REACTIONS } from '../data/mockData';
import { ReactionItem } from '../types';

interface LiveStreamModalProps {
  onClose: () => void;
}

export const LiveStreamModal: React.FC<LiveStreamModalProps> = ({ onClose }) => {
  const [activeCam, setActiveCam] = useState<'cam1' | 'cam2' | 'cam3'>('cam1');
  const [sprayCount, setSprayCount] = useState<number>(18420);
  const [isSpraying, setIsSpraying] = useState<boolean>(false);
  const [reactions, setReactions] = useState<ReactionItem[]>(INITIAL_REACTIONS);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [selectedAudioStem, setSelectedAudioStem] = useState<string>('Master Mix');

  const cameras = [
    { id: 'cam1', name: 'Stage 01: Couple & Podium', img: BRAND_ASSETS.wedding },
    { id: 'cam2', name: 'Stage 02: Live Acoustic Band', img: BRAND_ASSETS.concert },
    { id: 'cam3', name: 'Stage 03: Sunset Terrace Lounge', img: BRAND_ASSETS.rooftop }
  ];

  const handleSpray = (amount: number) => {
    setSprayCount((prev) => prev + amount);
    setIsSpraying(true);
    setTimeout(() => setIsSpraying(false), 1200);

    const newR: ReactionItem = {
      id: `r-${Date.now()}`,
      sender: 'You',
      location: 'Live Stream',
      message: `Sprayed $${amount} blessings to the couple! 🥂`,
      amount,
      timeAgo: 'Just now',
      avatarColor: 'bg-primary-container text-white'
    };
    setReactions((prev) => [newR, ...prev]);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newR: ReactionItem = {
      id: `r-${Date.now()}`,
      sender: 'You',
      location: 'Global View',
      message: chatMessage.trim(),
      timeAgo: 'Just now',
      avatarColor: 'bg-primary text-white'
    };
    setReactions((prev) => [newR, ...prev]);
    setChatMessage('');
  };

  const currentCam = cameras.find((c) => c.id === activeCam) || cameras[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-on-surface/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-outline-variant/30">
        
        {/* Top Bar */}
        <div className="h-16 px-6 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-error animate-pulse" />
            <div>
              <h3 className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-2">
                Tunde &amp; Amina's Reception · Interactive Global Stream
                <span className="text-xs px-2 py-0.5 rounded bg-primary-fixed text-primary font-semibold">
                  Zero-Latency Sync
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-secondary font-medium hidden sm:inline">
              12,450 Global Patrons Live · 240 On-Site (Lagos)
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container text-xl cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* Main Video View & Camera Selectors (Col 1-8) */}
          <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col justify-between bg-black relative overflow-hidden">
            <div className="relative w-full h-[320px] sm:h-[460px] rounded-2xl overflow-hidden group">
              <img
                src={currentCam.img}
                alt={currentCam.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Live Tag & Camera Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-error text-white font-label-sm text-xs font-bold">
                  LIVE 4K
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-xs font-medium">
                  {currentCam.name}
                </span>
              </div>

              {/* Spraying floating animation */}
              {isSpraying && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-emerald-400 bg-black/70 px-6 py-3 rounded-2xl animate-spray shadow-2xl pointer-events-none z-30">
                  💸 Blessing Sprayed to Couple!
                </div>
              )}

              {/* Bottom Stream Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1.5 rounded-xl">
                  <span className="material-symbols-outlined text-sm">volume_up</span>
                  <span>Audio: {selectedAudioStem}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {['Master Mix', 'Acoustic Stem', 'Stage Mic'].map((stem) => (
                    <button
                      key={stem}
                      onClick={() => setSelectedAudioStem(stem)}
                      className={`px-2 py-1 rounded text-xs font-medium cursor-pointer ${
                        selectedAudioStem === stem ? 'bg-black text-white border border-neutral-700' : 'bg-black/60 text-white/80 hover:bg-black/80'
                      }`}
                    >
                      {stem}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Camera Switcher Strip */}
            <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1">
              <span className="text-xs text-white/60 uppercase font-semibold shrink-0">Switch Angle:</span>
              {cameras.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCam(c.id as any)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 cursor-pointer transition-all ${
                    activeCam === c.id
                      ? 'bg-black text-white border border-neutral-600 ring-2 ring-white/40'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">videocam</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Actions & Live Chat Panel (Col 9-12) */}
          <div className="lg:col-span-4 p-5 flex flex-col justify-between bg-surface-container-lowest border-l border-surface-container overflow-y-auto">
            <div>
              {/* Spraying Blessings Module */}
              <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/20 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-overline text-overline font-bold uppercase text-primary">
                    DIGITAL BLESSING TABLE
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                    Verified Sync
                  </span>
                </div>
                <div className="text-xl font-bold text-on-surface mb-3">
                  ${sprayCount.toLocaleString()}{' '}
                  <span className="text-xs text-secondary font-normal">total sprayed tonight</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[20, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleSpray(amt)}
                      className="py-2.5 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black font-title-md text-xs font-semibold transition-all shadow-xs cursor-pointer text-center"
                    >
                      Spray ${amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Catering & Gifts Accordion */}
              <div className="p-3.5 rounded-xl bg-surface border border-outline-variant/30 mb-4">
                <div className="flex items-center justify-between text-xs font-semibold text-on-surface">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">restaurant</span>
                    Synchronized Catering
                  </span>
                  <span className="text-emerald-600">Available</span>
                </div>
                <p className="text-xs text-secondary mt-1">
                  Enjoy the bride &amp; groom's curated celebratory dinner delivered locally to your home.
                </p>
                <button
                  onClick={() => alert('Opening DoorDash/Deliveroo synchronized local menu...')}
                  className="mt-2 w-full py-1.5 rounded-lg bg-black text-white hover:bg-neutral-900 border border-black font-label-md text-xs transition-colors cursor-pointer"
                >
                  Order Celebration Feast ($45)
                </button>
              </div>

              {/* Live Chat & Blessings Stream */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-secondary uppercase">Live Reactions Feed</span>
                  <span className="text-[11px] text-emerald-600">Real-time</span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {reactions.map((r) => (
                    <div key={r.id} className="p-2.5 rounded-xl bg-surface-container-low text-xs text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-primary">{r.sender} ({r.location})</span>
                        {r.amount && (
                          <span className="font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded text-[10px]">
                            +${r.amount}
                          </span>
                        )}
                      </div>
                      <p className="text-on-surface">{r.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="mt-4 pt-3 border-t border-surface-container flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Send a blessing or reaction..."
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black text-xs font-semibold transition-colors cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
