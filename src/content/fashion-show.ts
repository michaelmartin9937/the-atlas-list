export const fashionShow = {
  hero: {
    eyebrow: "October 10, 2026 · Paradise Valley",
    headline: "One night. One mansion. The biggest fashion moment Scottsdale has ever seen.",
    subhead:
      "A private-residence runway show and after-dark takeover, curated by The Atlas List. Featured designers, hand-picked models, top-shelf DJs, and a guest list built one name at a time.",
    cta: "Apply for Ticket Allocation",
  },
  pitch: {
    eyebrow: "The Event",
    headline: "Not a nightclub. Not a pop-up. A once-a-year cultural moment.",
    body: [
      "October 10th, inside a private Paradise Valley estate, The Atlas List is producing what will be — hands down — the number-one fashion show and mansion party the greater Scottsdale area has ever hosted.",
      "A full production runway show inside a residence you can't walk into any other night of the year. The designers you'd fly to Los Angeles or Miami to see. The DJs you'd wait in line an hour for. And the guest list is intentionally short, intentionally beautiful, and closed to anyone who has to ask twice.",
      "If you're in the room, it's because someone decided you belong there.",
    ],
  },
  designers: {
    eyebrow: "Featured Designers",
    headline: "The runway.",
    intro:
      "Five designers, one runway, one night. Each brings a distinct point of view — the through-line is craft, taste, and clothes you'd actually want to be photographed in.",
    list: [
      { name: "Almer", note: "" },
      { name: "Svetik", note: "" },
      { name: "Isaac Newton", note: "" },
      { name: "Valeria Felares", note: "" },
      { name: "Rollog", note: "" },
    ],
  },
  models: {
    eyebrow: "Featured Models",
    headline: "The lineup.",
    intro:
      "The full cast will be announced closer to the event. Every model on our runway is signed, professional, and hand-picked to fit the point of view of the designers she's walking for.",
    tbd: "Roster reveal — coming soon.",
  },
  djs: {
    eyebrow: "On the Decks",
    headline: "The sound.",
    intro:
      "The music runs from cocktail hour through the after-party. First name confirmed, more coming.",
    list: [
      { name: "DJ Anthoz", note: "Headlining." },
      { name: "More TBA", note: "Additional DJs to be announced." },
    ],
  },
  location: {
    eyebrow: "The Venue",
    headline: "A private residence in Paradise Valley.",
    body:
      "This is not a hotel ballroom, not a club, not a public venue. It's a private estate — the kind of place you don't see on the way to work. The exact address is released only to ticketed guests, 72 hours before the door opens. This is how we keep the room the room.",
  },
  timeline: {
    eyebrow: "The Evening",
    headline: "Four acts.",
    intro:
      "Timing for each act finalizes closer to the event. Ticketed guests receive the full run of show two weeks out.",
    acts: [
      {
        title: "VIP Pre-Party",
        time: "Time TBA",
        body: "An early-arrival cocktail hour for VIP ticket holders — smaller room, first-look at the designers, a chance to meet the room before the room fills.",
      },
      {
        title: "Fashion Show",
        time: "Time TBA",
        body: "Five designers, one runway. Full production, live music, seated audience. This is the main event.",
      },
      {
        title: "Mansion Party",
        time: "Time TBA",
        body: "The full estate opens up. DJs take over, the bar is full, and the room becomes what a mansion in Paradise Valley on the right night is supposed to feel like.",
      },
      {
        title: "After Party",
        time: "Time & Location TBA",
        body: "For the guests still standing. Location is released the night of, to the guests we want at it.",
      },
    ],
  },
  apply: {
    eyebrow: "Apply",
    headline: "Request your ticket allocation.",
    subhead:
      "Tickets are allocated by application, not by open sale. Tell us about you below. If you're approved, we'll follow up with tier options (General, VIP), pricing, and RSVP instructions.",
  },
} as const;
