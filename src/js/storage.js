/**
 * LUMORA EVENTS - Storage & Mock Database Management
 * Persists demo state in localStorage
 */

const STORAGE_KEYS = {
  THEME: 'lumora_theme',
  RTL: 'lumora_rtl',
  USER: 'lumora_current_user',
  BOOKINGS: 'lumora_bookings',
  PROPOSALS: 'lumora_proposals',
  PACKAGES: 'lumora_packages',
  WEDDING_PACKAGES: 'lumora_wedding_packages',
  WEDDING_THEMES: 'lumora_wedding_themes',
  NOTIFICATIONS: 'lumora_notifications',
  MESSAGES: 'lumora_messages',
  PAYMENTS: 'lumora_payments'
};

// Initial Seed Data
const DEFAULT_BOOKINGS = [
  {
    id: 'EVT-2026-081',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '+1 (555) 234-5678',
    eventType: 'Birthday Party',
    eventName: '30th Golden Jubilee Birthday',
    venueType: 'Indoor Ballroom',
    location: 'The Grand Sapphire Ballroom, Downtown',
    date: '2026-11-28',
    time: '18:30',
    guests: 85,
    theme: 'Royal Gold & Champagne',
    package: 'Premium',
    price: 1990,
    depositPaid: 1000,
    status: 'Confirmed',
    notes: 'Requires 3-tier chocolate velvet cake, fairy lights backdrop, and live saxophonist.',
    createdAt: '2026-10-15'
  },
  {
    id: 'EVT-2026-094',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '+1 (555) 234-5678',
    eventType: 'Beach Celebration',
    eventName: 'Sunset Seaside Anniversary Gala',
    venueType: 'Beach Resort',
    location: 'Malibu Sunset Cove Beach Gazebo',
    date: '2026-12-14',
    time: '16:00',
    guests: 45,
    theme: 'Tropical Paradise & Warm Amber',
    package: 'Luxury',
    price: 3450,
    depositPaid: 1500,
    status: 'In Progress',
    notes: 'Floating candles, seafood barbecue spread, bohemian lounge seating.',
    createdAt: '2026-10-22'
  },
  {
    id: 'EVT-2026-105',
    customerName: 'Michael Brown',
    customerEmail: 'm.brown@techcorp.io',
    customerPhone: '+1 (555) 890-1234',
    eventType: 'Corporate Event',
    eventName: 'Annual Innovation Tech Summit & Awards',
    venueType: 'Rooftop Lounge',
    location: 'Skyline Terrace, 42nd Floor',
    date: '2026-12-05',
    time: '19:00',
    guests: 180,
    theme: 'Modern Luxe Minimalist',
    package: 'Luxury',
    price: 5200,
    depositPaid: 2600,
    status: 'Confirmed',
    notes: 'Stage backdrop with LED panels, branded cocktail stations, DJ setup.',
    createdAt: '2026-10-28'
  },
  {
    id: 'EVT-2026-112',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@gmail.com',
    customerPhone: '+1 (555) 432-8765',
    eventType: 'Baby Shower',
    eventName: 'Pastel Dreams Welcome Baby Shower',
    venueType: 'Enchanted Garden',
    location: 'Rosewood Botanic Pavilion',
    date: '2027-01-18',
    time: '14:00',
    guests: 60,
    theme: 'Pastel Dream Cloud',
    package: 'Premium',
    price: 1850,
    depositPaid: 500,
    status: 'Pending',
    notes: 'Floral arches in blush pink, white macaron tower, photo booth.',
    createdAt: '2026-11-05'
  },
  {
    id: 'EVT-2026-118',
    customerName: 'David & Amanda Vance',
    customerEmail: 'vance.wedding@example.com',
    customerPhone: '+1 (555) 778-9900',
    eventType: 'Wedding Reception',
    eventName: 'Ethereal Garden Wedding Soirée',
    venueType: 'Destination Resort',
    location: 'Villa Bella Vista Estate, Montecito',
    date: '2027-02-14',
    time: '17:00',
    guests: 150,
    theme: 'Enchanted Garden & Crystals',
    package: 'Luxury',
    price: 6800,
    depositPaid: 3400,
    status: 'Confirmed',
    notes: '2000 fairy lights, 5-course plated dinner, string quartet.',
    createdAt: '2026-11-08'
  }
];

