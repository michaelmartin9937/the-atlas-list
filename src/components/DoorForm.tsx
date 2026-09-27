"use client";

import { useState, type FormEvent } from "react";
import { formatPhoneAsTyping } from "@/lib/phone";
import { readAttribution } from "@/lib/attribution";
import { HEARD_ABOUT_OPTIONS } from "@/lib/application-options";

type Errors = Partial<Record<"firstName" | "lastName" | "phone" | "email" | "instagram" | "heardAbout" | "gender" | "form", string>>;
type Gender = "" | "woman" | "man" | "non-binary";
const GENDERS: { value: Gender; label: string }[] = [
  { value: "woman", label: "Woman" },
  { value: "man", label: "Man" },
  { value: "non-binary", label: "Non-binary" },
];

const input =
  "w-full bg-transparent border-0 border-b border-velvet-line px-0 py-3 text-bone font-sans text-[17px] focus:outline-none focus:border-gold placeholder:text-velvet-text/50";
const label = "text-[11px] font-medium uppercase tracking-[0.08em] text-[#D8D2C8]";

// Day-of form for guests paying in person: four fields, one tap. Posts to the
// same /api/apply route as the application form, so the row takes the same
// path — Supabase → Make → Airtable → MailerLite — with form_version 3 and
// "paying at the door" in the notes. Built for a phone held at the door.
export function DoorForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [heardAbout, setHeardAbout] = useState("");
  const [gender, setGender] = useState<Gender>("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);

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
          gender,
          sourcePage: "desert-after-dark-door",
          formVersion: 3,
          website,
          attribution: readAttribution(),
        }),
      });
      if (res.ok) {
        setDone(firstName.trim());
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { fieldErrors?: Errors; error?: string };
      setErrors(data.fieldErrors ?? { form: data.error ?? "Something went wrong. Please try again." });
    } catch {
      setErrors({ form: "No connection. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  const reset = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setInstagram("");
    setHeardAbout("");
    setGender("");
    setDone(null);
  };

  if (done !== null) {
    return (
      <div className="text-center" role="status">
        <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">You&rsquo;re on the list</span>
        <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-bone">
          {done ? `Thank you, ${done}.` : "Thank you."}
        </h2>
        <p className="mt-5 text-[17px] leading-[1.5] text-velvet-text">
          Show this screen to the host at the door to pay and come in.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-10 inline-flex w-full sm:w-auto items-center justify-center h-[52px] px-8 border border-velvet-line text-[13px] font-semibold uppercase tracking-[0.08em] text-bone hover:border-gold hover:text-gold transition-colors"
        >
          Add another guest
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8" noValidate>
      <Field label="First name" error={errors.firstName}>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required autoComplete="given-name" autoCapitalize="words" className={input} />
      </Field>
      <Field label="Last name" error={errors.lastName}>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required autoComplete="family-name" autoCapitalize="words" className={input} />
      </Field>
      <Field label="Mobile number" error={errors.phone}>
        <input type="tel" value={phone} onChange={(e) => setPhone(formatPhoneAsTyping(e.target.value))} placeholder="(555) 123-4567" required autoComplete="tel" inputMode="tel" className={input} />
      </Field>
      <Field label="Email address" error={errors.email}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" inputMode="email" autoCapitalize="none" className={input} />
      </Field>
      <Field label="Instagram handle" error={errors.instagram}>
        <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="@yourhandle" autoComplete="off" autoCapitalize="none" className={input} />
      </Field>
      <Field label="How did you hear about The Atlas List?" error={errors.heardAbout}>
        <select
          value={heardAbout}
          onChange={(e) => setHeardAbout(e.target.value)}
          required
          className={`${input} appearance-none cursor-pointer [&>option]:text-noir [&>option]:bg-white ${heardAbout ? "" : "text-velvet-text/50"}`}
        >
          <option value="" disabled>
            Choose one
          </option>
          {HEARD_ABOUT_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>
      <fieldset className="flex flex-col gap-3">
        <legend className={label}>Gender</legend>
        <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup">
          {GENDERS.map((g) => (
            <button
              key={g.value}
              type="button"
              role="radio"
              aria-checked={gender === g.value}
              onClick={() => setGender(g.value)}
              className={`h-12 border text-[13px] font-medium uppercase tracking-[0.06em] transition-colors ${
                gender === g.value
                  ? "border-gold bg-gold text-noir"
                  : "border-velvet-line text-bone hover:border-gold"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
        {errors.gender && <span className="text-xs text-red-400">{errors.gender}</span>}
      </fieldset>

      {/* Honeypot — hidden from real users, bots will fill it */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>

      {errors.form && (
        <p role="alert" className="text-sm text-red-400">
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex w-full items-center justify-center h-[56px] px-10 text-[13px] font-semibold uppercase tracking-[0.08em] text-noir bg-gold hover:bg-bone transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Saving…" : "Add me to the list"}
      </button>
      <p className="text-xs leading-relaxed text-velvet-text/80">
        We&rsquo;ll use these details to check you in and send your photos afterwards. See our{" "}
        <a href="/privacy" className="underline hover:text-gold">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}

function Field({ label: text, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className={label}>{text}</span>
      {children}
      {error && <span className="mt-1 text-xs text-red-400">{error}</span>}
    </label>
  );
}
