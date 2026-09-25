import React, { useState } from 'react';

interface DigitizeSpaceModalProps {
  initialType?: string;
  onClose: () => void;
}

export const DigitizeSpaceModal: React.FC<DigitizeSpaceModalProps> = ({
  initialType = 'Event',
  onClose
}) => {
  const [spaceType, setSpaceType] = useState<string>(initialType);
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [capacity, setCapacity] = useState<string>('500');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'live_stream',
    'spraying_tipping',
    'ai_personalization'
  ]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const featuresList = [
    { id: 'live_stream', label: 'Multi-Camera 4K Live Stream' },
    { id: 'spraying_tipping', label: 'Digital Cash Spraying & Tipping' },
    { id: 'remote_catering', label: 'Doorstep Synchronized Catering' },
    { id: 'audio_stems', label: 'Isolated Stage Audio Stems' },
    { id: 'ai_personalization', label: 'AI Dynamic Audience Personalization' },
    { id: 'ar_guides', label: 'Spatial AR Wayfinding & Archives' }
  ];

  const toggleFeature = (fid: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(fid) ? prev.filter((id) => id !== fid) : [...prev, fid]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-outline-variant/30 text-left">
        <div className="flex items-center justify-between pb-4 border-b border-surface-container">
          <div>
            <span className="font-overline text-overline font-bold uppercase text-primary">
              ONSTAEGE PROTOCOL 01: CREATE &amp; DIGITIZE
            </span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Digitize Your {spaceType}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-secondary hover:bg-surface-container text-xl cursor-pointer">
            ✕
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl">
              ✓
            </div>
            <h4 className="font-headline-sm font-bold text-on-surface">Digital Layer Initialized!</h4>
            <p className="text-body-sm text-secondary max-w-sm mx-auto">
              Your {spaceType.toLowerCase()} <strong>"{name || 'Space'}"</strong> has been registered with Onstaege Protocol. Digital beacon integration guidelines have been generated.
            </p>
            <div className="p-3 bg-surface-container rounded-xl text-xs font-mono text-primary font-bold">
              PORTAL KEY: OSTG-{Math.floor(100000 + Math.random() * 900000)}
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black font-title-md text-xs font-semibold transition-colors cursor-pointer"
            >
              Done &amp; Return to Overview
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Space Type</label>
              <div className="grid grid-cols-3 gap-2">
                {['Event', 'Business', 'Destination'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSpaceType(type)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                      spaceType === type
                        ? 'bg-black text-white border-black font-bold'
                        : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">
                Name of {spaceType}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aura Sky Lounge, Lagos Art Summit, Victoria Island"
                className="w-full px-3 py-2 text-xs rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Lagos, London, Tokyo"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1">Physical Capacity</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-2">
                Digital Capabilities to Activate
              </label>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {featuresList.map((f) => {
                  const checked = selectedFeatures.includes(f.id);
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => toggleFeature(f.id)}
                      className={`w-full p-2 rounded-lg text-left text-xs flex items-center justify-between border cursor-pointer ${
                        checked
                          ? 'bg-surface-container-low border-primary text-primary font-semibold'
                          : 'bg-surface-container-lowest border-outline-variant/20 text-on-surface'
                      }`}
                    >
                      <span>{f.label}</span>
                      <span className="material-symbols-outlined text-[16px]">
                        {checked ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-black text-white hover:bg-neutral-900 border border-black font-title-md text-xs font-semibold transition-colors cursor-pointer shadow-sm mt-2"
            >
              Generate Digital Layer Protocol →
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
