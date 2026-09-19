// The fixed answers offered by the extended form's "How did you hear about
// us?" select. Kept out of validation.ts so the browser bundle doesn't pull
// in zod just for this list.
export const HEARD_ABOUT_OPTIONS = [
  "Instagram",
  "A friend",
  "Invited by a host",
  "A previous Atlas List event",
  "Other",
] as const;
