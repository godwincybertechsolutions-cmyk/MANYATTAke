import { Itinerary, NavigationLink } from './types';

export const APP_NAME = "New Manyatta Kenya";

/** Maps frontend listing ids to Supabase property slugs */
export const PROPERTY_SLUG_BY_FRONTEND_ID: Record<string, string> = {
  burguret: 'burguret-villa',
  narumoru: 'narumoru-villa',
  weekend: 'weekend-safari',
  laurel: 'laurel-hill-suites',
  alba: 'alba-gardens',
  starroot: 'star-root-residency',
  riverside108: '108-riverside-apartment',
  appletree: 'apple-tree-living',

};

export function resolvePropertySlug(frontendId: string): string {
  return PROPERTY_SLUG_BY_FRONTEND_ID[frontendId] ?? frontendId;
}

const navigationLinks: NavigationLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Mountain Villas', path: '/mountain-villas' },
  { name: 'Apartments', path: '/urban-apartments' },
  { name: 'Safaris', path: '/safaris' },
  { name: 'More', path: '/others' },
];

export const NAVIGATION_LINKS = navigationLinks;

// Image Galleries
export const LAUREL_IMAGES = [
  "/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Balcony Area.jpg",
  "/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bathroom Essentials.jpg",
  "/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bedroom (b).jpg",
  "/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bedroom (c).jpg",
  "/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bedroom (d).jpg",
  "/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bedroom .jpg",
  "/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bedroom Balcony (b).jpg",
  "/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bedroom Balcony.jpg",
  "/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bedroom Overview.jpg",
  "/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Guest Bathroom (b).jpg"
];

export const ALBA_IMAGES = [
  "/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 1/9D5A1976.jpg",
  "/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 1/9D5A1983.jpg",
  "/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 1/9D5A1992.jpg",
  "/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 1/9D5A1998.jpg",
  "/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 1/9D5A2006.jpg",
  "/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 1/9D5A2076.jpg",
  "/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 2/9D5A2019.jpg",
  "/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 2/9D5A2022.jpg",
  "/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 2/9D5A2029.jpg",
  "/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 2/9D5A2033.jpg"
];

export const STAR_ROOT_IMAGES = [
  "/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Bathroom 1.jpg",
  "/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Bathroom.jpg",
  "/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Bedroom 1.jpg",
  "/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Bedroom 2.jpg",
  "/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Bedroom.jpg",
  "/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Entrance.jpg",
  "/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Gym.jpg",
  "/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Kid's Play Area.jpg",
  "/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Kitchen.jpg",
  "/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Living Room 1.jpg",
  "/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Office Area.jpg",
  "/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Pool Area.jpg"
];

export const RIVERSIDE_IMAGES = [
  "/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Balcony .jpg",
  "/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Bathroom .jpg",
  "/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Bedroom (1).jpg",
  "/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Bedroom .jpg",
  "/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside corridor.jpg",
  "/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Gym.jpg",
  "/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Kitchen (1).jpg",
  "/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Laundry area.jpg",
  "/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Living room (1).jpg",
  "/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Living room (2).jpg",
  "/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Living Room (3).jpg",
  "/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside whole building.jpg"
];

export const APPLETREE_IMAGES = [
  "/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Bedroom 1.jpg",
  "/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Bedroom 2.jpg",
  "/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Bedroom 3.jpg",
  "/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Bedroom 5.jpg",
  "/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Bedroom 6.jpg",
  "/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Dining Area.jpg",
  "/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Kitchen.jpg",
  "/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Living Room 1.jpg",
  "/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Living Room 2.jpg",
  "/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Living Room 3.jpg",
  "/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Living Room 4.jpg",
  "/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Living Room.jpg"
];

