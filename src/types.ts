export interface ReactionItem {
  id: string;
  sender: string;
  location: string;
  message: string;
  amount?: number;
  timeAgo: string;
  avatarColor?: string;
}

export type EventStateMode = 'onsite' | 'remote';

export interface UseCaseItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  physicalFeatures: string[];
  globalFeatures: string[];
  metric: string;
}

export interface BusinessCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  physicalLimitation: string;
  digitalSuperpower: string;
  sampleItems: { name: string; price: string; action: string }[];
}

export interface DayItinerarySlot {
  time: string;
  title: string;
  description: string;
  category: string;
  badge: string;
  actionPrompt: string;
}

export interface PersonaProfile {
  id: string;
  name: string;
  role: string;
  icon: string;
  tag: string;
  description: string;
  perks: string[];
  feedHighlights: { time: string; title: string; subtitle: string }[];
}

export interface EarlyAccessSubmission {
  email: string;
  role: 'organizer' | 'business' | 'destination' | 'visitor';
  location?: string;
  notes?: string;
}
