// Everything on the private ticket page (/private/desert-after-dark-1010)
// lives here: Stripe link, event details, copy, media paths, labels.
// The page is sent only to approved male applicants deciding whether to
// complete their admission payment. It is unlisted (noindex), not secured.
// Design: Figma "Desert After Dark — Checkout" › Dark theme › 1 Event info
// (Oct 2026). Payment stays on Stripe (Payment Link + Buy Button below);
// the Figma's Zelle checkout screens were not built.

// The Stripe Payment Link for approved guests (replaced 2026-10-07 with the
// $150 link). An environment variable overrides it; otherwise this default
// is used, so the buttons work without any Vercel configuration. Every
// payment button on both pages reads this one value.
export const STRIPE_PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ?? "https://buy.stripe.com/7sYcMYem82eef6s3uTffy04";

// Where Stripe should send guests after they pay: set this URL as the
// Payment Link's confirmation redirect in the Stripe dashboard.
export const CONFIRMATION_ROUTE = "/private/desert-after-dark-1010/confirmed";

// Calendar files/links for confirmed guests (pickup 5:15 PM, home by midnight,
// Arizona time; no DST in Phoenix, so UTC-7 year-round).
export const CALENDAR = {
  ics: "/events/desert-after-dark-guest.ics",
  google:
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent("Desert After Dark — The Atlas List") +
    "&dates=20261011T001500Z/20261011T070000Z" +
    "&ctz=America/Phoenix" +
    "&location=" + encodeURIComponent("Camelback Village Center, 5041 N 44th St, Phoenix, AZ 85018") +
    "&details=" + encodeURIComponent("Meet in the lot east of Bank of America, just south of AJ's Fine Foods, and board the car service between 5:15 and 7:30 PM. Shuttle back until midnight. Bring photo ID. theatlaslist.club"),
} as const;

// Stripe's hosted Buy Button for the same product (publishable key is public
// by design — it can only start a checkout, never read or move money).
export const STRIPE_BUY_BUTTON = {
  id: "buy_btn_1ULqw74oBYcjVnSdcGkaD3YI",
  publishableKey:
    "pk_live_51ULpHi4oBYcjVnSdLVokpQPp9J0CELn4Go6pbeP8p4c8fXRQd9aH0CUj80gDJyiZtTaYZsFHIsv48wv0ZwPHZEdS00pLgWCMDK",
} as const;