export const BURGURET_IMAGES = [
  "/assets/Burguret Mountainside Villa/Buruguret. Living area Overview.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Swimming Pool 2.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Living room 1.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. 1st Guest Bedroom .jpg",
  "/assets/Burguret Mountainside Villa/Burguret. 1st Guest Bedroom 2.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. 1st Guest Bedroom 3.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. 2nd Guest Bedroom .jpg",
  "/assets/Burguret Mountainside Villa/Burguret. 2nd Guest Bedroom 2.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. 2nd Guest Bedroom 3.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. 2nd Guest Bedroom 4.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Entrance Pathway.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. House Entrance.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. House Overall View.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. House Side View.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Kitchen 1.0.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Kitchen 1.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Kitchen Appliances.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Kitchen.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Living Room 2.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Living Room Overview.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Living room 3.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Master Bedroom .jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Master Bedroom 2.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Master Bedroom 3.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Master Bedroom walk-in closet.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Outside Lounge Area.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Outside Patio View 2.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Outside Patio View.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Outside Patio dining area.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Outside Patio seating area.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. Swimming Pool 2.jpg"
];

export const BURGURET_VILLA_DETAILS = {
  title: "Burguret Mountain Villa",
  subtitle: "Three Bedroom Villa on the Slopes of Mt. Kenya",
  description: "The Burguret Mountain Villa is a 3-bedroom luxurious bungalow seated on 2.2 acres of African Bush Land filled with 'Leleshwa' Cedar trees. It is a seamless fusion of old British architectural style and Kenyan Lamu coastal designs with most of its furniture handmade from the Coast using Oak tree 'Mvule'.",
  location: {
    main: "Burguret, Kenya",
    sub: "Slopes of Mt Kenya",
    detail: "Close to Burguret River"
  },
  offers: {
    living: [
      "Spacious lounge area with a fireplace",
      "Dining area fitting six people (inside)",
      "Outdoor seating area overlooking the swimming pool",
      "Outdoor dining area for 8 people",
      "Outdoor Patio with Swimming Pool"
    ],
    kitchen: "A fully equipped separate kitchen with a dining area fitting four people.",
    bedrooms: "Three bedrooms all ensuite; one master bedroom with walk-in closet and two guest bedrooms.",
    laundry: "A well-equipped laundry room.",
    amenities: ["Starlink Internet", "Water Dispenser with Drinking Water"],
    facilities: ["2-Car Designated Parking Area", "Staff Quarters on site"]
  },
  services: [
    "24hrs Security Services",
    "Groundskeeper and Housekeeper Services",
    "In-house Chef upon request (not inclusive in accommodation charges)",
    "In-Person Check-In",
    "Car Hire Services (recommended)"
  ],
  surroundings: [
    { name: "Solio Ranch Conservancy", time: "30 mins" },
    { name: "Ol Pejeta Conservancy", time: "30 mins" },
    { name: "Aberdare National Park", time: "50 mins" },
    { name: "Mt. Kenya National Park", time: "30 mins" },
    { name: "Samburu National Reserve", time: "1.5 hours" },
    { name: "Shaba National Reserve", time: "1.5 hours" },
    { name: "Buffalo Springs National Reserve", time: "1.5 hours" },
    { name: "Meru National Park", time: "2-3 hours" }
  ]
};

export const CONCIERGE_1_PHONE = "+254723366462";
export const CONCIERGE_1_DISPLAY = "+254 723 366 462";
export const CONCIERGE_1_WHATSAPP = "https://wa.me/254723366462";

export const CONCIERGE_2_PHONE = "+254741059240";
export const CONCIERGE_2_DISPLAY = "+254 741 059 240";
export const CONCIERGE_2_WHATSAPP = "https://wa.me/254741059240";

