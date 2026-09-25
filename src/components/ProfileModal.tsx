import React, { useState } from 'react';

interface ProfileModalProps {
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  const [walletBalance, setWalletBalance] = useState<number>(450);
  const [activeLocationMode, setActiveLocationMode] = useState<'lagos' | 'london' | 'tokyo'>('lagos');
  const [topUpToast, setTopUpToast] = useState(false);

  const handleTopUp = () => {
    setWalletBalance((prev) => prev + 100);
    setTopUpToast(true);
    setTimeout(() => setTopUpToast(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-outline-variant/30 text-left">
        <div className="flex items-center justify-between pb-4 border-b border-surface-container">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-lg">person</span>
            </div>
            <div>
              <h3 className="font-title-md font-bold text-on-surface">Your Onstaege Profile</h3>
              <span className="text-xs text-secondary">Verified Global Passholder</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-secondary hover:bg-surface-container text-xl cursor-pointer">
            ✕
          </button>
        </div>

        <div className="py-4 space-y-4">
          {/* Digital Spraying Wallet */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-secondary uppercase">Spraying &amp; Tipping Balance</span>
              <div className="text-2xl font-bold text-on-surface">${walletBalance}.00</div>
            </div>
            <button
              onClick={handleTopUp}
              className="px-3 py-1.5 rounded-lg bg-primary-container text-white text-xs font-semibold hover:bg-primary transition-colors cursor-pointer"
            >
              + Top Up $100
            </button>
          </div>

          {topUpToast && (
            <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold animate-in fade-in">
              ✓ Added $100.00 to your Instant Spraying Wallet!
            </div>
          )}

          {/* Current Geolocation State */}
          <div>
            <span className="text-xs font-bold text-secondary uppercase block mb-1.5">
              Simulated Presence Context
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'lagos', label: 'On-Site: Lagos', badge: 'GPS Beacon' },
                { id: 'london', label: 'Remote: London', badge: '4K Stream' },
                { id: 'tokyo', label: 'Remote: Tokyo', badge: 'Hi-Fi Audio' }
              ].map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocationMode(loc.id as any)}
                  className={`p-2 rounded-xl text-left border cursor-pointer transition-colors ${
                    activeLocationMode === loc.id
                      ? 'bg-black text-white border-black font-semibold'
                      : 'bg-surface-container-low text-on-surface border-outline-variant/20 hover:bg-surface-container'
                  }`}
                >
                  <div className="text-xs font-bold">{loc.label}</div>
                  <div className={`text-[10px] ${activeLocationMode === loc.id ? 'text-white/80' : 'text-secondary'}`}>
                    {loc.badge}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Digital Passes */}
          <div>
            <span className="text-xs font-bold text-secondary uppercase block mb-1.5">
              Active Digital Passes (2)
            </span>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-on-surface">Tunde &amp; Amina's Reception</div>
                  <div className="text-[10px] text-secondary">VIP Stream Token · Spraying Enabled</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  ACTIVE
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-on-surface">Aura Sky Lounge Sunset Balcony</div>
                  <div className="text-[10px] text-secondary">Table 04 Reserve · 20:00 tonight</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-primary-fixed text-primary text-[10px] font-bold">
                  CONFIRMED
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-surface-container">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black font-label-md text-xs font-semibold transition-colors cursor-pointer"
          >
            Save &amp; Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