const DEFAULT_PROPOSALS = {
  decor: [
    {
      id: 'DEC-01',
      title: 'Royal Champagne & Plum Celestial Theme',
      category: 'Decoration Proposal',
      description: 'Handcrafted floral arches with deep magenta roses, cascading fairy light canopy, and gold rim mirror tables.',
      price: '$1,250',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      status: 'Approved',
      elements: ['Custom Acrylic Welcome Arch', 'LED Fairy Light Ceiling Canopy', '40 Velvet Plum Cushioned Chairs', 'Candelabra Centerpieces']
    },
    {
      id: 'DEC-02',
      title: 'Bohemian Sunset Dune Lounge',
      category: 'Outdoor Beach Proposal',
      description: 'Low wooden tables, woven jute rugs, pampas grass florals, and warm ambient lantern pathways.',
      price: '$1,650',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      status: 'Under Review',
      elements: ['Pergola with Draped Chiffon', 'Moroccan Brass Lanterns', 'Custom Neon Sign', 'Firepit Surrounds']
    }
  ],
  menu: [
    {
      id: 'MNU-01',
      title: 'The Lumora Grand Tasting Experience',
      type: 'Plated 4-Course Gourmet',
      description: 'Curated by Executive Chef Antoine: Truffle burrata, slow-braised beef tenderloin or herb-crusted Chilean sea bass, and raspberry molten cake.',
      pricePerGuest: '$85 / guest',
      dietary: ['Vegetarian Option', 'Gluten-Free Available', 'Nut-Free Certified'],
      status: 'Approved'
    },
    {
      id: 'MNU-02',
      title: 'Artisan Tapas & Signature Cocktail Bar',
      type: 'Interactive Grazing & Canapés',
      description: 'Live oyster shucking bar, Spanish charcuterie, truffle arancini, and two signature botanical mocktails/cocktails.',
      pricePerGuest: '$65 / guest',
      dietary: ['Halal Options', 'Vegan Friendly', 'Dairy-Free'],
      status: 'Under Review'
    }
  ]
};

const DEFAULT_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Booking Confirmed!',
    message: 'Your 30th Golden Jubilee Birthday booking at The Grand Sapphire Ballroom has been confirmed.',
    time: '2 hours ago',
    unread: true,
    type: 'success'
  },
  {
    id: 2,
    title: 'Decor Proposal Updated',
    message: 'Our head decorator added high-res 3D moodboards to your Sunset Seaside Anniversary proposal.',
    time: 'Yesterday',
    unread: true,
    type: 'info'
  },
  {
    id: 3,
    title: 'Installment Reminder',
    message: 'Second installment for Malibu Sunset Cove is due on Dec 1st, 2026.',
    time: '3 days ago',
    unread: false,
    type: 'warning'
  }
];

const DEFAULT_MESSAGES = [
  {
    id: 1,
    name: 'Jessica Miller',
    email: 'jess.m@yahoo.com',
    phone: '+1 (555) 345-6789',
    eventInterest: 'Destination Beach Wedding',
    date: '2026-11-12',
    subject: 'Inquiry for 120 guests beach resort wedding in March',
    message: 'Hello Lumora team, we love your sunset beach setup. We would love to know if you can coordinate travel accommodations for out-of-town guests.',
    status: 'New'
  },
  {
    id: 2,
    name: 'Robert Sterling',
    email: 'r.sterling@sterlingbrands.com',
    phone: '+1 (555) 998-2211',
    eventInterest: 'Corporate Gala',
    date: '2026-11-10',
    subject: 'End of Year Corporate Awards Banquet',
    message: 'Looking for a proposal for 250 executives with live jazz band and audiovisual presentation stage.',
    status: 'Replied'
  }
];