// REMOVED DUPLICATE - Keep only one NARUMORU_VILLA_DETAILS
export const NARUMORU_VILLA_DETAILS = {
  title: "Narumoru Mountain Villa",
  subtitle: "Three Bedroom Villa on the Slopes of Mt. Kenya",
  description: "The Narumoru Mountain Villa is one of the most beautiful homes in the area with unique handmade designs and is set on an extraordinary 8-acre piece of forest with over a half kilometer river frontage. Aside from visits from the wildlife such as the Colobus, antelopes, and hundreds of various birds, the Villa offers a quintessence of privacy, and a calm serene surrounding filled with nature.",
  location: {
    main: "Narumoru, Kenya",
    sub: "Bordering Mt Kenya National Park",
    detail: "River Frontage"
  },
  offers: {
    living: [
      "Spacious lounge area with a fireplace",
      "Dining area fitting six people (inside)",
      "Outdoor seating area overlooking the grounds",
      "Outdoor Patio"
    ],
    kitchen: "A fully equipped separate kitchen with a dining area fitting four people.",
    bedrooms: "Three bedrooms and one separate bathroom; one master bedroom ensuite with walk-in closet and two guest bedrooms.",
    laundry: "A well-equipped laundry room.",
    amenities: ["Starlink Internet", "Water Dispenser with Drinking Water"],
    facilities: ["2-Car Designated Parking Area", "Staff Quarters on site", "Camping Site with barbecue area", "Accessible River Frontage"]
  },
  services: [
    "24hrs Security Services",
    "Groundskeeper and Housekeeper Services",
    "In-house Chef upon request (not inclusive in accommodation charges)",
    "In-Person Check-In",
    "Car Hire Services (recommended)"
  ],
  surroundings: [
    { name: "Solio Ranch Conservancy", time: "30 mins" },
    { name: "Ol Pejeta Conservancy", time: "45 mins" },
    { name: "Aberdare National Park", time: "50 mins" },
    { name: "Mt. Kenya National Park", time: "15 mins" },
    { name: "Samburu National Reserve", time: "1.5 hours" },
    { name: "Shaba National Reserve", time: "1.5 hours" },
    { name: "Buffalo Springs National Reserve", time: "1.5 hours" },
    { name: "Meru National Park", time: "2-3 hours" }
  ],
  images: [
    "/assets/NARUMORU%20VACATION%20HOME%20PICS/PHOTO-2026-05-22-11-53-03.jpg",
    "/assets/NARUMORU%20VACATION%20HOME%20PICS/PHOTO-2026-05-18-21-12-43.jpg",
    "/assets/NARUMORU%20VACATION%20HOME%20PICS/PHOTO-2026-05-18-21-13-55.jpg",
    "/assets/NARUMORU%20VACATION%20HOME%20PICS/PHOTO-2026-05-18-21-14-20.jpg",
    "/assets/NARUMORU%20VACATION%20HOME%20PICS/PHOTO-2026-05-18-21-14-51.jpg",
    "/assets/NARUMORU%20VACATION%20HOME%20PICS/PHOTO-2026-05-18-21-15-24.jpg",
    "/assets/NARUMORU%20VACATION%20HOME%20PICS/PHOTO-2026-05-18-21-16-55.jpg",
    "/assets/NARUMORU%20VACATION%20HOME%20PICS/PHOTO-2026-05-18-21-17-22.jpg",
    "/assets/NARUMORU%20VACATION%20HOME%20PICS/PHOTO-2026-05-22-11-53-04.jpg",
    "/assets/NARUMORU%20VACATION%20HOME%20PICS/PHOTO-2026-05-22-11-53-05.jpg"
  ]
};

