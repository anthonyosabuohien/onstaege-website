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
import { motion, AnimatePresence } from "motion/react";
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

  return <span className="whitespace-nowrap inline-block">{prefix}{formatted}{suffix}</span>;
}

export default function BusinessImpact({ theme }: BusinessImpactProps) {
  // --- STATE ---
  const [userRole, setUserRole] = useState("Event Organizer");
  const [eventType, setEventType] = useState("Wedding");
  
  // UI modes
  const [calculatorMode, setCalculatorMode] = useState<"simple" | "advanced">("simple");

  // Virtual Audience Spending States
  const [avgVirtualCashSpray, setAvgVirtualCashSpray] = useState<string>("");
  const [avgVirtualTip, setAvgVirtualTip] = useState<string>("");
  const [avgVirtualVendorSpend, setAvgVirtualVendorSpend] = useState<string>("");
  const [avgVirtualGift, setAvgVirtualGift] = useState<string>("");
  
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

  const getBigFigureTextClass = (val: number, isCard3 = false) => {
    const len = (symbol + Math.round(val).toLocaleString()).length + (isCard3 ? 1 : 0);
    if (len > 14) return isCard3 ? "text-sm sm:text-base" : "text-sm sm:text-base";
    if (len > 11) return isCard3 ? "text-lg sm:text-xl" : "text-base sm:text-lg";
    if (len > 8) return isCard3 ? "text-xl sm:text-2xl" : "text-lg sm:text-xl";
    return isCard3 ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl";
  };

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
  const cashSpraysPhysical = calculatorMode === "advanced" ? numInput(expectedCashSprays) : 0;
  const tipsPhysical = calculatorMode === "advanced" ? numInput(expectedTips) : 0;
  const vendorSalesPhysical = calculatorMode === "advanced" ? numInput(expectedVendorSales) : 0;

  const physicalTicketsRevenue = physicalAttendance * pricePerPhysicalTicket;
  
  // Physical Revenue = (Physical Attendance * Ticket Price) + Cash Sprays + Tips + Vendor Sales
  const totalPhysicalRevenue = physicalTicketsRevenue + cashSpraysPhysical + tipsPhysical + vendorSalesPhysical;

  // --- VIRTUAL EXPERIENCE ---
  // Virtual Ticket Price = 30% of Physical Ticket Price
  const virtualTicketPrice = pricePerPhysicalTicket * 0.3;
  const virtualTicketRevenue = virtualAttendees * virtualTicketPrice;

  // Estimation math for virtual metrics
  const estimatedVirtualCashSpray = physicalAttendance > 0 ? (cashSpraysPhysical / physicalAttendance) * 0.3 : 0;
  const estimatedVirtualTip = physicalAttendance > 0 ? (tipsPhysical / physicalAttendance) * 0.3 : 0;
  const estimatedVirtualVendorSpend = physicalAttendance > 0 ? (vendorSalesPhysical / physicalAttendance) * 0.3 : 0;

  // Check if estimate active
  const isEstimatedSpray = calculatorMode === "advanced" && avgVirtualCashSpray === "" && cashSpraysPhysical > 0 && physicalAttendance > 0;
  const isEstimatedTip = calculatorMode === "advanced" && avgVirtualTip === "" && tipsPhysical > 0 && physicalAttendance > 0;
  const isEstimatedVendor = calculatorMode === "advanced" && avgVirtualVendorSpend === "" && vendorSalesPhysical > 0 && physicalAttendance > 0;

  // Actual average values used in calculation
  const actualVirtualCashSpray = calculatorMode === "advanced"
    ? (avgVirtualCashSpray === "" ? estimatedVirtualCashSpray : numInput(avgVirtualCashSpray))
    : numInput(avgVirtualGift);

  const actualVirtualTip = calculatorMode === "advanced"
    ? (avgVirtualTip === "" ? estimatedVirtualTip : numInput(avgVirtualTip))
    : 0;

  const actualVirtualVendorSpend = calculatorMode === "advanced"
    ? (avgVirtualVendorSpend === "" ? estimatedVirtualVendorSpend : numInput(avgVirtualVendorSpend))
    : 0;

  // Virtual revenue outcomes
  const virtualCashSprays = virtualAttendees * actualVirtualCashSpray;
  const virtualTips = virtualAttendees * actualVirtualTip;
  const virtualVendorRevenue = virtualAttendees * actualVirtualVendorSpend;

  // Empty state checker - checks if optional virtual spends are zero
  const isEmptyState = virtualCashSprays === 0 && virtualTips === 0 && virtualVendorRevenue === 0;

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
  }, [eventType, currentAudienceReach, physicalAttendance, conversionRate, physicalTicketPrice, expectedCashSprays, expectedTips, expectedVendorSales, calculatorMode]);

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
    
    // Clear custom virtual inputs for showroom AI Estimates
    setAvgVirtualCashSpray("");
    setAvgVirtualTip("");
    setAvgVirtualVendorSpend("");
    setAvgVirtualGift("");
    setCalculatorMode("advanced");
    
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

  const getPlaceholders = () => {
    switch (currency) {
      case "USD": return { spray: "2", tip: "1", vendor: "5", gift: "3" };
      case "GBP": return { spray: "2", tip: "1", vendor: "5", gift: "3" };
      case "EUR": return { spray: "2", tip: "1", vendor: "5", gift: "3" };
      case "NGN": return { spray: "500", tip: "200", vendor: "1000", gift: "700" };
      default: return { spray: "500", tip: "200", vendor: "1000", gift: "700" };
    }
  };
  const pMax = getPlaceholders();

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

        {/* Toggle Mode Selection Segmented Control */}
        <div className="flex justify-center mb-10 bg-[#14151a]/80 border border-zinc-800 p-1.5 rounded-2xl max-w-[320px] mx-auto shadow-xl">
          <button
            type="button"
            onClick={() => setCalculatorMode("simple")}
            className={`flex-1 py-2.5 text-[11px] font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer ${
              calculatorMode === "simple"
                ? "bg-brand-purple text-white shadow-lg shadow-purple-500/25"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Simple Mode
          </button>
          <button
            type="button"
            onClick={() => setCalculatorMode("advanced")}
            className={`flex-1 py-2.5 text-[11px] font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer ${
              calculatorMode === "advanced"
                ? "bg-brand-purple text-white shadow-lg shadow-purple-500/25"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Advanced Mode
          </button>
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
                      <option value="Wedding Host">Wedding Host</option>
                      <option value="Birthday Host">Birthday Host</option>
                      <option value="Celebrity">Celebrity</option>
                      <option value="Influencer">Influencer</option>
                      <option value="Event Organizer">Event Organizer</option>
                      <option value="Festival Organizer">Festival Organizer</option>
                      <option value="Nightclub">Nightclub</option>
                      <option value="Lounge">Lounge</option>
                      <option value="Bar">Bar</option>
                      <option value="Pub">Pub</option>
                      <option value="Sports Organization">Sports Organization</option>
                      <option value="Fundraiser">Fundraiser</option>
                      <option value="Creator">Creator</option>
                      <option value="Corporate Event">Corporate Event</option>
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
                  min="0"
                  max="50000"
                  step="50"
                  value={physicalAttendance}
                  onChange={(e) => setPhysicalAttendance(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                />
                
                <div className="flex justify-between text-[8px] font-mono text-zinc-600">
                  <span>MIN: 0</span>
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
                  <div className={calculatorMode === "simple" ? "sm:col-span-2" : ""}>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <span>Physical Ticket Price</span>
                        <HelpCircle 
                          className="w-3.5 h-3.5 text-zinc-600 cursor-pointer hover:text-zinc-405 transition-colors"
                          onClick={() => setActiveTooltip(activeTooltip === "phsTicket" ? null : "phsTicket")}
                        />
                      </span>
                      <span className="text-[9px] text-[#A78BFA] font-bold">Min: 0</span>
                    </label>
                    {activeTooltip === "phsTicket" && (
                      <div className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-lg text-[11px] text-zinc-400 mb-2">
                        The price per physical entry ticket to your event. Virtual entry ticket price is automatically set to 30% of this value.
                      </div>
                    )}
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-sm text-zinc-500 font-mono font-bold">
                        {symbol}
                      </span>
                      <input
                        type="text"
                        value={physicalTicketPrice}
                        onChange={(e) => setPhysicalTicketPrice(e.target.value.replace(/\D/g, ""))}
                        className="w-full bg-[#14151a] border border-[#1e2028] focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl pl-8 pr-3 py-2.5 text-xs text-zinc-200 font-mono"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {calculatorMode === "advanced" && (
                      <>
                        {/* Expected Cash Sprays */}
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-1.5"
                        >
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <span>Expected Cash Sprays / Gifts</span>
                              <HelpCircle 
                                className="w-3.5 h-3.5 text-zinc-600 cursor-pointer hover:text-zinc-405 transition-colors"
                                onClick={() => setActiveTooltip(activeTooltip === "phsGifts" ? null : "phsGifts")}
                              />
                            </span>
                          </label>
                          {activeTooltip === "phsGifts" && (
                            <div className="bg-zinc-900 border border-zinc-805 p-2.5 rounded-lg text-[11px] text-zinc-400 mb-2 font-sans">
                              The total cash sprayed or gifted by physical guests in the venue. Used to calculate dynamic spraying rates.
                            </div>
                          )}
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-sm text-zinc-500 font-mono font-bold">
                              {symbol}
                            </span>
                            <input
                              type="text"
                              value={expectedCashSprays}
                              onChange={(e) => setExpectedCashSprays(e.target.value.replace(/\D/g, ""))}
                              className="w-full bg-[#14151a] border border-[#1e2028] focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl pl-8 pr-3 py-2.5 text-xs text-zinc-200 font-mono"
                              placeholder="Optional"
                            />
                          </div>
                        </motion.div>

                        {/* Expected Tips */}
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-1.5"
                        >
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <span>Expected Live Tips</span>
                              <HelpCircle 
                                className="w-3.5 h-3.5 text-zinc-600 cursor-pointer hover:text-zinc-405 transition-colors"
                                onClick={() => setActiveTooltip(activeTooltip === "phsTips" ? null : "phsTips")}
                              />
                            </span>
                          </label>
                          {activeTooltip === "phsTips" && (
                            <div className="bg-zinc-900 border border-zinc-805 p-2.5 rounded-lg text-[11px] text-zinc-400 mb-2 font-sans">
                              Total digital tips or direct custom gifts sent by physical guests during the physical event.
                            </div>
                          )}
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-sm text-zinc-500 font-mono font-bold">
                              {symbol}
                            </span>
                            <input
                              type="text"
                              value={expectedTips}
                              onChange={(e) => setExpectedTips(e.target.value.replace(/\D/g, ""))}
                              className="w-full bg-[#14151a] border border-[#1e2028] focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl pl-8 pr-3 py-2.5 text-xs text-zinc-200 font-mono"
                              placeholder="Optional"
                            />
                          </div>
                        </motion.div>

                        {/* Vendor spending Sales */}
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-1.5"
                        >
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <span>Vendor spend (Foods/Drinks)</span>
                              <HelpCircle 
                                className="w-3.5 h-3.5 text-zinc-600 cursor-pointer hover:text-zinc-405 transition-colors"
                                onClick={() => setActiveTooltip(activeTooltip === "phsVendors" ? null : "phsVendors")}
                              />
                            </span>
                          </label>
                          {activeTooltip === "phsVendors" && (
                            <div className="bg-zinc-905 border border-zinc-805 p-2.5 rounded-lg text-[11px] text-zinc-400 mb-2 font-sans">
                              Total revenue generated from physical food, drinks, merchandise, and vendor venue licenses.
                            </div>
                          )}
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-sm text-zinc-500 font-mono font-bold">
                              {symbol}
                            </span>
                            <input
                              type="text"
                              value={expectedVendorSales}
                              onChange={(e) => setExpectedVendorSales(e.target.value.replace(/\D/g, ""))}
                              className="w-full bg-[#14151a] border border-[#1e2028] focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl pl-8 pr-3 py-2.5 text-xs text-zinc-200 font-mono"
                              placeholder="Optional"
                            />
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>

            {/* ===================== NEW VIRTUAL ENGAGEMENT REVENUE SECTION ===================== */}
            <div className="bg-[#0b0c10]/95 border border-zinc-800/80 rounded-[24px] p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn">
              <div className="absolute top-4 right-4 flex items-center space-x-1 bg-zinc-900/60 border border-zinc-800/40 rounded-full px-2 py-1 text-[9px] text-zinc-500 font-mono tracking-wider uppercase font-semibold">
                <span>Virtual Parameters</span>
              </div>

              <div>
                <h3 className="font-display text-lg sm:text-xl font-extrabold text-white">
                  Expected Virtual Audience Spending
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-sans">
                  Estimate what an average virtual attendee is likely to spend during your event.
                </p>
              </div>

              <div className="space-y-5">
                {calculatorMode === "simple" ? (
                  /* SIMPLE MODE: Average Virtual Gift Input */
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <span>Average Virtual Gift Per Attendee</span>
                        <HelpCircle 
                          className="w-3.5 h-3.5 text-zinc-600 cursor-pointer hover:text-zinc-400 transition-colors"
                          onClick={() => setActiveTooltip(activeTooltip === "vrtGift" ? null : "vrtGift")}
                        />
                      </span>
                    </label>
                    {activeTooltip === "vrtGift" && (
                      <div className="bg-zinc-900 border border-zinc-805 p-2.5 rounded-lg text-[11px] text-zinc-400 mb-2 font-sans">
                        The average combined amount a virtual attendee is expected to spray, tip, or gift during your digital livestream.
                      </div>
                    )}
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-sm text-zinc-500 font-mono font-bold">
                        {symbol}
                      </span>
                      <input
                        type="text"
                        value={avgVirtualGift}
                        onChange={(e) => setAvgVirtualGift(e.target.value.replace(/\D/g, ""))}
                        className="w-full bg-[#14151a] border border-[#1e2028] focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl pl-8 pr-3 py-2.5 text-xs text-zinc-200 font-mono"
                        placeholder={pMax.gift}
                      />
                    </div>
                    <p className="text-[10px] text-zinc-500 font-sans mt-1 leading-normal">
                      Average amount a virtual attendee is expected to spray or gift during the event livestream.
                    </p>
                  </div>
                ) : (
                  /* ADVANCED MODE: 3 Separate inputs with AI Auto Estimation badges */
                  <div className="grid grid-cols-1 gap-5 text-left">
                    
                    {/* FIELD 1: Average Virtual Cash Spray */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex flex-wrap items-center justify-between gap-1.5">
                        <span className="flex items-center gap-1">
                          <span>AVERAGE VIRTUAL CASH SPRAY PER ATTENDEE</span>
                          <HelpCircle 
                            className="w-3.5 h-3.5 text-zinc-600 cursor-pointer hover:text-zinc-400 transition-colors"
                            onClick={() => setActiveTooltip(activeTooltip === "vrtSpray" ? null : "vrtSpray")}
                          />
                        </span>
                        {isEstimatedSpray && (
                          <span className="bg-purple-500/10 text-brand-purple border border-brand-purple/20 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-lg flex items-center gap-1 animate-pulse select-none">
                            <Sparkles className="w-2.5 h-2.5 text-purple-400" /> AI ESTIMATE
                          </span>
                        )}
                      </label>
                      {activeTooltip === "vrtSpray" && (
                        <div className="bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg text-[11px] text-zinc-400 mb-2 font-sans">
                          The average amount each virtual attendee is expected to spray or gift during the event stream.
                        </div>
                      )}
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-sm text-zinc-500 font-mono font-bold">
                          {symbol}
                        </span>
                        <input
                          type="text"
                          value={avgVirtualCashSpray === "" && isEstimatedSpray ? Math.round(estimatedVirtualCashSpray).toString() : avgVirtualCashSpray}
                          onChange={(e) => setAvgVirtualCashSpray(e.target.value.replace(/\D/g, ""))}
                          className={`w-full bg-[#14151a] border rounded-xl pl-8 pr-3 py-2.5 text-xs font-mono transition-colors focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                            isEstimatedSpray 
                              ? "border-purple-500/20 text-purple-300 placeholder-purple-400/50 focus:border-purple-500" 
                              : "border-[#1e2028] text-zinc-200 focus:border-purple-500"
                          }`}
                          placeholder={pMax.spray}
                        />
                      </div>
                      <p className="text-[10px] text-zinc-500 font-sans leading-normal">
                        {isEstimatedSpray ? (
                          <span className="text-purple-400/80 font-semibold">★ Estimated from Physical Event Data (30% physical spray rate)</span>
                        ) : (
                          <span>Average amount a virtual attendee is expected to spray or gift during the event.</span>
                        )}
                      </p>
                    </div>

                    {/* FIELD 2: Average Virtual Tip */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex flex-wrap items-center justify-between gap-1.5">
                        <span className="flex items-center gap-1">
                          <span>Average Virtual Tip Per Attendee</span>
                          <HelpCircle 
                            className="w-3.5 h-3.5 text-zinc-600 cursor-pointer hover:text-zinc-450 transition-colors"
                            onClick={() => setActiveTooltip(activeTooltip === "vrtTip" ? null : "vrtTip")}
                          />
                        </span>
                        {isEstimatedTip && (
                          <span className="bg-purple-500/10 text-brand-purple border border-brand-purple/20 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-lg flex items-center gap-1 animate-pulse select-none">
                            <Sparkles className="w-2.5 h-2.5 text-purple-400" /> AI ESTIMATE
                          </span>
                        )}
                      </label>
                      {activeTooltip === "vrtTip" && (
                        <div className="bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg text-[11px] text-zinc-400 mb-2 font-sans">
                          Average tips expected from each virtual attendee during the online stream.
                        </div>
                      )}
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-sm text-zinc-500 font-mono font-bold">
                          {symbol}
                        </span>
                        <input
                          type="text"
                          value={avgVirtualTip === "" && isEstimatedTip ? Math.round(estimatedVirtualTip).toString() : avgVirtualTip}
                          onChange={(e) => setAvgVirtualTip(e.target.value.replace(/\D/g, ""))}
                          className={`w-full bg-[#14151a] border rounded-xl pl-8 pr-3 py-2.5 text-xs font-mono transition-colors focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                            isEstimatedTip 
                              ? "border-purple-500/20 text-purple-300 placeholder-purple-400/50 focus:border-purple-500" 
                              : "border-[#1e2028] text-zinc-200 focus:border-purple-500"
                          }`}
                          placeholder={pMax.tip}
                        />
                      </div>
                      <p className="text-[10px] text-zinc-500 font-sans leading-normal">
                        {isEstimatedTip ? (
                          <span className="text-purple-400/80 font-semibold">★ Estimated from Physical Event Data (30% physical tipping rate)</span>
                        ) : (
                          <span>Average tips expected from each virtual attendee.</span>
                        )}
                      </p>
                    </div>

                    {/* FIELD 3: Average Virtual Vendor Spend */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex flex-wrap items-center justify-between gap-1.5">
                        <span className="flex items-center gap-1">
                          <span>Average Virtual Vendor Spend Per Attendee</span>
                          <HelpCircle 
                            className="w-3.5 h-3.5 text-zinc-600 cursor-pointer hover:text-zinc-450 transition-colors"
                            onClick={() => setActiveTooltip(activeTooltip === "vrtVendor" ? null : "vrtVendor")}
                          />
                        </span>
                        {isEstimatedVendor && (
                          <span className="bg-purple-500/10 text-brand-purple border border-brand-purple/20 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-lg flex items-center gap-1 animate-pulse select-none">
                            <Sparkles className="w-2.5 h-2.5 text-purple-400" /> AI ESTIMATE
                          </span>
                        )}
                      </label>
                      {activeTooltip === "vrtVendor" && (
                        <div className="bg-zinc-900 border border-zinc-850 p-2.5 rounded-lg text-[11px] text-zinc-400 mb-2 font-sans">
                          Average amount spent by each virtual attendee on merchandise, food, drinks, premium content or marketplace purchases.
                        </div>
                      )}
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-sm text-zinc-500 font-mono font-bold">
                          {symbol}
                        </span>
                        <input
                          type="text"
                          value={avgVirtualVendorSpend === "" && isEstimatedVendor ? Math.round(estimatedVirtualVendorSpend).toString() : avgVirtualVendorSpend}
                          onChange={(e) => setAvgVirtualVendorSpend(e.target.value.replace(/\D/g, ""))}
                          className={`w-full bg-[#14151a] border rounded-xl pl-8 pr-3 py-2.5 text-xs font-mono transition-colors focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                            isEstimatedVendor 
                              ? "border-purple-500/20 text-purple-300 placeholder-purple-400/50 focus:border-purple-500" 
                              : "border-[#1e2028] text-zinc-200 focus:border-purple-500"
                          }`}
                          placeholder={pMax.vendor}
                        />
                      </div>
                      <p className="text-[10px] text-zinc-500 font-sans leading-normal">
                        {isEstimatedVendor ? (
                          <span className="text-purple-400/80 font-semibold">★ Estimated from Physical Event Data (30% physical spend rate)</span>
                        ) : (
                          <span>Average spent from each virtual attendee.</span>
                        )}
                      </p>
                    </div>

                  </div>
                )}
              </div>
            </div>

          </div>

                 {/* ==================== RIGHT COLUMN: OUTPUTS ==================== */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* The Three Premium Glass Estimation Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* CARD 1: WITHOUT ONSTAEGE (BLUE STYLING) - Spans 1 column */}
              <div className="bg-[#0b0c10]/95 border border-zinc-800/80 rounded-[22px] p-5 text-left shadow-xl hover:border-sky-500/30 transition duration-300 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-sky-500/50" />
                  <p className="text-[9px] font-extrabold text-sky-400 uppercase tracking-widest mb-0.5">
                    WITHOUT ONSTAEGE
                  </p>
                  <p className="text-[9px] text-zinc-500 leading-none mb-4">Limited physical venue gate</p>

                  <h4 className={`${getBigFigureTextClass(totalPhysicalRevenue)} font-display font-black tracking-tight text-white flex items-baseline space-x-0.5 leading-none transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis`}>
                    <AnimatedCounter value={totalPhysicalRevenue} prefix={symbol} />
                  </h4>
                  <p className="text-[8px] text-zinc-400 mt-1 font-mono uppercase tracking-wider font-semibold">CAPPED REVENUE</p>

                  {/* Physical Breakdown */}
                  <div className="mt-4 space-y-2 text-[11px] border-t border-zinc-900 pt-3.5">
                    <div className="flex justify-between items-center text-zinc-400">
                      <span className="flex items-center space-x-1.5 mr-2">
                        <span className="w-1.5 h-1.5 bg-sky-500 rounded-full shrink-0" />
                        <span>Tickets</span>
                      </span>
                      <span className="font-mono text-zinc-300 font-bold whitespace-nowrap">
                        {symbol}{physicalTicketsRevenue.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-zinc-400">
                      <span className="flex items-center space-x-1.5 mr-2">
                        <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full shrink-0" />
                        <span>Sprays</span>
                      </span>
                      <span className="font-mono text-zinc-300 font-bold whitespace-nowrap">
                        {symbol}{cashSpraysPhysical.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-zinc-400">
                      <span className="flex items-center space-x-1.5 mr-2">
                        <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full shrink-0" />
                        <span>Tips</span>
                      </span>
                      <span className="font-mono text-zinc-300 font-bold whitespace-nowrap">
                        {symbol}{tipsPhysical.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-zinc-400">
                      <span className="flex items-center space-x-1.5 mr-2">
                        <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full shrink-0" />
                        <span>Vendors</span>
                      </span>
                      <span className="font-mono text-zinc-300 font-bold whitespace-nowrap">
                        {symbol}{vendorSalesPhysical.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-zinc-950/60 p-2 rounded-xl border border-zinc-900/60 flex items-center justify-between text-[9px]">
                  <span className="text-zinc-500 font-medium">GATE LIMIT:</span>
                  <span className="font-bold text-sky-400 font-mono whitespace-nowrap">{physicalAttendance} GUESTS</span>
                </div>
              </div>

              {/* CARD 2: WITH ONSTAEGE (PURPLE STYLING) - Spans 1 column */}
              <div className="bg-[#0b0c10]/95 border-2 border-brand-purple/20 rounded-[22px] p-5 text-left shadow-2xl hover:border-brand-purple/40 transition duration-300 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-purple" />
                  <p className="text-[9px] font-extrabold text-brand-purple uppercase tracking-widest mb-0.5">
                    WITH ONSTAEGE
                  </p>
                  <p className="text-[9px] text-zinc-400 leading-none mb-4">Unlimited digital venue reach</p>

                  <h4 className={`${getBigFigureTextClass(totalOnstaegeRevenue)} font-display font-black tracking-tight text-white flex items-baseline space-x-0.5 leading-none transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis`}>
                    <AnimatedCounter value={totalOnstaegeRevenue} prefix={symbol} />
                  </h4>
                  <p className="text-[8px] text-zinc-400 mt-1 font-mono uppercase tracking-wider font-semibold">MAGNIFIED REVENUE</p>

                  {/* With Onstaege Breakdown */}
                  <div className="mt-4 space-y-2 text-[11px] border-t border-zinc-900 pt-3.5">
                    <div className="flex justify-between items-center text-zinc-400">
                      <span className="text-zinc-500 font-medium mr-2">Physical Base:</span>
                      <span className="font-mono text-zinc-400 whitespace-nowrap">
                        {symbol}{totalPhysicalRevenue.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-zinc-400">
                      <span className="flex items-center space-x-1.5 mr-2">
                        <span className="w-1.5 h-1.5 bg-[#C084FC] rounded-full shrink-0" />
                        <span className="text-[#C084FC] font-semibold">Virtual Tickets</span>
                      </span>
                      <span className="font-mono text-white font-bold whitespace-nowrap">
                        {symbol}{virtualTicketRevenue.toLocaleString()}
                      </span>
                    </div>

                    {/* Conditional Addon breakdowns based on user criteria */}
                    {virtualCashSprays > 0 || virtualTips > 0 || virtualVendorRevenue > 0 ? (
                      <>
                        {virtualCashSprays > 0 && (
                          <div className="flex justify-between items-center text-zinc-400">
                            <span className="flex items-center space-x-1.5 mr-2">
                              <span className="w-1.5 h-1.5 bg-[#818CF8] rounded-full shrink-0" />
                              <span className="text-[#818CF8]">Virtual Sprays</span>
                            </span>
                            <span className="font-mono text-white font-bold whitespace-nowrap">
                              {symbol}{virtualCashSprays.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {virtualTips > 0 && (
                          <div className="flex justify-between items-center text-zinc-400">
                            <span className="flex items-center space-x-1.5 mr-2">
                              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full shrink-0" />
                              <span className="text-zinc-300">Virtual Tips</span>
                            </span>
                            <span className="font-mono text-white font-bold whitespace-nowrap">
                              {symbol}{virtualTips.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {virtualVendorRevenue > 0 && (
                          <div className="flex justify-between items-center text-zinc-400">
                            <span className="flex items-center space-x-1.5 mr-2">
                              <span className="w-1.5 h-1.5 bg-pink-400 rounded-full shrink-0" />
                              <span className="text-zinc-300">Virtual Vendors</span>
                            </span>
                            <span className="font-mono text-white font-semibold whitespace-nowrap">
                              {symbol}{virtualVendorRevenue.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      /* Displaynotice banner if virtual sprays, tips and vendor spent are zero */
                      <div className="bg-purple-500/5 border border-purple-500/10 p-2.5 rounded-xl text-[10px] text-purple-300 font-sans text-center leading-normal mt-2">
                        Virtual Revenue will be calculated from ticket sales only.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 bg-[#16122d]/60 p-2 rounded-xl border border-purple-500/10 flex items-center justify-between text-[9px]">
                  <span className="text-zinc-400 font-medium">TOTAL GUESTS:</span>
                  <span className="font-black text-brand-purple font-mono whitespace-nowrap">{(physicalAttendance + virtualAttendees).toLocaleString()} REACH</span>
                </div>
              </div>

              {/* CARD 3: NEW REVENUE GENERATED (EMERALD REACTION STYLING) - Spans 2 columns on medium & larger */}
              <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-[#070b09] via-[#09120c] to-zinc-950 border border-emerald-500/20 rounded-[22px] p-5 text-left shadow-2xl relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-emerald-500/50" />
                  <p className="text-[9px] font-extrabold text-emerald-400 uppercase tracking-widest mb-0.5">
                    NEW REVENUE GENERATED
                  </p>
                  <p className="text-[9px] text-zinc-500 leading-none mb-4">Onstaege Virtual Delta</p>

                  <h3 className={`${getBigFigureTextClass(additionalRevenue, true)} font-display font-black tracking-tight text-white leading-none flex items-baseline transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis`}>
                    <span className="text-emerald-400 mr-0.5 font-bold">+</span>
                    <AnimatedCounter value={additionalRevenue} prefix={symbol} />
                  </h3>
                  <p className="text-[8px] text-emerald-400/90 font-mono font-bold uppercase tracking-widest mt-1">INCREMENTAL LIFT</p>

                  <div className="mt-4 space-y-2.5 text-[11px] border-t border-zinc-900 pt-3.5">
                    <div className="flex justify-between items-center text-zinc-400">
                      <span className="font-semibold text-emerald-400 flex items-center space-x-1 mr-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" />
                        <span>Percentage Lift</span>
                      </span>
                      <span className="font-mono text-emerald-405 font-bold text-xs whitespace-nowrap">
                        +{percentageIncrease}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-zinc-400">
                      <span className="font-semibold text-emerald-400 flex items-center space-x-1 mr-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" />
                        <span>Total Multiplier</span>
                      </span>
                      <span className="font-mono text-emerald-405 font-bold text-xs whitespace-nowrap">
                        {timesMultiple}x
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-emerald-950/20 border border-emerald-500/10 px-2.5 py-1.5 rounded-xl flex items-center justify-between text-[10px]">
                  <span className="text-emerald-500 font-extrabold uppercase font-mono tracking-wider mr-2">ROI MAGNIFICATION</span>
                  <span className="text-emerald-400 font-bold whitespace-nowrap">&#10022; {timesMultiple}x More Stream</span>
                </div>
              </div>

            </div>

            {/* AI PROJECT PROJECTION MODEL / AI HIGHLIGHT CARD */}
            <div className="bg-[#0b0c10]/95 border-2 border-purple-500/10 rounded-[24px] p-6 text-left shadow-2xl relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/5 rounded-full filter blur-2xl group-hover:bg-purple-500/10 transition-all pointer-events-none" />
              <div className="absolute top-4 right-4 flex items-center space-x-1 font-mono text-[9px] text-zinc-500 select-none">
                <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                <span>AI Projection Insights</span>
              </div>

              <h4 className="font-display font-black text-xs text-white uppercase tracking-widest mb-3 flex items-center space-x-1.5">
                <span>IMPACT FORECAST</span>
              </h4>

              <div className="space-y-3.5 text-xs text-zinc-300 leading-relaxed font-sans">
                <p>
                  With an estimated digital fan/follower base of <span className="font-bold text-white font-mono">{currentAudienceReach.toLocaleString()}</span> and an assumed <span className="font-bold text-emerald-400 font-mono">{conversionRate}%</span> conversion rate, your virtual venue ticket is projected to attract <span className="font-bold text-emerald-400 font-mono">{virtualAttendees.toLocaleString()}</span> attendees.
                </p>
                <p>
                  These digital attendees bypass bricks-and-mortar physical limit caps (<span className="text-sky-400 font-bold font-mono">{physicalAttendance} guests</span>) entirely, generating an additional <span className="font-black text-brand-purple font-mono">{symbol}{virtualTicketRevenue.toLocaleString()}</span> in pure ticket sales.
                </p>
                {virtualCashSprays > 0 || virtualTips > 0 || virtualVendorRevenue > 0 ? (
                  <p className="text-zinc-400">
                    Furthermore, customized interactive streams trigger active monetization, pulling a combined <span className="font-bold text-white font-mono">{symbol}{(virtualCashSprays + virtualTips + virtualVendorRevenue).toLocaleString()}</span> in digital virtual cash sprays showering, live direct tipping, and collaborative vendor marketplace sales.
                  </p>
                ) : (
                  <p className="text-zinc-500 italic">
                    Configure virtual sprays, tips or vender parameters in the left configuration deck to model full interactive stream monetization streams.
                  </p>
                )}
              </div>
            </div>

            {/* VISUAL CHART INTERACTIVE SECTION: DUAL BENT PROGRESS COMPARISON */}
            <div className="bg-[#0b0c10]/95 border border-zinc-800/80 rounded-[24px] p-6 text-left shadow-xl space-y-5">
              <h5 className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest font-mono">
                Visual Attendance & Revenue Climb Comparison
              </h5>

              <div className="space-y-4 pt-1">
                {/* Physical Base bar */}
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
                        width: `${Math.max(8, Math.min(100, (physicalAttendance + virtualAttendees) > 0 ? (physicalAttendance / (physicalAttendance + virtualAttendees)) * 100 : 0))}%`
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
                  <div className="w-full h-4 bg-zinc-100/5 rounded-full overflow-hidden p-[2px]">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-brand-purple via-pink-500 to-purple-600 rounded-full shadow-[0_0_12px_rgba(124,58,237,0.55)] animate-pulse" 
                      initial={{ width: "12%" }}
                      animate={{ width: "100%" }} 
                      transition={{ type: "spring", stiffness: 60 }}
                    />
                  </div>
                </div>
              </div>

              {/* Trajectory trajectory line illustration */}
              <div className="bg-zinc-950 rounded-xl p-3.5 border border-zinc-900/60 relative h-28 overflow-hidden flex flex-col justify-between">
                <div className="absolute top-2.5 left-3 text-[8px] text-zinc-500 font-mono uppercase font-bold tracking-widest flex items-center space-x-1 select-none">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span>Revenue trajectory curve</span>
                </div>

                <div className="absolute right-3.5 top-2 text-[8px] text-emerald-400 font-mono font-bold uppercase select-none flex items-center space-x-1">
                  <span>Hypergrowth curve climb</span>
                </div>

                {/* SVG Curve chart displaying rise from physical base up to digital virtual stream ceiling */}
                <svg className="w-full h-16 absolute bottom-0 left-0 z-0 pointer-events-none" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chart-rev-area-v" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Dotted threshold line for limited physical cap */}
                  <line x1="0" y1="22" x2="100" y2="22" stroke="#4b5563" strokeWidth="0.5" strokeDasharray="2" />
                  
                  {/* Curved revenue line rising up to ceiling */}
                  <path d="M 0,22 Q 35,21 60,11 T 100,2" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
                  <path d="M 0,22 Q 35,21 60,11 T 100,2 L 100,30 L 0,30 Z" fill="url(#chart-rev-area-v)" />
                </svg>

                <div className="flex justify-between items-end relative z-10 w-full pt-1">
                  <div className="text-left font-sans text-[9px] text-zinc-500 font-semibold leading-none self-end pb-1 pl-1">
                    Base Physical: {symbol}{totalPhysicalRevenue.toLocaleString()}
                  </div>
                  <div className="text-right font-mono text-xs text-emerald-400 font-black bg-[#0d120e] border border-emerald-500/20 px-2 py-1 rounded-md mb-1 mr-1">
                    Max Stream: {symbol}{totalOnstaegeRevenue.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ==================== BOTTOM: CALL TO ACTION SECTION ==================== */}
        <div className="mt-20 max-w-4xl mx-auto text-center border border-zinc-800/80 dark:border-white/5 rounded-[24px] p-8 sm:p-12 bg-gradient-to-b from-[#0b0c10]/95 to-[#121319] relative overflow-hidden shadow-2xl">
          <div className="absolute top-[20%] left-[20%] w-48 h-48 bg-brand-purple/10 rounded-full filter blur-[50px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[10%] w-60 h-60 bg-indigo-505/10 rounded-full filter blur-[70px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Make the World Your Event Venue?
            </h3>
            
            <p className="text-zinc-400 text-xs sm:text-sm max-w-lg mx-auto font-sans leading-relaxed">
              Don't limit your ticket sales, virtual cash sprays, and brand sponsorships to a single brick-and-mortar room. Broadcast with Onstaege.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
              <a
                href="#contact"
                className="w-full sm:w-auto text-center bg-brand-purple hover:bg-purple-600 font-semibold text-white text-xs px-8 py-3.5 rounded-full cursor-pointer transition shadow-md active:scale-95 duration-200"
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