const DEFAULT_WEDDING_PACKAGES = {
  essential: {
    id: 'pkg-essential',
    name: 'Essential Wedding',
    price: 2500,
    guestLimit: 75,
    tagline: 'Refined intimate elegance for classic celebrations',
    inclusions: [
      'Lead Wedding Coordinator (Full Day)',
      'Custom Ceremony Floral Arch',
      'Table Linens & Silk Napkins (up to 75 guests)',
      '2700K Candlelit Table Votives',
      'Sound & Ambient Lighting Setup',
      'Standard Setup & Tear-down'
    ]
  },
  luxury: {
    id: 'pkg-luxury',
    name: 'Luxury Wedding',
    price: 5800,
    guestLimit: 150,
    tagline: 'Our signature bespoke aesthetic for luxury couples',
    featured: true,
    inclusions: [
      'Senior Designer + 2 Coordinators',
      'Grand 14ft Royal Floral Wedding Stage',
      'Austrian Crystal Chandeliers & Dimmers',
      'Velvet / Chiavari Chairs (up to 150 guests)',
      'Personalized Calligraphy Stationery & Menus',
      'Full 360° Venue Design & Layout Approval',
      'Cold Spark Machine Grand Exit'
    ]
  },
  royal: {
    id: 'pkg-royal',
    name: 'Royal Wedding',
    price: 12500,
    guestLimit: 300,
    tagline: 'Palatial extravagance and architectural grandeur',
    inclusions: [
      'Master Event Director + 5 Person Concierge Team',
      'Monolithic Floral Sculptures & Flower Ceiling',
      'Mirror-Gloss Runway & High-Gloss Dance Floor',
      'Custom Monogram Entrance Archway & Tunnel',
      'Full Intelligent Dynamic Lighting Choreography',
      'Live Chamber Strings & Cocktail Lounge Styling',
      'VIP Green Room & Champagne Bar Setup'
    ]
  },
  bespoke: {
    id: 'pkg-bespoke',
    name: 'Bespoke Signature',
    price: 25000,
    guestLimit: 500,
    tagline: 'Turnkey haute couture production for milestone destination weddings',
    inclusions: [
      'Executive Creative Director & Global Logistics Team',
      'Unlimited Guests & Bespoke Floor Architecture',
      'Imported Haute Couture Florals from France & Ecuador',
      'Custom Constructed Glass Pavilions or Marquees',
      'Multi-Day Itinerary Styling (Rehearsal + Gala + Brunch)',
      'Drone 4K Cinema Live Stream & VR Archiving',
      'Celebrity Artist & Private Chef Hospitality'
    ]
  }
};

