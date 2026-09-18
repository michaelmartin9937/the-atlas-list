"use client";

import { useState, type FormEvent } from "react";

type FieldErrors = Partial<
  Record<"companyName" | "contactName" | "email" | "category" | "budgetRange" | "message" | "form", string>
>;

const input =
  "w-full bg-transparent border-0 border-b border-sand px-0 py-3 text-noir font-sans text-base focus:outline-none focus:border-ember placeholder:text-ink/40";

// Figma (Sponsorship — Partnership Inquiries): the same hairline fields as
// the application form, a boxed message, a dark "Submit Inquiry" button.
export function PartnerForm() {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, contactName, email, category, budgetRange, message, website }),
      });
      if (res.ok) {
        setSent(true);
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { fieldErrors?: FieldErrors; error?: string };
      setErrors(data.fieldErrors ?? { form: data.error ?? "Something went wrong. Please try again." });
    } catch {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center flex flex-col items-center gap-4 py-10" role="status">
        <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
          Inquiry received
        </span>
        <p className="font-serif text-2xl md:text-3xl text-noir">Thank you — we&apos;ll be in touch.</p>
        <p className="text-base text-ink/70 max-w-[480px]">
          We read every inquiry personally and reply within a few days with what&apos;s still open.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8" noValidate>
      <div className="grid sm:grid-cols-2 gap-8 sm:gap-10">
        <Field label="Company name" error={errors.companyName}>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required autoComplete="organization" className={input} />
        </Field>
        <Field label="Contact name" error={errors.contactName}>
          <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} required autoComplete="name" className={input} />
        </Field>
      </div>
      <Field label="Email address" error={errors.email}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className={input} />
      </Field>
      <Field label="Category of interest" error={errors.category}>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Spirits, Champagne & Wine, Automotive…" autoComplete="off" className={input} />
      </Field>
      <Field label="Budget range" helper="Optional" error={errors.budgetRange}>
        <input type="text" value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)} autoComplete="off" className={input} />
      </Field>
      <Field label="Message" error={errors.message}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          maxLength={1500}
          className={`${input} resize-none border border-sand px-4 py-3 mt-2 min-h-[90px]`}
        />
      </Field>

      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>

      {errors.form && <p className="text-sm text-red-700">{errors.form}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="self-start inline-flex items-center justify-center h-[50px] px-[60px] text-xs font-medium uppercase tracking-[0.06em] text-bone bg-noir hover:bg-gold hover:text-noir transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending…" : "Submit Inquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  helper,
  error,
  children,
}: {
  label: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink/70">{label}</span>
      {children}
      {helper && <span className="mt-2 text-sm leading-relaxed text-ink/60">{helper}</span>}
      {error && <span className="mt-1 text-xs text-red-700">{error}</span>}
    </label>
  );
}
