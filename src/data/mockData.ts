import { ReactionItem, UseCaseItem, BusinessCategory, DayItinerarySlot, PersonaProfile } from '../types';

export const BRAND_ASSETS = {
  logo: '/logo.svg',
  wedding: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBznj4F0q8c_eoQMYOT7J1DUxyejxe2pVvFejy1_OiNtk1cD_oN_Cca4dobUQuiUr0H6vqbevP89_DPWMpQIfo_I_J0XbLbyidIjRRDgkVKWnl0rFPx77AY3k0_6Fgo7F6eyXcr3xeAj9UnStxEiDfR18DLuTQVHXHgmzAkOBbV6a_VhyC80R-Tcjz3elf6JunQeBaZdNdVhE88iZACQn1xbp5wo6dZLVqm8lZPlmhTBvjy4eqwa9w',
  concert: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWgGRBX5Rqo3xnZRRIntEYmQMxucN6JnFBvzavLSVoEH_E1PuImLQeOVXVbRgT0goZ9RI3BJvaZDi2ay217rMQ87xSMZ9h4RlVXh88GtIpV0tSE7GZI3xjINK7FWoNQAMOGuYQ4BA4RVBDru_TjmRJCZtZTXbVEdNy-594J9vO8Xjbbq5Es3iQv6yKKwYbf5mmX4T_MD4F9NPZzQhZB8ouEAw5wXMCZW7V7PjmtEBxhuo2VBmBb7s',
  rooftop: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0Tq1ypvwxWoyxmx6IhR7TDUVZqCq-So4p9AVW6cUALkyTZe8txRecJDZ6XOQFbRb_p7Sv3lWRE6EcptaEZnYKg-giLJe-92y9SROYM9YZYyghS6lXk4fbui4oLw1ukxvl2lfZZ8gxJNm8pI4Yn4tng2U5OUvmpQawzw_VPoQ2i1LKUjWogqVTvOFzsKyZ4_lLwz37J-fwYK_N7L0WgEIdCDbgTJaHTsWPRy0ByDE3c2FuMgj4WPE'
};

export const INITIAL_REACTIONS: ReactionItem[] = [
  {
    id: 'r-1',
    sender: 'Chioma M.',
    location: 'London',
    message: 'Dancing from my living room! Sending $200 blessings! 🥂',
    amount: 200,
    timeAgo: 'Just now',
    avatarColor: 'bg-primary-container text-white'
  },
  {
    id: 'r-2',
    sender: 'Kenji T.',
    location: 'Tokyo',
    message: "The bride's lace work is pure couture art! Stunning.",
    timeAgo: '12s ago',
    avatarColor: 'bg-secondary text-white'
  },
  {
    id: 'r-3',
    sender: 'Marcus B.',
    location: 'New York',
    message: 'Catering package delivered hot! Jollof smells unbelievable 🍛',
    amount: 75,
    timeAgo: '34s ago',
    avatarColor: 'bg-tertiary-container text-white'
  },
  {
    id: 'r-4',
    sender: 'Fatimah S.',
    location: 'Dubai',
    message: 'Wishing the lovely couple decades of pure joy and abundance ❤️',
    amount: 150,
    timeAgo: '1m ago',
    avatarColor: 'bg-emerald-600 text-white'
  }
];