export const privatePreview = {
  route: "/private/desert-after-dark-1010",
  price: "$150",
  priceUnit: "/ person",
  ticketLabel: "Gentleman's ticket",
  cta: "Get tickets",
  stripeNote: "Secure checkout powered by Stripe. Card and Apple Pay accepted.",
  finePrint: "Approved guests only · All sales final · Ladies attend as our guests",

  meta: {
    title: "Desert After Dark | Tickets",
    description: "Approved guests: reserve your Desert After Dark ticket.",
    ogTitle: "Desert After Dark · Tickets",
    ogDescription: "For approved guests: reserve your ticket. Saturday, October 10 · Paradise Valley.",
  },

  hero: {
    eyebrow: "The Atlas List presents · Oct 10",
    headline: "Desert",
    headlineItalic: "After Dark",
    copy: "An evening at a private Paradise Valley estate. Hosted by Carrie Seller.",
    poster: "/media/dad-hero-poster.webp",
    posterAlt: "A private Paradise Valley estate against the hillside",
  },

  // The ticket card beside the hero.
  card: {
    rows: [
      ["Date", "Sat, Oct 10 · 5:30 PM"],
      ["Car service", "Included"],
      ["Reserve by", "Fri, Oct 9 · 8 PM"],
    ],
  },

  // The strip under the hero.
  strip: {
    facts: [
      ["Date", "Sat, Oct 10"],
      ["Doors", "5:30 PM"],
      ["Until", "Midnight"],
    ],
    notes: [
      { icon: "pin", title: "Private estate, Paradise Valley", body: "Camelback Mountain views" },
      { icon: "car", title: "Car service included", body: "Pickup point to the estate and back" },
    ],
  },

  about: {
    eyebrow: "About the night",
    headline: "Golden hour on the hillside, ",
    headlineItalic: "then we dance.",
    copy: "Our yearly flagship. A private estate, an open bar, chef-made food, DJs in front of Camelback Mountain and a runway made for photos.",
    bullets: ["Open bar", "Chef-made food", "Live DJs", "Photo runway", "Car service", "21+ only"],
  },

  film: {
    eyebrow: "A glimpse after dark",
    src: "/media/dad-preview-film.mp4",
    poster: "/media/dad-preview-poster.webp",
    disclosureText: "Creative visualization of the Desert After Dark atmosphere.",
  },

  evening: {
    eyebrow: "The evening",
    acts: [
      { time: "5:30 PM", title: "Golden hour", body: "Champagne at the door, cocktails at sunset" },
      { time: "All night", title: "Eat, drink, dance", body: "DJs, open bar, food and the photo runway" },
      { time: "10 PM", title: "After Dark", italic: true, body: "The after-party moves inside until midnight" },
    ],
  },

  // Shuttle logistics (Oct 7). The estate address itself is never shown.
  gettingThere: {
    eyebrow: "Getting there",
    steps: [
      {
        icon: "pin",
        title: "Pickup point",
        lines: ["Camelback Village Center", "5041 N 44th St", "Phoenix, AZ 85018"],
        body: "Meet in the lot east of Bank of America, just south of AJ's Fine Foods. Show your ticket and photo ID, then ride with our car service to the estate. Prefer your own ride? Uber and Lyft are welcome too. Parking at the residence is not permitted.",
      },
      {
        icon: "car",
        title: "Your ride",
        lines: ["Shuttle to the estate"],
        body: "Our car service runs from the pickup point to the estate and back. Photo ID at pickup.",
      },
      {
        icon: "moon",
        title: "Ride back",
        lines: ["Shuttle until midnight"],
        body: "The shuttle runs back to the pickup point until midnight. Uber and Lyft are available at the venue anytime.",
      },
    ],
    // Guests who skip the shuttle (added 2026-10-07).
    ownRide: {
      title: "Prefer to arrive on your own using Uber / Lyft?",
      lead: "No problem.",
      // No venue address on this page: it goes to confirmed guests only.
      body: "Have your driver drop you at the gate. The estate address is sent to confirmed guests before Saturday. Parking in the neighborhood is not allowed. Unauthorized vehicles will be towed.",
    },
  },

  dress: {
    eyebrow: "Dress code",
    headline: "Desert Sunset.",
    copy: "Evening gowns and sharp suits. Warm tones, elevated black and a touch of gold. Skip anything cold or silver.",
    notes: [
      "Elevated cocktail through formal eveningwear",
      "Terracotta, amber, plum and other sunset accents",
      "Elevated black with texture or warm metallic details",
      "Refined neutrals styled intentionally",
      "No basic clubwear or overly casual daytime looks",
    ],
    board: "/media/dad-mens-style-board.webp" as string,
    boardAlt: "Desert After Dark men's styling guide: sunset tailoring, elevated black and warm neutrals, with the palette from dusty rose to gold",
    boardLabel: "Men's styling guide",
    swatches: ["#6E2D5C", "#7B4DB1", "#B2327A", "#C97D8A", "#F07A5A", "#B0563A", "#A6937D", "#CBC5AA", "#C9A25A"],
    palette: [
      { name: "Terracotta", hex: "#B85F45" },
      { name: "Amber", hex: "#C58A3A" },
      { name: "Plum", hex: "#60354F" },
      { name: "Elevated black", hex: "#0D0B0A" },
      { name: "Warm neutral", hex: "#A99B8C" },
      { name: "Bronze", hex: "#8A6320" },
    ],
  },

  goodToKnow: {
    eyebrow: "Good to know",
    items: [
      "Approved guests only. Photo ID at pickup.",
      "Ladies attend as our guests.",
      "Secure card checkout through Stripe. Use the same name and email as your application.",
      "Reserve by Fri, Oct 9 at 8:00 PM (AZ). All sales final.",
    ],
  },

  footer: {
    email: "info@theatlaslist.club",
    place: "Paradise Valley, AZ",
  },

  // Post-payment confirmation (Figma "4 Confirmed", light theme). Stripe
  // redirects here after checkout.
  confirmed: {
    eyebrow: "Where to go",
    headline: "You're ",
    headlineItalic: "on the list.",
    copy: "Payment received. Your confirmation is on its way by text and email.",
    savedNote: "Saved to your confirmation text",
    stops: [
      {
        label: "01 Park & check in · 5:15–7:30 PM",
        lines: ["Camelback Village Center", "5041 N 44th St", "Phoenix, AZ 85018"],
        body: "Meet in the lot east of Bank of America, just south of AJ's Fine Foods. Show your ticket and photo ID, then ride with our car service to the estate. Uber and Lyft are welcome too. Parking at the residence is not permitted.",
        mapsQuery: "5041 N 44th St, Phoenix, AZ 85018",
        copyText: "5041 N 44th St, Phoenix, AZ 85018",
      },
      {
        label: "02 The estate · Drop-off",
        lines: ["4536 E Foothill Dr", "Paradise Valley, AZ 85253"],
        body: "Your car service brings you here from the pickup point. Arriving by Uber or Lyft? Drop at the gate. Parking in the neighborhood is not allowed and unauthorized vehicles will be towed.",
        mapsQuery: "4536 E Foothill Dr, Paradise Valley, AZ 85253",
        copyText: "4536 E Foothill Dr, Paradise Valley, AZ 85253",
      },
    ],
    rideHome: { title: "Ride home", body: "Shuttle back to the pickup point until midnight. Uber and Lyft are available at the venue anytime." },
    calendarCta: "Add to calendar",
    googleCta: "Google Calendar",
    walletNote: "Your ticket arrives by text and email. Show it with photo ID at pickup.",
  },
} as const;
