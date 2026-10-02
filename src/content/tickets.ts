// Copy for /desert-after-dark/tickets — the men's ticket sales page for
// Desert After Dark. Reached by link and ads only (not in the nav).
export const tickets = {
  hero: {
    eyebrow: "Saturday, October 10, 2026 · Doors 5:30 PM · Paradise Valley",
    headline: "Walk in already chosen.",
    subhead:
      "Desert After Dark is a private-residence fashion show and mansion party. The women in the room are hand-selected — models, creators, founders — and they help decide which men join them. One hundred men. Two women for every one of them. So the first thing anyone in the room knows about you is that other women already said yes.",
    cta: "Request My Ticket",
    note: "Application takes three minutes. If you're approved, you'll get a private link to buy.",
  },
  stats: [
    { value: "2 : 1", label: "Women to men, by design" },
    { value: "100", label: "Tickets for men. No more." },
    { value: "1", label: "Night. Then the room is gone." },
  ],
  why: {
    eyebrow: "Pre-selection, built into the room",
    headline: "The room vouches for you before you say a word",
    intro:
      "Women read a man through other women. A man who has clearly been chosen — welcomed, surrounded, photographed beside women who had options — is read as safe, interesting and worth knowing before he opens his mouth. Most nights leave that to chance. Desert After Dark is built to hand it to you.",
    points: [
      {
        title: "Being on the list is the first signal",
        body: "Every man in the room was approved before he arrived, and the women who help build the list know it. You never have to prove you belong. It's already been decided, in your favour, by the people whose opinion matters most that night.",
      },
      {
        title: "Two women for every man",
        body: "One hundred men. Two hundred hand-selected women. A room built at that ratio never leaves you standing alone, and in a room like this, being seen with the right company is the whole point.",
      },
      {
        title: "Photographed with them, not near them",
        body: "A professional photographer works the room all night, shooting you with the women you meet. Those photos reach your inbox the week after. One good photo beside the right women tells everyone who sees it that you've already been chosen.",
      },
      {
        title: "The men beside you raise your stock too",
        body: "Founders, executives, investors, athletes, creatives. Being counted among them is its own signal, and they're easier to talk to on this night than any other.",
      },
    ],
  },
  photos: {
    eyebrow: "Pre-selection, on camera",
    headline: "This is what you leave with",
    body: "Our founders, Devaun and Michael, photographed the way every guest is: beside the women in the room, by a professional, in good light. A photo like this does something a bio can't. It shows you were chosen. Yours arrive in your inbox the week after the event.",
    featured: [
      { src: "/images/tickets/preselected-1.jpg", alt: "Devaun, in a cream suit and hat, between two guests in red and cream dresses" },
      { src: "/images/tickets/preselected-2.jpg", alt: "Michael with three guests in evening dresses at the bar" },
      { src: "/images/tickets/preselected-3.jpg", alt: "Michael with three guests in black, blue and black dresses" },
    ],
    images: [
      { src: "/images/tickets/photo-1.jpg", alt: "Two guests in gold and red evening dresses at the estate" },
      { src: "/images/tickets/photo-2.jpg", alt: "A guest in a dinner jacket stepping out of a red car" },
      { src: "/images/tickets/photo-3.jpg", alt: "Guests in evening dresses at the window" },
      { src: "/images/tickets/photo-4.jpg", alt: "Guests gathered around the dinner table" },
    ],
  },
  night: {
    eyebrow: "The night",
    headline: "Four acts, one estate",
    acts: [
      { time: "5:30pm", title: "Party", body: "Doors open. Cocktails on the terrace while the estate fills in." },
      { time: "7:00pm", title: "Fashion Show", body: "Six designers, one runway, seated audience. This is the main event." },
      { time: "8:00pm", title: "Mansion Party", body: "The full estate opens. DJs take over, the bars are open." },
      { time: "10:00pm", title: "After Party", body: "For the guests still standing. Location released the night of." },
    ],
  },
  how: {
    eyebrow: "How it works",
    headline: "Approved first. Then you buy.",
    steps: [
      { title: "Apply", body: "Three minutes. Name, Instagram, a few honest answers. Every application is read by a person." },
      { title: "Get approved", body: "If you fit the room, you'll hear from us with a private link and the price. If you don't, you'll hear from us too." },
      { title: "Buy your ticket", body: "One ticket per approved man. When the hundred are gone, they're gone." },
      { title: "Arrive", body: "The address and arrival details go out about 48 hours before. Dress code: desert sunset — warm tones, elevated black, a touch of gold." },
    ],
  },
  faq: [
    { q: "Can I just buy a ticket?", a: "No. Every man is approved before he can buy. That's what makes being there mean something." },
    { q: "Can I bring a friend?", a: "Every guest applies and is approved individually, including friends. Send them the link." },
    { q: "Do women buy tickets?", a: "No. Women attend as invited guests. That's how we hold the two-to-one ratio." },
    { q: "What does it cost?", a: "Tickets start at $495. If you're approved, your private payment link comes with the price for your tier." },
  ],
  apply: {
    eyebrow: "Request your ticket",
    headline: "Tell us who you are",
    subhead: "Three minutes. If it's a fit, your private ticket link follows within a few days.",
  },
} as const;
