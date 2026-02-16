// ============================================================================
// DEMO DATA - Static data for running the app without backend
// TODO: Re-enable when hooking to backend - replace with API calls
// ============================================================================

export const DEMO_EXPERIENCES = [
  {
    id: 1,
    slug: "handloom-heritage-mangalagiri",
    title: "Handloom Heritage – Mangalagiri",
    category: "Handlooms & Handicrafts",
    location: "Amaravati – Vijayawada",
    duration: "4 hours",
    price: 2500,
    rating: 4.9,
    featured: true,
    imageUrl: "https://cdn.shopify.com/s/files/1/0677/7356/3162/files/IMG_20211110_153731_1024x1024.jpg",
    image: "https://cdn.shopify.com/s/files/1/0677/7356/3162/files/IMG_20211110_153731_1024x1024.jpg",
    description: "Immerse yourself in the ancient art of Mangalagiri handloom weaving. Meet master weavers, understand the intricate process, and witness the creation of iconic cotton sarees that have adorned generations.",
    highlights: [
      "Visit to traditional weaving workshops in Mangalagiri village",
      "Interaction with 3rd generation master weavers",
      "Hands-on weaving demonstration on traditional pit looms",
      "Understanding of natural dyeing techniques using vegetable dyes",
      "Purchase authentic handloom products directly from artisans"
    ],
    whoIsThisFor: "Culture enthusiasts, textile lovers, fashion professionals, NRIs reconnecting with heritage, and anyone passionate about sustainable crafts.",
    included: [
      "Expert cultural facilitator",
      "Workshop entry fees",
      "Traditional South Indian refreshments",
      "Handloom souvenir sample",
      "Bottled water and snacks",
      "Photo documentation of your experience"
    ],
    images: [
      "https://cdn.shopify.com/s/files/1/0677/7356/3162/files/IMG_20211110_153731_1024x1024.jpg",
      "https://images.pexels.com/photos/30776831/pexels-photo-30776831.jpeg",
      "https://www.ecobasketindia.com/cdn/shop/files/wooden-kondapalli-sreemantham-set-6296302.jpg"
    ],
    instagramReels: [],
    pricing: {
      private: { enabled: true, firstAdult: 3600, additionalAdult: 2200, child: 1500 },
      shared: { enabled: true, adult: 2500, child: 1700 },
      group: { enabled: true, tier1: { min: 10, max: 17, pricePerPerson: 2200 }, tier2: { min: 18, max: 25, pricePerPerson: 2000 } }
    },
    addOns: [
      { id: 'addon-1', name: 'Pickup & Drop Off - Vijayawada', description: 'From hotels in Vijayawada', price: 1800, calculationType: 'per_3_guests', active: true },
      { id: 'addon-2', name: 'Pickup & Drop Off - Guntur', description: 'From hotels in Guntur', price: 2300, calculationType: 'per_3_guests', active: true },
      { id: 'addon-3', name: 'Souvenir Kits', description: 'Traditional handloom items', price: 1000, calculationType: 'per_adult', active: true },
      { id: 'addon-4', name: 'Photography / Reels', description: 'Professional documentation', price: 1500, calculationType: 'flat', active: true }
    ],
    availability: [
      { date: '2026-02-20', timeSlots: [{ time: '09:00', bookingType: 'private', maxCapacity: 6, currentBookings: 0, available: true }, { time: '14:00', bookingType: 'shared', maxCapacity: 12, currentBookings: 2, available: true }] },
      { date: '2026-02-21', timeSlots: [{ time: '09:00', bookingType: 'private', maxCapacity: 6, currentBookings: 0, available: true }] },
      { date: '2026-02-22', timeSlots: [{ time: '10:00', bookingType: 'group', maxCapacity: 25, currentBookings: 0, available: true }] }
    ]
  },
  {
    id: 2,
    slug: "culinary-andhra-amaravati",
    title: "Culinary Andhra – Amaravati",
    category: "Culinary",
    location: "Amaravati – Vijayawada",
    duration: "3 hours",
    price: 2200,
    rating: 4.8,
    featured: true,
    imageUrl: "https://cdn.shopify.com/s/files/1/0651/8895/4328/files/Jaggery_Kaju_Badam_Putharekulu_5.png",
    image: "https://cdn.shopify.com/s/files/1/0651/8895/4328/files/Jaggery_Kaju_Badam_Putharekulu_5.png",
    description: "A gastronomic journey through authentic Andhra cuisine. Learn traditional recipes passed down through generations, understand the art of spice combinations, and savor the bold flavors that define Andhra's culinary heritage.",
    highlights: [
      "Traditional home cooking experience in a local family's kitchen",
      "Learn authentic recipes: Gongura Pachadi, Pulihora, Pesarattu",
      "Visit to local spice market with expert guidance",
      "Hands-on cooking session with traditional methods",
      "Full traditional Andhra meal on banana leaf"
    ],
    whoIsThisFor: "Food lovers, cooking enthusiasts, families wanting authentic experiences, NRIs missing home flavors, and culinary explorers.",
    included: [
      "Cultural food facilitator",
      "All ingredients and cooking materials",
      "Recipe booklet with family recipes",
      "Full traditional Andhra meal",
      "Spice kit takeaway (5 essential Andhra spices)",
      "Bottled water and refreshments"
    ],
    images: [
      "https://cdn.shopify.com/s/files/1/0651/8895/4328/files/Jaggery_Kaju_Badam_Putharekulu_5.png",
      "https://images.unsplash.com/photo-1515931215890-366d3990cf8d",
      "https://images.pexels.com/photos/35041654/pexels-photo-35041654.jpeg"
    ],
    instagramReels: [],
    pricing: {
      private: { enabled: true, firstAdult: 3200, additionalAdult: 2000, child: 1200 },
      shared: { enabled: true, adult: 2200, child: 1500 },
      group: { enabled: true, tier1: { min: 10, max: 17, pricePerPerson: 2000 }, tier2: { min: 18, max: 25, pricePerPerson: 1800 } }
    },
    addOns: [
      { id: 'addon-1', name: 'Pickup & Drop Off - Vijayawada', description: '', price: 1800, calculationType: 'per_3_guests', active: true },
      { id: 'addon-2', name: 'Extra Spice Kit', description: 'Additional spice collection', price: 500, calculationType: 'per_adult', active: true },
      { id: 'addon-3', name: 'Photography / Reels', description: '', price: 1500, calculationType: 'flat', active: true }
    ],
    availability: [
      { date: '2026-02-20', timeSlots: [{ time: '10:00', bookingType: 'private', maxCapacity: 8, currentBookings: 0, available: true }, { time: '16:00', bookingType: 'shared', maxCapacity: 12, currentBookings: 3, available: true }] },
      { date: '2026-02-21', timeSlots: [{ time: '10:00', bookingType: 'shared', maxCapacity: 12, currentBookings: 0, available: true }] }
    ]
  },
  {
    id: 3,
    slug: "rk-beach-cultural-walk-vizag",
    title: "RK Beach Cultural Walk – Vizag",
    category: "Heritage",
    location: "Vizag",
    duration: "2 hours",
    price: 1800,
    rating: 4.7,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1710237893364-ff94968aa034?q=80&w=3532",
    image: "https://images.unsplash.com/photo-1710237893364-ff94968aa034?q=80&w=3532",
    description: "Experience the vibrant coastal culture of Visakhapatnam along the iconic RK Beach. Walk through maritime history, understand local fishing traditions, and witness the daily life that has shaped this port city for centuries.",
    highlights: [
      "Sunrise or sunset guided beach walk",
      "Local fishing community interaction",
      "Maritime history and naval heritage storytelling",
      "Beach culture, local traditions, and fishing practices",
      "Authentic local seafood snacks tasting"
    ],
    whoIsThisFor: "Nature lovers, photographers, families, solo travelers, cultural enthusiasts, and anyone seeking coastal heritage experiences.",
    included: [
      "Expert cultural guide",
      "Local snacks and coconut water",
      "Photography spots guidance",
      "Cultural narratives and stories",
      "Bottled water"
    ],
    images: [
      "https://images.unsplash.com/photo-1710237893364-ff94968aa034?q=80&w=3532",
      "https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2024/06/03181005/Length-of-the-Krishna-River.png",
      "https://images.pexels.com/photos/32471935/pexels-photo-32471935.jpeg"
    ],
    instagramReels: [],
    pricing: {
      private: { enabled: true, firstAdult: 2800, additionalAdult: 1600, child: 1000 },
      shared: { enabled: true, adult: 1800, child: 1200 },
      group: { enabled: false, tier1: { min: 10, max: 17, pricePerPerson: 1500 }, tier2: { min: 18, max: 25, pricePerPerson: 1300 } }
    },
    addOns: [
      { id: 'addon-1', name: 'Hotel Pickup - Vizag', description: 'From hotels in Vizag city', price: 800, calculationType: 'per_3_guests', active: true },
      { id: 'addon-2', name: 'Photography / Reels', description: '', price: 1500, calculationType: 'flat', active: true }
    ],
    availability: [
      { date: '2026-02-20', timeSlots: [{ time: '05:30', bookingType: 'private', maxCapacity: 6, currentBookings: 0, available: true }, { time: '17:00', bookingType: 'shared', maxCapacity: 15, currentBookings: 5, available: true }] },
      { date: '2026-02-21', timeSlots: [{ time: '05:30', bookingType: 'shared', maxCapacity: 15, currentBookings: 0, available: true }] }
    ]
  },
  {
    id: 4,
    slug: "tirupati-city-cultural-tour",
    title: "Tirupati City Cultural Tour",
    category: "Temples & Spirituality",
    location: "Tirupati",
    duration: "5 hours",
    price: 3200,
    rating: 4.9,
    featured: true,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg",
    description: "Beyond the main temple – discover the hidden spiritual and cultural gems of Tirupati city. Explore ancient temples, sacred tanks, understand the rich mythology, and experience the spiritual energy that makes this one of the holiest cities in India.",
    highlights: [
      "Visit to lesser-known ancient temples with rich history",
      "Sacred pushkarini (temple tank) rituals and significance",
      "Mythology and storytelling sessions at each site",
      "Traditional prasadam experience at multiple temples",
      "Understanding of local spiritual practices and customs"
    ],
    whoIsThisFor: "Spiritual seekers, history enthusiasts, professionals seeking peace, families on pilgrimage, NRIs connecting with roots.",
    included: [
      "Cultural spiritual facilitator (multilingual)",
      "All temple entry fees and VIP darshan where applicable",
      "Traditional prasadam at each temple",
      "Sacred items kit (kumkum, turmeric, flowers)",
      "Bottled water and traditional snacks",
      "Photo documentation"
    ],
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg",
      "https://hblimg.mmtcdn.com/content/hubble/img/puri/mmt/activities/m_Puri_activity_Mangalagiri%20Temple_l_366_577.jpg",
      "https://i0.wp.com/www.manjulikapramod.com/wp-content/uploads/2021/02/The-renovated-front-portion-of-the-fort-that-leads-into-the-museum-scaled.jpg"
    ],
    instagramReels: [],
    pricing: {
      private: { enabled: true, firstAdult: 4500, additionalAdult: 2800, child: 1800 },
      shared: { enabled: true, adult: 3200, child: 2200 },
      group: { enabled: true, tier1: { min: 10, max: 17, pricePerPerson: 2800 }, tier2: { min: 18, max: 25, pricePerPerson: 2500 } }
    },
    addOns: [
      { id: 'addon-1', name: 'Pickup & Drop Off - Tirupati Railway Station', description: '', price: 1200, calculationType: 'per_3_guests', active: true },
      { id: 'addon-2', name: 'Special Puja Tickets', description: 'VIP darshan at main temples', price: 500, calculationType: 'per_person', active: true },
      { id: 'addon-3', name: 'Souvenir Kits', description: 'Sacred souvenirs', price: 800, calculationType: 'per_adult', active: true },
      { id: 'addon-4', name: 'Photography / Reels', description: '', price: 1500, calculationType: 'flat', active: true }
    ],
    availability: [
      { date: '2026-02-20', timeSlots: [{ time: '06:00', bookingType: 'private', maxCapacity: 6, currentBookings: 0, available: true }, { time: '06:00', bookingType: 'shared', maxCapacity: 12, currentBookings: 4, available: true }] },
      { date: '2026-02-21', timeSlots: [{ time: '06:00', bookingType: 'shared', maxCapacity: 12, currentBookings: 0, available: true }] },
      { date: '2026-02-22', timeSlots: [{ time: '06:00', bookingType: 'group', maxCapacity: 25, currentBookings: 0, available: true }] }
    ]
  },
  {
    id: 5,
    slug: "kondapalli-toys-experience",
    title: "Kondapalli Toys Experience",
    category: "Handlooms & Handicrafts",
    location: "Amaravati – Vijayawada",
    duration: "3 hours",
    price: 2000,
    rating: 4.8,
    featured: true,
    imageUrl: "https://www.ecobasketindia.com/cdn/shop/files/wooden-kondapalli-sreemantham-set-6296302.jpg",
    image: "https://www.ecobasketindia.com/cdn/shop/files/wooden-kondapalli-sreemantham-set-6296302.jpg",
    description: "Witness the centuries-old craft of Kondapalli toy making – a GI-tagged art form unique to Andhra Pradesh. Meet artisan families who have preserved this tradition for generations, and create your own wooden masterpiece.",
    highlights: [
      "Visit to artisan village with 400-year-old toy-making tradition",
      "Traditional toy-making demonstration by master craftsmen",
      "Hands-on toy painting workshop using natural colors",
      "Understanding of Tella Poniki wood and natural dyes",
      "Take home your own hand-painted Kondapalli toy"
    ],
    whoIsThisFor: "Families with kids, art lovers, culture enthusiasts, travelers seeking unique experiences, educators and students.",
    included: [
      "Cultural craft facilitator",
      "All workshop materials",
      "Your handmade painted toy",
      "Traditional South Indian snacks",
      "Bottled water",
      "Photo opportunities with artisans"
    ],
    images: [
      "https://www.ecobasketindia.com/cdn/shop/files/wooden-kondapalli-sreemantham-set-6296302.jpg",
      "https://images.pexels.com/photos/30776831/pexels-photo-30776831.jpeg",
      "https://cdn.shopify.com/s/files/1/0677/7356/3162/files/IMG_20211110_153731_1024x1024.jpg"
    ],
    instagramReels: [],
    pricing: {
      private: { enabled: true, firstAdult: 3000, additionalAdult: 1800, child: 1200 },
      shared: { enabled: true, adult: 2000, child: 1400 },
      group: { enabled: true, tier1: { min: 10, max: 17, pricePerPerson: 1800 }, tier2: { min: 18, max: 25, pricePerPerson: 1600 } }
    },
    addOns: [
      { id: 'addon-1', name: 'Pickup & Drop Off - Vijayawada', description: '', price: 1800, calculationType: 'per_3_guests', active: true },
      { id: 'addon-2', name: 'Extra Toy Kit', description: 'Additional unpainted toy to decorate at home', price: 400, calculationType: 'per_person', active: true },
      { id: 'addon-3', name: 'Photography / Reels', description: '', price: 1500, calculationType: 'flat', active: true }
    ],
    availability: [
      { date: '2026-02-20', timeSlots: [{ time: '10:00', bookingType: 'private', maxCapacity: 8, currentBookings: 0, available: true }, { time: '15:00', bookingType: 'shared', maxCapacity: 15, currentBookings: 6, available: true }] },
      { date: '2026-02-21', timeSlots: [{ time: '10:00', bookingType: 'shared', maxCapacity: 15, currentBookings: 0, available: true }] }
    ]
  },
  {
    id: 6,
    slug: "kondapalli-fort-visit",
    title: "Kondapalli Fort Visit",
    category: "Heritage",
    location: "Amaravati – Vijayawada",
    duration: "3 hours",
    price: 1900,
    rating: 4.6,
    featured: true,
    imageUrl: "https://i0.wp.com/www.manjulikapramod.com/wp-content/uploads/2021/02/The-renovated-front-portion-of-the-fort-that-leads-into-the-museum-scaled.jpg",
    image: "https://i0.wp.com/www.manjulikapramod.com/wp-content/uploads/2021/02/The-renovated-front-portion-of-the-fort-that-leads-into-the-museum-scaled.jpg",
    description: "Explore the historic Kondapalli Fort, perched 300 feet above the plains. Discover 14th-century military architecture, panoramic Krishna valley views, and tales of the Reddy kings, Gajapatis, and the Qutb Shahis who ruled from this strategic stronghold.",
    highlights: [
      "Guided exploration of the 14th-century hilltop fort",
      "Study of military architecture and defensive structures",
      "Panoramic views of Krishna River valley",
      "Stories of Reddy dynasty, Gajapati empire, and Qutb Shahi rule",
      "Archaeological insights and historical context"
    ],
    whoIsThisFor: "History buffs, photographers, adventure seekers, families, students of architecture and history.",
    included: [
      "Expert heritage guide",
      "Fort entry fees",
      "Historical narrative booklet",
      "Bottled water and energy snacks",
      "Photography assistance at key viewpoints"
    ],
    images: [
      "https://i0.wp.com/www.manjulikapramod.com/wp-content/uploads/2021/02/The-renovated-front-portion-of-the-fort-that-leads-into-the-museum-scaled.jpg",
      "https://hblimg.mmtcdn.com/content/hubble/img/puri/mmt/activities/m_Puri_activity_Mangalagiri%20Temple_l_366_577.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg"
    ],
    instagramReels: [],
    pricing: {
      private: { enabled: true, firstAdult: 2800, additionalAdult: 1700, child: 1100 },
      shared: { enabled: true, adult: 1900, child: 1300 },
      group: { enabled: true, tier1: { min: 10, max: 17, pricePerPerson: 1700 }, tier2: { min: 18, max: 25, pricePerPerson: 1500 } }
    },
    addOns: [
      { id: 'addon-1', name: 'Pickup & Drop Off - Vijayawada', description: '', price: 1800, calculationType: 'per_3_guests', active: true },
      { id: 'addon-2', name: 'Photography / Reels', description: '', price: 1500, calculationType: 'flat', active: true }
    ],
    availability: [
      { date: '2026-02-20', timeSlots: [{ time: '07:00', bookingType: 'private', maxCapacity: 8, currentBookings: 0, available: true }, { time: '15:00', bookingType: 'shared', maxCapacity: 15, currentBookings: 0, available: true }] },
      { date: '2026-02-21', timeSlots: [{ time: '07:00', bookingType: 'shared', maxCapacity: 15, currentBookings: 0, available: true }] }
    ]
  },
  {
    id: 7,
    slug: "krishna-yaan",
    title: "Krishna Yaan",
    category: "Nature",
    location: "Amaravati – Vijayawada",
    duration: "2 hours",
    price: 1500,
    rating: 4.7,
    featured: false,
    imageUrl: "https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2024/06/03181005/Length-of-the-Krishna-River.png",
    image: "https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2024/06/03181005/Length-of-the-Krishna-River.png",
    description: "A serene boat journey on the sacred Krishna River – one of the seven sacred rivers of India. Experience the spiritual significance, witness riverside temples and ghats, and understand the river's profound cultural importance to Andhra Pradesh.",
    highlights: [
      "Private boat ride on the sacred Krishna River",
      "Riverside temple views and ghat exploration",
      "Cultural significance and mythology narratives",
      "Spectacular sunset/sunrise over the water",
      "Traditional snacks served on boat"
    ],
    whoIsThisFor: "Nature lovers, spiritual seekers, couples, photographers, families, anyone seeking peaceful cultural immersion.",
    included: [
      "Private boat with experienced guide",
      "Life jackets (safety equipment)",
      "Traditional local snacks",
      "Cultural storytelling throughout",
      "Bottled water"
    ],
    images: [
      "https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2024/06/03181005/Length-of-the-Krishna-River.png",
      "https://images.unsplash.com/photo-1710237893364-ff94968aa034?q=80&w=3532",
      "https://images.pexels.com/photos/32471935/pexels-photo-32471935.jpeg"
    ],
    instagramReels: [],
    pricing: {
      private: { enabled: true, firstAdult: 2200, additionalAdult: 1400, child: 900 },
      shared: { enabled: true, adult: 1500, child: 1000 },
      group: { enabled: false, tier1: { min: 10, max: 17, pricePerPerson: 1300 }, tier2: { min: 18, max: 25, pricePerPerson: 1100 } }
    },
    addOns: [
      { id: 'addon-1', name: 'Pickup & Drop Off - Vijayawada', description: '', price: 1500, calculationType: 'per_3_guests', active: true },
      { id: 'addon-2', name: 'Photography / Reels', description: '', price: 1500, calculationType: 'flat', active: true }
    ],
    availability: [
      { date: '2026-02-20', timeSlots: [{ time: '05:30', bookingType: 'private', maxCapacity: 6, currentBookings: 0, available: true }, { time: '17:00', bookingType: 'shared', maxCapacity: 10, currentBookings: 3, available: true }] },
      { date: '2026-02-21', timeSlots: [{ time: '17:00', bookingType: 'shared', maxCapacity: 10, currentBookings: 0, available: true }] }
    ]
  },
  {
    id: 8,
    slug: "buddhist-stupa-visit",
    title: "Buddhist Stupa Visit",
    category: "Heritage",
    location: "Amaravati – Vijayawada",
    duration: "3 hours",
    price: 2100,
    rating: 4.8,
    featured: false,
    imageUrl: "https://static2.tripoto.com/media/filter/tst/img/24065/Image/1703065489_2.jpg.webp",
    image: "https://static2.tripoto.com/media/filter/tst/img/24065/Image/1703065489_2.jpg.webp",
    description: "Journey through ancient Buddhist heritage at Amaravati – once the largest stupa in India. Explore the historic site, understand early Buddhist art and Satavahana-era architecture, and discover archaeological treasures that reveal 2,000 years of history.",
    highlights: [
      "Exploration of the ancient Amaravati Mahastupa site",
      "Study of Buddhist art, sculptures, and Satavahana craftsmanship",
      "Archaeological site tour with expert interpretation",
      "Early Buddhist history and spread from Amaravati",
      "Museum visit with original limestone reliefs"
    ],
    whoIsThisFor: "History enthusiasts, spiritual seekers, researchers, cultural travelers, students of art and archaeology.",
    included: [
      "Expert heritage archaeologist guide",
      "Site and museum entry fees",
      "Historical documentation booklet",
      "Traditional refreshments",
      "Bottled water",
      "Photography at permitted areas"
    ],
    images: [
      "https://static2.tripoto.com/media/filter/tst/img/24065/Image/1703065489_2.jpg.webp",
      "https://images.pexels.com/photos/35739391/pexels-photo-35739391.jpeg",
      "https://hblimg.mmtcdn.com/content/hubble/img/puri/mmt/activities/m_Puri_activity_Mangalagiri%20Temple_l_366_577.jpg"
    ],
    instagramReels: [],
    pricing: {
      private: { enabled: true, firstAdult: 3200, additionalAdult: 1900, child: 1300 },
      shared: { enabled: true, adult: 2100, child: 1500 },
      group: { enabled: true, tier1: { min: 10, max: 17, pricePerPerson: 1900 }, tier2: { min: 18, max: 25, pricePerPerson: 1700 } }
    },
    addOns: [
      { id: 'addon-1', name: 'Pickup & Drop Off - Vijayawada', description: '', price: 1800, calculationType: 'per_3_guests', active: true },
      { id: 'addon-2', name: 'Photography / Reels', description: '', price: 1500, calculationType: 'flat', active: true }
    ],
    availability: [
      { date: '2026-02-20', timeSlots: [{ time: '08:00', bookingType: 'private', maxCapacity: 8, currentBookings: 0, available: true }, { time: '14:00', bookingType: 'shared', maxCapacity: 15, currentBookings: 2, available: true }] },
      { date: '2026-02-21', timeSlots: [{ time: '08:00', bookingType: 'shared', maxCapacity: 15, currentBookings: 0, available: true }] }
    ]
  },
  {
    id: 9,
    slug: "lakshmi-narasimha-temple-experience",
    title: "Lakshmi Narasimha Temple Experience",
    category: "Temples & Spirituality",
    location: "Mangalagiri – Guntur District",
    duration: "2.5 hours",
    price: 2800,
    rating: 4.9,
    featured: false,
    imageUrl: "https://hblimg.mmtcdn.com/content/hubble/img/puri/mmt/activities/m_Puri_activity_Mangalagiri%20Temple_l_366_577.jpg",
    image: "https://hblimg.mmtcdn.com/content/hubble/img/puri/mmt/activities/m_Puri_activity_Mangalagiri%20Temple_l_366_577.jpg",
    description: "Experience the spiritual grandeur of Mangalagiri's Lakshmi Narasimha Temple – one of the eight sacred Narasimha shrines. Enjoy VIP darshan, participate in ancient rituals, and discover the unique Panakam offering tradition found nowhere else.",
    highlights: [
      "VIP darshan with skip-the-queue access",
      "Cultural storytelling walk through temple complex",
      "Participation in traditional chanting and rituals",
      "Hidden temple narratives and architectural secrets",
      "Sacred Panakam (jaggery water) offering experience"
    ],
    whoIsThisFor: "Spiritual seekers, NRIs on pilgrimage, professionals seeking divine blessings, families, cultural travelers.",
    included: [
      "VIP temple darshan tickets",
      "Cultural spiritual facilitator",
      "Traditional Panakam and prasadam",
      "Sacred cloth, kumkum, and turmeric",
      "Photo documentation at permitted areas",
      "Bottled water and traditional snacks",
      "Insider cultural insights and stories"
    ],
    images: [
      "https://hblimg.mmtcdn.com/content/hubble/img/puri/mmt/activities/m_Puri_activity_Mangalagiri%20Temple_l_366_577.jpg",
      "https://i0.wp.com/www.manjulikapramod.com/wp-content/uploads/2021/02/The-renovated-front-portion-of-the-fort-that-leads-into-the-museum-scaled.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg"
    ],
    instagramReels: [],
    pricing: {
      private: { enabled: true, firstAdult: 4000, additionalAdult: 2500, child: 1600 },
      shared: { enabled: true, adult: 2800, child: 1900 },
      group: { enabled: true, tier1: { min: 10, max: 17, pricePerPerson: 2500 }, tier2: { min: 18, max: 25, pricePerPerson: 2200 } }
    },
    addOns: [
      { id: 'addon-1', name: 'Pickup & Drop Off - Vijayawada', description: '', price: 1500, calculationType: 'per_3_guests', active: true },
      { id: 'addon-2', name: 'Pickup & Drop Off - Guntur', description: '', price: 1800, calculationType: 'per_3_guests', active: true },
      { id: 'addon-3', name: 'Special Puja Tickets', description: 'Abhishekam and special darshan', price: 500, calculationType: 'per_person', active: true },
      { id: 'addon-4', name: 'Souvenir Kits', description: 'Temple souvenirs and sacred items', price: 700, calculationType: 'per_adult', active: true },
      { id: 'addon-5', name: 'Photography / Reels', description: '', price: 1500, calculationType: 'flat', active: true }
    ],
    availability: [
      { date: '2026-02-20', timeSlots: [{ time: '06:00', bookingType: 'private', maxCapacity: 6, currentBookings: 0, available: true }, { time: '06:00', bookingType: 'shared', maxCapacity: 12, currentBookings: 5, available: true }] },
      { date: '2026-02-21', timeSlots: [{ time: '06:00', bookingType: 'shared', maxCapacity: 12, currentBookings: 0, available: true }] },
      { date: '2026-02-22', timeSlots: [{ time: '06:00', bookingType: 'group', maxCapacity: 25, currentBookings: 0, available: true }] }
    ]
  }
];

