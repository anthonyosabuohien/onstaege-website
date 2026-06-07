import { useState, useEffect } from "react";
import { Sparkles, Users, Globe, Zap } from "lucide-react";
import { Theme } from "../types";

interface SocialProofProps {
  theme: Theme;
}

export default function SocialProof({ theme }: SocialProofProps) {
  const [eventsCount, setEventsCount] = useState(0);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);

  useEffect(() => {
    // Smooth counter intervals on load
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      
      setEventsCount(Math.min(100, Math.floor((100 / steps) * currentStep)));
      setParticipantsCount(Math.min(50, Math.floor((50 / steps) * currentStep)));
      setCountriesCount(Math.min(25, Math.floor((25 / steps) * currentStep)));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      label: "Events Hosted Successfully",
      displayVal: `${eventsCount}+`,
      icon: <Sparkles className="w-5 h-5 text-brand-blue" />,
      tagline: "Ultra high-fidelity productions"
    },
    {
      label: "Active Participants Connected",
      displayVal: `${participantsCount}K+`,
      icon: <Users className="w-5 h-5 text-brand-purple" />,
      tagline: "Simultaneous stream delivery"
    },
    {
      label: "Sovereign Countries Reached",
      displayVal: `${countriesCount}+`,
      icon: <Globe className="w-5 h-5 text-pink-500" />,
      tagline: "No physical regional borders"
    },
    {
      label: "Real-Time Interactions",
      displayVal: "Millions",
      icon: <Zap className="w-5 h-5 text-amber-500 animate-bounce" />,
      tagline: "Chat bubbles, sprays & digital gifts"
    }
  ];

  return (
    <section id="social-proof" className="relative z-10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Subtle separator line */}
        <div className={`w-full h-[1px] mb-12 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`group p-6 rounded-[24px] border transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden ${
                theme === "dark"
                  ? "bg-[#090909] border-white/5 hover:border-brand-blue/30"
                  : "bg-white border-zinc-200 hover:border-brand-purple/30 shadow-sm"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-xl ${
                  theme === "dark" ? "bg-white/5" : "bg-zinc-100"
                }`}>
                  {stat.icon}
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-ping" />
              </div>

              <div className="space-y-1">
                <p className="font-display text-4xl sm:text-5xl font-medium tracking-tighter bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent transition-all duration-500">
                  {stat.displayVal}
                </p>
                <p className={`font-sans text-[11px] font-semibold uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-450' : 'text-zinc-600'}`}>
                  {stat.label}
                </p>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                  {stat.tagline}
                </p>
              </div>

              {/* Glowing card border overlay */}
              <div className="absolute -inset-0.5 rounded-[24px] bg-gradient-to-tr from-brand-blue to-brand-purple opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-sm pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