export const SAFARI_ITINERARIES: Itinerary[] = [
  {
    id: "weekend",
    title: "Weekend Safari",
    duration: "2 Nights",
    locations: ["Aberdare Park", "Ol Pejeta", "Solio Ranch"],
    description: "A quick but intense immersion into the wild, perfect for spotting Rhinos and elusive forest dwellers.",
    image: "/assets/Curated%20Itineraries%20Images/unnamed%20(10).png",
    pricePerPerson: "Price on request",
    itineraryPdf: "/assets/NM%20Safari%20Itinerary-WEEKEND%20SAFARI_compressed.pdf",
    days: [
      {
        day: 1,
        title: "Into the Aberdares",
        activities: ["Morning departure from Nairobi", "Lunch at The Ark", "Afternoon game drive in Aberdare National Park"],
        lodging: "The Ark Lodge"
      },
      {
        day: 2,
        title: "Rhino Sanctuary",
        activities: ["Transfer to Ol Pejeta", "Visit Chimpanzee Sanctuary", "Night game drive"],
        lodging: "Sweetwaters Tented Camp"
      }
    ]
  },
  {
    id: "mountain",
    title: "Best of Mt Kenya",
    duration: "3 Nights",
    locations: ["Mt. Kenya Slopes", "Samburu Reserve"],
    description: "Experience the drastic change in landscapes from lush forests to semi-arid beauty.",
    image: "/assets/Curated%20Itineraries%20Images/unnamed%20(11).png",
    pricePerPerson: "Price on request",
    itineraryPdf: "/assets/NM%20Safari%20Itinerary-BEST%20OF%20MT%20KENYA_compressed.pdf",
    days: [
      {
        day: 1,
        title: "Highland Arrival",
        activities: ["Arrival at Nanyuki", "Equator crossing ceremony", "Acclimatization walk"],
        lodging: "Fairmont Mt. Kenya"
      },
      {
        day: 2,
        title: "Samburu Special 5",
        activities: ["Travel north to Samburu", "Afternoon game drive spotting the Special 5"],
        lodging: "Samburu Intrepids"
      },
      {
        day: 3,
        title: "Culture & Wild",
        activities: ["Morning bush breakfast", "Samburu village visit", "Sunset sundowner"],
        lodging: "Samburu Intrepids"
      }
    ]
  },
  {
    id: "grand",
    title: "Mt Kenya Circuit",
    duration: "8 Nights",
    locations: ["Lake Baringo", "Narumoru", "Meru National Park"],
    description: "The ultimate expedition covering rift valley lakes, highland forests, and remote wilderness.",
    image: "/assets/Curated%20Itineraries%20Images/unnamed%20(12).png",
    pricePerPerson: "Price on request",
    days: [
      { day: 1, title: "Rift Valley Descent", activities: ["Drive to Lake Baringo", "Bird watching boat ride"], lodging: "Island Camp Baringo" },
      { day: 2, title: "Lake Bogoria", activities: ["Visit hot springs", "Flamingo viewing"], lodging: "Island Camp Baringo" },
      { day: 3, title: "Ascent to Narumoru", activities: ["Transfer to Mt. Kenya foothills", "Trout fishing"], lodging: "Kirinyaga Haven" },
      { day: 4, title: "Mountain Slopes", activities: ["Forest hike", "Horseback riding"], lodging: "Kirinyaga Haven" },
      { day: 5, title: "To Meru", activities: ["Drive to Meru National Park", "Elsa's Kopje visit"], lodging: "Elsa's Kopje" },
      { day: 6, title: "Wild Meru", activities: ["Full day game drive", "Bush lunch"], lodging: "Elsa's Kopje" },
      { day: 7, title: "Rhino Sanctuary", activities: ["Visit Meru Rhino Sanctuary"], lodging: "Elsa's Kopje" },
      { day: 8, title: "Return to City", activities: ["Morning flight to Nairobi", "Farewell lunch"], lodging: "N/A" }
    ]
  }
];

export const URBAN_APARTMENTS = [
  {
  id: "laurel",
  name: "Laurel Hill Suites",
  location: "Upper Hill",
  bedrooms: 1,
    salePrice: "Price on request",
    rentLongTerm: "Price on request",
    rentShortTerm: "Price on request",
    image: "/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Reception.jpg",
    features: ["City View", "Rooftop Pool", "Gym Access"],
    images: LAUREL_IMAGES
  },
  {
  id: "alba",
  name: "Alba Gardens",
  location: "Kilimani",
  bedrooms: 2,
    rentLongTerm: "Price on request",
    rentShortTerm: "Price on request",
    image: "/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/RECEPTION/9D5A1854.jpg",
    features: ["Garden Terrace", "Double Parking", "Smart Home System"],
    images: ALBA_IMAGES
  },
  {
    id: "star-root",
    name: "Star Root Residency",
    location: "Kilimani",
    bedrooms: 1,
    rentLongTerm: "Price on request",
    rentShortTerm: "Price on request",
    image: "/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Entrance.jpg",
    features: ["Gym", "Pool Area", "Kid's Play Area"],
    images: STAR_ROOT_IMAGES
  },
  {
    id: "riverside-108",
    name: "108 Riverside Apartment",
    location: "Riverside",
    bedrooms: 1,
    rentLongTerm: "Price on request",
    rentShortTerm: "Price on request",
    image: "/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside whole building.jpg",
    features: ["Gym", "Balcony", "Laundry area"],
    images: RIVERSIDE_IMAGES
  },
  {
    id: "apple-tree",
    name: "Apple Tree Living",
    location: "Syokimau",
    bedrooms: 6,
    rentLongTerm: "Price on request",
    rentShortTerm: "Price on request",
    image: "/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Living Room 1.jpg",
    features: ["Spacious Living Room", "Dining Area", "Large Kitchen"],
    images: APPLETREE_IMAGES
  }
];

