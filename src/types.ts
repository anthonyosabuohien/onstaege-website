export type Theme = 'dark' | 'light';

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroSlideshowItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface CounterItem {
  label: string;
  value: string;
  suffix?: string;
  icon: string;
}

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge: string;
  color: string;
  imageUrl: string;
}

export interface UseCaseItem {
  id: string;
  title: string;
  visualUrl: string;
  copy: string;
  tag: string;
  accent: string;
}

export interface HowItWorksItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  event: string;
  avatarUrl: string;
  quote: string;
  rating: number;
}

// Structuring high fidelity event details
export const heroSlideshowItems: HeroSlideshowItem[] = [
  {
    id: 'wedding',
    category: 'Luxury Wedding',
    title: 'THE DESTINATION UNION',
    subtitle: 'Streamed live in ultra-high fidelity from Amalfi Coast to families across four continents.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'concert',
    category: 'Arena Concert',
    title: 'STADIUM BEATS LIVE',
    subtitle: 'Extend front-row arena acoustic vibes with multi-cam switches and zero lag.',
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'sports',
    category: 'Football Match',
    title: 'CHAMPIONS LEAGUE',
    subtitle: 'Pulsing crowd reactions synced with physical stadium soundscapes globally.',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'nightclub',
    category: 'Nightclub & Lounge',
    title: 'AMPLIFIED NIGHTS',
    subtitle: 'Connect VIP booths physically and virtually. Request tracks, spray digital cash instantly.',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'conference',
    category: 'Global Keynote',
    title: 'FUTURE TECH 2026',
    subtitle: 'High-definition interactive keynote rooms with instant translation and audience panels.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'festival',
    category: 'Summer Festival',
    title: 'SOLSTICE MUSIC FEST',
    subtitle: 'Simultaneous drone flight transitions streaming festival layouts in immersive widescreen views.',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'birthday',
    category: 'Birthday Party',
    title: 'CELEBRATION DE LUXE',
    subtitle: 'Bringing lifelong friends together effortlessly from across ocean boundaries.',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1200'
  }
];

export const counterItems: CounterItem[] = [
  { label: 'Events Hosted', value: '100', suffix: '+', icon: 'Sparkles' },
  { label: 'Participants', value: '50', suffix: 'K+', icon: 'Users' },
  { label: 'Countries Reached', value: '25', suffix: '+', icon: 'Globe' },
  { label: 'Real-Time Interactions', value: 'Millions', icon: 'Zap' }
];

export const featureItems: FeatureItem[] = [
  {
    id: 'participation',
    icon: 'Globe',
    title: 'Virtual Event Participation',
    description: 'Immersive low-latency stream brings you directly onto the virtual floor with spatial audio.',
    badge: 'Real-time',
    color: 'from-blue-500/20 to-indigo-500/10',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'cash-spray',
    icon: 'Coins',
    title: 'Digital Cash Spray',
    description: 'Throw digital currencies on stage with custom visual effects to support creators & hosts in real time.',
    badge: 'Interactive',
    color: 'from-green-500/20 to-emerald-500/10',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'multi-angle',
    icon: 'Maximize',
    title: 'Multi-Angle Experience',
    description: 'Switch viewpoints on the fly—from front row, behind-the-scenes drones, or co-host guest cameras.',
    badge: 'Premium',
    color: 'from-purple-500/20 to-pink-500/10',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'networking',
    icon: 'MessageSquare',
    title: 'Live Chat & Networking',
    description: 'Engage with fellow attendees in persistent audio-text bubbles partitioned by virtual lounge tables.',
    badge: 'Social',
    color: 'from-sky-500/20 to-blue-500/10',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'gifting',
    icon: 'Gift',
    title: 'Digital Gifts',
    description: 'Send fully-animated physical or digital gifts instantly over boundaries with personalized, premium wrappers.',
    badge: 'Earn',
    color: 'from-amber-500/20 to-rose-500/10',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'event-feed',
    icon: 'Rss',
    title: 'Real-Time Event Feed',
    description: 'Never miss a beat with an auto-updating media wall featuring guest clips, highlights, and top moments.',
    badge: 'Live',
    color: 'from-violet-500/20 to-purple-500/10',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=600'
  }
];

