export const home = {
  hero: {
    eyebrow: "By Invitation Only",
    headline: "The room you've been looking for.",
    subhead:
      "A private Scottsdale gathering for people who believe chemistry, friendship, and access still happen best in the right room.",
    cta: "Apply for an Invite",
  },
  howWeGather: {
    eyebrow: "How We Gather",
    headline: "Three ways in.",
    ways: [
      {
        label: "Weekly",
        body: "Small and intimate. A handful of people, one room, real conversation.",
      },
      {
        label: "Monthly",
        body: "A hosted dinner, about 60–70 of us. Bigger room, same warmth.",
      },
      {
        label: "Yearly",
        body: "The flagship. One night, all-out. This year, that's Desert After Dark.",
      },
    ],
    note: "Weekly and monthly return after Desert After Dark — for now, this is the one.",
  },
  rightNow: {
    eyebrow: "Right Now",
    headline: "Desert After Dark",
    date: "October 10, 2026 · Paradise Valley, AZ",
    body: "Our yearly flagship — a private-residence takeover with a runway, live entertainment, and a night built for the senses. This is the one thing on the calendar until it's done.",
    cta: "Apply for Ticket Allocation",
    href: "/desert-after-dark",
  },
  whatToExpect: {
    eyebrow: "What the Evening Feels Like",
    headline: "Arrive to a warm, hosted room.",
    intro:
      "Light bites, drinks, and natural introductions throughout the evening. No speed dating. No loud club energy. No awkward name tags. Just a tasteful room of people who were intentionally invited.",
    bullets: [
      "Three-hour private social gathering",
      "Hosted introductions throughout the night",
      "Balanced guest list — specially curated",
      "Small bites and beverages available",
      "Dress code: elevated, comfortable",
      "Limited capacity by design",
    ],
    caveat:
      "This describes our monthly dinners. Desert After Dark runs longer, with a larger guest list — see the Desert After Dark page for that night's details.",
  },
  toneOfRoom: {
    eyebrow: "The Tone of the Room",
    forWomen: {
      headline: "Curated with comfort in mind.",
      body: "This is not a mixer built around pressure or aggressive networking. The room is hosted, the guest list is reviewed, and the tone is intentionally warm, respectful, and socially aware.",
    },
    forMen: {
      headline: "For people who already know how to hold a room.",
      body: "Come polished. Come present. Come socially aware. This is not a place for hard-selling, hovering, or trying to win the room. The best guests are the ones who help make the evening feel effortless for everyone else.",
    },
  },
  gallery: {
    eyebrow: "Scenes from the Last Gathering",
    intro:
      "Our last gathering brought together a small, polished room of Scottsdale locals for an evening of conversation, connection, and effortless introductions.",
    label: "From a Recent Monthly Gathering",
    caption:
      "The goal is not to create a party. The goal is to create a room people are proud to be seen in.",
    location: "Rooftop · Scottsdale, AZ · April 2026",
  },
  whoBelongs: {
    eyebrow: "Who Belongs Here",
    headline: "We're particular. On purpose.",
    forList: {
      title: "For people who:",
      items: [
        "Prefer intimate rooms over crowded nightlife.",
        "Enjoy conversation, taste, style, and presence.",
        "Value social warmth without pressure.",
        "Want to meet people in person again.",
      ],
    },
    notForList: {
      title: "Not for people who:",
      items: [
        "Are looking for a loud party.",
        "Treat the room like a dating app.",
        "Come to pitch, perform, or dominate conversations.",
        "Don't understand basic social etiquette.",
      ],
    },
  },
  moreFromTheRoom: {
    eyebrow: "As the Night Unfolds",
    headline: "More from the room.",
    images: [
      { src: "/images/event-1.jpg", alt: "Guest at the rooftop gathering" },
      { src: "/images/event-2.jpg", alt: "Two guests in conversation" },
      { src: "/images/event-3.jpg", alt: "Guests greeting each other" },
      { src: "/images/event-4.jpg", alt: "The lounge at golden hour" },
      { src: "/images/photographer.jpg", alt: "The photo team at work" },
    ],
  },
  closingCta: {
    eyebrow: "Apply",
    headline: "Think you belong here?",
    subhead:
      "We're currently accepting applications for Desert After Dark, our yearly flagship on October 10. Tell us about you below.",
  },
} as const;
