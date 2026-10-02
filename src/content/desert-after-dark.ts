// Copy for /desert-after-dark — mirrors the Figma frame
// "Desert After Dark — Full Page" (Diana's September 2026 revision).
export const desertAfterDark = {
  hero: {
    eyebrow: "Saturday, October 10, 2026 · 5:30 PM · Paradise Valley",
    headline: "Desert After Dark",
    tagline: "powered by Thundr",
    subhead:
      "One night. One mansion. Paradise Valley's after-dark takeover, curated by The Atlas List — a private-residence runway, live entertainment, elevated bars and bites, and a night built for the senses. Designers, hand-picked models, top-shelf DJs, and a guest list built one name at a time.",
    cta: "Apply for Ticket Allocation",
  },
  night: {
    eyebrow: "What's in Store",
    headline: "How the Night Unfolds",
    intro: "Swipe through everything the evening holds, before you decide where to start.",
    cards: [
      {
        title: "The Runway",
        body: "Four designers you won't see sharing a stage anywhere else. One night, then it's gone.",
        image: "/images/dad/card-runway-2.jpg",
        alt: "Models walking a runway in front of a seated audience",
      },
      {
        title: "The Music",
        body: "ON-1, St Bernard, and Aaron Michael trade off behind the decks till last call.",
        image: "/images/dad/card-music-2.jpg",
        alt: "A DJ's hands on the turntable",
      },
      {
        title: "The Bar",
        body: "Two full bars for however you're drinking tonight, and one built for the nights you're not.",
        image: "/images/dad/card-bar.jpg",
        alt: "A bartender garnishing a pink cocktail with mint and a flower",
      },
      {
        title: "The Element",
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
        title: "The Art",
        body: "A curated row of Scottsdale's finest — galleries, jewelers, ateliers — dropped into the middle of the party.",
        image: "/images/dad/card-art.jpg",
        alt: "Classic Porsches lined up on a lawn beside framed prints",
      },
    ],
  },
  designers: {
    eyebrow: "Featured Designers",
    headline: "One Runway — Four Designers",
    intro:
      "Four designers, each with their own point of view — one night to see all four on the same runway.",
    note: "Listed alphabetically.",
    // image = the designer's Instagram profile picture (from the earlier roster
    // where the person is unchanged).
    list: [
      { name: "Alexandra Bobo", label: "Adiara Designs", handle: "adiaradesigns", image: "/images/designers/oneofakindaura.jpg" },
      { name: "Bella Elise", label: "Designer", handle: "elisestudiosco", image: "/images/designers/bella-elisse.jpg" },
      { name: "Isaac Newton", label: "Isaac Newton Collection", handle: "isaacnewtoncollection", image: "/images/designers/isaacnewtoncollection.jpg" },
      { name: "Stephanie Azucena", label: "Machehchena", handle: "machechena_", image: "/images/designers/machechena_.jpg" },
    ],
  },
  venue: {
    eyebrow: "The Venue",
    headline: "A Private Residence in Paradise Valley",
    body: "This is not a hotel ballroom, not a club, not a public venue. It's a private estate — the kind of place you don't see on the way to work. The exact address is released only to ticketed guests, 72 hours before the door opens. This is how we keep the room the room.",
  },
  timeline: {
    eyebrow: "The Evening",
    headline: "Four Acts",
    intro: "Four moments, one night. The full lineup drops two weeks out.",
    acts: [
      {
        title: "Party",
        time: "5:30pm - 7:00pm",
        body: "Doors open. Cocktails on the terrace while the estate fills in before the show begins.",
      },
      {
        title: "Fashion Show",
        time: "7:00pm - 8:00pm",
        body: "Four designers, one runway. Full production, live music, seated audience. This is the main event.",
      },
      {
        title: "Mansion Party",
        time: "8:00pm - 10:00pm",
        body: "The full estate opens up. DJs take over, the bar is open, and the room becomes what a mansion in Paradise Valley on the right night is supposed to feel like.",
      },
      {
        title: "After Party",
        time: "10:00pm - 12:00am",
        body: "For the guests still standing. Location is released the night of, to the guests we want at it.",
      },
    ],
  },
  dressCode: {
    eyebrow: "Dress Code",
    headline: "Desert Sunset",
    body: "Elevated, not stiff. Evening gowns and sharp suits — no tux required. Think desert sunset: warm tones, elevated black, a touch of gold. Skip anything cold or silver — we're going for golden-hour glamour, not a uniform.",
    // Diana's styling boards (Figma, Sep 26) replace the swatch row. Source
    // PNGs came from the Figma layers "Women's Styling 01–03".
    moodboards: [
      { src: "/images/dad/moodboard-1.jpg", alt: "Desert After Dark dress-code board: rich sunset tones, elevated black, and warm metallic details" },
      { src: "/images/dad/moodboard-2.jpg", alt: "Women's dress code for Desert After Dark" },
      { src: "/images/dad/moodboard-3.jpg", alt: "Desert After Dark dress code: what works and what to avoid" },
    ],
    // Swatch colours sampled from the earlier Figma frame (no longer shown).
    palette: [
      { name: "Dune Blush", hex: "#C97D8A" },
      { name: "Ember Glow", hex: "#F07A5A" },
      { name: "Canyon Clay", hex: "#C59C55" },
      { name: "Golden Hour", hex: "#C9A25A" },
      { name: "Mirage Bloom", hex: "#B2327A" },
      { name: "Dusk Orchid", hex: "#6E2D5C" },
      { name: "Twilight Haze", hex: "#7B4DB1" },
      { name: "Sand Mesa", hex: "#A6937D" },
      { name: "Moonlit Sand", hex: "#CBC5AA" },
      { name: "Midnight Heat", hex: "#0A0A0A" },
      { name: "Sundown Gold", hex: "linear-gradient(90deg,#8A6320 0%,#E5B24A 45%,#C7A13F 70%,#8A6320 100%)" },
    ],
  },
  store: {
    eyebrow: "Whats in Store",
    images: [
      { src: "/images/dad/store-1.jpg", alt: "Guests arriving at the estate" },
      { src: "/images/dad/store-2.jpg", alt: "A guest in lavender on the terrace" },
      { src: "/images/dad/store-3.jpg", alt: "A fire performer" },
      { src: "/images/dad/store-4.jpg", alt: "Guests taking a photo together" },
      { src: "/images/dad/store-5.jpg", alt: "A guest in white with the mountain behind" },
      { src: "/images/dad/store-6.jpg", alt: "Guests taking a selfie together" },
      { src: "/images/dad/store-7.jpg", alt: "Guests in evening dresses talking by the window" },
      { src: "/images/dad/store-8.jpg", alt: "The production crew filming on the terrace at night" },
      { src: "/images/dad/store-9.jpg", alt: "A fire performer at sunset with the mountain behind" },
      { src: "/images/dad/store-10.jpg", alt: "Guests on the pool terrace in the afternoon" },
    ],
  },
  team: {
    eyebrow: "Production",
    headline: "The team behind the night",
    intro: "The people doing the unglamorous work that makes the glamorous part look effortless.",
    // `link: false` would mark a placeholder handle that shouldn't open
    // Instagram yet; `logo: true` marks a brand mark instead of a portrait.
    people: [
      { name: "Devaun", title: "Co-Founder & Photographer", handle: "devaunlennox", image: "/images/team/devaun.jpg" },
      { name: "Michael", title: "Co-Founder", handle: "whoismikemartin", image: "/images/host-michael.jpg" },
      { name: "Diana Ferar", title: "Executive Producer", note: "Dee Creator 360", handle: "dianaferar", image: "/images/team/dianaferar.jpg" },
      // Johnathan's tile carries the OPUL3NCE mark rather than a portrait.
      { name: "Johnathan Eden", title: "Transport & Front of House", note: "OPUL3NCE", handle: "opul3nce.io", image: "/images/team/johnathan-eden.jpg", logo: true },
      { name: "Yadira Flores", title: "Model Coordinator", handle: "sheissvenus", image: "/images/team/sheissvenus.jpg" },
      { name: "Malcolm Marzett", title: "Media Director", note: "MZT 1990 INC", handle: "mjmmzt", image: "/images/team/malcom.jpg" },
    ],
  },
  partnership: {
    eyebrow: "Partnership",
    headline: "A few partnerships remain",
    subhead: "Own a category. Not a logo placement.",
    cta: "See Partnerships",
    href: "/partner",
  },
  apply: {
    eyebrow: "Apply",
    headline: "Request your ticket allocation",
    subhead:
      "Tickets to Desert After Dark are allocated by application, not by open sale. Tell us about you below — it takes about three minutes. If you're approved, we'll follow up with pricing and RSVP instructions.",
  },
} as const;
