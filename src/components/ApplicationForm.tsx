"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { formatPhoneAsTyping } from "@/lib/phone";

type Tone = "light" | "dark";

type Props = {
  sourcePage: "home" | "about" | "desert-after-dark";
  submitLabel?: string;
  // "light" (default) sits on the site's bone/pearl sections; "dark" is the
  // Desert After Dark "Velvet Sunset" treatment on velvet-black sections.
  tone?: Tone;
};

type FieldErrors = Partial<Record<
  "firstName" | "lastName" | "phone" | "email" | "instagram" | "vouchIntro" | "smsConsent" | "form",
  string
>>;

type ToneClasses = {
  input: string;
  label: string;
  helper: string;
  error: string;
  checkbox: string;
  consent: string;
  link: string;
  submit: string;
};

const TONES: Record<Tone, ToneClasses> = {
  light: {
    input:
      "w-full bg-transparent border-0 border-b border-taupe/50 px-0 py-3 text-noir font-sans text-base focus:outline-none focus:border-bronze placeholder:text-taupe/60",
    label: "text-taupe",
    helper: "text-ink/60",
    error: "text-red-700",
    checkbox: "accent-noir",
    consent: "text-ink/80",
    link: "hover:text-bronze",
    submit: "text-bone bg-noir hover:bg-bronze",
  },
  dark: {
    input:
      "w-full bg-transparent border-0 border-b border-bone/25 px-0 py-3 text-bone font-sans text-base focus:outline-none focus:border-champagne placeholder:text-bone/35",
    label: "text-rosewood",
    helper: "text-bone/55",
    error: "text-red-400",
    checkbox: "accent-champagne",
    consent: "text-bone/70",
    link: "hover:text-champagne",
    submit: "text-velvet bg-champagne hover:bg-rosegold",
  },
};

export function ApplicationForm({ sourcePage, submitLabel, tone = "light" }: Props) {
  const t = TONES[tone];
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [vouchIntro, setVouchIntro] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          instagram,
          vouchIntro,
          smsConsent,
          sourcePage,
          website,
        }),
      });

      if (res.ok) {
        router.push("/thank-you");
        return;
      }

      const data = (await res.json().catch(() => ({}))) as {
        fieldErrors?: FieldErrors;
        error?: string;
      };
      if (data.fieldErrors) {
        setErrors(data.fieldErrors);
      } else {
        setErrors({ form: data.error ?? "Something went wrong. Please try again." });
      }
    } catch {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="First name" error={errors.firstName} tone={t}>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoComplete="given-name"
            className={t.input}
          />
        </Field>
        <Field label="Last name" error={errors.lastName} tone={t}>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            autoComplete="family-name"
            className={t.input}
          />
        </Field>
      </div>

      <Field label="Mobile number" error={errors.phone} tone={t}>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhoneAsTyping(e.target.value))}
          placeholder="(555) 123-4567"
          required
          autoComplete="tel"
          className={t.input}
        />
      </Field>

      <Field label="Email address" error={errors.email} tone={t}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className={t.input}
        />
      </Field>

      <Field
        label="Instagram handle"
        helper="Optional, but helpful for invite review."
        error={errors.instagram}
        tone={t}
      >
        <input
          type="text"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          placeholder="@yourhandle"
          autoComplete="off"
          className={t.input}
        />
      </Field>

      <Field
        label="What makes you a good fit for this room?"
        helper="If a current member is putting your name forward, name them. If not, tell us in two sentences what you'd bring to the room."
        error={errors.vouchIntro}
        tone={t}
      >
        <textarea
          value={vouchIntro}
          onChange={(e) => setVouchIntro(e.target.value)}
          required
          rows={5}
          maxLength={800}
          className={`${t.input} resize-none`}
        />
      </Field>

      {/* Honeypot — hidden from real users, bots will fill it */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <label className="flex gap-3 items-start cursor-pointer">
        <input
          type="checkbox"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          required
          className={`mt-1 h-4 w-4 flex-shrink-0 ${t.checkbox}`}
        />
        <span className={`text-xs leading-relaxed ${t.consent}`}>
          I agree to receive automated SMS messages about upcoming gatherings, RSVPs, and member
          announcements from The Atlas List. Message frequency varies (typically 2–6/month).
          Message and data rates may apply. Reply STOP to unsubscribe, HELP for help. Consent is
          not a condition of consideration. See our{" "}
          <a href="/privacy" className={`underline ${t.link}`}>
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms" className={`underline ${t.link}`}>
            Terms
          </a>
          .
        </span>
      </label>
      {errors.smsConsent && (
        <p className={`text-xs -mt-2 ${t.error}`}>{errors.smsConsent}</p>
      )}

      {errors.form && (
        <p className={`text-sm ${t.error}`}>{errors.form}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`self-start text-xs uppercase tracking-widest px-10 py-4 transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${t.submit}`}
      >
        {submitting ? "Submitting…" : submitLabel ?? "Apply for an Invite"}
      </button>
    </form>
  );
}

function Field({
  label,
  helper,
  error,
  tone,
  children,
}: {
  label: string;
  helper?: string;
  error?: string;
  tone: ToneClasses;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className={`text-xs uppercase tracking-widest ${tone.label}`}>{label}</span>
      {children}
      {helper && <span className={`text-xs leading-relaxed ${tone.helper}`}>{helper}</span>}
      {error && <span className={`text-xs ${tone.error}`}>{error}</span>}
    </label>
  );
}
