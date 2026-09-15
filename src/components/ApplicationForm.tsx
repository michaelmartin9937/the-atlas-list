"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { formatPhoneAsTyping } from "@/lib/phone";

type Tone = "light" | "dark";

type Props = {
  sourcePage: "home" | "about" | "desert-after-dark";
  submitLabel?: string;
  // "light" (default) sits on the site's pearl sections; "dark" is the
  // Desert After Dark "Velvet Sunset" treatment on velvet-black sections.
  tone?: Tone;
};

type FieldErrors = Partial<Record<
  | "firstName"
  | "lastName"
  | "phone"
  | "email"
  | "instagram"
  | "heardAbout"
  | "vouchIntro"
  | "smsConsent"
  | "form",
  string
>>;

type ToneClasses = {
  input: string;
  label: string;
  helper: string;
  error: string;
  checkbox: string;
  consent: string;
  fine: string;
  link: string;
  submit: string;
};

// Figma spec: 12/13px tracked uppercase labels, 1px hairline fields, 50px
// dark button; the dark tone swaps to the event palette.
const TONES: Record<Tone, ToneClasses> = {
  light: {
    input:
      "w-full bg-transparent border-0 border-b border-sand px-0 py-3 text-noir font-sans text-base focus:outline-none focus:border-ember placeholder:text-ink/40",
    label: "text-ink/70",
    helper: "text-ink/60",
    error: "text-red-700",
    checkbox: "accent-noir",
    consent: "text-ink/85",
    fine: "text-ink/55",
    link: "hover:text-ember",
    submit: "text-bone bg-noir hover:bg-ember",
  },
  dark: {
    input:
      "w-full bg-transparent border-0 border-b border-bone/25 px-0 py-3 text-bone font-sans text-base focus:outline-none focus:border-champagne placeholder:text-bone/35",
    label: "text-rosewood",
    helper: "text-bone/55",
    error: "text-red-400",
    checkbox: "accent-burgundy",
    consent: "text-bone/80",
    fine: "text-bone/55",
    link: "hover:text-champagne",
    submit: "text-velvet bg-champagne hover:bg-burgundy hover:text-bone",
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
  const [heardAbout, setHeardAbout] = useState("");
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
          heardAbout,
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
    <form onSubmit={onSubmit} className="flex flex-col gap-8" noValidate>
      <div className="grid sm:grid-cols-2 gap-8 sm:gap-10">
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
        label="How did you hear about us?"
        helper="So we know who to thank — a friend, Instagram, an event."
        error={errors.heardAbout}
        tone={t}
      >
        <input
          type="text"
          value={heardAbout}
          onChange={(e) => setHeardAbout(e.target.value)}
          maxLength={200}
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
          rows={4}
          maxLength={800}
          className={`${t.input} resize-none border border-sand/80 px-4 py-3 mt-2 min-h-[90px]`}
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

      <div className="flex flex-col gap-2">
        <label className="flex gap-3 items-start cursor-pointer">
          <input
            type="checkbox"
            checked={smsConsent}
            onChange={(e) => setSmsConsent(e.target.checked)}
            required
            className={`mt-[3px] h-[14px] w-[14px] flex-shrink-0 ${t.checkbox}`}
          />
          <span className={`text-sm leading-[1.45] ${t.consent}`}>
            Yes, text me about gatherings, RSVPs, and Atlas List news — a few times a month, never more.
          </span>
        </label>
        {/* Carrier/TCPA disclosures stay attached to the consent. */}
        <p className={`pl-[26px] text-xs leading-relaxed ${t.fine}`}>
          Automated SMS from The Atlas List; message frequency varies (typically 2–6/month). Message and
          data rates may apply. Reply STOP to unsubscribe, HELP for help. Consent is not a condition of
          consideration. See our{" "}
          <a href="/privacy" className={`underline ${t.link}`}>
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms" className={`underline ${t.link}`}>
            Terms
          </a>
          .
        </p>
        {errors.smsConsent && <p className={`pl-[26px] text-xs ${t.error}`}>{errors.smsConsent}</p>}
      </div>

      {errors.form && <p className={`text-sm ${t.error}`}>{errors.form}</p>}

      <button
        type="submit"
        disabled={submitting}
        className={`self-start inline-flex items-center justify-center h-[50px] px-10 text-xs font-medium uppercase tracking-[0.06em] transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${t.submit}`}
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
    <label className="flex flex-col gap-1">
      <span className={`text-[11px] font-medium uppercase tracking-[0.08em] ${tone.label}`}>{label}</span>
      {children}
      {helper && <span className={`mt-2 text-xs leading-relaxed ${tone.helper}`}>{helper}</span>}
      {error && <span className={`mt-1 text-xs ${tone.error}`}>{error}</span>}
    </label>
  );
}
