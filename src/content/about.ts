// Copy for /about — mirrors the Figma frame "Sections" (About, Sep 2026 revision).
export const about = {
  hero: {
    eyebrow: "About",
    headline: "About As Real As It Gets",
    subhead: "The people behind The Atlas List, and the standard they hold every guest to.",
  },
  hosts: {
    eyebrow: "The Founders",
    headline: "Meet your hosts",
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
  quote:
    "“Think rooftops at golden hour. Champagne in coupes. A photographer who knows how to catch you mid-laugh. Conversations that start with ‘tell me everything’ and end with ‘we have to do this again.’”",
  standard: {
    eyebrow: "The Standard",
    headline:
      "We Started This Because The Rooms We Wanted To Be Invited To Didn't Exist — So We Built Them",
    body: "No one buys their way in. No one's here to sell you anything — just people you'd actually want to introduce to your closest friends.",
    note: "Kept small on purpose — kept private on purpose",
  },
  apply: {
    eyebrow: "Apply",
    headline: "Apply For An Invite",
    subhead:
      "We're currently accepting applications for Desert After Dark, our yearly flagship on October 10. Tell us about you below.",
  },
  gallery: [
    { src: "/images/about/grid-1.jpg", alt: "A guest beside a wall of ceramic vases" },
    { src: "/images/about/grid-2.jpg", alt: "Guests holding The Atlas List sign" },
    { src: "/images/about/grid-3.jpg", alt: "A guest in yellow seated by the vases" },
    { src: "/images/about/grid-4.jpg", alt: "Oysters with orchids on ice" },
    { src: "/images/about/grid-5.jpg", alt: "A guest in cream seated by the vases" },
    { src: "/images/about/grid-6.jpg", alt: "A guest in brown at the gallery wall" },
    { src: "/images/about/grid-7.jpg", alt: "A guest in cream on the terrace with the mountain behind" },
    { src: "/images/about/grid-8.jpg", alt: "A guest in pink at dusk" },
  ],
} as const;
