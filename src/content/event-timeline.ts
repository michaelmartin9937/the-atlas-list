// The night, hour by hour — one source for the Desert After Dark page and
// the ticket page. Act times are the published schedule (Figma, Sep 26; also
// burned into the preview video's caption). The fashion-show beats come from
// the production run-through brief ("How the show runs").
export const eventTimeline = {
  date: "Saturday, October 10, 2026",
  doors: "5:30 PM",
  show: "7:00 PM",
  ends: "12:00 AM",
  // Short line for heroes: everything a visitor needs at a glance.
  heroTime: "Doors 5:30 PM · Show 7:00 PM · Until midnight",
  eyebrow: "The Night, Hour by Hour",
  headline: "Four acts, one estate",
  intro: "Doors at 5:30. The runway at 7:00. The estate opens up at 8:00 and doesn't close until midnight.",
  cta: "Request Ticket Allocation",
  acts: [
    {
      time: "5:30 PM",
      title: "Party",
      body: "Doors open. Cocktails on the terrace while the estate fills in.",
      beats: [],
    },
    {
      time: "7:00 PM",
      title: "Fashion Show",
      body: "Six designers, one runway, seated audience. The main event, in five beats:",
      beats: ["MC welcome", "Introduction of the fashion chapter", "Designer presentations", "Collective finale", "Transition to the evening party"],
    },
    {
      time: "8:00 PM",
      title: "Mansion Party",
      body: "The full estate opens up. DJs take over, both bars are open, fire performers on the terrace.",
      beats: [],
    },
    {
      time: "10:00 PM",
      title: "After Party",
      body: "For the guests still standing, until midnight. Location released the night of, to the guests we want at it.",
      beats: [],
    },
  ],
} as const;
