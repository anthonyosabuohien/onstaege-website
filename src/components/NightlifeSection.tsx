import { useState } from "react";
import { Wine, Music, Coins, Users, Calendar, ArrowRight } from "lucide-react";
import { Theme } from "../types";

interface NightlifeProps {
  theme: Theme;
  onRequestDemo: () => void;
}

export default function NightlifeSection({ theme, onRequestDemo }: NightlifeProps) {
  // Activity simulation feeds
  const [activeTabAction, setActiveTabAction] = useState<string>("order");

  const nightlifeOffers = [
    { id: "order", label: "Order Drinks", icon: <Wine className="w-4 h-4" />, quote: "Order liquid assets directly to your VIP booths, without standing in physical lines." },
    { id: "table", label: "Reserve Tables", icon: <Calendar className="w-4 h-4" />, quote: "Book premium table layouts with immediate transparent rates and bottle placements." },
    { id: "song", label: "Request Songs", icon: <Music className="w-4 h-4" />, quote: "Submit tracks directly onto DJ terminal screens with custom tip multipliers in cash." },
    { id: "spray", label: "Spray Performers", icon: <Coins className="w-4 h-4" />, quote: "Shower performers or hosts with glowing customized rain-making animation currencies." },
    { id: "connect", label: "Connect Guests", icon: <Users className="w-4 h-4" />, quote: "Engage, message, and exchange cards with tables around you or virtual guests global." }
  ];

  return (
    <section id="nightlife" className="relative z-10 py-20 lg:py-28 overflow-hidden bg-[#090909] text-white">
      
      {/* Heavy dark gradient overlay to give luxury lounge atmosphere */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#090909] via-black/85 to-[#090909]" />
      
      {/* Heavy blurred violet neon background circle for lounge vibe */}
      <div className="absolute top-[30%] right-[-10%] w-[40vw] h-[40vw] bg-brand-purple/20 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[35vw] h-[35vw] bg-brand-blue/15 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-10">
        
        {/* Centered Content header */}
        <div className="space-y-6 flex flex-col items-center max-w-3xl mx-auto">
          

          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-none uppercase">
            DIGITIZE YOUR <br />
            <span className="bg-gradient-to-r from-pink-500 via-brand-purple to-brand-blue bg-clip-text text-transparent">
              VENUE EXPERIENCE
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed">
            Empower physical attendees to request drinks, lock down VIP placements, trigger song requests, or spray digital cash on dancers and DJ booths. Everything streams seamlessly.
          </p>
        </div>

        {/* Fully Interactive list of offerings centered */}
        <div className="space-y-3 max-w-xl mx-auto">
          {nightlifeOffers.map((item) => {
            const itemActive = activeTabAction === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveTabAction(item.id);
                }}
                className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between text-left ${
                  itemActive
                    ? "bg-white/5 border-pink-500/40 translate-y-0.5"
                    : "bg-transparent border-white/5 hover:bg-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`p-2.5 rounded-xl ${
                    itemActive ? "bg-pink-500/20 text-pink-400" : "bg-white/5 text-zinc-400"
                  }`}>
                     {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-display">{item.label}</h4>
                    <p className="text-[10px] text-zinc-500 line-clamp-1">{item.quote}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered CTA Venue Demo */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={onRequestDemo}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-brand-purple text-white font-bold text-sm shadow-lg shadow-pink-500/25 hover:shadow-pink-500/50 hover:scale-[1.03] transition-all duration-300 flex items-center space-x-2 cursor-pointer"
          >
            <span>Request Venue Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
