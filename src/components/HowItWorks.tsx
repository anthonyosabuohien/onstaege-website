import { Calendar, Mail, Users, TrendingUp, Sparkles } from "lucide-react";
import { howItWorksItems, Theme } from "../types";

interface HowItWorksProps {
  theme: Theme;
}

export default function HowItWorks({ theme }: HowItWorksProps) {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Calendar":
        return <Calendar className="w-5 h-5 text-brand-blue" />;
      case "MailOpen":
        return <Mail className="w-5 h-5 text-brand-purple" />;
      case "Users":
        return <Users className="w-5 h-5 text-pink-500" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      default:
        return <Calendar className="w-5 h-5 text-brand-blue" />;
    }
  };

  return (
    <section id="how-it-works" className="relative z-10 py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#7c3aed]/5 to-transparent">
      
      {/* Visual glowing ball */}
      <div className="absolute top-[30%] right-[10%] w-64 h-64 bg-brand-purple/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          
          <h2 className="font-display text-4xl font-black tracking-tight leading-none">
            FOUR SIMPLE TRANSITION STEPS
          </h2>
          <p className={`font-sans text-xs sm:text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'}`}>
            Transitioning your physical event into an international digital sensation takes only four simple, beautifully integrated steps.
          </p>
        </div>

        {/* 4-column steps roadmap board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksItems.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                theme === "dark"
                  ? "bg-[#0b0b0b] border-white/5 text-zinc-400 hover:border-zinc-850 hover:shadow-2xl hover:shadow-brand-purple/5"
                  : "bg-white border-zinc-200 text-zinc-600 hover:shadow-xl"
              }`}
            >
              <div>
                {/* Step header icon and step number label */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-2.5 rounded-xl ${theme === "dark" ? "bg-white/5" : "bg-zinc-100"}`}>
                    {renderIcon(item.icon)}
                  </div>
                  <span className="font-display font-black text-2xl text-zinc-700/50 dark:text-zinc-600/40">
                    0{item.id}
                  </span>
                </div>

                {/* Titles and summaries descriptions */}
                <div className="space-y-2 mb-6">
                  <h3 className={`font-display text-lg font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs leading-relaxed text-zinc-500 dark:text-zinc-450">
                    {item.description}
                  </p>
                </div>
              </div>

              
            </div>
          ))}
        </div>

        {/* Dynamic Interactive indicator status footer note */}
        <div className="flex items-center justify-center space-x-1.5 mt-12 text-[10px] text-zinc-500 font-mono tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>REAL-TIME STREAM ARCHITECTURE &bull; 0.2s SECONDARY STAGE LATENCY</span>
        </div>

      </div>
    </section>
  );
}
