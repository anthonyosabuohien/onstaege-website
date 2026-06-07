import { useState, useEffect } from "react";
import { Sparkles, Music, Volume2 } from "lucide-react";
import { Theme } from "../types";

interface AppShowcaseProps {
  theme: Theme;
}

export default function AppShowcase({ theme }: AppShowcaseProps) {
  const [pulseState, setPulseState] = useState(false);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseState((prev) => !prev);
    }, 3000);
    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <section id="solutions" className="relative z-10 py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-transparent via-[#7c3aed]/5 to-transparent">
      
      {/* Moving decorative background neon particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-brand-blue/10 rounded-full filter blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-[30%] right-[10%] w-80 h-80 bg-brand-purple/10 rounded-full filter blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Editorial Heading Section */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            TAILORED VENUE PLUGINS
          </h2>
          <p className={`font-sans text-sm sm:text-base ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'}`}>
            Explore our specialized layouts configured out-of-the-box. Optimize your guest engagement patterns whether you run high-profile weddings, VIP clubs, or massive arena concerts.
          </p>
        </div>

        {/* 3 Floating Phones Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 items-center justify-center">

          {/* SCREEN 1: WEDDING OPTIMIZATION */}
          <div className="flex flex-col items-center group">
            <div className="text-center mb-4">
              <span className="font-display text-xs tracking-widest text-brand-blue uppercase font-bold">MODE 01</span>
              <h3 className={`font-display text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>The Luxury Wedding</h3>
            </div>

            <div className={`relative w-[270px] h-[520px] rounded-[48px] border-6 p-2.5 shadow-2.5xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:rotate-1 ${
              theme === "dark" ? "bg-[#0b0b0b] border-zinc-800 shadow-black" : "bg-zinc-100 border-zinc-300 shadow-zinc-350"
            }`}>
              
              {/* Camera Island Notch */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30" />

              {/* Inner Smartphone Screen */}
              <div className="w-full h-full rounded-[38px] overflow-hidden relative bg-amber-950/25 flex flex-col justify-between p-4 bg-cover bg-center" style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800')`
              }}>
                {/* Visual shade overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 z-0 pointer-events-none" />

                {/* Event header info */}
                <div className="relative z-10 flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[14px]">💍</span>
                    <div>
                      <p className="text-[10px] font-bold text-white uppercase tracking-wider font-display leading-none">THE MORETTI UNION</p>
                      <p className="text-[7px] text-zinc-300 leading-none">Amalfi • Live Stream</p>
                    </div>
                  </div>
                  <span className="bg-amber-400 text-black font-semibold text-[7px] px-1.5 py-0.5 rounded font-mono">VIP</span>
                </div>

                {/* Central active interactive widget */}
                <div className="relative z-10 space-y-2 mt-auto">
                  {/* Testimonial message overlay */}
                  <div className="bg-black/45 p-2.5 rounded-xl border border-white/5 space-y-1">
                    <p className="text-[8px] font-bold text-brand-blue flex items-center space-x-1">
                      <span>Grandma Rosalie</span>
                      <span className="text-[6px] bg-brand-blue/20 text-brand-blue px-1 rounded-full uppercase">Sydney</span>
                    </p>
                    <p className="text-[7px] text-zinc-200 leading-tight">My darlings, you look breathtaking! Transmitting infinite blessings from Sydney!</p>
                  </div>
                </div>

              </div>
            </div>
            
            <p className="text-xs text-zinc-500 font-medium mt-4 text-center max-w-[200px]">
              Features emotional milestone milestones, greeting boards, and global champagne toasts.
            </p>
          </div>

          {/* SCREEN 2: NIGHTCLUB INTERACTIVE */}
          <div className="flex flex-col items-center group">
            <div className="text-center mb-4">
              <span className="font-display text-xs tracking-widest text-[#EC4899] uppercase font-bold">MODE 02</span>
              <h3 className={`font-display text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>The VIP Nightclub</h3>
            </div>

            <div className={`relative w-[270px] h-[520px] rounded-[48px] border-6 p-2.5 shadow-2.5xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:-rotate-1 ${
              theme === "dark" ? "bg-[#0b0b0b] border-zinc-800 shadow-black" : "bg-zinc-100 border-zinc-300 shadow-zinc-350"
            }`}>
              
              {/* Camera Notch */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30" />

              {/* Inner Smartphone Screen */}
              <div className="w-full h-full rounded-[38px] overflow-hidden relative bg-purple-950/25 flex flex-col justify-between p-4 bg-cover bg-center" style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800')`
              }}>
                {/* Visual shade overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50 z-0 pointer-events-none" />

                {/* Event header */}
                <div className="relative z-10 flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[14px]">🔥</span>
                    <div>
                      <p className="text-[10px] font-bold text-white uppercase tracking-wider font-display leading-none">NEON REVEL VENUE</p>
                      <p className="text-[7px] text-zinc-300 leading-none">Table 22 • Bottle Spray</p>
                    </div>
                  </div>
                  <span className="bg-pink-500 text-white font-semibold text-[7px] px-1.5 py-0.5 rounded font-mono">ONLINE</span>
                </div>

                {/* Central active dashboard element */}
                <div className="relative z-10 space-y-2 mt-auto">
                  
                  {/* Track Request widget */}
                  <div className="bg-black/65 backdrop-blur-sm p-2 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-bold text-pink-400">Requesting Song</p>
                      <p className="text-[7px] text-zinc-200">Midnight City (M83) - Club Mix</p>
                    </div>
                    <Music className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                  </div>

                  {/* Cash Spray alert box */}
                  <div className="bg-gradient-to-tr from-emerald-600/70 to-green-600/70 backdrop-blur p-2.5 rounded-xl border border-emerald-500/20 text-center">
                    <p className="text-[8px] font-bold text-zinc-100 uppercase tracking-widest">💸 SPRAY ACTIVATED 💸</p>
                    <p className="text-[7px] text-white">Guest spray triggered 50 Digital USD Dollars!</p>
                  </div>
                </div>

              </div>
            </div>

            <p className="text-xs text-zinc-500 font-medium mt-4 text-center max-w-[200px]">
              Optimized for instant song requests, bottle service reserves, and social crowd networking.
            </p>
          </div>

          {/* SCREEN 3: ARENA CONCERT */}
          <div className="flex flex-col items-center group">
            <div className="text-center mb-4">
              <span className="font-display text-xs tracking-widest text-brand-purple uppercase font-bold">MODE 03</span>
              <h3 className={`font-display text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>The Arena Concert</h3>
            </div>

            <div className={`relative w-[270px] h-[520px] rounded-[48px] border-6 p-2.5 shadow-2.5xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:rotate-1 ${
              theme === "dark" ? "bg-[#0b0b0b] border-zinc-800 shadow-black" : "bg-zinc-100 border-zinc-300 shadow-zinc-350"
            }`}>
              
              {/* Notch */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30" />

              {/* Inner screen */}
              <div className="w-full h-full rounded-[38px] overflow-hidden relative bg-blue-950/25 flex flex-col justify-between p-4 bg-cover bg-center" style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800')`
              }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50 z-0 pointer-events-none" />

                {/* Event header */}
                <div className="relative z-10 flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[14px]">🎸</span>
                    <div>
                      <p className="text-[10px] font-bold text-white uppercase tracking-wider font-display leading-none">STADIUM ROCKS 2026</p>
                      <p className="text-[7px] text-zinc-300 leading-none">Broadcasting • Stage Drone Left</p>
                    </div>
                  </div>
                  <span className="bg-brand-purple text-white font-semibold text-[7px] px-1.5 py-0.5 rounded font-mono animate-pulse">LOUD</span>
                </div>

                {/* Active user state widgets */}
                <div className="relative z-10 space-y-2 mt-auto">
                  
                  {/* Multi angle toggle selector */}
                  <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-black/60 rounded-xl border border-white/5">
                    <div className="bg-brand-blue/20 text-white p-1 rounded text-center text-[7px] font-bold border border-brand-blue/30">
                      🎥 Main Stage
                    </div>
                    <div className="bg-white/5 text-zinc-400 p-1 rounded text-center text-[7px] hover:text-white">
                      🛸 Drone 02
                    </div>
                  </div>

                  {/* Interactive crowd sparkler status */}
                  <div className="bg-white/10 backdrop-blur p-2 rounded-xl border border-white/15 flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-bold text-white">Arena Sparkler Synced</p>
                      <p className="text-[6px] text-zinc-300">Waving phone screen matches stage lights</p>
                    </div>
                    <Volume2 className="w-3.5 h-3.5 text-brand-blue animate-bounce" />
                  </div>
                </div>

              </div>
            </div>

            <p className="text-xs text-zinc-500 font-medium mt-4 text-center max-w-[200px]">
              Includes instantaneous co-host camera switches, synchronized lightwaves, and spatial audio feedback.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