export const useCaseItems: UseCaseItem[] = [
  {
    id: 'wedding-uc',
    title: 'Weddings',
    visualUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800',
    copy: 'Bring families worldwide together. Share the emotional moments with relatives who cannot travel.',
    tag: 'Celebration',
    accent: '#10B981'
  },
  {
    id: 'concerts-uc',
    title: 'Concerts',
    visualUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    copy: 'Take performances global with multi-angle streaming. Let global fans join, engage and interact.',
    tag: 'Symphonies & Beats',
    accent: '#3B82F6'
  },
  {
    id: 'nightclub-uc',
    title: 'Nightclubs',
    visualUrl: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800',
    copy: 'Order drinks. Request special tracks. Spray digital cash on performers. Reserve elite tables. Enjoy upscale party vibes digitally.',
    tag: 'Electrified VIP',
    accent: '#EC4899'
  },
  {
    id: 'sports-uc',
    title: 'Sports',
    visualUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800',
    copy: 'Connect die-hard stadium fans beyond boundaries. Synced live reactions content generated by fans.',
    tag: 'Athletics',
    accent: '#F59E0B'
  },
  {
    id: 'festivals-uc',
    title: 'Festivals',
    visualUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
    copy: 'Broadcast stunning panoramic drone views. Capture secondary physical camps so fans experience concurrent music sets.',
    tag: 'Summer Beats',
    accent: '#8B5CF6'
  },
  {
    id: 'birthdays-uc',
    title: 'Birthdays',
    visualUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
    copy: 'Celebrate with everyone, anywhere. Interactive game streams and live digital blowing candles features synced in time.',
    tag: 'Intimate Party',
    accent: '#EF4444'
  }
];

export const howItWorksItems: HowItWorksItem[] = [
  {
    id: 1,
    title: 'Create Event',
    description: 'Set up your luxury virtual venue portal in minutes. Define staging parameters, multi-angle camera inputs, and interaction tokens.',
    icon: 'Calendar',
    details: ['Customize room presets', 'Set ticket values', 'Onboard streaming angles']
  },
  {
    id: 2,
    title: 'Invite Guests',
    description: 'Send custom high-fidelity smart invitations using dynamic links that grant access to physical venues AND interactive digital streams.',
    icon: 'MailOpen',
    details: ['Generate VIP invites', 'Social sharing tokens', 'Calendar auto-syncs']
  },
  {
    id: 3,
    title: 'Global Participation',
    description: 'Watch your audience base scale globally! Remote attendees enter a fully immersive WebGL virtual room mimicking the mood of the physical stage.',
    icon: 'Users',
    details: ['Spatial audio bubbles', '360 degree panoramic views', 'Active interaction panel']
  },
  {
    id: 4,
    title: 'Earn & Engage',
    description: 'Receive real-time digital cash sprays, sponsored virtual gifts, song requests, and table booking reservations that generate incredible secondary revenue.',
    icon: 'TrendingUp',
    details: ['Instant payout processing', 'Audience engagement logs', 'High margin secondary channels']
  }
];

export const testimonialItems: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Adesuwa A.',
    role: 'Traditional Wedding',
    event: '2025',
    avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150',
    quote: 'Onstaege made my traditional wedding unforgettable. My brothers overseas joined virtually, sprayed over **$1,300**, and I received every guest photo and video in one beautiful event timeline.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Popory',
    role: 'Club Management',
    event: 'Timeless Nightclub',
    avatarUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=150',
    quote: 'Hosting our nightlife experience on Onstaege transformed guest engagement. Digital ordering, song requests, and interactive features increased customer spending, improved convenience, and elevated our club experience.',
    rating: 5
  }
];
