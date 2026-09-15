import { z } from "zod";

export const partnerInquirySchema = z.object({
  companyName: z.string().trim().min(1, "Required").max(120),
  contactName: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Enter a valid email").max(120),
  category: z.string().trim().max(120).optional().or(z.literal("")),
  budgetRange: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(1500, "Keep it under 1500 characters").optional().or(z.literal("")),
  // Honeypot — must be empty for a real submission
  website: z.string().max(0).optional(),
});

export type PartnerInquiryInput = z.infer<typeof partnerInquirySchema>;
