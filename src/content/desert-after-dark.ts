// Copy for /desert-after-dark — mirrors the Figma frame
// "Desert After Dark — Full Page".
export const desertAfterDark = {
  hero: {
    eyebrow: "October 10, 2026 · Paradise Valley",
    headline: "Desert After Dark",
    tagline: "powered by Thundr",
    subhead:
      "One night. One mansion. Paradise Valley's after-dark takeover, curated by The Atlas List — a private-residence runway, live entertainment, elevated bars and bites, and a night built for the senses. Designers, hand-picked models, top-shelf DJs, and a guest list built one name at a time.",
    cta: "Apply for Ticket Allocation",
  },
  night: {
    eyebrow: "What's in Store",
    headline: "How the Night Unfolds.",
    intro: "Swipe through everything the evening holds, before you decide where to start.",
    // image: null renders the Figma placeholder slot until a photo is chosen.
    cards: [
      {
        title: "The Runway",
        body: "Six designers you won't see sharing a stage anywhere else. One night, then it's gone.",
        image: "/images/atlas-house-promo-poster.jpg",
        alt: "A model in a black velvet gown beside the pool at dusk",
      },
      {
        title: "The Music",
        body: "Anthoz headlines — Hotsauce, St Bernard, and Aaron Michael trade off behind the decks till last call.",
        image: null,
        alt: "",
      },
      {
        title: "The Bar",
        body: "Two full bars for however you're drinking tonight, and one built for the nights you're not.",
        image: null,
        alt: "",
      },
      {
        title: "The Element",
        body: "Fire, performed close enough to feel it. Who's behind it is still being decided — the heat isn't.",
        image: null,
        alt: "",
      },
      {
        title: "The Table",
        body: "Private chefs. Plates that keep arriving. Nothing to step away from the conversation for.",
        image: null,
        alt: "",
      },
      {
        title: "The Art",
        body: "A curated row of Scottsdale's finest — galleries, jewelers, ateliers — dropped into the middle of the party.",
        image: null,
        alt: "",
      },
    ],
  },
  designers: {
    eyebrow: "Featured Designers",
    headline: "One Runway. Six Designers.",
    intro:
      "Six designers, each with their own point of view — one night to see all six on the same runway.",
    note: "Listed alphabetically.",
    // image = the designer's current Instagram profile picture.
    list: [
      { name: "Alexandra", handle: "oneofakindaura", image: "/images/designers/oneofakindaura.jpg" },
      { name: "Al'mer", handle: "designerkidalmer", image: "/images/designers/designerkidalmer.jpg" },
      { name: "Bella Elisse", handle: "bella.elisse", image: "/images/designers/bella-elisse.jpg" },
      { name: "Isaac Newton", handle: "isaacnewtoncollection", image: "/images/designers/isaacnewtoncollection.jpg" },
      { name: "Koan Asaky", handle: "koanasaky", image: "/images/designers/koanasaky.jpg" },
      { name: "Stephanie Murillo Agandar", handle: "machechena_", image: "/images/designers/machechena_.jpg" },
    ],
  },
  venue: {
    eyebrow: "The Venue",
    headline: "A Private Residence in Paradise Valley.",
    body: "This is not a hotel ballroom, not a club, not a public venue. It's a private estate — the kind of place you don't see on the way to work. The exact address is released only to ticketed guests, 72 hours before the door opens. This is how we keep the room the room.",
  },
  timeline: {
    eyebrow: "The Evening",
    headline: "Four Acts.",
    intro: "Four moments, one night. The full lineup drops two weeks out.",
    acts: [
      {
        title: "VIP Pre-Party",
        time: "3:00pm - 5:00pm",
        body: "Arrive early, sip first — a smaller room, first look at the designers, and space to breathe before the night fills up.",
      },
      {
        title: "Fashion Show",
        time: "6:30pm - 7:15pm",
        body: "Six designers, one runway. Full production, live music, seated audience. This is the main event.",
      },
      {
        title: "Mansion Party",
        time: "7:15pm - 10:00pm",
        body: "The full estate opens up. DJs take over, the bar is open, and the room becomes what a mansion in Paradise Valley on the right night is supposed to feel like.",
      },
      {
        title: "After Party",
        time: "10:00pm - 11:30pm",
        body: "For the guests still standing. Location is released the night of, to the guests we want at it.",
      },
    ],
  },
  dressCode: {
    eyebrow: "Dress Code",
    headline: "Desert Sunset",
    body: "Elevated, not stiff. Evening gowns and sharp suits — no tux required. Think desert sunset: warm tones, elevated black, a touch of gold. Skip anything cold or silver — we're going for golden-hour glamour, not a uniform.",
    // Swatch colours sampled from the Figma frame.
    palette: [
      { name: "Dune Blush", hex: "#C97D8A" },
      { name: "Ember Glow", hex: "#F07A5A" },
      { name: "Canyon Clay", hex: "#E07D4A" },
      { name: "Golden Hour", hex: "#E09A3E" },
      { name: "Mirage Bloom", hex: "#B2327A" },
      { name: "Dusk Orchid", hex: "#6E2D5C" },
      { name: "Twilight Haze", hex: "#7B4DB1" },
      { name: "Sand Mesa", hex: "#A6937D" },
      { name: "Moonlit Sand", hex: "#CBC5AA" },
      { name: "Midnight Heat", hex: "#0A0A0A" },
      { name: "Sundown Gold", hex: "linear-gradient(90deg,#8A6320 0%,#E5B24A 45%,#C7A13F 70%,#8A6320 100%)" },
    ],
  },
  team: {
    eyebrow: "Production",
    headline: "The team behind the night.",
    intro: "The people doing the unglamorous work that makes the glamorous part look effortless.",
    // image = current Instagram profile picture. `link: false` marks a
    // placeholder handle that shouldn't open Instagram yet.
    people: [
      { name: "Diana Ferar", title: "Executive Producer", handle: "dianaferar", image: "/images/team/dianaferar.jpg" },
      { name: "Yadira Flores", title: "Model Coordinator", handle: "sheissvenus", image: "/images/team/sheissvenus.jpg" },
      { name: "Devaun", title: "Co-Founder & Photographer", handle: "devaunlennox", image: "/images/host-devaun.jpg" },
      { name: "Michael", title: "Co-Founder", handle: "whoismikemartin", image: "/images/host-michael.jpg" },
      { name: "Hair & Makeup", note: "Artists to be announced.", handle: "hairstylist/MUA", link: false },
      { name: "Intertainment Media", title: "Lighting Production", note: "Malcom, with assistant TBA.", handle: "mediaco.", link: false },
    ],
  },
  partnership: {
    eyebrow: "Partnership",
    headline: "A few partnerships remain.",
    subhead: "Own a category. Not a logo placement.",
    cta: "See Partnerships",
    href: "/partner",
  },
  apply: {
    eyebrow: "Apply",
    headline: "Request your ticket allocation.",
    subhead:
      "Tickets to Desert After Dark are allocated by application, not by open sale. Tell us about you below. If you're approved, we'll follow up with tier options (General, VIP), pricing, and RSVP instructions.",
  },
} as const;
