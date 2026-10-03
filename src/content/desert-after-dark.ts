// Copy for /desert-after-dark — mirrors the Figma frame "03 — Event (Desert
// After Dark)" in "Altas List Desert After Dark" (October 2026 editorial
// redesign). Photos and videos are the ones already live on the site; only
// the dress-code photos come from the Figma file.
export const desertAfterDark = {
  hero: {
    eyebrowLines: ["A private social club", "Scottsdale"],
    headline: "Desert After Dark",
    date: "October 10, 2026",
    place: "Paradise Valley",
    tagline: "powered by Thundr",
    cta: "Request an invitation",
    note: "Ladies are our guests · Gentlemen, by ticket",
    keywords: ["Fashion", "People", "Culture", "Music", "Art", "Paradise Valley"],
    issue: "Issue No. 03",
    // The estate at sunset (Figma hero; the photo already lived on /partner).
    image: "/images/partner/hero-estate-clean.jpg",
  },
  manifesto: {
    eyebrow: "Our manifesto",
    headline: [
      { em: "One", rest: " night." },
      { em: "One", rest: " mansion." },
    ],
    body: "A private-residence runway, live entertainment, elevated bars and bites. An invitation-only night in the heart of Paradise Valley.",
    cta: "Discover the experience",
    // The promo film keeps its place on the page, beside the manifesto.
    video: { src: "/videos/atlas-house-promo.mp4", poster: "/images/dad/hero-fire.jpg" },
  },
  night: {
    eyebrow: "Inside the experience",
    headline: "The night, curated",
    intro: "Six distinct experiences. One unforgettable night. Move through fashion, music, art and connection at a private estate in Paradise Valley.",
    cards: [
      {
        title: "The Runway",
        body: "Six designers you won't see sharing a stage anywhere else. One night, then it's gone.",
        image: "/images/dad/card-runway-2.jpg",
        alt: "Models walking a runway in front of a seated audience",
      },
      {
        title: "The Music",
        body: "ON-1, St Bernard and Aaron Michael trade off behind the decks till last call.",
        image: "/images/dad/card-music-2.jpg",
        alt: "A DJ's hands on the turntable",
      },
      {
        title: "The Bars",
        body: "Two full bars for however you're drinking tonight, and one built for the nights you're not.",
        image: "/images/dad/card-bar.jpg",
        alt: "A bartender garnishing a pink cocktail with mint and a flower",
      },
      {
        title: "Fire Performances",
        body: "Fire, performed close enough to feel it. Performances directed by Sundara Entertainment.",
        image: "/images/dad/card-element.jpg",
        alt: "A fire performer in white on the estate terrace at dusk",
      },
      {
        title: "The Table",
        body: "Private chefs. Plates that keep arriving. Nothing to step away from the conversation for.",
        image: "/images/dad/card-table.jpg",
        alt: "A charcuterie board on a marble counter",
      },
      {
        title: "Art & Automobiles",
        body: "A curated row of Scottsdale's finest, galleries, jewelers and ateliers, dropped into the middle of the party.",
        image: "/images/dad/card-art.jpg",
        alt: "Classic Porsches lined up on a lawn beside framed prints",
      },
    ],
  },
  evening: {
    eyebrow: "The evening in four acts",
    headline: "The evening",
    meta: "Doors 5:30 PM · Address released about 48 hours before",
    acts: [
      { clock: "5:30", title: "Arrival", range: "5:30–7:00 PM", body: "Doors open. Cocktails on the terrace while the estate fills in and the light turns gold." },
      { clock: "7:00", title: "The Show", range: "7:00–8:00 PM", body: "Fire at dusk, then the runway opens and our six designers walk back to back." },
      { clock: "8:00", title: "Mansion Party", range: "8:00–10:00 PM", body: "The whole estate opens up. The DJs take over and the bars stay open." },
      { clock: "10:00", title: "After Party", range: "10:00 PM–12:00 AM", body: "For the guests still standing, until midnight. Details shared on the night." },
    ],
    video: {
      src: "/videos/desert-after-dark-preview.mp4",
      poster: "/images/dad/preview-poster.jpg",
      caption: "Creative visualization informed by the actual property and event direction.",
    },
  },
  designers: {
    eyebrow: "One runway, six designers",
    headline: "Six Designers. One Runway.",
    intro: "Distinct visions, one shared stage. Meet the designers bringing their latest collections to Desert After Dark.",
    // image = the designer's Instagram profile picture.
    list: [
      { name: "Al'mer", label: "Al'mer Designs", handle: "designerkidalmer", image: "/images/designers/designerkidalmer.jpg" },
      { name: "Alexandra Bobo", label: "Adiara Designs", handle: "adiaradesigns", image: "/images/designers/oneofakindaura.jpg" },
      { name: "Bella Elise", label: "Elise Studios", handle: "elisestudiosco", image: "/images/designers/bella-elisse.jpg" },
      { name: "Isaac Newton", label: "Isaac Newton Collection", handle: "isaacnewtoncollection", image: "/images/designers/isaacnewtoncollection.jpg" },
      { name: "Stephanie Azucena", label: "Machechena", handle: "machechena_", image: "/images/designers/machechena_.jpg" },
      { name: "Koanasaky", label: "Koanasaky", handle: "koanasaky", image: "/images/designers/koanasaky.jpg" },
    ],
  },
  dressCode: {
    eyebrow: "Dress code",
    headline: "Desert Sunset",
    tagline: "Golden-hour glamour, not a uniform.",
    body: "Evening gowns and sharp suits, no tux required. Think warm tones, elevated black and a touch of gold. Skip anything cold or silver.",
    swatches: ["#6E2D5C", "#7B4DB1", "#B2327A", "#C97D8A", "#F07A5A", "#B0563A", "#A6937D", "#CBC5AA", "linear-gradient(135deg,#8A6320 0%,#E5B24A 50%,#8A6320 100%)"],
    swatchNames: "Ember · Terracotta · Sand · Gold · Black",
    guide: { label: "Style guidelines", href: "/media/dad-mens-style-board.webp" },
    // The three photos from the Figma dress-code section (the one place the
    // Figma imagery replaces what was live).
    photos: [
      { src: "/images/dad/dress-1.jpg", alt: "A guest in an ivory halter gown with a paisley wrap on the terrace", caption: "Golden-hour gowns" },
      { src: "/images/dad/dress-2.jpg", alt: "A guest in a printed black jacket beside a red sports car", caption: "Sharp, not stiff" },
      { src: "/images/dad/dress-3.jpg", alt: "A guest in a studded magenta dress at night", caption: "Elevated black & gold" },
    ],
    // Still used by the ticket pages' styling section.
    mensBoard: { src: "/media/dad-mens-style-board.webp", alt: "Desert After Dark men's styling guide: sunset tailoring, elevated black and warm neutrals" },
  },
  credits: {
    eyebrow: "Credits",
    headline: "The people behind the night",
    intro: "A collective of creatives, producers and visionaries bringing Desert After Dark to life.",
    columns: [
      {
        title: "Creative & production",
        people: [
          { name: "Devaun", role: "Co-founder & Photographer", image: "/images/team/devaun.jpg" },
          { name: "Michael", role: "Co-founder", image: "/images/host-michael.jpg" },
          { name: "Diana Ferar", role: "Executive Producer", image: "/images/team/dianaferar.jpg" },
          { name: "Yadira Flores", role: "Model Coordinator", image: "/images/team/sheissvenus.jpg" },
          { name: "Johnathan Eden", role: "Transport & Front of House", image: "/images/team/johnathan-eden.jpg", logo: true },
          { name: "Malcolm Marzett", role: "Media Director, MZT 1990 Inc", image: "/images/team/malcom.jpg" },
        ],
      },
      {
        title: "Photography & film",
        // Profile pictures supplied by Michael (Oct 3), matched to each
        // person's Instagram profile picture.
        people: [
          { name: "Raulitoj", role: "@raulitoj", image: "/images/team/raulitoj.jpg" },
          { name: "RJ McBean", role: "@gogetrj", image: "/images/team/rj-mcbean.jpg" },
          { name: "William Almendarez", role: "@almendarez.william", image: "/images/team/william-almendarez.jpg" },
          { name: "Cayson", role: "@cv___media", image: "/images/team/cayson.jpg" },
          { name: "Neil Ward", role: "@onward_photos", image: "/images/team/neil-ward.jpg" },
          { name: "Hannah Sierra", role: "@sudokumedia", image: "/images/team/hannah-sierra.jpg" },
        ],
      },
      {
        title: "On stage & sound",
        people: [
          { name: "Carrie Seller", role: "Host of the evening", image: "/images/team/carrie-seller.jpg" },
          { name: "Ashley Crossley", role: "Intermission performance", image: "/images/team/ashley-crossley.jpg" },
          { name: "Avery", role: "Fashion show DJ", image: "/images/team/avery.jpg" },
          { name: "Sundara Entertainment", role: "Fire performances", image: "/images/team/sundara.jpg" },
          { name: "St Bernard · On1", role: "Party & after-party DJs", image: "/images/team/st-bernard-on1.jpg" },
          { name: "Aaron Michael · Jay", role: "DJs", image: "/images/team/aaron-michael-jay.jpg" },
        ],
      },
    ],
  },
  partners: {
    eyebrow: "In partnership",
    headline: "Built with the ones who make it happen",
    cta: "See partnerships",
    cards: [
      { name: "Thundr", role: "Title partner", body: "Powering extraordinary experiences at the intersection of culture and community." },
      { name: "Opul3nce", role: "Production partner", body: "Creative production and experiential events built to a higher standard." },
      { name: "The Atlas List", role: "Presented by", body: "A private social club for culture, connection and extraordinary people." },
    ],
    vendorsLabel: "Exclusive vendors",
    vendors: ["Rootbitters", "The Guilded Table", "Galleria of Nature", "Soundmoverz", "The Event Co", "Opul3nce", "Laundry Sauce", "Thundr", "Sundara"],
  },
  apply: {
    eyebrow: "Apply",
    headline: "Request your invitation",
    subhead:
      "Desert After Dark is by application, not open sale. Tell us a little about you. If you're approved, we'll follow up with RSVP details and the address.",
    notes: [
      {
        label: "A note on admission",
        text: "Ladies are our guests for the evening. For gentlemen, ticket details are shared once your application is approved.",
      },
      {
        label: "A note on transportation",
        text: "Parking at the estate is limited, so we're providing a driver for you. Pickup is at Uptown Plaza, and you'll be escorted to the estate in style. Pickup times are shared with approved guests about 48 hours before the event.",
      },
    ],
  },
} as const;
