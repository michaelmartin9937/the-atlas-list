// Arrival Notes (/private/desert-after-dark-1010/arrival) — the shared
// logistics page linked from confirmed-guest emails, men and women alike.
// Unlisted (noindex, not in nav or sitemap). Viewing it does not establish
// admission; it only explains how to arrive.
//
// TO UPDATE TRANSPORT DETAILS: edit the `vehicles` list below (name,
// window, driver, phone, note) and deploy. Empty fields simply don't
// render; the page never shows blanks or "TBD".
export const arrival = {
  route: "/private/desert-after-dark-1010/arrival",
  title: "Desert After Dark — Arrival Notes",
  intro: "Everything you need to plan your arrival for Saturday, October 10.",

  glance: {
    eyebrow: "At a glance",
    rows: [
      ["Date", "Saturday, October 10, 2026"],
      ["Event", "5:30–10:00 PM Arizona time"],
      ["After hours", "Optional gathering until midnight"],
      ["Location", "Paradise Valley, Arizona"],
      ["Check-in", "Photo ID and your confirmation email"],
    ],
    note: "Admission is checked against the confirmed guest list.",
  },

  options: {
    eyebrow: "Arrival options",
    pickupWindow: "5:15–7:30 PM",
    cards: [
      {
        pinId: "pickup",
        label: "01 Park & ride · pickup 5:15–7:30 PM",
        lines: ["Camelback Village Center", "5041 N 44th St", "Phoenix, AZ 85018"],
        body: "Meet in the lot east of Bank of America, just south of AJ's Fine Foods. Guests using this parking location take the event car service to the estate.",
        mapsQuery: "5041 N 44th St, Phoenix, AZ 85018",
        copyText: "5041 N 44th St, Phoenix, AZ 85018",
      },
      {
        pinId: "estate",
        label: "02 Rideshare drop-off · the estate",
        lines: ["4536 E Foothill Dr", "Paradise Valley, AZ 85253"],
        body: "Guests arriving by Uber or Lyft can be dropped off at the estate gate. There is no guest parking at the estate or in the surrounding neighborhood.",
        mapsQuery: "4536 E Foothill Dr, Paradise Valley, AZ 85253",
        copyText: "4536 E Foothill Dr, Paradise Valley, AZ 85253",
      },
    ],
    rule: "No guest parking at the estate or in the surrounding neighborhood.",
  },

  transport: {
    eyebrow: "Event transportation",
    copy: "Event transportation connects the designated pickup location and the estate. These are the vehicles and drivers for the night. Please check this page again on Saturday before leaving in case anything changes.",
    // Driver details supplied 2026-10-09 ("Driver Info.md"). Edit here to
    // change a name, number or window; empty fields simply don't render.
    vehicles: [
      { name: "Cadillac Escalade", window: "Sat, Oct 10 · 3:00–10:00 PM", driver: "Sari S", phone: "(602) 377-4232", tel: "+16023774232", note: "" },
      { name: "Ultra Premium Maybach Jet Sprinter", window: "6:00 PM–12:00 AM", driver: "Jeff Paxton", phone: "(559) 676-8307", tel: "+15596768307", note: "Shuttle loop between the lot and the property" },
      { name: "Ultra Luxury Limo Party Sprinter", window: "6:00 PM–12:00 AM", driver: "Jonathan", phone: "(909) 942-1800", tel: "+19099421800", note: "Shuttle loop" },
    ],
  },

  returnService: {
    title: "Ride home",
    // "Until midnight" is awaiting host confirmation.
    body: "The event car service returns guests to the pickup location until midnight. Uber and Lyft also serve the estate.",
  },

  guidance: {
    eyebrow: "Guest guidance",
    copy: "Your invitation is individual and non-transferable. Additional guests must apply and receive approval in advance. Please keep this page and the private estate address confidential.",
  },

  calendar: {
    cta: "Add to calendar",
    googleCta: "Google Calendar",
    note: "On iPhone, “Add to calendar” opens Apple Calendar. Times are Arizona time.",
  },

  footer: { email: "info@theatlaslist.club", place: "Paradise Valley, AZ" },
} as const;
