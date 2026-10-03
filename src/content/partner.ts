// Copy for /partner — mirrors the Figma frame "04 — Partners" in "Altas
// List Desert After Dark" (October 2026 editorial redesign).
export const partner = {
  hero: {
    eyebrowLines: ["Partnership", "Desert After Dark · Oct 10"],
    headline: { before: "The night is already funded. ", em: "A few partnerships remain." },
    subhead:
      "The talent, venue, fashion and hospitality are already being assembled. We're opening a small number of category partnerships to brands that actually fit the room.",
    cta: "Start an inquiry",
    secondary: { label: "See the event", href: "/desert-after-dark" },
    issue: "01 / 07",
    rail: "Scroll for partnerships",
    // The lavender-dress terrace photo already live in the event strip
    // (/images/dad/store-2.jpg), cut at full resolution for the hero. The
    // estate photo moved to the event page hero, as in the Figma.
    image: "/images/partner/hero-lavender.jpg",
  },
  why: {
    eyebrow: "Why partner",
    headline: "Own the experience, not a logo",
    intro: "Your brand inside the real night, where guests actually spend it.",
    points: [
      {
        title: "Full bar, all night",
        body: "A premium open bar all night. Your brand inside the real experience, not on a banner nobody reads.",
        image: "/images/dad/card-bar.jpg",
        alt: "A bartender garnishing a pink cocktail",
      },
      {
        title: "Chef-catered, start to finish",
        body: "Passed bites and stations, from arrival through the after-party.",
        image: "/images/dad/card-table.jpg",
        alt: "Plates on the table",
      },
      {
        title: "Fire performers on the estate",
        body: "The visual energy guests actually photograph and share.",
        image: "/images/dad/card-element.jpg",
        alt: "A fire performer on the terrace at dusk",
      },
      {
        title: "Real creators in the room",
        body: "Content styled by our designers, generating reach that's earned, not paid.",
        image: "/images/dad/store-7.jpg",
        alt: "Guests in evening dresses by the window",
      },
    ],
  },
  audience: {
    eyebrow: "The audience",
    headline: "The room you're partnering with",
    body: "Founders, executives, creatives, doctors and attorneys: accomplished, well-traveled and deliberate about where they spend an evening. The guest list is reviewed and curated, never sold.",
    image: { src: "/images/hero-rooftop.jpg", alt: "Guests taking a selfie together on the terrace" },
    stats: [
      { value: "Invite", label: "Only" },
      { value: "Zero", label: "Open sale" },
      { value: "100%", label: "Curated list" },
    ],
  },
  tiers: {
    eyebrow: "Available partnerships",
    headline: "Not packages. Ownership.",
    intro:
      "A small number of category partnerships, each one fully owned by a single brand. No logo walls, no competing voices in the same space.",
    closed: { label: "Title Partner — Thundr", status: "Closed" },
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
          "Story coverage and inclusion in event photography",
          "Up to 4 hosted guests",
          "VIP access",
        ],
      },
      {
        name: "Premium Category Partner",
        price: "$3,000–4,000",
        tagline: "Own one signature moment",
        featured: false,
        perks: [
          "Champagne & Wine, Cigar, Wellness & Grooming, or a custom activation",
          "Ownership of one signature activation",
          "Website partner placement",
          "Event photography and story coverage",
          "2 hosted guests",
          "VIP access",
        ],
      },
      {
        name: "Supporting Partner",
        price: "$1,500–2,000",
        tagline: "Everyday presence, meaningfully placed",
        featured: false,
        perks: [
          "Hydration & Non-Alcoholic, gifting, or select in-kind partnerships",
          "Partner placement on the event page",
          "Social recognition",
          "1 hosted guest",
          "VIP access",
        ],
      },
    ],
    cta: "Inquire",
  },
  categories: {
    eyebrow: "What we're looking for",
    headline: "The categories we're prioritizing",
    list: [
      "Spirits",
      "Champagne & Wine",
      "Arrival & Transportation",
      "Automotive",
      "Hydration & Non-Alcoholic",
      "Cigar or Wellness",
      "Furniture & Decor",
    ],
  },
  sponsors: {
    eyebrow: "Our sponsors",
    headline: "The names behind the night",
    intro: "Apply today to see how your brand can be part of Desert After Dark too.",
    list: [
      { name: "thundr", image: "/images/sponsors/thundr.jpg" },
      { name: "Opulence", image: "/images/sponsors/opulence.jpg" },
      // The Atlas List tile is the badge logo (rendered in the page, not a photo).
      { name: "The Atlas List", image: "/images/logo.svg", badge: true },
      { name: "Your Logo Here", image: "/images/sponsors/your-logo-here.jpg", placeholder: true },
    ],
  },
  inquiries: {
    eyebrow: "Partnership inquiries",
    headline: "Let's build the room",
    subhead: "Tell us about your brand and which category fits. We reply to every inquiry within two business days.",
  },
  store: {
    eyebrow: "What's in store",
    headline: "A taste of the night",
    caption: "Scroll",
    images: [
      { src: "/images/dad/store-1.jpg", alt: "Guests arriving at the estate" },
      { src: "/images/dad/store-2.jpg", alt: "A guest in lavender on the terrace" },
      { src: "/images/dad/store-3.jpg", alt: "A fire performer" },
      { src: "/images/dad/store-4.jpg", alt: "Guests taking a photo together" },
      { src: "/images/dad/store-5.jpg", alt: "A guest in white with the mountain behind" },
    ],
  },
} as const;
