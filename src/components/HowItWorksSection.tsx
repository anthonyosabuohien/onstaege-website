import React from 'react';
import { EarlyAccessContext } from './EarlyAccessModal';

interface HowItWorksSectionProps {
  onOpenEarlyAccess: (context?: EarlyAccessContext) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenEarlyAccess }) => {
  const steps = [
    {
      num: '01',
      title: 'CREATE',
      desc: 'A business, event or destination claims and registers their space on Onstaege.'
    },
    {
      num: '02',
      title: 'DIGITIZE',
      desc: 'Services, activities, interactions, live streams, and payments become digitally accessible.'
    },
    {
      num: '03',
      title: 'CONNECT',
      desc: 'Physical visitors on-site and remote participants globally join the same unified experience.'
    },
    {
      num: '04',
      title: 'PERSONALIZE',
      desc: 'Onstaege AI understands user context, habits, and preferences to tailor real-time discovery.'
    },
    {
      num: '05',
      title: 'TRANSACT',
      desc: 'Users engage, interact, purchase, tip, reserve and connect seamlessly without barriers.'
    }
  ];

  return (
    <section id="how-it-works" className="w-full py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-tertiary-fixed-dim/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            From physical to digital.
          </h2>
          <p className="font-body-lg text-body-lg text-secondary mt-2">
            A seamless 5-step operational protocol to bridge physical venues with global audiences.
          </p>
        </div>

        {/* 5-Step Process Grid with Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 mb-20">
          {steps.map((st, i) => {
            const isLast = i === 4;
            return (
              <div
                key={st.num}
                className={`p-6 rounded-3xl flex flex-col justify-between border text-left cursor-default select-none pointer-events-none ${
                  isLast
                    ? 'bg-black text-white shadow-lg border-black'
                    : 'glass-card border-white/80 shadow-xs'
                }`}
              >
                <div>
                  <span
                    className={`font-mono text-3xl font-bold block mb-2 ${
                      isLast ? 'text-white/40' : 'text-primary/30'
                    }`}
                  >
                    {st.num}
                  </span>
                  <h4 className="font-title-lg text-sm font-bold mb-2">
                    {st.title}
                  </h4>
                  <p
                    className={`font-body-sm text-xs leading-relaxed ${
                      isLast ? 'text-white/80' : 'text-secondary'
                    }`}
                  >
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
