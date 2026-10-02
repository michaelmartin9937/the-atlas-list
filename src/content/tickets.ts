// Copy for /desert-after-dark/tickets — the men's ticket sales page for
// Desert After Dark. Reached by link and ads only (not in the nav).
export const tickets = {
  hero: {
    eyebrow: "Saturday, October 10, 2026 · Doors 5:30 PM · Paradise Valley",
    headline: "The room is already full of extraordinary women. Now we're choosing the men.",
    subhead:
      "Desert After Dark is a private-residence fashion show and mansion party. The women in the room are hand-selected — models, creators, founders. One hundred men get a ticket. Two women for every one of them. Every man is approved before he can buy.",
    cta: "Request My Ticket",
    note: "Application takes three minutes. If you're approved, you'll get a private link to buy.",
  },
  stats: [
    { value: "2 : 1", label: "Women to men, by design" },
    { value: "100", label: "Tickets for men. No more." },
    { value: "1", label: "Night. Then the room is gone." },
  ],
  why: {
    eyebrow: "Why the room works for you",
    headline: "Arrive preselected",
    intro:
      "Most nights out put you in a crowd and leave the rest to luck. This one does the opposite. The guest list is built one name at a time, and the women in it decide who they want in the room with them.",
    points: [
      {
        title: "You're already approved",
        body: "Every man at Desert After Dark was chosen before he walked in — by the hosts, and by the women who reviewed the list. When you're there, that's understood. You never have to prove you belong.",
      },
      {
        title: "Two women for every man",
        body: "One hundred men. Two hundred women, hand-selected. The ratio isn't an accident; it's the whole point of how we curate.",
      },
      {
        title: "The men are worth knowing too",
        body: "Founders, executives, investors, athletes, creatives. The kind of men who are hard to reach on a normal night and easy to talk to on this one.",
      },
      {
        title: "No lines, no pitching, no bottle-service theatre",
        body: "A private estate with a runway, two full bars, private chefs, fire performers and DJs till last call. Hosted introductions all night. You walk in and the room does the work.",
      },
    ],
  },
  photos: {
    eyebrow: "Professional photography, included",
    headline: "Leave with the photos to prove it",
    body: "A professional photographer works the room all night. Every man gets his own edited photos with the women he met, delivered to his inbox after the event. Not a selfie in a dark bar — the kind of photo people ask you about.",
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
      { time: "7:00pm", title: "Fashion Show", body: "Four designers, one runway, seated audience. This is the main event." },
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
      { title: "Arrive", body: "The address goes out 72 hours before the door opens. Dress code: desert sunset — warm tones, elevated black, a touch of gold." },
    ],
  },
  faq: [
    { q: "Can I just buy a ticket?", a: "No. Every man is approved before he can buy. That's what keeps the room the room." },
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