const DEFAULT_WEDDING_THEMES = {
  'royal-gold': {
    id: 'royal-gold',
    name: 'Royal Plum & Gold',
    subtitle: 'Regal Velvet & Gilded Candelabras',
    panorama: 'assets/images/panorama-wedding-luxury-360.jpg',
    colors: ['#56334F', '#D6B887', '#17151A', '#ECD2B2'],
    colorNames: ['Deep Plum', 'Champagne Gold', 'Obsidian Charcoal', 'Soft Cream'],
    flowers: 'Cascading White & Ivory Ecuadorian Roses, White Orchids',
    chandeliers: 'Cascading Austrian Crystal Multi-Tier Chandeliers',
    stage: '14ft Royal Floral Arch with Gold Leaf Detailing',
    arch: 'Grand Mirrored Monogram Entrance Gate',
    tables: 'Mirror-Gloss Imperial Banquet Tables',
    chairs: 'Velvet Plum Cushioned Louis XVI Chairs',
    lighting: 'Warm 2700K Candlelight & Crystal Glow',
    basePriceModifier: 0
  },
  'pastel-whimsical': {
    id: 'pastel-whimsical',
    name: 'Pastel Whimsical',
    subtitle: 'Blush Rose Clouds & Ethereal Romance',
    panorama: 'assets/images/panorama-ballroom-day-360.jpg',
    colors: ['#F7D6E0', '#D6B887', '#B5838D', '#FAF8F5'],
    colorNames: ['Blush Rose', 'Champagne Gold', 'Dusty Mauve', 'Dewdrop White'],
    flowers: 'Blush Garden Peonies, Sweet Peas & White Wisteria',
    chandeliers: 'Delicate Crystal Pendants with Flowing Chiffon Ribbon',
    stage: 'Organic Floral Cloud Canopy & Curved Runway',
    arch: 'Curved Wisteria & Garden Rose Tunnel Arch',
    tables: 'Soft Chiffon Draped Tables with Glass Votives',
    chairs: 'Whitewashed French Cross-Back Chairs',
    lighting: 'Soft Daylight Glow & Fairy Light Sparkle',
    basePriceModifier: -200
  },
  'tropical-sunset': {
    id: 'tropical-sunset',
    name: 'Tropical Sunset',
    subtitle: 'Amber Terracotta & Coastal Dune Pavilion',
    panorama: 'assets/images/panorama-oceanfront-night-360.jpg',
    colors: ['#E07A5F', '#D6B887', '#3D405B', '#81B29A'],
    colorNames: ['Sunset Terracotta', 'Champagne Sand', 'Deep Ocean', 'Palm Green'],
    flowers: 'Sun-Bleached Pampas Grass, Orchids & King Proteas',
    chandeliers: 'Hand-Pierced Moroccan Brass Pendants',
    stage: 'Bleached Bamboo Pavilion with Billowing Drapes',
    arch: 'Organic Bamboo & Pampas Coastal Archway',
    tables: 'Low Bohemian Feasting Tables with Textured Brass Trays',
    chairs: 'Handwoven Rattan & Teak Lounge Seating',
    lighting: 'Beachside Firepit Hearths & Tiki Torch Avenues',
    basePriceModifier: 350
  },
  'enchanted-garden': {
    id: 'enchanted-garden',
    name: 'Enchanted Garden',
    subtitle: 'Botanical Glasshouse & 5,000 Fairy Lights',
    panorama: 'assets/images/panorama-orangery-night-360.jpg',
    colors: ['#2D5A27', '#D6B887', '#56334F', '#FAF8F5'],
    colorNames: ['Forest Fern', 'Champagne Gold', 'Royal Plum', 'Living Moss White'],
    flowers: 'Climbing Jasmine, English Garden Ivy & White Calla Lilies',
    chandeliers: '5,000 Suspended Warm Micro-Fairy Lights Canopy',
    stage: 'Wrought-Iron Botanical Cathedral Arch & Moss Mirror',
    arch: 'Living Subtropical Fern & White Rose Archway',
    tables: 'Continuous Century-Old Tuscan Oak Banquet Tables',
    chairs: 'Gold Bamboo Chiavari Chairs with Foliage Sprigs',
    lighting: 'Constellation Fairy Lights & Floating Glass Candle Votives',
    basePriceModifier: 400
  },
  'ivory-pearl': {
    id: 'ivory-pearl',
    name: 'Ivory & Pearl',
    subtitle: 'Haute Couture Satin & Monochromatic Majesty',
    panorama: 'assets/images/panorama-ivory-pearl-360.jpg',
    colors: ['#FFFFFF', '#ECD2B2', '#D6B887', '#E5E5E5'],
    colorNames: ['Pure Ivory', 'Pearl Shimmer', 'Champagne Accent', 'Thassos Silver'],
    flowers: 'All-White Ecuadorian Grand Roses, Gardenias & Calla Lilies',
    chandeliers: 'Pearl-Beaded Cascading Crystal Chandeliers',
    stage: 'Monolithic All-White Rose Wall & Mirror-Polished Platform',
    arch: 'Towering 16ft Cascading White Orchid Archway',
    tables: 'Heavy Duchess Satin Silk Linens with Pearl Charger Plates',
    chairs: 'Clear Crystal Ghost Chairs with Monogram Seat Cushions',
    lighting: 'Soft Pearl Ambient Uplighting & Candelabra Starlight',
    basePriceModifier: 600
  },
  'modern-blackgold': {
    id: 'modern-blackgold',
    name: 'Modern Black & Gold',
    subtitle: 'Obsidian Velvet & 24k Gilded Architecture',
    panorama: 'assets/images/panorama-modern-blackgold-360.jpg',
    colors: ['#17151A', '#D6B887', '#221E26', '#E5C07B'],
    colorNames: ['Obsidian Black', '24k Brushed Gold', 'Midnight Charcoal', 'Metallic Amber'],
    flowers: 'Black Velvet Calla Lilies, Gold-Dusted Anthuriums & Dried Palm',
    chandeliers: 'Architectural Geometric Brushed 24k Gold Pendants',
    stage: 'Brushed Brass Structural Frame with Black Mirror Runway',
    arch: 'Double Geometric Gold Hexagon Arch with Integrated Neon Monogram',
    tables: 'High-Gloss Obsidian Mirror Tables with Gold Rim Stemware',
    chairs: 'Matte Black Wire & Gilded Brass Frame Chairs',
    lighting: 'Dynamic 2700K Architectural Pin-Spotting & Cold Sparks',
    basePriceModifier: 750
  }
};