export const USE_CASES: UseCaseItem[] = [
  {
    id: 'weddings',
    title: 'Weddings',
    icon: 'celebration',
    description: 'Digitize traditional blessings, schedule coordination, and cross-continental gift tables.',
    physicalFeatures: [
      'Cash spraying & digital envelopes',
      'Live photo wall & schedule sync',
      'Instant table order drinks & meals'
    ],
    globalFeatures: [
      'Remote wedding attendance & 4K camera switch',
      'Instant blessing feed & international gift registry',
      'Doorstep wedding feast delivered synchronously'
    ],
    metric: '12x average guest blessing participation'
  },
  {
    id: 'concerts',
    title: 'Concerts',
    icon: 'music_note',
    description: 'Turn one stage into an international stadium with high-fidelity engagement channels.',
    physicalFeatures: [
      'Monetize global fans with virtual ticketing',
      'Extend performance to remote audiences',
      'AR stage visual overlays'
    ],
    globalFeatures: [
      'Low-latency multi-angle live viewing',
      'Direct artist interaction, chat & tipping',
      'Limited edition tour merch shipped internationally'
    ],
    metric: '420,000+ synchronized remote attendees'
  },
  {
    id: 'festivals',
    title: 'Festivals',
    icon: 'festival',
    description: 'Unify multi-stage venues, thousands of vendors, and sponsor activations seamlessly.',
    physicalFeatures: [
      'Connect and interact with locals and onsite attendees',
      'Real-time crowd activities heatmaps & safety pings',
      'Geo-fenced sponsor badge quests'
    ],
    globalFeatures: [
      'Multi-stage stream hopping with zero buffer',
      'Virtual marketplace with local designer drops',
      'Global backstage access tokens'
    ],
    metric: '98.4% vendor sales lift'
  },
  {
    id: 'conferences',
    title: 'Conferences',
    icon: 'podium',
    description: 'Empower summits with bidirectional speaker Q&A, interactive workshops, and networking.',
    physicalFeatures: [
      'Badge tap instant contact exchange',
      'Real-time keynote slide annotation sync',
      'Live room capacity & seat booking'
    ],
    globalFeatures: [
      'Real-time speaker Q&A upvoting across time zones',
      'AI-curated attendee networking matching',
      'Simultaneous 18-language voice translation channels'
    ],
    metric: '86 countries represented live'
  }
];

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  {
    id: 'restaurants',
    name: 'Restaurants',
    icon: 'restaurant',
    description: 'Patrons explore real-time kitchen vibes, reserve high-demand seating, browse digital pairing menus, and interact with the executive chef.',
    physicalLimitation: 'Limited to 22 physical dining tables & local city residents.',
    digitalSuperpower: 'Worldwide patrons can order signature sauces, reserve future chef tables, and send surprise Champagne bottles to on-site diners.',
    sampleItems: [
      { name: 'Chef Tasting Pairing Menu', price: '$145', action: 'Reserve Spot' },
      { name: 'Virtual Table Gift: Vintage Krug', price: '$220', action: 'Send to Table 4' },
      { name: 'Signature Spice Blend (Shipped)', price: '$34', action: 'Ship Home' }
    ]
  },
  {
    id: 'bars',
    name: 'Bars & Lounges',
    icon: 'local_bar',
    description: 'Enter digitally before arrival, absorb the playlist, order drinks sent directly to friends seated inside, and request songs to the DJ.',
    physicalLimitation: 'Capped by maximum venue fire occupancy and strict closing hours.',
    digitalSuperpower: 'Global patrons meet and buy drinks for friends on-site, participate on live activities, and watch live performances.',
    sampleItems: [
      { name: 'Smoked Hibiscus Mezcalita', price: '$18', action: 'Order to Bar' },
      { name: 'DJ Track Priority Request', price: '$15', action: 'Upvote Song' },
      { name: 'Midnight VIP Bottle Reserve', price: '$350', action: 'Pre-book' }
    ]
  },
  {
    id: 'hotels',
    name: 'Hotels & Resorts',
    icon: 'hotel',
    description: 'Explore suites, reserve cabanas, connect with local on-demand concierges, and curate hyper-local excursions before stepping off the plane.',
    physicalLimitation: 'Travelers must arrive on-site to inspect rooms and plan their days.',
    digitalSuperpower: 'Pre-arrival spatial exploration, remote poolside cabana leasing, and seamless neighborhood artisan booking.',
    sampleItems: [
      { name: 'Sunset Ocean Cabana', price: '$120', action: 'Reserve Slot' },
      { name: 'Curated Artisan Food Tour', price: '$85', action: 'Book Guide' },
      { name: 'In-Suite Botanical Bath Kit', price: '$45', action: 'Add to Stay' }
    ]
  },
  {
    id: 'retail',
    name: 'Retail Stores',
    icon: 'storefront',
    description: 'Walk physical boutique aisles remotely, connect with live sales associates via one-tap video, and enjoy instant synchronized checkout.',
    physicalLimitation: 'Foot traffic restricted by bad weather, location, and street footfall.',
    digitalSuperpower: 'Virtual boutique walk-through with dedicated personal styling avatars and global same-day shipping.',
    sampleItems: [
      { name: 'Handcrafted Indigo Linen Blazer', price: '$280', action: 'Add to Bag' },
      { name: 'Live 1:1 Stylist Video Call', price: 'Free', action: 'Connect Now' },
      { name: 'Limited Runway Drop Trunk', price: '$190', action: 'Pre-Order' }
    ]
  },
  {
    id: 'spas',
    name: 'Salons & Spas',
    icon: 'spa',
    description: 'Pre-service consultations, view master stylist availability in real-time, auto-replenish signature products, and book custom treatments.',
    physicalLimitation: 'Waiting room delays and missed repeat sales on organic products.',
    digitalSuperpower: 'Virtual consultations, diagnostic scanner, appointments bookings and express check-in.',
    sampleItems: [
      { name: 'Balinese Clay Scalp Detox', price: '$95', action: 'Book Time' },
      { name: 'Cold-Pressed Baobab Hair Serum', price: '$42', action: 'Ship Home' },
      { name: 'VIP Quiet Treatment Room', price: '$160', action: 'Reserve' }
    ]
  },
  {
    id: 'venues',
    name: 'Entertainment Venues',
    icon: 'theater_comedy',
    description: 'Ticketless digital entry passes, backstage access tokens, bottle service bidding, and real-time community engagement.',
    physicalLimitation: 'Physical ticketing scalping, static seating boundaries, and venue queue friction.',
    digitalSuperpower: 'Dynamic NFC access keys, hybrid in-venue and stream passes, plus real-time crowd auctions for center seats.',
    sampleItems: [
      { name: 'Express NFC VIP Pass', price: '$75', action: 'Instant Buy' },
      { name: 'Backstage Acoustic Access', price: '$110', action: 'Claim Pass' },
      { name: 'Front-Row Seat Upgrade Bid', price: '$60', action: 'Place Bid' }
    ]
  }
];

