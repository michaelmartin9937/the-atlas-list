import { z } from "zod";

export const applicationSchema = z.object({
  firstName: z.string().trim().min(1, "Required").max(60),
  lastName: z.string().trim().min(1, "Required").max(60),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  email: z.string().trim().email("Enter a valid email").max(120),
  vouchIntro: z
    .string()
    .trim()
    .min(10, "Tell us a little more")
    .max(800, "Keep it under 800 characters"),
  smsConsent: z.literal(true, {
    errorMap: () => ({ message: "SMS consent is required to apply" }),
  }),
  sourcePage: z.enum(["home", "about"]).optional(),
  // Honeypot — must be empty for a real submission
  website: z.string().max(0).optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
