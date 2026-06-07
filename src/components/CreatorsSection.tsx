import { useState, useEffect } from "react";
import { Sparkles, DollarSign, Users, Award, Gift, Eye, Volume1, ArrowUpRight } from "lucide-react";
import { Theme } from "../types";

interface CreatorsProps {
  theme: Theme;
}

interface MiniToast {
  id: number;
  user: string;
  gift: string;
  value: string;
  icon: string;
}

export default function CreatorsSection({ theme }: CreatorsProps) {
  const [totalEarningAmount, setTotalEarningAmount] = useState<number>(1420);
  const [currentEngagementRate, setCurrentEngagementRate] = useState<number>(94.5);
  const [activeFollowersCount, setActiveFollowersCount] = useState<number>(3104);
  const [incomingGiftToasts, setIncomingGiftToasts] = useState<MiniToast[]>([]);

  // Periodically increment earnings and engagement for live simulation
  useEffect(() => {
    const revenueTimer = setInterval(() => {
      setTotalEarningAmount((prev) => prev + Math.floor(Math.random() * 15) + 5);
      setActiveFollowersCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
      setCurrentEngagementRate((prev) => parseFloat(Math.min(99.9, Math.max(90.0, prev + (Math.random() * 1.6 - 0.8))).toFixed(1)));
    }, 4000);
    return () => clearInterval(revenueTimer);
  }, []);

  // Periodically inject floating simulated gifts arriving
  useEffect(() => {
    const giftTypes = [
      { gift: "Cosmic Sparkler", val: "$15.00", icon: "✨", users: ["Sarah_B", "Liam_K", "Takahiro_J", "Chloe_99"] },
      { gift: "VIP Bottle Toast", val: "$45.00", icon: "🥂", users: ["Alexander", "Elena_R", "Marcus_SG", "Diana_K"] },
      { gift: "Golden Crown", val: "$90.05", icon: "👑", users: ["Lucas_V", "Sofie_M", "Emma_S", "Sanjay_1"] },
      { gift: "Elegant Rose", val: "$5.00", icon: "🌹", users: ["Aria_G", "Ben_H", "Yasmine_T", "Yuki_9"] }
    ];

    const giftTimer = setInterval(() => {
      const selected = giftTypes[Math.floor(Math.random() * giftTypes.length)];
      const user = selected.users[Math.floor(Math.random() * selected.users.length)];
      
      const newToast: MiniToast = {
        id: Date.now(),
        user,
        gift: selected.gift,
        value: selected.val,
        icon: selected.icon
      };

      setIncomingGiftToasts((prev) => [newToast, ...prev.slice(0, 2)]);
    }, 3200);

    return () => clearInterval(giftTimer);
  }, []);

  return null;
}
