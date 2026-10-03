// Copy for /about — mirrors the Figma frame "02 — About" in "Altas List
// Desert After Dark" (October 2026 editorial redesign).
export const about = {
  hero: {
    eyebrowLines: ["A private social club", "Scottsdale"],
    headline: "About as real as it gets",
    subhead: "The people behind The Atlas List, and the standard they hold every guest to.",
    issue: "Issue No. 02",
    // The site's own terrace portrait (the photo behind /images/about/grid-7.jpg),
    // cut at full resolution for the full-bleed hero.
    image: "/images/about/hero.jpg",
  },
  hosts: {
    eyebrow: "The founders",
    headline: "Meet your hosts",
    intro: "Two people who got tired of waiting for the right invitation, and decided to send it themselves.",
    people: [
      {
        name: "Devaun",
        role: "Co-founder & photographer",
        handle: "devaunlennox",
        image: "/images/host-devaun-2026.jpg",
        bio: "Devaun picked up a camera before he ever picked up a guest list: a decade behind the lens for fashion brands and the faces who front them. He started The Atlas List because the best nights he shot were never on the call sheet. They were what happened after, with people who actually liked being around each other.",
      },
      {
        name: "Michael",
        role: "Co-founder",
        handle: "whoismikemartin",
        image: "/images/host-michael.jpg",
        bio: "Michael has spent his career doing one thing on repeat: putting the right two people in the same room. A handful of companies, a few hundred favors and a phone full of people he'd vouch for personally. The Atlas List is that instinct, formalized.",
      },
    ],
  },
  feeling: {
    eyebrow: "The feeling",
    lead: "Think:",
    quote:
      "rooftops at golden hour. Champagne in coupes. A photographer who knows how to catch you mid-laugh. Conversations that start with ‘tell me everything’ and end with ‘we have to do this again.’",
    image: "/images/about/quote-bg-clean.jpg",
  },
  standard: {
    eyebrow: "The standard",
    headline: "We started this because the rooms we wanted to be invited to didn't exist, so we built them.",
    body: "No one buys their way in. No one's here to sell you anything. Just people you'd actually want to introduce to your closest friends.",
    stats: [
      { value: "0", label: "Open sale" },
      { value: "100%", label: "Reviewed list" },
      { value: "1", label: "Room at a time" },
    ],
    note: "Kept small on purpose. Kept private on purpose.",
    image: { src: "/images/about/grid-2.jpg", alt: "Guests holding The Atlas List sign" },
  },
  apply: {
    eyebrow: "Apply",
    headline: "Apply for an invite",
    subhead: "We're accepting applications for Desert After Dark, our yearly flagship on October 10. Tell us about you below.",
    notes: [
      {
        label: "A note on admission",
        text: "Ladies are our guests for the evening. For gentlemen, tickets start at $495, shared once your application is approved.",
      },
      {
        label: "A note on transportation",
        text: "Parking at the estate is limited, so we're providing a driver for you from a designated pickup location. The location and pickup times are shared with approved guests about 48 hours before the event.",
      },
    ],
  },
  gallery: {
    eyebrow: "From the room",
    caption: "Scroll the gallery",
    images: [
      { src: "/images/about/grid-1.jpg", alt: "A guest beside a wall of ceramic vases" },
      { src: "/images/about/grid-2.jpg", alt: "Guests holding The Atlas List sign" },
      { src: "/images/about/grid-3.jpg", alt: "A guest in yellow seated by the vases" },
      { src: "/images/about/grid-4.jpg", alt: "Oysters with orchids on ice" },
      { src: "/images/about/grid-5.jpg", alt: "A guest in cream seated by the vases" },
      { src: "/images/about/grid-6.jpg", alt: "A guest in brown at the gallery wall" },
      { src: "/images/about/grid-7.jpg", alt: "A guest in cream on the terrace with the mountain behind" },
      { src: "/images/about/grid-8.jpg", alt: "A guest in pink at dusk" },
    ],
  },
} as const;
