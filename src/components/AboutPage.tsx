import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { 
  ArrowRight, Sparkles, Globe, Heart, Shield, Award, 
  MapPin, Milestone, Compass, Cpu, Users, Eye, 
  TrendingUp, Activity, ExternalLink, MessageSquare, 
  Layers, ShoppingBag, GraduationCap, Crosshair, 
  Tv, Compass as Travel, Trophy, Music, Radio, Users2
} from "lucide-react";
import { Theme } from "../types";
import founderPortrait from "@/assets/.aistudio/founder.jpg";

interface AboutPageProps {
  theme: Theme;
  onRequestDemo: () => void;
  onPageChange: (page: "home" | "about") => void;
}

// Custom Counter hook for micro-interactions
function CountUp({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration * 1000 / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function AboutPage({ theme, onRequestDemo, onPageChange }: AboutPageProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Background magnetic effect for cards
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen pt-24 pb-8 transition-colors duration-500 overflow-x-hidden ${
        theme === "dark" ? "bg-[#050505] text-white" : "bg-[#fafafa] text-zinc-900"
      }`}
    >
      {/* Absolute floating decorations */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-brand-blue/10 rounded-full filter blur-[150px] animate-pulse pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-brand-purple/10 rounded-full filter blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[450px] h-[450px] bg-indigo-600/5 rounded-full filter blur-[140px] pointer-events-none" />

      {/* Grid lines layout overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-15 dark:opacity-30" 
        style={{
          backgroundImage: `radial-gradient(circle at center, rgb(124, 58, 237, 0.08) 1.5px, transparent 1.5px)`,
          backgroundSize: "28px 28px"
        }}
      />

      {/* PAGE INTRO HERO Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 z-10 border-b border-zinc-900/10 dark:border-white/5">
        {/* Connection networks behind */}
        <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 overflow-hidden pointer-events-none">
          <svg className="w-full h-full min-w-[1000px] mx-auto opacity-70" viewBox="0 0 1000 500" stroke="currentColor" fill="none">
            {/* World Grid simplified representation */}
            <path d="M 50,250 Q 500,50 950,250 M 50,250 Q 500,450 950,250 M 50,250 L 950,250 M 500,50 L 500,450" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-800" strokeDasharray="5 5" />
            <path d="M 200,100 Q 500,250 800,100 M 200,400 Q 500,250 800,400" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-800" strokeDasharray="3 3" />
            
            {/* Pulsing connection paths representing Abuja -> London -> NY -> Tokyo */}
            {/* Lagos/Abuja: x=480, y=320. London: x=470, y=140. NY: x=250, y=180. Tokyo: x=820, y=180 */}
            <motion.path 
              d="M 480,320 Q 400,200 470,140" 
              stroke="url(#purpleGrad)" 
              strokeWidth="2" 
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path 
              d="M 470,140 Q 350,150 250,180" 
              stroke="url(#blueGrad)" 
              strokeWidth="2" 
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.path 
              d="M 480,320 Q 650,250 820,180" 
              stroke="url(#purpleGrad)" 
              strokeWidth="1.5" 
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* Glowing nodes */}
            <circle cx="480" cy="320" r="5" className="fill-brand-purple animate-ping" />
            <circle cx="480" cy="320" r="4" className="fill-brand-purple" />
            
            <circle cx="470" cy="140" r="5" className="fill-brand-blue animate-ping" />
            <circle cx="470" cy="140" r="4" className="fill-brand-blue" />

            <circle cx="250" cy="180" r="5" className="fill-emerald-400 animate-ping" />
            <circle cx="250" cy="180" r="4" className="fill-emerald-400" />

            <circle cx="820" cy="180" r="5" className="fill-pink-500 animate-ping" />
            <circle cx="820" cy="180" r="4" className="fill-pink-500" />

            {/* Definitions */}
            <defs>
              <linearGradient id="purpleGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Hero Text */}
        <div className="max-w-4xl text-center space-y-8 z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase border ${
              theme === 'dark' 
                ? 'bg-zinc-900/60 border-white/5 text-brand-purple' 
                : 'bg-zinc-100 border-zinc-200 text-brand-purple'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Onstaege Blueprint</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.05] ${
              theme === 'dark' ? 'text-white' : 'text-zinc-900'
            }`}
          >
            We Believe Experiences Shouldn't Be Limited By <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-indigo-400 to-brand-purple">Physical Presence.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-lg sm:text-2xl font-light leading-relaxed max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'
            }`}
          >
            Building the infrastructure that extends experiences, services, businesses and communities beyond physical boundaries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-6 flex justify-center gap-4"
          >
            <button 
              onClick={() => {
                const foundersSection = document.getElementById("founders-narrative");
                foundersSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-blue to-indigo-600 text-white font-sans font-semibold text-sm shadow-xl shadow-brand-blue/20 hover:shadow-brand-blue/40 hover:scale-[1.02] transition-all duration-300"
            >
              Read Our Story
            </button>
          </motion.div>
        </div>

        {/* Floating background particles */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-65">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">SCROLL DOWN TO REVEAL</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-brand-purple"
          />
        </div>
      </section>

      {/* SECTION ONE: FOUNDER'S STORY */}
      <section id="founders-narrative" className="relative py-24 px-6 z-10 max-w-7xl mx-auto border-b border-zinc-900/10 dark:border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Sticky Column - Portrait Frame */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[3/4] max-w-sm rounded-[24px] overflow-hidden group border border-white/10 bg-zinc-950/90 shadow-2xl"
            >
              {/* Premium Glass border shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-brand-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
              
              {/* Professional portrait matching candidate criteria */}
              <img 
                src={founderPortrait}
                alt="Anthony Osabuohien Portrait"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=600&auto=format&fit=crop";
                }}
                className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
              
              {/* Photo tag labels overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <p className="text-white text-xl font-bold tracking-tight">Anthony Osabuohien</p>
                <div className="flex items-center justify-between mt-1 text-xs text-zinc-300 font-mono">
                  <span>Founder & CEO, Onstaege</span>
                </div>
              </div>
            </motion.div>

            {/* Quote decoration */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              viewport={{ once: true }}
              className="text-center italic font-light text-sm text-zinc-500 max-w-xs"
            >
              "In 2025, a family celebration thousands of miles away sparked the blueprint for real-time human immersion."
            </motion.div>
          </div>

          {/* Right Column - Founder Narrative Story Grid */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-brand-purple tracking-widest uppercase">SECTION 01 / STORY</span>
              <h2 className={`font-display text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                The Experience That Started Everything
              </h2>
              <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-purple rounded-full" />
            </div>

            {/* Glassmorphism Story Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`p-8 sm:p-10 rounded-[24px] border space-y-6 leading-relaxed leading-[1.65] text-sm sm:text-base ${
                theme === 'dark' 
                  ? 'bg-zinc-950/40 border-white/5 text-zinc-300 shadow-xl shadow-black/40' 
                  : 'bg-white border-zinc-200 text-zinc-650 shadow-lg'
              }`}
            >
              <p>
                In 2025, one experience changed the way I thought about human connection.
              </p>
              
              <p>
                My sibling, who was studying in the United Kingdom, got married. As a family, we desperately wanted to be there, but the realities of travel costs, visa restrictions, distance, and logistics made it impossible.
              </p>
              
              <div className={`p-4 rounded-xl border-l-[3px] border-brand-purple font-light italic ${
                theme === 'dark' ? 'bg-white/5 border-white/10 text-zinc-200' : 'bg-zinc-50 border-zinc-200 text-zinc-700'
              }`}>
                Like many families around the world, we settled for watching a livestream from Nigeria.
              </div>

              <p>
                Although we could see what was happening, we couldn't truly participate. We couldn't interact with our new in-laws. We couldn't celebrate with friends and relatives.
              </p>

              <p>
                We couldn't contribute to the conversations, traditions, laughter, or shared moments that make African weddings unforgettable. 
                <span className={`font-semibold block mt-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>We were present, but we weren't actually there.</span>
              </p>

              <p>
                That experience made me ask a simple question: <strong className="text-brand-blue font-semibold">Why should physical distance prevent meaningful participation?</strong>
              </p>

              <p>
                The more I researched, the more I realized this wasn't just an events problem. The same limitation exists across commerce, tourism, entertainment, healthcare, education, nightlife, sports, and countless other sectors.
              </p>

              <p>
                Every day, millions of people miss opportunities, experiences, relationships, and revenue simply because they cannot physically show up. Even businesses lose access to global customers because their services stop at their physical location.
              </p>

              <p>
                I realized the world needed something bigger than another livestream platform. It needed infrastructure that makes virtual participation feel immersive, interactive, and rewarding.
              </p>

              <div className="pt-4">
                <p className={`font-bold text-base ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  That's why I built Onstaege.
                </p>
                <p className="mt-2 text-brand-blue font-medium">
                  A real-time immersive experience platform designed to take participation beyond physical venues and connect people to experiences anywhere in the world.
                </p>
              </div>
            </motion.div>

            {/* Section Bottom Quote Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-[24px] border flex flex-col md:flex-row items-center gap-6 justify-between relative overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-brand-purple/10 to-[#120024] border-brand-purple/20' 
                  : 'bg-purple-50/50 border-purple-150'
              }`}
            >
              <div className="space-y-2 text-center md:text-left">
                <blockquote className={`font-display text-lg sm:text-xl font-bold italic leading-snug ${
                  theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'
                }`}>
                  "Distance should never determine who gets to experience life's most important moments."
                </blockquote>
                <p className="text-xs font-mono text-brand-purple uppercase font-semibold">Anthony Osabuohien — Founder & CEO</p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* SECTION TWO: OUR BIG BET */}
      <section className={`relative py-28 px-6 z-10 border-b ${
        theme === 'dark' ? 'bg-[#06060c] border-white/5' : 'bg-indigo-50/10 border-zinc-200'
      }`}>
        <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30 overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full filter blur-[100px]" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Centered Headlines */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Our Biggest Bet
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-brand-blue to-purple-500 rounded-full mx-auto" />
            
            <div className="py-6 space-y-2 tracking-wider">
              <p className="font-display font-black text-xl sm:text-3xl text-brand-purple leading-none">
                AI WILL CREATE MORE FREE TIME.
              </p>
              <p className="font-display font-black text-xl sm:text-3xl text-brand-blue leading-none">
                HUMANS WILL SEEK MORE EXPERIENCES.
              </p>
            </div>
          </div>

          {/* Grid: Analysis text & metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Analysis Text Card */}
            <div className="lg:col-span-6 space-y-6 text-sm sm:text-base leading-relaxed text-zinc-400 dark:text-zinc-300">
              <p className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-650'}>
                Artificial Intelligence is rapidly automating repetitive work and increasing productivity across industries. As people gain more free time, demand for meaningful social interaction, live entertainment, experiences, travel, communities, and events will continue to grow.
              </p>

              <p className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-650'}>
                This shift is already happening. Live experiences have become one of the fastest-growing sectors globally as people increasingly value moments they can share rather than possessions they can own.
              </p>

              <p className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-650'}>
                Industry projections estimate that the global events economy will approach <strong className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>$2.0 trillion by 2028</strong>, creating one of the largest opportunities for technology platforms that expand participation beyond physical boundaries.
              </p>

              <div className={`p-5 rounded-2xl border ${
                theme === 'dark' ? 'bg-zinc-950/50 border-white/5' : 'bg-white border-zinc-200'
              }`}>
                <p className={`font-semibold ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>Our belief is simple:</p>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple font-bold text-lg mt-1">
                  Every physical experience should have an unlimited digital audience.
                </p>
                <p className="text-xs mt-2 text-zinc-500">
                  Onstaege is building the infrastructure positioned to capture that opportunity.
                </p>
              </div>
            </div>

            {/* Interactive SVG Connection Map & Growth Visual */}
            <div className="lg:col-span-6">
              <div className={`p-8 rounded-[24px] border relative overflow-hidden backdrop-blur-md ${
                theme === 'dark' ? 'bg-zinc-900/30 border-white/5' : 'bg-white border-zinc-200 shadow-xl'
              }`}>
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <p className={`text-xs font-mono uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Onstaege Inflows</p>
                    <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Real-Time Growth Sectors</p>
                  </div>
                  <Milestone className="w-5 h-5 text-brand-purple animate-pulse" />
                </div>

                {/* Growth Visual Diagram */}
                <div className="relative h-64 flex flex-col justify-between">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center z-13">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="px-6 py-4 rounded-2xl bg-black border border-brand-purple/45 shadow-lg shadow-brand-purple/20 text-center text-white font-mono"
                    >
                      <span className="text-[10px] text-zinc-400 block tracking-widest uppercase mb-1">AGGREGATOR</span>
                      <span className="font-sans font-black text-sm tracking-widest text-[#a855f7]">ONSTAEGE</span>
                    </motion.div>
                  </div>

                  {/* Top Left, Top Right, Bottom Left, Bottom Right source flows */}
                  <div className="flex justify-between items-center z-10">
                    <div className="space-y-1 bg-zinc-950/90 py-1.5 px-3 rounded-full border border-zinc-800 text-xs text-zinc-300 flex items-center gap-1.5 shadow-sm">
                      <Music className="w-3 h-3 text-brand-purple" />
                      <span>Live Events</span>
                    </div>
                    <div className="space-y-1 bg-zinc-950/90 py-1.5 px-3 rounded-full border border-zinc-800 text-xs text-zinc-300 flex items-center gap-1.5 shadow-sm">
                      <Users2 className="w-3 h-3 text-pink-400" />
                      <span>Creator Economy</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center z-10">
                    <div className="space-y-1 bg-zinc-950/90 py-1.5 px-3 rounded-full border border-zinc-800 text-xs text-zinc-300 flex items-center gap-1.5 shadow-sm">
                      <Trophy className="w-3 h-3 text-brand-blue" />
                      <span>Sports & Arena</span>
                    </div>
                    <div className="space-y-1 bg-zinc-950/90 py-1.5 px-3 rounded-full border border-zinc-800 text-xs text-zinc-300 flex items-center gap-1.5 shadow-sm">
                      <Compass className="w-3 h-3 text-amber-400" />
                      <span>Global Tourism</span>
                    </div>
                  </div>

                  {/* SVG overlay line tracers */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 240">
                    {/* Liners to center */}
                    <motion.path d="M 60,30 L 200,120" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                    <motion.path d="M 340,30 L 200,120" stroke="#f472b6" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                    <motion.path d="M 60,210 L 200,120" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                    <motion.path d="M 340,210 L 200,120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* Floating Statistics Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            <div className={`p-6 rounded-2xl border text-center ${
              theme === 'dark' ? 'bg-zinc-950/50 border-white/5' : 'bg-white border-zinc-250 shadow-sm'
            }`}>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-400">
                <CountUp end={100} duration={1.5} suffix="%" />
              </p>
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mt-2">Global Audience</p>
            </div>

            <div className={`p-6 rounded-2xl border text-center ${
              theme === 'dark' ? 'bg-zinc-950/50 border-white/5' : 'bg-white border-zinc-250 shadow-sm'
            }`}>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-brand-purple">
                <span>∞</span>
              </p>
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mt-2">Unlimited Reach</p>
            </div>

            <div className={`p-6 rounded-2xl border text-center ${
              theme === 'dark' ? 'bg-zinc-950/50 border-white/5' : 'bg-white border-zinc-250 shadow-sm'
            }`}>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-pink-500">
                <CountUp end={8} duration={1.2} suffix="k UltraHD" />
              </p>
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mt-2">Real-Time Participation</p>
            </div>

            <div className={`p-6 rounded-2xl border text-center ${
              theme === 'dark' ? 'bg-zinc-950/50 border-white/5' : 'bg-white border-zinc-250 shadow-sm'
            }`}>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                <CountUp end={4} duration={1.0} suffix="x multiplier" />
              </p>
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mt-2">New Revenue Streams</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION THREE: OUR VISION */}
      <section className="relative py-28 px-6 z-10 max-w-7xl mx-auto border-b border-zinc-900/10 dark:border-white/5">
        <div className="space-y-16">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Building A World Without Physical Boundaries
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-purple-500 rounded-full mx-auto" />
            
            <p className="font-display font-black text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 leading-tight pt-4">
              MAKE THE WORLD YOUR BUSINESS PREMISES.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual flow diagram of physical transforming to digital */}
            <div className="lg:col-span-6 order-last lg:order-first">
              <div className={`p-8 sm:p-10 rounded-[24px] border relative overflow-hidden ${
                theme === 'dark' ? 'bg-zinc-950/50 border-white/5' : 'bg-white border-zinc-200 shadow-xl'
              }`}>
                {/* Visual Transforming Header */}
                <div className="flex justify-between items-center pb-8 border-b border-zinc-805 dark:border-white/5 mb-8">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">PHYSICAL STORE FRONT</span>
                  <ArrowRight className="w-4 h-4 text-brand-purple animate-bounce-horizontal" />
                  <span className="text-xs font-mono uppercase tracking-widest text-brand-blue font-bold">DIGITAL IMMERSIVE OUTLET</span>
                </div>

                {/* Transformer Chips Cloud layout */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Commerce", icon: ShoppingBag, color: "text-amber-400" },
                    { label: "Education", icon: GraduationCap, color: "text-emerald-400" },
                    { label: "Healthcare", icon: Shield, color: "text-blue-400" },
                    { label: "Sports", icon: Trophy, color: "text-rose-400" },
                    { label: "Entertainment", icon: Tv, color: "text-brand-purple" },
                    { label: "Tourism", icon: Travel, color: "text-orange-400" },
                    { label: "Events", icon: Milestone, color: "text-indigo-400" },
                    { label: "Nightlife", icon: Music, color: "text-purple-400" },
                    { label: "Creators", icon: Radio, color: "text-sky-400" }
                  ].map((chip) => {
                    const IconComponent = chip.icon;
                    return (
                      <div 
                        key={chip.label}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-2 hover:scale-[1.04] transition duration-300 ${
                          theme === 'dark' ? 'bg-zinc-900/60 border-white/5' : 'bg-zinc-50 border-zinc-200'
                        }`}
                      >
                        <IconComponent className={`w-5 h-5 ${chip.color}`} />
                        <span className="text-[10px] font-mono tracking-wider font-semibold">{chip.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Vision Narrative text */}
            <div className="lg:col-span-6 space-y-6 text-sm sm:text-base leading-relaxed">
              <p className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-650'}>
                We envision a future where businesses no longer serve only the people who walk through their doors. A customer can experience a fashion store without visiting it. Attend a concert without travelling. Receive quality education without entering a physical classroom.
              </p>
              
              <p className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-650'}>
                Consult a healthcare professional, join a cultural festival from another continent, participate in a family celebration from anywhere, and support creators in real time.
              </p>

              <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                In the future we are building, physical presence becomes optional — not mandatory.
              </p>

              <p className="text-zinc-500">
                Virtual participation will become as immersive, interactive, and rewarding as being there in person. Every business will be able to extend its services beyond its shop, office, venue, or physical boundaries. Every creator will reach a global audience. Every event will have unlimited capacity.
              </p>
            </div>

          </div>

        </div>
      </section>


    </div>
  );
}