export const SAMPLE_ITINERARIES: Record<string, DayItinerarySlot[]> = {
  lagos: [
    {
      time: '09:00',
      title: 'Artisan Breakfast at Nok Alara',
      description: 'Reserved garden table with private single-origin roastery tasting and fresh puff-puff pairings.',
      category: 'Culinary',
      badge: 'Table Reserved',
      actionPrompt: 'View Menu & Dietary Preferences'
    },
    {
      time: '11:00',
      title: 'Nike Art Gallery & Heritage Tour',
      description: 'Spatial AR architectural tour guided live by Chief Nike Davies-Okundaye through 5 stories of African textiles.',
      category: 'Culture',
      badge: 'AR Access Ready',
      actionPrompt: 'Open Audio Commentary'
    },
    {
      time: '14:00',
      title: 'Tarkwa Bay Coastal Haven',
      description: 'Priority speedboat transit, private surf locker, and chilled fresh coconut reserve on arrival.',
      category: 'Leisure',
      badge: 'Boat Ticket Confirmed',
      actionPrompt: 'Wayfinding GPS Guide'
    },
    {
      time: '17:00',
      title: 'Alara Concept Boutique Trunk Show',
      description: 'Exclusive preview of contemporary Nigerian designers with live tailor measurements synced to your profile.',
      category: 'Design & Style',
      badge: 'VIP Trunk Pass',
      actionPrompt: 'Browse Exclusive Pieces'
    },
    {
      time: '20:00',
      title: 'Aura Sky Lounge Live Afrohouse Producer Set',
      description: 'Harbour view balcony table with synced digital cocktail menu and soundboard stem access.',
      category: 'Nightlife',
      badge: 'VIP Balcony 04',
      actionPrompt: 'Order Welcome Cocktail'
    }
  ],
  tokyo: [
    {
      time: '08:30',
      title: 'Tsukiji Heritage Matcha & Tamagoyaki',
      description: 'Skip-the-line pass at third-generation master grill with private tea ceremony.',
      category: 'Gastronomy',
      badge: 'Fast Pass Active',
      actionPrompt: 'View Master Bio'
    },
    {
      time: '11:00',
      title: 'Yanaka Artisan Workshop Trail',
      description: 'Walk historic Edo backstreets with local craftspeople weaving traditional washi and lacquerware.',
      category: 'Culture',
      badge: 'Verified Route',
      actionPrompt: 'Start Spatial Audio Tour'
    },
    {
      time: '14:30',
      title: 'Rooftop Botanical Garden at Ginza Six',
      description: 'Private meditation pavilion reservation overlooking Tokyo skyline.',
      category: 'Relaxation',
      badge: 'Quiet Zone Pass',
      actionPrompt: 'Check In'
    },
    {
      time: '18:00',
      title: 'Omakase with Master Morimoto',
      description: 'Counter seating for 8 with synchronized AI translation of seasonal catch origins.',
      category: 'Dining',
      badge: 'Counter Seat 03',
      actionPrompt: 'View Evening Pairing'
    },
    {
      time: '21:00',
      title: 'Shibuya Vinyl Listening Bar Session',
      description: 'Hi-fi tube amplifier listening room with live playlist requests and rare vintage Japanese jazz.',
      category: 'Music',
      badge: 'Priority Entry',
      actionPrompt: 'Request Vinyl Track'
    }
  ]
};

