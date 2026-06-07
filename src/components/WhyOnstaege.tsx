import { Theme } from "../types";

interface WhyOnstaegeProps {
  theme: Theme;
}

export default function WhyOnstaege({ theme }: WhyOnstaegeProps) {
  return (
    <section id="why-onstaege" className="relative z-10 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center space-y-6">
        
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
          THE WORLD IS NOW <br />
          <span className="bg-gradient-to-r from-brand-blue to-violet-400 bg-clip-text text-transparent">
            YOUR AUDIENCE
          </span>
        </h2>

        <div className={`space-y-4 font-sans text-base leading-relaxed max-w-2xl mx-auto ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'}`}>
          <p>
            Onstaege dissolves distance and capacity constraints. Experience seamless digital synchronization that transforms localized events into massive international streams.
          </p>
        </div>
      </div>
    </section>
  );
}
