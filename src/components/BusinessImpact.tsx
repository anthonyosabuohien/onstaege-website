import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Coins, 
  Gift, 
  ShoppingBag, 
  Percent, 
  ChevronDown, 
  Check, 
  Info, 
  HelpCircle, 
  ArrowRight,
  Sparkle,
  Star,
  PartyPopper
} from "lucide-react";
import { motion } from "motion/react";
import { Theme } from "../types";

interface BusinessImpactProps {
  theme: Theme;
}

// Custom High-Fidelity Animated Counter
function AnimatedCounter({ 
  value, 
  prefix = "", 
  suffix = "", 
  decimalPlaces = 0 
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string; 
  decimalPlaces?: number 
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 750; // ms transition
    const startTime = performance.now();
    let animationFrameId: number;

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Beautiful ease-out quad curve
      const easeProgress = progress * (2 - progress);
      const current = start + (end - start) * easeProgress;
      
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  const formatted = displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return <span>{prefix}{formatted}{suffix}</span>;
}

export default function BusinessImpact({ theme }: BusinessImpactProps) {
  // --- STATE ---
  const [userRole, setUserRole] = useState("Event Organizer");
  const [eventType, setEventType] = useState("Wedding");
  
  // Audience Reach State
  const [audienceReachMode, setAudienceReachMode] = useState<"preset" | "custom">("preset");
  const [audienceReachPreset, setAudienceReachPreset] = useState<number>(100000);
  const [audienceReachCustom, setAudienceReachCustom] = useState<string>("100000");
  
  // Physical Attendance
  const [physicalAttendance, setPhysicalAttendance] = useState<number>(500);
  
  // Virtual Conversion
  const [conversionRate, setConversionRate] = useState<number>(10); // Standard default 10%
  
  // Currency Pricing & Revenue Inputs
  const [currency, setCurrency] = useState<"NGN" | "USD" | "GBP" | "EUR" | "OTHER">("NGN");
  const [customCurrencySymbol, setCustomCurrencySymbol] = useState("₦");
  
  const [physicalTicketPrice, setPhysicalTicketPrice] = useState<string>("5000");
  const [expectedCashSprays, setExpectedCashSprays] = useState<string>("2000000");
  const [expectedTips, setExpectedTips] = useState<string>("500000");
  const [expectedVendorSales, setExpectedVendorSales] = useState<string>("1500000");

  // Show Help Information Hover/Toggle Tooltips
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Easter Egg Celebration state
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");
  const [confetti, setConfetti] = useState<{ id: number; left: number; delay: number; color: string; scale: number }[]>([]);

  // Get active currency symbol helper
  const getCurrencySymbol = () => {
    switch (currency) {
      case "NGN": return "₦";
      case "USD": return "$";
      case "GBP": return "£";
      case "EUR": return "€";
      default: return customCurrencySymbol || "¤";
    }
  };

  const symbol = getCurrencySymbol();

  // Parse safety inputs helper
  const numInput = (val: string) => {
    const parsed = parseFloat(val.replace(/,/g, ""));
    return isNaN(parsed) ? 0 : parsed;
  };

  // Compute calculated audience reach
  const currentAudienceReach = audienceReachMode === "preset" ? audienceReachPreset : numInput(audienceReachCustom);

  // --- CALCULATION ENGINE ---
  // Virtual Attendees = Audience Reach * Conversion %
  const virtualAttendees = Math.round(currentAudienceReach * (conversionRate / 100));

  // Physical Tickets Revenue
  const pricePerPhysicalTicket = numInput(physicalTicketPrice);
  const cashSpraysPhysical = numInput(expectedCashSprays);
  const tipsPhysical = numInput(expectedTips);
  const vendorSalesPhysical = numInput(expectedVendorSales);

  const physicalTicketsRevenue = physicalAttendance * pricePerPhysicalTicket;
  
  // Physical Revenue = (Physical Attendance * Ticket Price) + Cash Sprays + Tips + Vendor Sales
  const totalPhysicalRevenue = physicalTicketsRevenue + cashSpraysPhysical + tipsPhysical + vendorSalesPhysical;

  // --- VIRTUAL EXPERIENCE ---
  // Virtual Ticket Price = 30% of Physical Ticket Price
  const virtualTicketPrice = pricePerPhysicalTicket * 0.3;
  const virtualTicketRevenue = virtualAttendees * virtualTicketPrice;

  // Averages per physical guest (safeguarded against divide by zero)
  const averageCashSpraysPerGuest = physicalAttendance > 0 ? (cashSpraysPhysical / physicalAttendance) : 0;
  const averageTipsPerGuest = physicalAttendance > 0 ? (tipsPhysical / physicalAttendance) : 0;
  const averageVendorSpendPerGuest = physicalAttendance > 0 ? (vendorSalesPhysical / physicalAttendance) : 0;

  // Virtual Cash Sprays = Virtual Attendees * 30% * Average Physical Cash Sprays per Gast
  const virtualCashSprays = virtualAttendees * 0.3 * averageCashSpraysPerGuest;

  // Virtual Tips = Virtual Attendees * 30% * Average Tips
  const virtualTips = virtualAttendees * 0.3 * averageTipsPerGuest;

  // Virtual Vendor Revenue = Virtual Attendees * 30% * Average Vendor Spend
  const virtualVendorRevenue = virtualAttendees * 0.3 * averageVendorSpendPerGuest;

  // Total Virtual Revenue
  const totalVirtualRevenue = virtualTicketRevenue + virtualCashSprays + virtualTips + virtualVendorRevenue;

  // Total Combined Revenue with Onstaege
  const totalOnstaegeRevenue = totalPhysicalRevenue + totalVirtualRevenue;

  // Additional Revenue
  const additionalRevenue = totalVirtualRevenue;

  // Percentage Increase
  const percentageIncrease = totalPhysicalRevenue > 0 
    ? Math.round((additionalRevenue / totalPhysicalRevenue) * 100) 
    : 100;

  const timesMultiple = totalPhysicalRevenue > 0
    ? (totalOnstaegeRevenue / totalPhysicalRevenue).toFixed(1)
    : "∞";

  // Match Easter Egg Condition (Exact match with prompts's wedding example)
  useEffect(() => {
    const isWeddingMatch = 
      eventType === "Wedding" &&
      currentAudienceReach === 100000 &&
      physicalAttendance === 500 &&
      conversionRate === 10 &&
      pricePerPhysicalTicket === 5000 &&
      cashSpraysPhysical === 2000000 &&
      tipsPhysical === 500000 &&
      vendorSalesPhysical === 1500000;

    if (isWeddingMatch) {
      triggerConfettiBurst("Your audience is bigger than your venue! 🎉 Perfect multiplier calculated successfully.");
    }
  }, [eventType, currentAudienceReach, physicalAttendance, conversionRate, physicalTicketPrice, expectedCashSprays, expectedTips, expectedVendorSales]);

  // Load Preset Case Example
  const loadDemoCase = () => {
    setUserRole("Event Organizer");
    setEventType("Wedding");
    setAudienceReachMode("preset");
    setAudienceReachPreset(100000);
    setPhysicalAttendance(500);
    setConversionRate(10);
    setCurrency("NGN");
    setPhysicalTicketPrice("5000");
    setExpectedCashSprays("2000000");
    setExpectedTips("500000");
    setExpectedVendorSales("1500000");
    
    triggerConfettiBurst("Your audience is bigger than your venue! 🚀 Loaded the default showcase mathematical preset.");
  };

  const triggerConfettiBurst = (message: string) => {
    setCelebrationMessage(message);
    setShowCelebration(true);
    
    const colors = ["#10B981", "#8B5CF6", "#3B82F6", "#EC4899", "#F59E0B", "#14B8A6"];
    const newConfetti = Array.from({ length: 45 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      scale: 0.5 + Math.random() * 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    setConfetti(newConfetti);

    // Fade out notification toast after 5s
    setTimeout(() => {
      setShowCelebration(false);
    }, 5500);
  };

  return (
    <section id="earnings" className="relative z-10 py-24 overflow-hidden bg-black text-white select-none">
      
      {/* Absolute high fidelity stage light leaks background rendering */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-900/15 via-blue-900/5 to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#7c3aed]/5 rounded-full filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full filter blur-[150px] pointer-events-none z-0" />

      {/* Embedded CSS Confetti Keyframes */}
      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-50px) rotate(0deg) scale(var(--s));
            opacity: 1;
          }
          100% {
            transform: translateY(900px) rotate(360deg) scale(0.6);
            opacity: 0;
          }
        }
        .confetti-element {
          animation: confettiFall 3.8s ease-in-out forwards;
        }
      `}</style>



      {/* Confetti Elements render */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute w-2.5 h-2.5 confetti-element"
            style={{
              left: `${c.left}%`,
              top: `-10px`,
              backgroundColor: c.color,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              animationDelay: `${c.delay}s`,
              "--s": c.scale,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          
          
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white">
            Calculate How Much More <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Your Event Can Earn</span> With Onstaege
          </h2>
          
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto font-sans">
            Stop guessing. See in real time how extending your event beyond its physical venue can increase audience reach, engagement, and revenue.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={loadDemoCase}
              className="group relative inline-flex items-center space-x-2 bg-zinc-900 border border-zinc-800 hover:border-brand-purple/50 px-4.5 py-2.5 rounded-full text-xs font-bold text-white transition-all shadow-lg hover:shadow-purple-500/10 cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple"></span>
              </span>
              <span>Load Wedding Example Demo</span>
            </button>
          </div>
        </div>

        {/* Master Calculator Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ==================== LEFT COLUMN: INPUTS ==================== */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-[#0b0c10]/95 border border-zinc-800/80 rounded-[24px] p-6 sm:p-8 space-y-6 shadow-2xl relative">
              <div className="absolute top-4 right-4 flex items-center space-x-1 bg-zinc-900/60 border border-zinc-800/40 rounded-full px-2 py-1 text-[9px] text-zinc-500 font-mono tracking-wider uppercase font-semibold">
                <span>Configure Input deck</span>
              </div>

              {/* Row 1: Who are you & Event type dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Step 1: Who are you */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                    <span>STEP 1: Who Are You?</span>
                    <HelpCircle 
                      className="w-3.5 h-3.5 text-zinc-600 cursor-pointer hover:text-zinc-400 transition-colors"
                      onClick={() => setActiveTooltip(activeTooltip === "role" ? null : "role")}
                    />
                  </label>
                  {activeTooltip === "role" && (
                    <div className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-lg text-[11px] text-zinc-400 mb-2">
                      Your business classification determines potential engagement ratios.
                    </div>
                  )}
                  <div className="relative">
                    <select
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      className="w-full bg-[#14151a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 appearance-none focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 cursor-pointer font-medium"
                    >
                      <option value="Individual">Individual</option>
                      <option value="Event Organizer">Event Organizer</option>
                      <option value="Celebrity / Influencer">Celebrity / Influencer</option>
                      <option value="Nightclub / Lounge / Bar / Pub">Nightclub / Lounge / Bar / Pub</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>

                {/* Step 2: Event Type */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                    <span>STEP 2: Event Type</span>
                  </label>
                  <div className="relative">
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-[#14151a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 appearance-none focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 cursor-pointer font-medium"
                    >
                      <option value="Wedding">Wedding</option>
                      <option value="Birthday">Birthday</option>
                      <option value="House Party">House Party</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Concert">Concert</option>
                      <option value="Burial">Burial</option>
                      <option value="Festival">Festival</option>
                      <option value="Trade Fair">Trade Fair</option>
                      <option value="Entertainment Venue Party">Entertainment Venue Party</option>
                      <option value="Album Launch">Album Launch</option>
                      <option value="Fundraising">Fundraising</option>
                      <option value="Others">Others</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Step 3: Audience Reach */}
              <div className="pt-2 border-t border-zinc-900">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                  <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                      STEP 3: Audience Reach
                    </h3>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Friends, Family, Followers & Fans (Total Audience)</p>
                  </div>
                  
                  {/* Selector Toggle input mode */}
                  <div className="flex bg-[#14151a] p-[3px] border border-zinc-800 rounded-lg max-w-fit self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setAudienceReachMode("preset")}
                      className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-md cursor-pointer transition-all ${
                        audienceReachMode === "preset" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      Preset
                    </button>
                    <button
                      type="button"
                      onClick={() => setAudienceReachMode("custom")}
                      className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-md cursor-pointer transition-all ${
                        audienceReachMode === "custom" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      Custom
                    </button>
                  </div>
                </div>

                {audienceReachMode === "preset" ? (
                  <div className="relative">
                    <select
                      value={audienceReachPreset}
                      onChange={(e) => setAudienceReachPreset(parseInt(e.target.value))}
                      className="w-full bg-[#14151a] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 appearance-none focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 cursor-pointer font-medium font-mono"
                    >
                      <option value="50">50 contacts</option>
                      <option value="100">100 people</option>
                      <option value="500">500 social circle</option>
                      <option value="1000">1,000 baseline network</option>
                      <option value="5000">5,000 localized circle</option>
                      <option value="10000">10,000 active fans</option>
                      <option value="25000">25,000 engaged network</option>
                      <option value="50000">50,050 medium following</option>
                      <option value="100000">100,000 large fanbase</option>
                      <option value="250000">250,000 regional celebrity</option>
                      <option value="500000">500,000 country following</option>
                      <option value="1000000">1,000,000 global megastar</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xs text-zinc-500 font-bold uppercase tracking-wider">
                      Count:
                    </div>
                    <input
                      type="text"
                      value={audienceReachCustom}
                      onChange={(e) => {
                        // strip anything not digit
                        const clean = e.target.value.replace(/\D/g, "");
                        setAudienceReachCustom(clean);
                      }}
                      className="w-full bg-[#14151a] border border-zinc-800/80 rounded-xl pl-16 pr-4 py-3 text-sm text-zinc-200 font-mono focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      placeholder="e.g. 150000"
                    />
                  </div>
                )}
              </div>

              {/* Step 4: Expected Physical Attendance Slider */}
              <div className="pt-2 border-t border-zinc-900 space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                      STEP 4: Expected Physical Attendance
                    </h3>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Physical venue safe guest limit</p>
                  </div>
                  <span className="text-xl sm:text-2xl font-mono font-black text-brand-purple leading-none drop-shadow">
                    {physicalAttendance.toLocaleString()}
                  </span>
                </div>
                
                <input
                  type="range"
                  min="50"
                  max="50000"
                  step="50"
                  value={physicalAttendance}
                  onChange={(e) => setPhysicalAttendance(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                />
                
                <div className="flex justify-between text-[8px] font-mono text-zinc-600">
                  <span>MIN: 50</span>
                  <span>MAX: 50,000</span>
                </div>
              </div>

              {/* Step 5: Virtual Audience Conversion Slider */}
              <div className="pt-2 border-t border-zinc-900 space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                      STEP 5: Virtual Conversion
                    </h3>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Convert passive audience to virtual stream guests</p>
                  </div>
                  <span className="text-xl sm:text-2xl font-mono font-black text-emerald-400 leading-none">
                    {conversionRate}%
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />

                <div className="flex justify-between text-[8px] font-mono text-zinc-600">
                  <span>1% RATE</span>
                  <span>100% EXTREME CAP</span>
                </div>

                {/* Animated Virtual calculation details display box */}
                <div className="bg-[#14151a] border border-emerald-500/10 p-4 rounded-xl flex items-center justify-between text-xs font-medium">
                  <div className="text-left space-y-1 text-zinc-300">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Virtual Attendees Formula</p>
                    <p className="text-zinc-200">
                      <span className="text-zinc-400 font-mono font-bold">{currentAudienceReach.toLocaleString()}</span> (Audience) 
                      {" "}&times;{" "} 
                      <span className="text-emerald-400 font-mono font-bold">{conversionRate}%</span> (Conversion)
                    </p>
                  </div>
                  <div className="text-right shrink-0 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-lg">
                    <p className="text-[8px] text-emerald-400 font-mono text-right uppercase tracking-wider font-extrabold leading-none">VIRTUAL GUESTS</p>
                    <p className="text-base font-bold text-emerald-400 font-mono leading-none mt-1">
                      {virtualAttendees.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 6: Income & Currency parameters */}
              <div className="pt-4 border-t border-zinc-900 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                      STEP 6: Revenue inputs
                    </h3>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Baseline physical pricing model</p>
                  </div>
                  
                  {/* Currency Buttons row */}
                  <div className="flex flex-wrap bg-[#14151a] p-[3px] border border-zinc-800 rounded-lg gap-0.5 self-start sm:self-auto">
                    {["NGN", "USD", "GBP", "EUR", "OTHER"].map((curr) => {
                      const labels: Record<string, string> = {
                        NGN: "₦ NGN",
                        USD: "$ USD",
                        GBP: "£ GBP",
                        EUR: "€ EUR",
                        OTHER: "Other"
                      };
                      return (
                        <button
                          key={curr}
                          type="button"
                          onClick={() => setCurrency(curr as any)}
                          className={`px-2 py-1 text-[9px] uppercase font-bold tracking-wider rounded cursor-pointer transition-all ${
                            currency === curr 
                              ? "bg-brand-purple text-white shadow"
                              : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          {labels[curr]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Custom symbol input if OTHER selected */}
                {currency === "OTHER" && (
                  <div className="bg-[#14151a] border border-zinc-800 p-3 rounded-lg flex items-center space-x-2.5">
                    <span className="text-xs text-zinc-400 font-bold uppercase shrink-0">Custom Symbol:</span>
                    <input 
                      type="text" 
                      value={customCurrencySymbol}
                      onChange={(e) => setCustomCurrencySymbol(e.target.value)}
                      placeholder="e.g. ₵"
                      className="bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 text-xs text-white max-w-[80px]"
                    />
                  </div>
                )}

                {/* Numeric revenue input group grids */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  
                  {/* Physical Ticket Price */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                      <span>PHS Ticket Price</span>
                      <span className="text-[9px] text-[#A78BFA] font-bold">Min: 0</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-sm text-zinc-500 font-mono font-bold">
                        {symbol}
                      </span>
                      <input
                        type="text"
                        value={physicalTicketPrice}
                        onChange={(e) => setPhysicalTicketPrice(e.target.value.replace(/\D/g, ""))}
                        className="w-full bg-[#14151a] border border-zinc-800 rounded-xl pl-8 pr-3 py-2.5 text-xs text-zinc-200 font-mono"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Expected Cash Sprays */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                      Expected Cash Sprays / Gifts
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-sm text-zinc-500 font-mono font-bold">
                        {symbol}
                      </span>
                      <input
                        type="text"
                        value={expectedCashSprays}
                        onChange={(e) => setExpectedCashSprays(e.target.value.replace(/\D/g, ""))}
                        className="w-full bg-[#14151a] border border-zinc-800 rounded-xl pl-8 pr-3 py-2.5 text-xs text-zinc-200 font-mono"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  {/* Expected Tips */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                      Expected Live Tips
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-sm text-zinc-500 font-mono font-bold">
                        {symbol}
                      </span>
                      <input
                        type="text"
                        value={expectedTips}
                        onChange={(e) => setExpectedTips(e.target.value.replace(/\D/g, ""))}
                        className="w-full bg-[#14151a] border border-zinc-800 rounded-xl pl-8 pr-3 py-2.5 text-xs text-zinc-200 font-mono"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  {/* Vendor spending Sales */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                      <span>Vendor spend (Foods/Drinks)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-sm text-zinc-500 font-mono font-bold">
                        {symbol}
                      </span>
                      <input
                        type="text"
                        value={expectedVendorSales}
                        onChange={(e) => setExpectedVendorSales(e.target.value.replace(/\D/g, ""))}
                        className="w-full bg-[#14151a] border border-zinc-800 rounded-xl pl-8 pr-3 py-2.5 text-xs text-zinc-200 font-mono"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* ==================== RIGHT COLUMN: OUTPUTS ==================== */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Card 1: WITHOUT ONSTAEGE (BLUE STYLING) */}
              <div className="bg-[#0b0c10]/95 border border-zinc-850 rounded-[24px] p-6 text-left shadow-xl hover:border-zinc-700 transition duration-300 relative group overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-sky-500/50" />
                
                <p className="text-[10px] font-extrabold text-sky-400 uppercase tracking-widest mb-1">
                  WITHOUT ONSTAEGE
                </p>
                <p className="text-[9px] text-zinc-500 leading-none mb-3">Limited to venue four walls</p>

                {/* Total Counter display */}
                <h4 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white flex items-baseline space-x-0.5 leading-none mt-1">
                  <AnimatedCounter value={totalPhysicalRevenue} prefix={symbol} />
                </h4>
                <p className="text-[9px] text-zinc-400 mt-1 font-mono uppercase">CAPPED PHYSICAL REVENUE</p>

                {/* Physical Breakdown details list */}
                <div className="mt-5 space-y-2.5 text-xs border-t border-zinc-900 pt-4">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
                      <span>Ticket Sales</span>
                    </span>
                    <span className="font-mono text-zinc-300 font-bold">
                      {symbol}{physicalTicketsRevenue.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-400">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                      <span>Cash Sprays</span>
                    </span>
                    <span className="font-mono text-zinc-300 font-bold">
                      {symbol}{cashSpraysPhysical.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-400">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                      <span>Tips / Gifts</span>
                    </span>
                    <span className="font-mono text-zinc-300 font-bold">
                      {symbol}{tipsPhysical.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-400">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                      <span>Vendor Sales</span>
                    </span>
                    <span className="font-mono text-zinc-200 font-bold">
                      {symbol}{vendorSalesPhysical.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Bottom capped attendance warnings banner */}
                <div className="mt-6 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-900 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 font-medium font-sans">MAX STAGE ATTENDANCE:</span>
                  <span className="text-[10px] font-bold text-sky-400 font-mono">{physicalAttendance} GUESTS</span>
                </div>
              </div>

              {/* Card 2: WITH ONSTAEGE (MAGICAL PURPLE GRAPHIC GLOW) */}
              <div className="bg-[#0b0c10]/95 border-2 border-brand-purple/25 rounded-[24px] p-6 text-left shadow-2xl hover:border-brand-purple/45 transition duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-purple" />
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-brand-purple/10 rounded-full filter blur-xl group-hover:bg-brand-purple/15 transition-all" />

                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-extrabold text-brand-purple uppercase tracking-widest leading-none">
                    WITH ONSTAEGE
                  </p>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-full animate-pulse">
                    UNLEASHED
                  </span>
                </div>
                <p className="text-[9px] text-zinc-400 font-sans leading-none mb-3">Infinite digital venue reach</p>

                {/* Expanded Revenue total */}
                <h4 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white flex items-baseline space-x-0.5 leading-none mt-1">
                  <AnimatedCounter value={totalOnstaegeRevenue} prefix={symbol} />
                </h4>
                <p className="text-[9px] text-[#A78BFA] font-mono uppercase font-bold tracking-widest">MAGNIFIED REVENUE REACH</p>

                {/* With Onstaege Detailed list */}
                <div className="mt-5 space-y-2.5 text-xs border-t border-zinc-900 pt-4">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span className="text-zinc-500">Physical Base Rev:</span>
                    <span className="font-mono text-zinc-300">
                      {symbol}{totalPhysicalRevenue.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-400">
                    <span className="font-semibold text-[#C084FC] flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-[#C084FC] rounded-full" />
                      <span>Virtual Tickets (30%)</span>
                    </span>
                    <span className="font-mono text-white font-bold">
                      {symbol}{virtualTicketRevenue.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-400">
                    <span className="font-semibold text-[#818CF8] flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-[#818CF8] rounded-full" />
                      <span>Virtual Sprays</span>
                    </span>
                    <span className="font-mono text-white font-bold">
                      {symbol}{virtualCashSprays.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-400">
                    <span className="font-semibold text-zinc-400 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-[#E9D5FF] rounded-full" />
                      <span>Virtual Tips</span>
                    </span>
                    <span className="font-mono text-white font-bold">
                      {symbol}{virtualTips.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-400">
                    <span className="font-semibold text-zinc-400 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-purple-300 rounded-full" />
                      <span>Virtual Vendor Fees</span>
                    </span>
                    <span className="font-mono text-zinc-100 font-bold">
                      {symbol}{virtualVendorRevenue.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 bg-[#16122d]/60 p-2.5 rounded-xl border border-purple-500/10 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-400 font-medium">TOTAL DIGITAL GUESTS:</span>
                  <span className="text-[10px] font-black text-brand-purple font-mono">{(physicalAttendance + virtualAttendees).toLocaleString()} REACH</span>
                </div>
              </div>

            </div>

            {/* Glowing additional earnings banner dashboard (IMPACT CARD) */}
            <div className="bg-[#0b0c10]/95 border-2 border-emerald-500/25 rounded-[24px] p-6 text-left shadow-2xl relative overflow-hidden group">
              
              {/* Green gradient glow in corner styling */}
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-emerald-500/5 rounded-full filter blur-2xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">
                    ADDITIONAL REVENUE
                  </p>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white mt-1.5 flex items-baseline">
                    <span className="text-emerald-400 mr-1">+</span>
                    <AnimatedCounter value={additionalRevenue} prefix={symbol} />
                  </h3>
                </div>
                
                {/* Metric multiplier bubble badge based on results */}
                <div className="bg-emerald-500/10 border border-emerald-500/35 px-3 py-1.5 rounded-2xl text-center shrink-0">
                  <p className="text-[9px] text-zinc-400 uppercase font-mono tracking-wider">MULTIPLIER</p>
                  <p className="text-xl font-mono text-emerald-400 font-black tracking-tight mt-0.5 leading-none">
                    {timesMultiple}x
                  </p>
                </div>
              </div>

              {/* Incremental percentage markup metrics */}
              <div className="mt-4 pt-4 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <p className="text-zinc-300 font-sans leading-relaxed">
                  With Onstaege, You Could Earn <span className="text-emerald-400 font-black font-mono">+{percentageIncrease}%</span> More over standard venue gate sales.
                </p>
                
                <span className="shrink-0 text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  ⚡ ROI MAXIMIZATION
                </span>
              </div>
            </div>

            {/* IMPACT INSIGHT CONTEXT BLOCK (AUTO GENERATED SUMMARY) */}
            <div className="bg-[#14151a] border border-zinc-800 rounded-2xl p-5 text-left text-xs text-zinc-300 space-y-2.5 relative">
              <span className="absolute right-3.5 top-3.5 text-[9px] text-zinc-500 font-mono flex items-center space-x-1 select-none">
                <Info className="w-3 h-3 text-zinc-500" />
                <span>AI Projection Model</span>
              </span>
              
              <h5 className="font-extrabold text-[10px] text-zinc-400 uppercase tracking-widest">
                Growth projection insights
              </h5>
              
              <p className="leading-relaxed text-zinc-300 font-sans">
                With a follower/fans base of <span className="font-bold text-white font-mono">{currentAudienceReach.toLocaleString()}</span> and a conservative <span className="font-bold text-emerald-400 font-mono">{conversionRate}%</span> virtual attendance rate, your event could attract an additional <span className="font-bold text-white font-mono">{virtualAttendees.toLocaleString()}</span> attendees without increasing the physical venue capacity.
              </p>
              
              <p className="leading-relaxed text-zinc-400 font-medium">
                Those virtual stream attendees are projected to generate <span className="font-semibold text-white font-mono">{symbol}{totalVirtualRevenue.toLocaleString()}</span> in additional ticket sales, digital cash spraying showers, and vendor sales.
              </p>
            </div>

            {/* VISUALIZATION CHART: DUAL BENT BAR GRAPH */}
            <div className="bg-[#0b0c10]/95 border border-zinc-850 rounded-[24px] p-6 text-left shadow-xl space-y-4">
              <h5 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest font-mono">
                Visual Attendance & Revenue Climb Comparison
              </h5>

              <div className="space-y-4 pt-1">
                {/* Physical bar item details */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400 font-sans flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 bg-sky-500 rounded-sm inline-block" />
                      <span>Physical Limit Attendance</span>
                    </span>
                    <span className="font-mono text-zinc-200 font-extrabold">
                      {physicalAttendance.toLocaleString()} guests
                    </span>
                  </div>
                  <div className="w-full h-4 bg-zinc-950 rounded-full overflow-hidden p-[2px]">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-sky-600 to-sky-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.3)]" 
                      initial={{ width: "3%" }}
                      animate={{ 
                        // Compute ratio comparing physical to grand total, let's keep it visible at least 8%
                        width: `${Math.max(8, Math.min(100, (physicalAttendance / (physicalAttendance + virtualAttendees)) * 100))}%`
                      }}
                      transition={{ type: "spring", stiffness: 60 }}
                    />
                  </div>
                </div>

                {/* Combined Onstaege virtual layout progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400 font-sans flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 bg-[#8B5CF6] rounded-sm inline-block" />
                      <span>Onstaege Combined Attendance (Physical + Virtual)</span>
                    </span>
                    <span className="font-mono text-brand-purple font-extrabold">
                      {(physicalAttendance + virtualAttendees).toLocaleString()} global reach
                    </span>
                  </div>
                  <div className="w-full h-4 bg-zinc-950 rounded-full overflow-hidden p-[2px]">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-brand-purple to-pink-500 rounded-full shadow-[0_0_12px_rgba(124,58,237,0.55)]" 
                      initial={{ width: "12%" }}
                      animate={{ width: "100%" }} // Combined is the absolute standard maximum bar size scale
                      transition={{ type: "spring", stiffness: 60 }}
                    />
                  </div>
                </div>
              </div>

              {/* Elegant Revenue Line Gradient path SVG display */}
              <div className="bg-zinc-950 rounded-xl p-3.5 border border-zinc-900 relative h-28 overflow-hidden flex flex-col justify-between">
                <div className="absolute top-2.5 left-3 text-[8px] text-zinc-500 font-mono uppercase font-bold tracking-widest flex items-center space-x-1 select-none">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span>Revenue trajectory curve</span>
                </div>

                <div className="absolute right-3.5 top-2 text-[10px] text-emerald-400 font-mono font-bold uppercase select-none flex items-center space-x-1">
                  <span>Hypergrowth curve climb</span>
                </div>

                {/* SVG Curve chart displaying extreme rise from physical base up to digital virtual stream ceiling */}
                <svg className="w-full h-16 absolute bottom-0 left-0 z-0 pointer-events-none" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chart-rev-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Dotted threshold line for limited physical cap */}
                  <line x1="0" y1="22" x2="100" y2="22" stroke="#4b5563" strokeWidth="0.5" strokeDasharray="2" />
                  
                  {/* Curved revenue line rising up to ceiling */}
                  <path d="M 0,22 Q 35,21 60,11 T 100,2" fill="none" stroke="url(#nav-spotlight-beam-left)" strokeWidth="1.5" />
                  <path d="M 0,22 Q 35,21 60,11 T 100,2 L 100,30 L 0,30 Z" fill="url(#chart-rev-area)" />
                </svg>

                <div className="flex justify-between items-end relative z-10 w-full pt-1">
                  <div className="text-left font-sans text-[9px] text-zinc-500 font-semibold leading-none self-end pb-1 pl-1">
                    Base: {symbol}{totalPhysicalRevenue.toLocaleString()}
                  </div>
                  <div className="text-right font-mono text-xs text-emerald-400 font-black bg-zinc-900 border border-emerald-500/20 px-2 py-1 rounded-md mb-1 mr-1">
                    Max: {symbol}{totalOnstaegeRevenue.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ==================== BOTTOM: CALL TO ACTION SECTION ==================== */}
        <div className="mt-20 max-w-4xl mx-auto text-center border border-zinc-805/45 dark:border-white/5 rounded-[24px] p-8 sm:p-12 bg-gradient-to-b from-[#0c0c0f] to-zinc-950 relative overflow-hidden shadow-2xl">
          <div className="absolute top-[20%] left-[20%] w-48 h-48 bg-brand-purple/10 rounded-full filter blur-[50px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[10%] w-60 h-60 bg-indigo-500/10 rounded-full filter blur-[70px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Make the World Your Event Venue?
            </h3>
            
            <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto font-sans leading-relaxed">
              Don't limit your ticket sales, virtual cash sprays, and brand sponsorships to a single brick-and-mortar room. Broadcast with Onstaege.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
              <a
                href="#contact"
                className="w-full sm:w-auto text-center bg-zinc-900 border border-zinc-800 hover:border-zinc-700 font-semibold text-zinc-200 text-xs sm:text-sm px-8 py-3.5 rounded-full cursor-pointer transition shadow-md active:scale-95 duration-200"
              >
                Request Custom Demo
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
