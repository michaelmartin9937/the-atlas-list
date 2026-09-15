// Copy for /about — mirrors the Figma frame "Atlas List — About (New)".
export const about = {
  hero: {
    eyebrow: "About",
    headline: "Two friends, a guest list, and a standard.",
    subhead: "The people behind it, and the standard they hold every guest to.",
  },
  hosts: {
    eyebrow: "The Founders",
    headline: "Meet your hosts.",
    people: [
      {
        name: "Devaun",
        image: "/images/host-devaun.jpg",
        bio: "Devaun picked up a camera before he ever picked up a guest list — a decade behind the lens for fashion brands and the faces who front them. He started The Atlas List because the best nights he shot were never on the call sheet — they were what happened after, with people who actually liked being around each other.",
      },
      {
        name: "Michael",
        image: "/images/host-michael.jpg",
        bio: "Michael's spent his career doing one thing on repeat: putting the right two people in the same room. A handful of companies, a few hundred favors, and a phone full of people he'd vouch for personally — The Atlas List is just that instinct, formalized.",
      },
    ],
  },
  standard: {
    eyebrow: "The Standard",
    headline:
      "We Started This Because The Rooms We Wanted To Be Invited To Didn't Exist. So We Built Them.",
    body: "No one buys their way in. No one's here to sell you anything — just people you'd actually want to introduce to your closest friends.",
    note: "Kept small on purpose. Kept private on purpose.",
  },
  quote:
    "“Think rooftops at golden hour. Champagne in coupes. A photographer who knows how to catch you mid-laugh. Conversations that start with ‘tell me everything’ and end with ‘we have to do this again.’”",
  apply: {
    eyebrow: "Apply",
    headline: "Apply for an invite.",
    subhead:
      "We're currently accepting applications for Desert After Dark, our yearly flagship on October 10. Tell us about you below.",
  },
  gallery: [
    { src: "/images/event-1.jpg", alt: "Guest at the rooftop gathering" },
    { src: "/images/event-2.jpg", alt: "Two guests in conversation" },
    { src: "/images/event-3.jpg", alt: "Guests greeting each other" },
    { src: "/images/event-4.jpg", alt: "The lounge at golden hour" },
    { src: "/images/photographer.jpg", alt: "The photo team at work" },
    { src: "/images/hero-rooftop.jpg", alt: "The rooftop at dusk" },
    { src: "/images/about-hero.jpg", alt: "Guests arriving" },
    { src: "/images/atlas-house-promo-poster.jpg", alt: "The house at night" },
  ],
} as const;