// LocalStorage Helper Utilities
const Storage = {
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`Storage read error for key ${key}:`, e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Storage write error for key ${key}:`, e);
    }
  },

  init() {
    if (!this.get(STORAGE_KEYS.BOOKINGS)) {
      this.set(STORAGE_KEYS.BOOKINGS, DEFAULT_BOOKINGS);
    }
    if (!this.get(STORAGE_KEYS.PROPOSALS)) {
      this.set(STORAGE_KEYS.PROPOSALS, DEFAULT_PROPOSALS);
    }
    if (!this.get(STORAGE_KEYS.NOTIFICATIONS)) {
      this.set(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS);
    }
    if (!this.get(STORAGE_KEYS.MESSAGES)) {
      this.set(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
    }
    if (!this.get(STORAGE_KEYS.WEDDING_PACKAGES)) {
      this.set(STORAGE_KEYS.WEDDING_PACKAGES, DEFAULT_WEDDING_PACKAGES);
    }
    if (!this.get(STORAGE_KEYS.WEDDING_THEMES)) {
      this.set(STORAGE_KEYS.WEDDING_THEMES, DEFAULT_WEDDING_THEMES);
    }
    if (!this.get(STORAGE_KEYS.USER)) {
      this.set(STORAGE_KEYS.USER, {
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '+1 (555) 234-5678',
        role: 'client',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        memberSince: 'March 2025'
      });
    }
  },

  // Wedding packages and themes operations
  getWeddingPackages() {
    return this.get(STORAGE_KEYS.WEDDING_PACKAGES, DEFAULT_WEDDING_PACKAGES);
  },

  saveWeddingPackages(pkgs) {
    this.set(STORAGE_KEYS.WEDDING_PACKAGES, pkgs);
  },

  getWeddingThemes() {
    return this.get(STORAGE_KEYS.WEDDING_THEMES, DEFAULT_WEDDING_THEMES);
  },

  saveWeddingThemes(themes) {
    this.set(STORAGE_KEYS.WEDDING_THEMES, themes);
  },

  // Booking operations
  getBookings() {
    return this.get(STORAGE_KEYS.BOOKINGS, DEFAULT_BOOKINGS);
  },

  addBooking(booking) {
    const bookings = this.getBookings();
    const newId = `EVT-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newBooking = {
      ...booking,
      id: newId,
      status: 'Pending',
      depositPaid: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    bookings.unshift(newBooking);
    this.set(STORAGE_KEYS.BOOKINGS, bookings);

    // Create notification
    const notifications = this.get(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS);
    notifications.unshift({
      id: Date.now(),
      title: 'Event Request Submitted',
      message: `Your booking request for ${booking.eventName || booking.eventType} has been received. Our planning coordinator is reviewing it!`,
      time: 'Just now',
      unread: true,
      type: 'info'
    });
    this.set(STORAGE_KEYS.NOTIFICATIONS, notifications);

    return newBooking;
  },

  updateBookingStatus(id, newStatus) {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index].status = newStatus;
      this.set(STORAGE_KEYS.BOOKINGS, bookings);
      return true;
    }
    return false;
  },

  deleteBooking(id) {
    let bookings = this.getBookings();
    bookings = bookings.filter(b => b.id !== id);
    this.set(STORAGE_KEYS.BOOKINGS, bookings);
  },

  // Messages operations
  getMessages() {
    return this.get(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
  },

  addMessage(msg) {
    const messages = this.getMessages();
    messages.unshift({
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'New',
      ...msg
    });
    this.set(STORAGE_KEYS.MESSAGES, messages);
  },

  // User operations
  getCurrentUser() {
    return this.get(STORAGE_KEYS.USER, {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      role: 'client'
    });
  },

  setCurrentUser(user) {
    this.set(STORAGE_KEYS.USER, user);
  },

  clearCurrentUser() {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};

// Global logout fallback
if (typeof window !== 'undefined' && !window.logoutUser) {
  window.logoutUser = function () {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch(e) {}
    if (window.showToast) window.showToast('You have been signed out.', 'info');
    setTimeout(() => { window.location.href = 'login.html'; }, 350);
  };
}

// Initialize right away
Storage.init();