export const COFFEE_PRODUCTS = [
  {
    id: 1,
    name: "Mt. Elgon Reserve",
    roast: "Medium Dark",
    price: "Ksh 1,200",
    image: "/assets/Coffee/Mt Elgon Reserve - Coffee Packaging.png",
    notes: "Chocolate, Citrus, Spice"
  },
  {
    id: 2,
    name: "Volcanic Gold",
    roast: "Light",
    price: "Ksh 1,500",
    image: "/assets/Coffee/Volcanic Gold - Coffee Packaging.png",
    notes: "Floral, Berry, Honey"
  }
];

export const CSR_PROJECTS = [
  {
    title: "Youth Talent Foundation",
    description: "Empowering the next generation through sports and mentorship. New Manyatta sponsors the Narumoru United local football team, providing training, equipment, and educational support.",
    image: "/assets/Responsibility/Legacy Academy.jpg",
    reportContent: "The Youth Talent Foundation represents our commitment to nurturing young talent in Narumoru. Recognizing that sports is a powerful vehicle for change, we established a partnership with Narumoru United, our local football team, to transform lives through athletics and mentorship.\n\nOur sponsorship covers comprehensive support: professional coaching, quality equipment, training facilities access, and nutritional programs for over 80 young athletes. But our vision extends beyond the pitch. We've integrated an educational component where players receive tutoring in mathematics, English, and life skills alongside their athletic training.\n\nThe foundation has already impacted 200+ young people in the community. Players who were previously at risk of dropping out of school now balance education with sport. Three of our sponsored athletes have earned scholarships to national sports academies, opening doors that seemed impossible before.\n\nWe organize annual tournaments that bring together youth teams from across the region, creating pathways for talent discovery and healthy competition. Local businesses sponsor prizes and opportunities, strengthening the entire community ecosystem.\n\nBeyond the field, we've established mentorship programs where successful professionals meet with young athletes, sharing their journeys and inspiring belief in possibility. The message is clear: where you come from doesn't determine where you can go.",
    impact: [
      { label: "Youth Athletes Supported", value: "80+" },
      { label: "Lives Impacted", value: "200+" },
      { label: "Scholarship Winners", value: "3" },
      { label: "Community Tournaments", value: "Annual" }
    ]
  }
];

