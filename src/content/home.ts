// Copy for the home page — mirrors the Figma frame "01 — Home" in
// "Altas List Desert After Dark" (October 2026 editorial redesign).
export const home = {
  hero: {
    eyebrowLines: ["By invitation only", "Scottsdale, Arizona"],
    // Rendered as THE ROOM YOU'VE BEEN *LOOKING* FOR (italic accent).
    headline: { before: "The room you've been ", em: "looking", after: " for" },
    subhead:
      "A private Scottsdale gathering for people who believe chemistry, friendship and access still happen best in the right room.",
    cta: "Apply for an invite",
    secondary: { label: "Desert After Dark · Oct 10", href: "/desert-after-dark" },
    keywords: ["Conversation", "Taste", "Style", "Presence", "Scottsdale"],
    issue: "Issue No. 01",
  },
  howWeGather: {
    eyebrow: "How we gather",
    headline: "Three ways in",
    intro: "Weekly and monthly gatherings return after Desert After Dark. For now, this is the one.",
    ways: [
      { label: "Weekly", body: "Small and intimate. A handful of people, one room, real conversation." },
      { label: "Monthly", body: "A hosted dinner, about 60 to 70 of us. A bigger room with the same warmth." },
      { label: "Yearly · Now booking", body: "The flagship. One night, all out. This year, that's Desert After Dark." },
    ],
  },
  rightNow: {
    eyebrow: "Right now",
    headline: { before: "Desert ", em: "After", after: " Dark" },
    date: "Saturday, October 10, 2026",
    place: "Paradise Valley, AZ",
    body: "Our yearly flagship: a private-residence takeover with a runway, live entertainment and a night built for the senses. It's the one thing on our calendar until it's done.",
    note: "Ladies are our guests · Gentlemen, by ticket",
    cta: "See the event",
    href: "/desert-after-dark",
    secondary: { label: "Request an invitation", href: "#apply" },
    image: { src: "/images/dad/hero-fire.jpg", alt: "A fire performer on the terrace at dusk" },
  },
  quote: {
    eyebrow: "In our words",
    text: "The goal is not to create a party. The goal is to create a room people are proud to be seen in.",
    location: "Rooftop · Scottsdale, AZ · April 2026",
    image: "/images/about/quote-bg-clean.jpg",
  },
  gallery: {
    eyebrow: "Scenes from the last gathering",
    headline: { before: "More from ", em: "the room", after: "" },
    intro:
      "Our last gathering brought together a small, polished room of Scottsdale locals for an evening of conversation, connection and effortless introductions.",
    caption: "From a recent monthly gathering",
    photos: [
      { src: "/images/home/gathering-1.jpg", alt: "Guests talking at the bar during a monthly gathering" },
      { src: "/images/home/gathering-2.jpg", alt: "Two guests in evening dresses" },
      { src: "/images/home/gathering-3.jpg", alt: "A guest in a lavender dress on the terrace" },
      { src: "/images/home/gathering-4.jpg", alt: "Two guests laughing by the window" },
      { src: "/images/home/gathering-5.jpg", alt: "Guests gathered around the dinner table" },
      { src: "/images/home/gathering-6.jpg", alt: "A group of guests in white outside the house at night" },
    ],
  },
  whatToExpect: {
    eyebrow: "What the evening feels like",
    headline: "Arrive to a warm, hosted room",
    intro:
      "Light bites, drinks and natural introductions throughout the evening. No speed dating. No loud club energy. No awkward name tags. Just a tasteful room of people who were intentionally invited.",
    cta: "See Desert After Dark",
    href: "/desert-after-dark",
    bullets: [
      "Three-hour private social gathering",
      "Hosted introductions throughout the night",
      "Balanced guest list, specially curated",
      "Small bites and beverages",
      "Dress code: elevated and comfortable",
      "Limited capacity by design",
    ],
    caveat:
      "This describes our monthly dinners. Desert After Dark runs longer with a larger guest list. See the Event page for that night's details.",
  },
  archive: {
    eyebrow: "The Atlas List, lately",
    headline: "From the archive",
    intro: "Rooftops, dinners and late nights from the last year of gatherings.",
    caption: "Scroll the gallery",
    images: [
      { src: "/images/home/room-1.jpg", alt: "A guest in a black dress against a tiled wall" },
      { src: "/images/home/room-2.jpg", alt: "A guest on the stairs in a floral gown" },
      { src: "/images/home/room-3.jpg", alt: "A group of guests outside the house" },
      { src: "/images/home/room-4.jpg", alt: "A guest seated on the staircase in emerald satin" },
      { src: "/images/home/room-5.jpg", alt: "A guest in white beside ceramic vases" },
      { src: "/images/home/room-6.jpg", alt: "A guest in lavender with the mountain behind" },
      { src: "/images/home/room-7.jpg", alt: "A guest in a white gown seated by the vases" },
      { src: "/images/home/room-8.jpg", alt: "A guest in a black dress against the tiled wall" },
      { src: "/images/home/room-9.jpg", alt: "A guest in a dinner jacket stepping out of a red car" },
      { src: "/images/home/room-10.jpg", alt: "A guest in a printed jacket beside a red sports car" },
    ],
  },
  toneOfRoom: {
    eyebrow: "The tone of the room",
    columns: [
      {
        numeral: "I.",
        headline: "Curated with comfort in mind",
        body: "This is not a mixer built around pressure or aggressive networking. The room is hosted, the guest list is reviewed, and the tone is warm, respectful and socially aware.",
      },
      {
        numeral: "II.",
        headline: "The room does the introducing",
        body: "Come polished. Come present. Come socially aware. This isn't a place for hard-selling, hovering or trying to win the room. The best guests help make the evening feel effortless for everyone else.",
      },
    ],
  },
  whoBelongs: {
    eyebrow: "Who belongs here",
    headline: "We're particular, on purpose",
    forList: {
      title: "For people who",
      items: [
        "Prefer intimate rooms over crowded nightlife",
        "Enjoy conversation, taste, style and presence",
        "Value social warmth without pressure",
        "Want to meet people in person again",
      ],
    },
    notForList: {
      title: "Not for people who",
      items: [
        "Are looking for a loud party",
        "Treat the room like a dating app",
        "Come to pitch, perform or dominate conversations",
        "Don't understand basic social etiquette",
      ],
    },
  },
  partnership: {
    eyebrow: "Partnership",
    headline: { before: "A few partnerships ", em: "remain", after: "" },
    subhead: "Own a category, not a logo placement.",
    cta: "See partnerships",
    href: "/partner",
  },
  apply: {
    eyebrow: "Apply",
    headline: "Think you belong here?",
    subhead: "We're accepting applications for Desert After Dark, our yearly flagship on October 10. Tell us about you below.",
    noteLabel: "A note on admission",
    note: "Ladies are our guests for the evening. For gentlemen, tickets start at $495, shared once your application is approved.",
  },
} as const;