export const PERSONAS: PersonaProfile[] = [
  {
    id: 'music',
    name: 'Music Enthusiast',
    role: 'Stage Hopper & Audiophile',
    icon: 'headphones',
    tag: 'Persona 01',
    description: 'Prioritizes acoustics, artist set times, unexpected secret stages, and back-of-house soundboard immersion.',
    perks: [
      'Live stage schedules & instant artist set updates',
      'Real-time notifications for unannounced DJ pop-ups',
      'Front-row audio stem mixing & backstage artist Q&A'
    ],
    feedHighlights: [
      { time: '20:15', title: 'Secret Afrobeat Jam', subtitle: 'Stage B backstage lounge — 15 mins left' },
      { time: '21:30', title: 'Audio Soundboard Live', subtitle: 'Toggle isolated bass & vocal stems' },
      { time: '22:45', title: 'Encore Vote Triggered', subtitle: 'Cast your vote for the final song' }
    ]
  },
  {
    id: 'food',
    name: 'Food & Drink Lover',
    role: 'Epicurean & Mixology Seeker',
    icon: 'lunch_dining',
    tag: 'Persona 02',
    description: 'Focuses on tasting menus, secret chef pop-ups, artisanal cocktail fast-lanes, and local producer pairings.',
    perks: [
      'Pop-up chef tasting menus & waitlist tracker',
      'Priority craft cocktail bar ordering lane',
      'Sommelier food and wine pairing notes & pairing delivery'
    ],
    feedHighlights: [
      { time: '19:00', title: 'Smoked Suya Flatbread', subtitle: 'Chef pop-up ready for express pickup' },
      { time: '20:45', title: 'Mixologist Masterclass', subtitle: 'Cocktail pairing delivered to your table' },
      { time: '22:00', title: 'Dessert Cart Drop', subtitle: 'Artisanal honey ice cream available now' }
    ]
  },
  {
    id: 'culture',
    name: 'Culture & Art Seeker',
    role: 'Design Collector & Explorer',
    icon: 'palette',
    tag: 'Persona 03',
    description: 'Immerses in gallery walkthroughs, live master artisan demos, bespoke textiles, and heritage storytelling.',
    perks: [
      'Artisan designer spotlight & studio route',
      'Live sculpture build walkthroughs & AR historical overlays',
      'Meet-and-greet creative workshop invites with curators'
    ],
    feedHighlights: [
      { time: '18:30', title: 'Textile Dyeing Live Demo', subtitle: 'Indigo vat opening with master artisan' },
      { time: '19:45', title: 'Sculpture Unveiling', subtitle: 'AR 3D perspective unlocked on mobile' },
      { time: '21:15', title: 'Private Designer Trunk', subtitle: 'Exclusive batch released for Onstaege users' }
    ]
  }
];
