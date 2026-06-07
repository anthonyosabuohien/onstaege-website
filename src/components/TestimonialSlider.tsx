import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonialItems, Theme, TestimonialItem } from "../types";

interface TestimonialsProps {
  theme: Theme;
}

export default function TestimonialSlider({ theme }: TestimonialsProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonialItems.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonialItems.length) % testimonialItems.length);
  };

  // Rotating testimonials automatically every 7 seconds
  useEffect(() => {
    const timer = setInterval(handleNext, 7000);
    return () => clearInterval(timer);
  }, []);

  const activeReview = testimonialItems[activeIdx];

  const renderFormattedQuote = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-extrabold not-italic text-brand-purple dark:text-brand-purple-light">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <section id="testimonials" className="relative z-10 py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-transparent via-brand-purple/5 to-transparent">
      
      {/* Decorative blurry background circles */}
      <div className="absolute top-[40%] left-[5%] w-60 h-60 bg-brand-blue/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Title */}
        <div className="space-y-4 mb-16">
          <span className="inline-flex items-center space-x-2 bg-brand-blue/10 text-brand-blue px-3.5 py-1.5 rounded-full border border-brand-blue/20 text-xs font-semibold uppercase tracking-widest">
            <span>UNMATCHED SATISFACTION</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            TRUSTED BY WORLD-CLASS EVENT HOSTS
          </h2>
        </div>

        {/* Dynamic testimonial slider card */}
        <div className="relative">
          
          {/* Glass Card wrapped in premium transition styling */}
          <div className={`p-8 sm:p-12 rounded-3xl border transition-all duration-500 relative ${
            theme === "dark"
              ? "bg-[#0b0b0b]/90 border-white/5 shadow-2xl glow-purple"
              : "bg-white border-zinc-150 shadow-xl shadow-zinc-200/50"
          }`}>
            
            {/* Soft decorative background quotation mark */}
            <Quote className="absolute top-6 left-6 w-16 h-16 text-zinc-500/10 pointer-events-none" />

            {/* Five Star Ranking Rating info */}
            <div className="flex justify-center items-center space-x-1.5 mb-6">
              {Array.from({ length: activeReview.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote content */}
            <blockquote className={`font-editorial text-xl sm:text-2xl md:text-3xl font-light leading-snug italic mb-8 max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'
            }`}>
              "{renderFormattedQuote(activeReview.quote)}"
            </blockquote>

            {/* User profile details */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-purple shadow-md">
                <img
                  src={activeReview.avatarUrl}
                  alt={activeReview.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center sm:text-left">
                <cite className="not-italic font-display text-sm font-black text-zinc-909 dark:text-white block">
                  {activeReview.name}
                </cite>
                <span className="text-[11px] text-zinc-500 block">
                  {activeReview.role} • <span className="text-brand-purple">{activeReview.event}</span>
                </span>
              </div>
            </div>

          </div>

          {/* Navigational controls buttons */}
          <div className="flex items-center justify-center space-x-6 mt-8">
            <button
              onClick={handlePrev}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-zinc-900 border-white/5 text-zinc-400 hover:text-white"
                  : "bg-white border-zinc-200 text-zinc-650 hover:text-black"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Indicators dot slider */}
            <div className="flex items-center space-x-2">
              {testimonialItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIdx === idx ? "w-6 bg-brand-purple" : "bg-zinc-500/30"
                  }`}
                  aria-label={`Show testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-zinc-900 border-white/5 text-zinc-400 hover:text-white"
                  : "bg-white border-zinc-200 text-zinc-650 hover:text-black"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