// Demo testimonials for reviews section
export const DEMO_TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Menon",
    location: "Singapore",
    text: "Not a tour, but a cultural initiation into Andhra. The handloom experience connected me to my roots in ways I never imagined. The master weavers were so welcoming!",
    image: "https://img.freepik.com/free-photo/closeup-smiling-young-beautiful-indian-woman_1262-2261.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Bangalore",
    text: "The Mangalagiri temple experience was transformative. Our facilitator brought the mythology to life with such depth and authenticity. A must-do for spiritual seekers.",
    image: "https://plus.unsplash.com/premium_photo-1682089787056-9ac0c78a2ac2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    rating: 5
  },
  {
    id: 3,
    name: "Anita Reddy",
    location: "USA",
    text: "As an NRI, this was the perfect way to show my kids our cultural heritage. Professional, respectful, and deeply meaningful. Will book again!",
    image: "https://img.freepik.com/free-photo/portrait-beautiful-woman-wearing-traditional-sari-garment_23-2149565121.jpg",
    rating: 5
  },
  {
    id: 4,
    name: "David Thompson",
    location: "London",
    text: "Far beyond typical tourism. The culinary experience was an anthropological journey through Andhra's soul. The spices, the stories – exceptional!",
    image: "https://static.wixstatic.com/media/46ccc2_a3062c765eee46dda40ea47dbede8431~mv2.jpeg/v1/fit/w_320,h_320,q_90,enc_avif,quality_auto/46ccc2_a3062c765eee46dda40ea47dbede8431~mv2.jpeg",
    rating: 5
  }
];

