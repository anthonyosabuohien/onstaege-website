import React, { useState, useEffect } from "react";
import { Play, Sparkles, MessageSquare, Gift, Heart, Send, Users, Compass, DollarSign, Zap, Home, Calendar, User, Volume2, Bookmark, Eye, Theater } from "lucide-react";
import { heroSlideshowItems, Theme } from "../types";

interface HeroProps {
  theme: Theme;
  onRequestDemo: () => void;
}

export default function Hero({ theme, onRequestDemo }: HeroProps) {
  // Slideshow state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // Rotating iPhone screens state
  const [currentPhoneScreen, setCurrentPhoneScreen] = useState(0);

  // Simulated cash spray objects
  const [sprayedCash, setSprayedCash] = useState<{ id: number; left: number; delay: number }[]>([]);

  // Simulated live reactions
  const [reactions, setReactions] = useState<{ id: number; type: string; left: number }[]>([]);

  // Interactive Live Screen Mockup state corresponding to provided screenshot
  const [activeTab, setActiveTab] = useState("Highlights");
  const [heartCount, setHeartCount] = useState(5214);
  const [chatCount, setChatCount] = useState(450);
  const [mockSprayedCash, setMockSprayedCash] = useState<{ id: number; left: number; rotation: number; delay: number }[]>([]);
  const [mockHearts, setMockHearts] = useState<{ id: number; left: number; scale: number; speed: number; shift: number }[]>([]);
  const [phoneAlert, setPhoneAlert] = useState<string | null>(null);

  const triggerCashSpray = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Spray 12 money bundles floating and swirling upwards from launcher button location
    const newBills = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      left: 15 + Math.random() * 70, // disperse wide
      rotation: Math.random() * 60 - 30, // -30 to +30 deg
      delay: Math.random() * 0.6
    }));
    setMockSprayedCash(prev => [...prev, ...newBills]);
    
    // Clear out of window
    setTimeout(() => {
      setMockSprayedCash(prev => prev.slice(12));
    }, 4000);
  };

  const triggerHeartReaction = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeartCount(prev => prev + 1);

    // Create a burst of floating translucent hearts scaling up & shifting horizontally
    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      left: 70 + Math.random() * 18,
      scale: 0.5 + Math.random() * 0.7,
      speed: 1.8 + Math.random() * 1.2,
      shift: Math.random() * 60 - 30
    }));
    setMockHearts(prev => [...prev, ...newHearts]);

    setTimeout(() => {
      setMockHearts(prev => prev.slice(6));
    }, 3000);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhoneAlert("Link Transmitted!");
    setTimeout(() => {
      setPhoneAlert(null);
    }, 2000);
  };

  const phoneScreens = [
    {
      title: "Event Feed",
      icon: <Compass className="w-4 h-4 text-brand-blue" />,
      tagline: "Unrestricted live multi-angle venue stream",
      color: "from-blue-600/20 to-purple-600/10"
    },
    {
      title: "Digital Cash Spray",
      icon: <DollarSign className="w-4 h-4 text-green-400" />,
      tagline: "Celebrate hosts. Rain digital currencies live",
      color: "from-emerald-500/20 to-green-500/10"
    },
    {
      title: "Virtual Audience",
      icon: <Users className="w-4 h-4 text-pink-500" />,
      tagline: "Join room tables of virtual seating zones",
      color: "from-pink-500/20 to-rose-500/10"
    },
    {
      title: "Chat & Socials",
      icon: <MessageSquare className="w-4 h-4 text-violet-400" />,
      tagline: "Synced physical & global chat channels",
      color: "from-violet-500/20 to-indigo-500/10"
    },
    {
      title: "Networking",
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      tagline: "Instant lounge rooms for strategic meetups",
      color: "from-amber-500/20 to-yellow-500/10"
    },
    {
      title: "Elite Gifting",
      icon: <Gift className="w-4 h-4 text-purple-400" />,
      tagline: "Trigger luxury 3D animated physical gift wraps",
      color: "from-purple-500/20 to-fuchsia-500/10"
    },
    {
      title: "Live Reactions",
      icon: <Heart className="w-4 h-4 text-rose-500" />,
      tagline: "Spam feedback loops directly onto host desks",
      color: "from-red-500/20 to-orange-500/10"
    }
  ];

  // Rotate Background Event Slideshow (every 5 seconds)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlideshowItems.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  // Rotate iPhone Screens (every 3.5 seconds)
  useEffect(() => {
    const phoneInterval = setInterval(() => {
      setCurrentPhoneScreen((prev) => (prev + 1) % phoneScreens.length);
    }, 3500);
    return () => clearInterval(phoneInterval);
  }, [phoneScreens.length]);

  // Periodic simulated cash spray trigger (when on screen index 1)
  useEffect(() => {
    if (currentPhoneScreen === 1) {
      const spray = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 80 + 10,
        delay: Math.random() * 2
      }));
      setSprayedCash(spray);
    } else {
      setSprayedCash([]);
    }
  }, [currentPhoneScreen]);

  // Periodic reaction bubbles (when on screen index 6)
  useEffect(() => {
    if (currentPhoneScreen === 6) {
      const interval = setInterval(() => {
        const types = ["❤️", "🔥", "🎉", "😮", "🚀"];
        setReactions((prev) => [
          ...prev.slice(-15),
          {
            id: Date.now(),
            type: types[Math.floor(Math.random() * types.length)],
            left: Math.random() * 80 + 10
          }
        ]);
      }, 400);
      return () => clearInterval(interval);
    } else {
      setReactions([]);
    }
  }, [currentPhoneScreen]);

  const activeSlide = heroSlideshowItems[currentSlideIndex];

  return (
    <div className="relative min-h-[95vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Immersive Background Drone Slideshow */}
      <div className="absolute inset-0 z-0">
        {heroSlideshowItems.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              index === currentSlideIndex
                ? "opacity-40 scale-105 filter blur-[1px]"
                : "opacity-0 scale-100"
            }`}
            style={{
              backgroundImage: `url(${slide.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
        ))}

        {/* Ambient Moving Gradient Overlays to protect text contrast */}
        <div
          className={`absolute inset-0 z-10 transition-colors duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-b from-[#090909]/95 via-[#090909]/80 to-[#090909]"
              : "bg-gradient-to-b from-[#ffffff]/90 via-[#ffffff]/75 to-[#fafafa]"
          }`}
        />
        
        {/* Colorful accent blur balls */}
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-brand-blue/10 rounded-full filter blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] bg-brand-purple/10 rounded-full filter blur-[120px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Main Container Split Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-16 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left Side: Headlines + Highlights */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left max-w-2xl">
          

          <div className="space-y-4">
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[76px] font-medium leading-[0.95] tracking-tighter uppercase">
              MAKE THE<br/>WORLD YOUR<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                VENUE.
              </span>
            </h1>
            <p className={`font-sans text-lg max-w-md leading-relaxed ${theme === 'dark' ? 'text-white/55' : 'text-zinc-550'}`}>
              Extend every physical event to a global audience. Connect, engage, and monetize without boundaries.
            </p>
          </div>

          {/* Subheading Bullet Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="flex items-start space-x-2.5">
              <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center mt-1">
                <span className="text-brand-blue font-bold text-xs">✓</span>
              </div>
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white/40' : 'text-zinc-700'}`}>Extend every event globally.</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center mt-1">
                <span className="text-brand-blue font-bold text-xs">✓</span>
              </div>
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white/40' : 'text-zinc-700'}`}>No more missing outs</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center mt-1">
                <span className="text-brand-blue font-bold text-xs">✓</span>
              </div>
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white/40' : 'text-zinc-700'}`}>Generate multi-channel revenue.</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center mt-1">
                <span className="text-brand-blue font-bold text-xs">✓</span>
              </div>
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white/40' : 'text-zinc-700'}`}>No more low turnouts</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={onRequestDemo}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-brand-blue to-brand-purple rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-blue/20 cursor-pointer text-white"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <div className="text-left">
                <div className="text-[10px] opacity-70 uppercase leading-none tracking-widest font-mono">15-min call</div>
                <div className="text-base leading-tight font-display font-medium">Request Live Demo</div>
              </div>
            </button>
          </div>
        </div>

        {/* Right Side: Floating Premium iPhone Mockup with interactive screen modes */}
        <div className="lg:col-span-5 flex justify-center items-center relative mt-8 lg:mt-0">
          
          {/* External decorative grid layout glow */}
          <div className="absolute -inset-10 bg-gradient-to-tr from-brand-blue to-brand-purple opacity-25 filter blur-[60px] animate-pulse rounded-full" />
          
          {/* Main Floating iPhone Shell */}
          <div className={`relative w-[280px] h-[580px] sm:w-[310px] sm:h-[630px] rounded-[50px] border-8 p-3 transition-all duration-500 animate-float-slow ${
            theme === "dark"
              ? "bg-[#111] border-[#222] shadow-[0_0_100px_rgba(59,130,246,0.25)]"
              : "bg-white border-zinc-300 shadow-[0_0_100px_rgba(124,58,237,0.15)]"
          }`}>
            
            {/* Dynamic Island Camera Notch */}
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full" />
              <div className="w-1.5 h-1.5 bg-[#090b3a] rounded-full" />
            </div>

            {/* Custom Interactive Live Concert App view Container mimicking provided screenshot */}
            <div className="w-full h-full rounded-[40px] overflow-hidden relative bg-[#090909] select-none">
              
              {/* Full-bleed high fidelity concert/rave stream background */}
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600"
                alt="Artlife Rave Party Stream"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-85 z-0 pointer-events-none filter brightness-95 saturation-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/85 z-10 pointer-events-none" />

              {/* iOS Top Status Bar */}
              <div className="absolute top-3.5 left-0 right-0 z-30 flex items-center justify-between px-5 py-1 text-white font-sans pointer-events-none">
                <span className="text-[11px] font-semibold tracking-tight">4:00</span>
                <div className="flex items-center space-x-1.5">
                  {/* Cellular network indicator */}
                  <div className="flex items-end space-x-[1.5px] h-2 mb-0.5">
                    <span className="w-[2px] h-[3px] bg-white rounded-[0.5px]" />
                    <span className="w-[2px] h-[5px] bg-white rounded-[0.5px]" />
                    <span className="w-[2px] h-[7px] bg-white rounded-[0.5px]" />
                    <span className="w-[2px] h-[9px] bg-white rounded-[0.5px]" />
                  </div>
                  {/* Wifi indicator */}
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0-5a7 7 0 0 1 7-7 1 1 0 0 1 0 2 5 5 0 0 0-5 5 1 1 0 0 1-2 0zm0-5a12 12 0 0 1 12-12 1 1 0 0 1 0 2 10 10 0 0 0-10 10 1 1 0 0 1-2 0z" className="scale-75 translate-x-1.5 translate-y-1.5" />
                  </svg>
                  {/* Battery bubble containing 100 */}
                  <div className="flex items-center border border-white/35 rounded-md px-1 py-0.5 h-[15px] bg-[#10B981] text-white text-[8px] font-mono leading-none">
                    100
                  </div>
                </div>
              </div>

              {/* Header greeting & viewer stats */}
              <div className="absolute top-10 left-0 right-0 z-20 px-4 flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-white text-[16px] font-semibold tracking-tight font-sans leading-none drop-shadow">
                    Hey, Emily
                  </h3>
                </div>
                
                {/* Viewers tracker pills */}
                <div className="flex items-center space-x-1 bg-black/45 backdrop-blur-md rounded-full px-2 py-0.5 border border-white/10 shadow-lg text-white font-sans text-[9px] font-bold">
                  <Eye className="w-3 h-3 text-white" />
                  <span>1.7K</span>
                </div>
              </div>

              {/* Custom secondary navigation controls bar */}
              <div className="absolute top-[72px] left-0 right-0 z-20 px-4 flex items-center justify-between">
                {/* Rounded stage button */}
                <button className="w-9 h-9 rounded-xl bg-black/35 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/55 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg">
                  <Theater className="w-4.5 h-4.5 text-white" />
                </button>

                {/* Styled pills tab */}
                <div className="flex items-center bg-black/35 backdrop-blur-md rounded-full p-[3px] border border-white/10 shadow-lg">
                  <button
                    onClick={() => setActiveTab("Find Events")}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all duration-300 cursor-pointer ${
                      activeTab === "Find Events"
                        ? "bg-white text-black"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Find Events
                  </button>
                  <button
                    onClick={() => setActiveTab("Highlights")}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all duration-300 cursor-pointer ${
                      activeTab === "Highlights"
                        ? "bg-white text-black"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Highlights
                  </button>
                </div>
              </div>

              {/* Interactive Floating Sprayed Banknotes Container */}
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                {mockSprayedCash.map((bill) => (
                  <div
                    key={bill.id}
                    className="absolute w-7 h-11 bg-gradient-to-tr from-emerald-400 to-emerald-600 rounded-[2px] shadow-lg border border-emerald-300/30 flex flex-col items-center justify-between p-0.5 font-mono text-[7px] text-white font-bold select-none"
                    style={{
                      left: `${bill.left}%`,
                      bottom: "100px",
                      "--rot": `${bill.rotation}deg`,
                      "--shift": `${bill.rotation * 3}px`,
                      animation: `mockCashFly 2.2s ${bill.delay}s ease-out forwards`
                    } as React.CSSProperties}
                  >
                    <div>$</div>
                    <div className="text-[5px] tracking-widest scale-90">CASH</div>
                    <div className="self-end">$</div>
                  </div>
                ))}
              </div>

              {/* Interactive Floating Likes/Hearts Container */}
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                {mockHearts.map((heart) => (
                  <div
                    key={heart.id}
                    className="absolute text-rose-500 text-lg drop-shadow-md filter select-none pointer-events-none"
                    style={{
                      left: `${heart.left}%`,
                      bottom: "180px",
                      transform: `scale(${heart.scale})`,
                      "--hshift": `${heart.shift}px`,
                      animation: `mockHeartFly ${heart.speed}s ease-out forwards`
                    } as React.CSSProperties}
                  >
                    ❤️
                  </div>
                ))}
              </div>

              {/* Interactive Sidebar Panel (Right column overlay) */}
              <div className="absolute right-3.5 top-[150px] z-25 flex flex-col items-center space-y-3.5">
                
                {/* Heart React Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={triggerHeartReaction}
                    className="w-10 h-10 rounded-full bg-black/35 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all hover:border-rose-400/40 cursor-pointer shadow-lg group"
                  >
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500 group-hover:scale-110 transition-transform" />
                  </button>
                  <span className="text-[10px] font-extrabold text-white font-sans mt-0.5 drop-shadow leading-none">
                    {heartCount}
                  </span>
                </div>

                {/* Chat Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setChatCount(prev => prev + 1)}
                    className="w-10 h-10 rounded-full bg-black/35 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all hover:border-brand-blue/40 cursor-pointer shadow-lg group"
                  >
                    <MessageSquare className="w-4.5 h-4.5 text-white group-hover:text-brand-blue transition-colors" />
                  </button>
                  <span className="text-[10px] font-extrabold text-white font-sans mt-0.5 drop-shadow leading-none">
                    {chatCount}
                  </span>
                </div>

                {/* Sound/Speaker Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setPhoneAlert("Real-time Audio Connected!"); setTimeout(() => setPhoneAlert(null), 2000); }}
                  className="w-10 h-10 rounded-full bg-black/35 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all hover:border-brand-purple/40 cursor-pointer shadow-lg"
                >
                  <Volume2 className="w-4.5 h-4.5 text-white" />
                </button>

                {/* Bookmark Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setPhoneAlert("Event bookmarked!"); setTimeout(() => setPhoneAlert(null), 2000); }}
                  className="w-10 h-10 rounded-full bg-black/35 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg"
                >
                  <Bookmark className="w-4.5 h-4.5 text-white" />
                </button>

                {/* Share Button (paper plane) */}
                <button
                  onClick={handleShareClick}
                  className="w-10 h-10 rounded-full bg-black/35 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg group"
                >
                  <Send className="w-4 h-4 text-white transform -rotate-45 -translate-y-0.5 translate-x-0.5 group-hover:text-brand-blue transition-colors" />
                </button>
              </div>

              {/* Toast alert bubble inside phone */}
              {phoneAlert && (
                <div className="absolute top-[130px] left-1/2 transform -translate-x-1/2 z-40 bg-zinc-900 border border-white/10 backdrop-blur-md py-1.5 px-3.5 rounded-full text-[10px] font-bold text-white shadow-2xl animate-bounce">
                  ✨ {phoneAlert}
                </div>
              )}

              {/* Bottom Event Subtitles & Title Panel (mimicking screenshot labels) */}
              <div className="absolute bottom-20 left-4 right-4 z-20 text-left pointer-events-none">
                <p className="text-white text-[11px] font-medium leading-relaxed drop-shadow-md pr-8 font-sans">
                  Neon vibes, wild beats, unforgettable night! 🎨🔥
                </p>
                <h2 className="text-white text-xl font-bold tracking-tight drop-shadow-lg font-sans pt-0.5 leading-tight">
                  Artlife Rave Party
                </h2>

                <div className="flex items-center justify-between pt-1.5">
                  {/* Facepile overlay block */}
                  <div className="flex -space-x-1.5 items-center">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                      className="w-6 h-6 rounded-full border border-black/85 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100"
                      className="w-6 h-6 rounded-full border border-black/85 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
                      className="w-6 h-6 rounded-full border border-black/85 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="w-6 h-6 rounded-full bg-brand-purple border border-black/85 flex items-center justify-center text-[8px] font-extrabold text-white">
                      +10
                    </div>
                  </div>

                  {/* Account Name indicator on right side */}
                  <div className="flex items-center space-x-1.5 bg-black/45 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/10 shadow-lg text-white">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
                      className="w-4 h-4 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-white text-[9px] font-extrabold tracking-wide uppercase">Emily</span>
                  </div>
                </div>
              </div>

              {/* Curved Notch Bottom Safe Nav Bar deck */}
              <div className="absolute bottom-0 left-0 right-0 z-30 pt-6">

                {/* PURPLE CASH GUN OVERLAP TRIGGER */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40">
                  <button
                    onClick={triggerCashSpray}
                    className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-brand-purple flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(124,58,237,0.55)] border-2 border-white/20 hover:border-white/45 cursor-pointer group"
                    title="Click to Spray Digital Cash!"
                  >
                    {/* High fidelity Cash Gun Icon mimicking original */}
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      {/* Interactive bills floating above icon */}
                      <span className="absolute text-[8px] -top-0.5 -left-1 opacity-70 group-hover:scale-125 transition-transform">💵</span>
                      <span className="absolute text-[8px] -top-1 right-0 opacity-70 group-hover:scale-125 transition-transform">💵</span>
                      <svg className="w-5.5 h-5.5 text-white group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 14h10a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H7.5L6 9.5H5a1 1 0 0 0-1 1V13a1 1 0 0 0 1 1zm2 0v5a1 1 0 0 0 1 1h1.5a1 1 0 0 0 1-1v-5H7z" />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Navigation shelf */}
                <div className="relative w-full h-[62px] bg-[#0c0c0f]/90 backdrop-blur-lg border-t border-white/10 flex items-center justify-between px-6 pb-2 shadow-2xl">
                  {/* Home tab with indicator dot */}
                  <div className="flex flex-col items-center justify-center cursor-pointer text-white">
                    <Home className="w-5 h-5 text-white" />
                    <span className="text-[9px] font-bold mt-1 tracking-wider leading-none">Home</span>
                    <span className="w-1 h-1 bg-white rounded-full mt-0.5" />
                  </div>

                  {/* Events tab */}
                  <div className="flex flex-col items-center justify-center cursor-pointer text-zinc-400 hover:text-white transition-colors">
                    <div className="relative">
                      <Calendar className="w-5 h-5" />
                      <span className="absolute inset-0 flex items-center justify-center text-[7px] font-extrabold text-zinc-400 group-hover:text-white pt-1">17</span>
                    </div>
                    <span className="text-[9px] font-semibold mt-1 tracking-wider leading-none">Events</span>
                  </div>

                  {/* Notch layout spacer */}
                  <div className="w-12" />

                  {/* Inbox tab */}
                  <div className="flex flex-col items-center justify-center cursor-pointer text-zinc-400 hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-[9px] font-semibold mt-1 tracking-wider leading-none">Inbox</span>
                  </div>

                  {/* Profile tab */}
                  <div className="flex flex-col items-center justify-center cursor-pointer text-zinc-400 hover:text-white transition-colors">
                    <User className="w-5 h-5" />
                    <span className="text-[9px] font-semibold mt-1 tracking-wider leading-none">Profile</span>
                  </div>
                </div>

                {/* iPhone Home Swiper deck */}
                <div className="w-full bg-[#0c0c0f]/90 flex justify-center pb-1">
                  <div className="w-28 h-1 bg-white/40 rounded-full" />
                </div>
              </div>

              {/* Self-contained keyframes animations stylesheet */}
              <style>{`
                @keyframes mockCashFly {
                  0% {
                    transform: translateY(280px) rotate(0deg) scale(0.4) translateX(0);
                    opacity: 0;
                  }
                  10% {
                    opacity: 1;
                  }
                  90% {
                    opacity: 0.95;
                  }
                  100% {
                    transform: translateY(-410px) rotate(var(--rot)) scale(1.05) translateX(calc(var(--shift) * 1.5));
                    opacity: 0;
                  }
                }

                @keyframes mockHeartFly {
                  0% {
                    transform: translateY(0) scale(0.6) translateX(0);
                    opacity: 0;
                  }
                  15% {
                    opacity: 1;
                  }
                  100% {
                    transform: translateY(-260px) scale(1.4) translateX(calc(var(--hshift) * 1.4));
                    opacity: 0;
                  }
                }
              `}</style>
            </div>
          </div>

          {/* Phone highlight tag slider */}
          <div className="absolute -right-2 bottom-8 z-30 bg-[#090909]/80 backdrop-blur border border-white/5 rounded-2xl p-3 shadow-xl flex items-center space-x-2.5 max-w-[150px]">
            <div className="p-1.5 bg-brand-purple/20 rounded-lg text-brand-purple">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[8px] font-bold text-zinc-400 tracking-wider uppercase leading-none">BANDWIDTH</p>
              <p className="text-[10px] font-bold text-white mt-1 leading-none">0.2s Latency</p>
            </div>
          </div>

          <div className="absolute -left-4 top-16 z-30 bg-[#090909]/80 backdrop-blur border border-white/5 rounded-2xl p-3 shadow-xl flex items-center space-x-2.5 max-w-[160px]">
            <div className="p-1.5 bg-brand-blue/20 rounded-lg text-brand-blue">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[8px] font-bold text-zinc-400 tracking-wider uppercase leading-none">STAGE SCALE</p>
              <p className="text-[10px] font-bold text-white mt-1 leading-none">Unlimited Seats</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
