// Everything on the private preview page (/private/desert-after-dark-1010)
// lives here: Stripe link, event details, copy, FAQ, media paths, labels.
// The page is sent only to approved male applicants deciding whether to
// complete their admission payment. It is unlisted (noindex), not secured.

// The Stripe Payment Link for approved guests (supplied 2026-10-01). An
// environment variable overrides it; otherwise this default is used, so the
// buttons work without any Vercel configuration. Every payment button on
// both pages reads this one value.
export const STRIPE_PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ?? "https://buy.stripe.com/dRmeV67XKdWW9M8fdBffy01";

// Stripe's hosted Buy Button for the same product (publishable key is public
// by design — it can only start a checkout, never read or move money).
export const STRIPE_BUY_BUTTON = {
  id: "buy_btn_1ULqw74oBYcjVnSdcGkaD3YI",
  publishableKey:
    "pk_live_51ULpHi4oBYcjVnSdLVokpQPp9J0CELn4Go6pbeP8p4c8fXRQd9aH0CUj80gDJyiZtTaYZsFHIsv48wv0ZwPHZEdS00pLgWCMDK",
} as const;

export const privatePreview = {
  route: "/private/desert-after-dark-1010",
  price: "$495",
  cta: "Confirm My Admission — $495",
  secondaryCta: "Preview the Experience",
  stripeNote: "Secure checkout powered by Stripe.",

  meta: {
    title: "Desert After Dark | Private Preview",
    description: "A private preview for approved Desert After Dark guests.",
    ogTitle: "Desert After Dark",
    ogDescription: "Private guest preview",
  },

  hero: {
    eyebrow: "Private Preview · Approved Guests",
    headline: "Desert After Dark",
    tagline: "powered by Thundr",
    copy: "An intimate evening where fashion, music and a carefully curated community meet beneath the Paradise Valley night.",
    // Horizontal still (a short muted loop can replace it later: set `loop`).
    poster: "/media/dad-hero-poster.webp",
    posterAlt: "Guests on the pool terrace of a private Paradise Valley estate at golden hour",
    loop: "" as string, // e.g. "/media/dad-hero-loop.mp4"
  },

  film: {
    eyebrow: "A Glimpse After Dark",
    headline: "A Glimpse After Dark",
    copy: "A preview of the atmosphere we are creating for October 10 — fashion in motion, an elevated private setting and a room designed for genuine connection.",
    src: "/media/dad-preview-film.mp4",
    poster: "/media/dad-preview-poster.webp",
    // The current film is an AI visualisation, so the disclosure is on.
    aiDisclosure: true,
    disclosureText: "Creative visualization of the Desert After Dark atmosphere.",
  },

  pillars: [
    {
      title: "Fashion in Motion",
      body: "A runway presentation woven into the evening rather than separated from it.",
    },
    {
      title: "A Curated Room",
      body: "A deliberately assembled community of creatives, founders, professionals and cultural tastemakers.",
    },
    {
      title: "After-Dark Atmosphere",
      body: "Music, visual storytelling and warm desert-night energy inside a private Paradise Valley setting.",
    },
  ],

  proof: {
    eyebrow: "The Atlas List in Motion",
    headline: "The Atlas List in Motion",
    copy: "Desert After Dark continues what The Atlas List was created to do: bring compelling people into thoughtfully designed spaces where conversation, creativity and culture can intersect.",
    // 6–8 images. `span` = "wide" takes two columns on larger screens.
    gallery: [
      { src: "/media/dad-gallery-01.webp", alt: "A fire performer on the terrace at sunset with the mountains behind", span: "wide" },
      { src: "/media/dad-gallery-02.webp", alt: "A guest in a white gown seated beside a wall of ceramic vases" },
      { src: "/media/dad-gallery-03.webp", alt: "The production crew lighting a shot on the terrace at night" },
      { src: "/media/dad-gallery-04.webp", alt: "Guests in conversation around the dinner table with the mountains behind", span: "wide" },
      { src: "/media/dad-gallery-05.webp", alt: "A bartender finishing a cocktail with a fresh flower" },
      { src: "/media/dad-gallery-06.webp", alt: "A guest in a dinner jacket stepping out of a car" },
      { src: "/media/dad-gallery-07.webp", alt: "An aerial performer on a hoop beneath the palms", span: "wide" },
      { src: "/media/dad-gallery-08.webp", alt: "Florals and table details at a recent gathering" },
    ],
    // Optional short vertical clip from fashion preparation (muted).
    bts: {
      src: "/media/dad-bts-clip.mp4",
      poster: "/media/dad-bts-poster.webp",
      caption: "Behind the scenes · model casting, September 2026",
    },
  },

  dress: {
    eyebrow: "Dress With Intention",
    headline: "Elevated. Warm. Evening-forward.",
    copy: "The preferred direction moves through rich sunset tones, elevated black and refined warm neutrals. Think intentional tailoring, polished footwear, textured evening layers and restrained gold or bronze details.",
    notes: [
      "Elevated cocktail through formal eveningwear",
      "Terracotta, amber, plum and other sunset accents",
      "Elevated black with texture or warm metallic details",
      "Refined neutrals styled intentionally",
      "No basic clubwear or overly casual daytime looks",
    ],
    // Drop the finished men's board here; until then an elegant palette
    // panel stands in.
    board: "/media/dad-mens-style-board.webp" as string,
    boardAlt: "Desert After Dark men's styling guide: sunset tailoring, elevated black and warm neutrals, with the palette from dusty rose to gold",
    palette: [
      { name: "Terracotta", hex: "#B85F45" },
      { name: "Amber", hex: "#C58A3A" },
      { name: "Plum", hex: "#60354F" },
      { name: "Elevated black", hex: "#0D0B0A" },
      { name: "Warm neutral", hex: "#A99B8C" },
      { name: "Bronze", hex: "#8A6320" },
    ],
  },

  details: {
    eyebrow: "Event Details",
    rows: [
      ["Date", "Saturday, October 10, 2026"],
      ["Doors", "5:30 PM"],
      ["Where", "Paradise Valley, Arizona"],
      ["Format", "Private, invite-only experience"],
      ["Approved admission", "From $495"],
    ],
    terms: [
      "Approval provides access to purchase admission but does not reserve a place. Admission is confirmed only after payment is received. Invitations are individual and non-transferable.",
      "Payments are refundable until 72 hours before the event. After that point, all sales are final.",
      "Exact address, arrival and transportation instructions will be sent separately to confirmed guests.",
    ],
  },

  faq: [
    {
      q: "What does my admission provide?",
      a: "Admission provides access to the complete Desert After Dark experience, including the fashion presentation, music and private social gathering.",
    },
    { q: "May I transfer my invitation?", a: "No. Approval and admission are individual and non-transferable." },
    {
      q: "What should I wear?",
      a: "Follow the Desert After Dark styling direction shown above. The goal is warm, polished, sensual and evening-forward.",
    },
    {
      q: "When will I receive the exact address?",
      a: "The private address and final arrival instructions will be sent separately to confirmed guests shortly before the event.",
    },
    {
      q: "How is payment processed?",
      a: "Card payments are processed securely through Stripe. Guests should complete checkout using the same name and email address submitted with their Atlas List application.",
    },
  ],

  final: {
    headline: "Your place is confirmed when payment is complete.",
    copy: "Complete payment within the window stated in your invitation email. Availability remains first come, first served.",
    checkoutNote: "Use the same name and email as your application when you check out.",
  },
} as const;