// Demo user for dashboard
export const DEMO_USER = {
  id: 1,
  name: "Demo User",
  email: "demo@andhradarsan.com",
  phone: "+91 98765 43210",
  is_admin: false
};

// Demo admin user
export const DEMO_ADMIN = {
  id: 2,
  name: "Admin User",
  email: "admin@andhradarsan.com",
  phone: "+91 98765 43211",
  is_admin: true
};

// Demo bookings for dashboard
export const DEMO_BOOKINGS = [
  {
    id: "DEMO-001",
    experience_id: 1,
    experienceTitle: "Handloom Heritage – Mangalagiri",
    experience_title: "Handloom Heritage – Mangalagiri",
    date: "2026-02-25",
    time: "09:00 AM",
    guests: { adults: 2, kids: 0 },
    total_price: 7200,
    totalPaid: 7200,
    type: "Private Tour",
    booking_type: "private",
    status: "confirmed",
    addOns: ["Pickup & Drop Off - Vijayawada", "Photography / Reels"],
    customer_name: "Demo User",
    customer_email: "demo@andhradarsan.com",
    customer_phone: "+91 98765 43210"
  },
  {
    id: "DEMO-002",
    experience_id: 2,
    experienceTitle: "Culinary Andhra – Amaravati",
    experience_title: "Culinary Andhra – Amaravati",
    date: "2026-01-15",
    time: "10:00 AM",
    guests: { adults: 2, kids: 1 },
    total_price: 6400,
    totalPaid: 6400,
    type: "Shared Experience",
    booking_type: "shared",
    status: "completed",
    addOns: ["Extra Spice Kit"],
    customer_name: "Demo User",
    customer_email: "demo@andhradarsan.com",
    customer_phone: "+91 98765 43210"
  }
];

// Demo admin stats
export const DEMO_ADMIN_STATS = {
  total_bookings: 24,
  confirmed_bookings: 18,
  cancelled_bookings: 3,
  total_revenue: 156000,
  total_experiences: 9,
  total_users: 45,
  total_subscribers: 128
};

// Demo newsletter subscribers
export const DEMO_SUBSCRIBERS = [
  { id: 1, email: "priya.menon@email.com", subscribed_at: "2026-01-15T10:30:00Z" },
  { id: 2, email: "rajesh.kumar@email.com", subscribed_at: "2026-01-20T14:45:00Z" },
  { id: 3, email: "anita.reddy@email.com", subscribed_at: "2026-02-01T09:15:00Z" },
  { id: 4, email: "david.t@email.com", subscribed_at: "2026-02-10T16:20:00Z" }
];
