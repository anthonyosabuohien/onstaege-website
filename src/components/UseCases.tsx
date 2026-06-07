import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react";
import { useCaseItems, Theme, UseCaseItem } from "../types";

interface UseCasesProps {
  theme: Theme;
}

export default function UseCases({ theme }: UseCasesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeUseCase, setActiveUseCase] = useState<string>("wedding-uc");

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 350;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="use-cases" className="relative z-10 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-2xl text-left">
            
            <h2 className="font-display text-4xl font-black tracking-tight leading-none">
              BUILT FOR EVERY TYPE {" "}<br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                OF GATHERING
              </span>
            </h2>

          </div>

          {/* Scrolling Action controller */}
          <div className="flex items-center space-x-3.5">
            <button
              onClick={() => scroll("left")}
              className={`p-3 rounded-full border transition-all duration-300 cursor-pointer ${
                theme === "dark"
                  ? "bg-zinc-900 border-white/5 text-zinc-400 hover:text-white"
                  : "bg-white border-zinc-250 text-zinc-600 hover:text-black hover:shadow-md"
              }`}
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className={`p-3 rounded-full border transition-all duration-300 cursor-pointer ${
                theme === "dark"
                  ? "bg-zinc-900 border-white/5 text-zinc-400 hover:text-white"
                  : "bg-white border-zinc-250 text-zinc-600 hover:text-black hover:shadow-md"
              }`}
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Cards deck */}
        <div
          ref={containerRef}
          className="flex space-x-6 overflow-x-auto pb-8 pt-4 scrollbar-hide snap-x scroll-smooth snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {useCaseItems.map((item: UseCaseItem) => {
            const isActive = activeUseCase === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveUseCase(item.id)}
                className={`snap-start shrink-0 w-[290px] sm:w-[350px] aspect-[4/5] rounded-3xl overflow-hidden relative cursor-pointer group transition-all duration-500 border ${
                  isActive
                    ? theme === "dark"
                      ? "border-brand-purple glow-purple scale-[1.02]"
                      : "border-brand-purple shadow-xl shadow-purple-500/10 scale-[1.02]"
                    : theme === "dark"
                      ? "border-white/5 grayscale-[20%] hover:border-white/20 hover:grayscale-0"
                      : "border-zinc-200 grayscale-[20%] hover:border-zinc-300 hover:grayscale-0"
                }`}
              >
                {/* Visual Backdrop Unsplash Picture */}
                <img
                  src={item.visualUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 group-hover:scale-105 pointer-events-none"
                />

                {/* Vertical shade overlay mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/95 via-[#090909]/45 to-transparent z-0 pointer-events-none" />

                {/* Floating Content Body */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
                  
                  {/* Category Pill Tag */}
                  <div className="flex items-start justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[9px] font-bold text-white uppercase tracking-wider">
                      {item.tag}
                    </span>
                    
                    {isActive && (
                      <Star className="w-4 h-4 text-brand-purple fill-current" />
                    )}
                  </div>

                  {/* Core copy */}
                  <div className="space-y-2 text-left">
                    <h3 className="font-display text-2xl font-bold font-black text-white uppercase tracking-tight">
                      {item.title}
                    </h3>
                    
                    <p className="font-sans text-xs text-zinc-300 leading-relaxed font-medium line-clamp-3">
                      {item.copy}
                    </p>
                  </div>

                </div>

                {/* Subtile color side accent strip */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: item.accent }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