export const BLOG_POSTS = [
  {
    title: "The Magic of Misty Mornings",
    date: "October 12, 2023",
    excerpt: "Why waking up at 5 AM on the slopes of Mt. Kenya is a spiritual experience.",
    image: "/assets/The%20Journal/The%20Magic%20of%20Misty%20Mornings/Sirimon22.jpg",
    author: "Grzegorz Kepski",
    fullContent: "When I first climbed the west face of Batian, night caught us at a point where we could only drive in more pitons and wait until morning, hanging by the rope. It was a long night. Finally, 6 a.m. arrived...\n\nThere's something magical about that hour; the sun slowly rises a blazing red before fading to gold. You feel as if the whole world is waking up just for you – a quiet, beautiful moment to fall in love again, with life, with Mount Kenya. Thirty years have passed since that moment, and the love that was born then endures to this day. Every day I wake before 6 a.m. to experience this spectacle again and again, endlessly.\n\nAt the foot of Mount Kenya, at dawn, you become a silent witness to the birth of light, scent, sometimes fog, the ascent of the absolutely phenomenal Turako. In this single, fleeting hour, the air is saturated with absolute, primal purity, the score of a bird symphony, the moment with the Bongo antelope, and finally, face to face with Nelion, Batian, and his son Lenana - Kirinyaga Kilele\n\nWhoever sleeps past six in the morning may never know her true face. But whoever opens their eyes in time will see a breathtaking moment, will feel the soul of Africa so different from other continents, will understand that Africa, while a geographer's name, is not really another continent, it is another planet."
  },
  {
    title: "Top 5 Safari Essentials",
    date: "September 28, 2023",
    excerpt: "Packing right can make the difference between a good trip and an unforgettable one.",
    image: "/assets/The%20Journal/Top%205%20Safari%20Essentials/africa-safari-packing-list-1-728x450.jpg",
    author: "Sylvester Njuguna",
    fullContent: "After years of guiding safaris across Kenya's greatest reserves, I have learned that preparation transforms an ordinary trip into an unforgettable adventure. Here are the five essentials that no safari traveler should be without.\n\nSunscreen & Hat\nThe African sun is no joke. Bring a wide-brimmed hat, sunscreen and even quality sunglasses. Sunburns can ruin your experience and impact wildlife observation due to discomfort. Long hours outdoors under the African sun make sun protection essential, not optional.\n\nComfortable Shoes\nSafari isn’t always sitting in a vehicle. Walks, lodge grounds and nature trails can demand proper footwear.\n\nLight Jacket\nMorning and evening safaris can be surprisingly cold, while afternoons may be warm. Layers let you adapt without ruining your comfort. Bring a warm fleece or jacket that you can remove as the day heats up. Temperature variations can be 20+ degrees Celsius from dawn to midday.\n\nPower Bank\nBetween photos, videos, navigation and communication, your phone battery can disappear quickly—especially when you’re having the time of your life.\n\nA Reusable Water Bottle\nStay hydrated throughout your adventures while reducing single-use plastic.\n\nAnd of course don’t forget Your Sense of Adventure\nSafari comes with a little dirt, a few curious insects, unexpected detours, and sunsets that may require a walk. Leave the rigid schedule at home—and please don’t expect the wildlife to follow it either!"
  },
  {
    title: "Nairobi's Hidden Gems",
    date: "August 15, 2023",
    excerpt: "Beyond the traffic: finding art, culture, and peace in the capital.",
    image: "/assets/The%20Journal/Nairobi%27s%20Hidden%20Gems/1747299225648.png",
    author: "Christel Joy",
    fullContent: "Did you know Nairobi is the only capital city in Africa with a national park in its boundaries? Witness wildlife against a city skyline at Nairobi National Park, explore the Giraffe Centre, and embrace the vibrant energy of Kenya’s capital—a city with a park in the middle, three forests, and places where you kiss a giraffe while drinking coffee.\n\nNairobi beyond the traffic—the city of contrasts.\n\nBeyond the rush lies a city filled with unexpected pockets of beauty, creativity, and calm. Where a morning can begin slowly with city views and balcony coffee and then be deeply immersed in wildlife, an afternoon can unfold among art and culture, and then sunset can find you surrounded by the sounds and flavours…the energy of modern Kenya. Experiences that feel surprisingly intimate despite being at the heart of a thriving metropolis."
  }
];

export const GALLERY_IMAGES = [
  "/assets/Burguret Mountainside Villa/Burguret. House Overall View.jpg",
  "/assets/Laurel Hill Suites/L6 Rooftop Pool.jpg",
  "/assets/Alba Gardens B1702/A17 Balcony.jpg",
  "/assets/Burguret Mountainside Villa/Burguret. House Overall View.jpg",
  "/assets/Laurel Hill Suites/L6 Lounge Area (b).jpg",
  "/assets/Alba Gardens B1702/A17 Dining Area.jpg"
];

export const CONTACT_PHONE = "+254723366462";
export const CONTACT_PHONE_DISPLAY = "+254 723 366 462";
export const CONTACT_EMAIL = "info@newmanyatta.ke";

export const ADMIN_1_PHONE = "+254723366462";
export const ADMIN_1_DISPLAY = "+254 723 366 462";
export const ADMIN_1_WHATSAPP = "https://wa.me/254723366462";

export const ADMIN_2_PHONE = "+254741059240";
export const ADMIN_2_DISPLAY = "+254 741 059 240";
export const ADMIN_2_WHATSAPP = "https://wa.me/254741059240";

