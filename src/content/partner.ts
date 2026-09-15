// Copy for /partner — mirrors the Figma frame "Sponsorship — Atlas List".
export const partner = {
  hero: {
    eyebrow: "Partnership",
    headline: "The night is already funded. A few partnerships remain.",
    subhead:
      "The talent, venue, fashion, and hospitality are already being assembled. We're opening a small number of category partnerships to brands that actually fit the room.",
  },
  why: {
    eyebrow: "Why Partner",
    headline: "Own the experience. Not a logo.",
    points: [
      {
        title: "Full bar, all night",
        body: "Premium open bar, all night — your brand inside the real experience, not on a banner nobody reads.",
      },
      {
        title: "Chef-catered, start to finish",
        body: "Passed bites and stations, arrival through the after-party.",
      },
      {
        title: "Fire performers roaming the estate",
        body: "The visual energy guests actually photograph and share.",
      },
      {
        title: "Real creators in the room",
        body: "Content styled by our designers, generating amplification that's earned, not paid.",
      },
    ],
  },
  audience: {
    eyebrow: "The Audience",
    headline: "The room you're partnering with.",
    body: "Founders, executives, creatives, doctors, and attorneys — accomplished, well-traveled, and deliberate about where they spend an evening. The guest list is reviewed and curated, never sold.",
    stats: [
      { value: "Invite", label: "Only" },
      { value: "Zero", label: "Open Sale" },
      { value: "100%", label: "Curated List" },
    ],
  },
  tiers: {
    eyebrow: "Available Partnerships",
    headline: "Not packages. Ownership.",
    intro:
      "A small number of category partnerships, each one fully owned by a single brand — no logo walls, no competing voices in the same space.",
    note: "Title Partner — Thundr · Closed",
    list: [
      {
        name: "Official Category Partner",
        price: "$5,000",
        tagline: "Own an entire category",
        featured: true,
        perks: [
          "Category exclusivity (Spirits, Arrival & Transportation, Automotive, or an approved category)",
          "“Official ___ Partner of Desert After Dark”",
          "Prominent placement on the event page",
          "Ownership of your category's activation",
          "Story coverage + inclusion in event photography",
          "Up to 4 hosted guests",
        ],
      },
      {
        name: "Premium Category Partner",
        price: "$3,000–$4,000",
        tagline: "Own one signature moment",
        featured: false,
        perks: [
          "Champagne & Wine, Cigar, Wellness & Grooming, or a custom activation",
          "Ownership of one signature activation",
          "Website partner placement",
          "Event photography + story coverage",
          "2 hosted guests",
        ],
      },
      {
        name: "Supporting Partner",
        price: "$1,500–$2,000",
        tagline: "Everyday presence, meaningfully placed",
        featured: false,
        perks: [
          "Hydration & Non-Alcoholic, gifting, or select in-kind partnerships",
          "Partner placement on the event page",
          "Social recognition",
          "1 hosted guest",
        ],
      },
    ],
  },
  categories: {
    eyebrow: "What We're Looking For",
    headline: "The categories we're prioritizing.",
    list: [
      "Spirits",
      "Champagne & Wine",
      "Arrival & Transportation",
      "Automotive",
      "Hydration & Non-Alcoholic",
      "Cigar or Wellness",
    ],
  },
  inquiries: {
    eyebrow: "Partnership Inquiries",
    headline: "Let's build the room.",
    subhead: "Tell us about your brand and which category fits.",
  },
} as const;
