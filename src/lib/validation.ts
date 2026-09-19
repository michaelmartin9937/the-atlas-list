import { z } from "zod";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Keep it under ${max} characters`)
    .optional()
    .or(z.literal(""));

// Silent marketing attribution, captured on the visitor's first page view
// (see src/components/AttributionCapture.tsx). Never shown, never required.
const attributionSchema = z
  .object({
    landingPage: optionalText(500),
    referrer: optionalText(500),
    utmSource: optionalText(200),
    utmMedium: optionalText(200),
    utmCampaign: optionalText(200),
    utmContent: optionalText(200),
  })
  .partial()
  .optional();

export const applicationSchema = z
  .object({
    firstName: z.string().trim().min(1, "Required").max(60),
    lastName: z.string().trim().min(1, "Required").max(60),
    phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
    email: z.string().trim().email("Enter a valid email").max(120),
    // A handle, or a pasted profile URL — the API reduces either to the handle.
    instagram: optionalText(120),
    heardAbout: optionalText(200),
    vouchIntro: z
      .string()
      .trim()
      .min(10, "Tell us a little more")
      .max(800, "Keep it under 800 characters"),
    smsConsent: z.literal(true, {
      errorMap: () => ({ message: "SMS consent is required to apply" }),
    }),
    // "fashion-show" is the old address of the Desert After Dark page; still
    // accepted so a tab opened before the rename can submit. The API stores it
    // as "desert-after-dark".
    sourcePage: z.enum(["home", "about", "desert-after-dark", "fashion-show"]).optional(),
    // Honeypot — must be empty for a real submission
    website: z.string().max(0).optional(),

    // 2 = the extended Desert After Dark application. Absent / 1 = the short
    // form (Home, About, and any Desert After Dark tab opened before the
    // extended form shipped), where none of the fields below are required.
    formVersion: z.union([z.literal(1), z.literal(2)]).optional(),
    city: optionalText(120),
    linkedin: optionalText(300),
    referredBy: optionalText(200),
    attendedBefore: z.enum(["yes", "no"]).optional().or(z.literal("")),
    attendedEvent: optionalText(200),
    drewYou: optionalText(800),
    aboutYou: optionalText(1200),
    hopingFor: optionalText(800),
    agreement: z.boolean().optional(),
    attribution: attributionSchema,
  })
  .superRefine((v, ctx) => {
    if (v.formVersion !== 2) return;
    const need = (key: keyof typeof v, ok: boolean, message: string) => {
      if (!ok) ctx.addIssue({ code: z.ZodIssueCode.custom, path: [key], message });
    };
    need("instagram", !!parseInstagramHandle(v.instagram), "Required — it's how we review applications");
    need("city", !!v.city, "Required");
    need("heardAbout", !!v.heardAbout, "Choose one");
    need("attendedBefore", v.attendedBefore === "yes" || v.attendedBefore === "no", "Choose one");
    need("drewYou", (v.drewYou ?? "").length >= 10, "Tell us a little more");
    need("aboutYou", (v.aboutYou ?? "").length >= 40, "A few sentences, please");
    need("hopingFor", (v.hopingFor ?? "").length >= 10, "Tell us a little more");
    need("agreement", v.agreement === true, "Please confirm to apply");
  });

export type ApplicationInput = z.infer<typeof applicationSchema>;

// LinkedIn / website is typed loosely ("linkedin.com/in/me", "mysite.com").
// Store a clickable https URL, or null when it doesn't look like one.
export function normalizeUrl(raw: string | undefined | null): string | null {
  const s = (raw ?? "").trim();
  if (!s) return null;
  const withScheme = /^https?:\/\//i.test(s) ? s : `https://${s}`;
  try {
    const u = new URL(withScheme);
    if (!/^https?:$/.test(u.protocol) || !u.hostname.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}

// Accepts "@handle", "handle", or a pasted profile URL; returns the bare
// lowercase handle, or null if it can't be a real Instagram username.
export function parseInstagramHandle(raw: string | undefined | null): string | null {
  let s = (raw ?? "").trim();
  if (!s) return null;
  const m = s.match(/instagram\.com\/([^/?#\s]+)/i);
  if (m) s = m[1];
  s = s.replace(/^@+/, "").toLowerCase();
  return /^[a-z0-9._]{1,30}$/.test(s) ? s : null;
}
