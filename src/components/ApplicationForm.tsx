"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { formatPhoneAsTyping } from "@/lib/phone";
import { readAttribution } from "@/lib/attribution";
import { HEARD_ABOUT_OPTIONS } from "@/lib/application-options";

type Tone = "light" | "dark";

type Props = {
  sourcePage: "home" | "about" | "desert-after-dark";
  submitLabel?: string;
  // "light" (default) sits on the site's pearl sections; "dark" is the
  // Desert After Dark "Velvet Sunset" treatment on velvet-black sections.
  tone?: Tone;
  // The home page form omits the Instagram field (Figma, Sep 2026); About and
  // Desert After Dark keep it. The field is optional server-side either way.
  showInstagram?: boolean;
  // "extended" is the 2–3 minute Desert After Dark application (Sep 2026):
  // three short groups — About You / Your Connection / The Room — built to
  // give reviewers real context, with Instagram required. "short" (default)
  // is the original lead-capture form used on Home and About.
  variant?: "short" | "extended";
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
  | "city"
  | "linkedin"
  | "referredBy"
  | "attendedBefore"
  | "attendedEvent"
  | "drewYou"
  | "aboutYou"
  | "hopingFor"
  | "agreement"
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
  group: string;
  groupRule: string;
  radio: string;
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
    submit: "text-bone bg-noir hover:bg-gold hover:text-noir",
    group: "text-gold",
    groupRule: "bg-sand",
    radio: "accent-noir",
  },
  dark: {
    input:
      "w-full bg-transparent border-0 border-b border-velvet-line px-0 py-3 text-bone font-sans text-base focus:outline-none focus:border-champagne placeholder:text-velvet-text/60",
    label: "text-[#D8D2C8]",
    helper: "text-velvet-text/80",
    error: "text-red-400",
    checkbox: "accent-champagne",
    consent: "text-[#D8D2C8]",
    fine: "text-velvet-text/80",
    link: "hover:text-champagne",
    submit: "text-noir bg-gold hover:bg-bone",
    group: "text-gold",
    groupRule: "bg-velvet-line",
    radio: "accent-champagne",
  },
};

export function ApplicationForm({
  sourcePage,
  submitLabel,
  tone = "light",
  showInstagram = true,
  variant = "short",
}: Props) {
  const t = TONES[tone];
  const extended = variant === "extended";
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [heardAbout, setHeardAbout] = useState("");
  const [vouchIntro, setVouchIntro] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  // Extended-only answers
  const [city, setCity] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [attendedBefore, setAttendedBefore] = useState<"" | "yes" | "no">("");
  const [attendedEvent, setAttendedEvent] = useState("");
  const [drewYou, setDrewYou] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const [hopingFor, setHopingFor] = useState("");
  const [agreement, setAgreement] = useState(false);
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
          attribution: readAttribution(),
          ...(extended && {
            formVersion: 2,
            city,
            linkedin,
            referredBy,
            attendedBefore,
            attendedEvent,
            drewYou,
            aboutYou,
            hopingFor,
            agreement,
          }),
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
        setErrors({
          ...data.fieldErrors,
          // The extended form is long; say so at the button, where they are.
          ...(extended && { form: "A few answers need another look — they're marked above." }),
        });
      } else {
        setErrors({ form: data.error ?? "Something went wrong. Please try again." });
      }
    } catch {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  const textarea = `${t.input} resize-none border ${tone === "dark" ? "border-velvet-line" : "border-sand/80"} px-4 py-3 mt-2 min-h-[90px]`;

  const identity = (
    <>
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

      {(showInstagram || extended) && (
        <Field
          label="Instagram handle"
          helper={
            extended
              ? "Required — it's the first thing we look at. A private profile is fine; we'll send a follow request."
              : "Optional, but helpful for invite review."
          }
          error={errors.instagram}
          tone={t}
        >
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="@yourhandle"
            required={extended}
            autoComplete="off"
            autoCapitalize="none"
            className={t.input}
          />
        </Field>
      )}
    </>
  );

  const goodFit = (
    <Field
      label="What makes you a good fit for this room?"
      helper={
        extended
          ? "Two or three sentences on what you'd bring to the room."
          : "If a current member is putting your name forward, name them. If not, tell us in two sentences what you'd bring to the room."
      }
      error={errors.vouchIntro}
      tone={t}
    >
      <textarea
        value={vouchIntro}
        onChange={(e) => setVouchIntro(e.target.value)}
        required
        rows={4}
        maxLength={800}
        className={textarea}
      />
    </Field>
  );

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8" noValidate>
      {extended ? (
        <>
          <Group title="About You" step="1 of 3" tone={t} first />
          {identity}
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-10">
            <Field label="City / neighborhood" error={errors.city} tone={t}>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Arcadia, Old Town, Paradise Valley…"
                required
                maxLength={120}
                autoComplete="address-level2"
                className={t.input}
              />
            </Field>
            <Field label="LinkedIn or website" helper="Optional." error={errors.linkedin} tone={t}>
              <input
                type="text"
                inputMode="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="linkedin.com/in/you"
                maxLength={300}
                autoComplete="url"
                autoCapitalize="none"
                className={t.input}
              />
            </Field>
          </div>

          <Group title="Your Connection" step="2 of 3" tone={t} />
          <Field label="How did you hear about Desert After Dark?" error={errors.heardAbout} tone={t}>
            <select
              value={heardAbout}
              onChange={(e) => setHeardAbout(e.target.value)}
              required
              className={`${t.input} appearance-none cursor-pointer [&>option]:text-noir [&>option]:bg-white ${heardAbout ? "" : tone === "dark" ? "text-velvet-text/60" : "text-ink/40"}`}
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
          <Field
            label="Were you referred by someone? If so, who?"
            helper="Optional. A name or an Instagram handle is plenty."
            error={errors.referredBy}
            tone={t}
          >
            <input
              type="text"
              value={referredBy}
              onChange={(e) => setReferredBy(e.target.value)}
              maxLength={200}
              autoComplete="off"
              className={t.input}
            />
          </Field>
          <fieldset className="flex flex-col gap-3">
            <legend className={`text-[11px] font-medium uppercase tracking-[0.08em] ${t.label}`}>
              Have you attended an Atlas List event before?
            </legend>
            <div className="mt-3 flex gap-8">
              {(["yes", "no"] as const).map((v) => (
                <label key={v} className={`flex items-center gap-2 cursor-pointer text-sm ${t.consent}`}>
                  <input
                    type="radio"
                    name="attendedBefore"
                    value={v}
                    checked={attendedBefore === v}
                    onChange={() => setAttendedBefore(v)}
                    required
                    className={`h-[14px] w-[14px] ${t.radio}`}
                  />
                  {v === "yes" ? "Yes" : "Not yet"}
                </label>
              ))}
            </div>
            {errors.attendedBefore && <span className={`text-xs ${t.error}`}>{errors.attendedBefore}</span>}
          </fieldset>
          {attendedBefore === "yes" && (
            <Field label="Which one?" error={errors.attendedEvent} tone={t}>
              <input
                type="text"
                value={attendedEvent}
                onChange={(e) => setAttendedEvent(e.target.value)}
                maxLength={200}
                autoComplete="off"
                className={t.input}
              />
            </Field>
          )}

          <Group title="The Room" step="3 of 3" tone={t} />
          <Field label="What drew you to Desert After Dark?" error={errors.drewYou} tone={t}>
            <textarea
              value={drewYou}
              onChange={(e) => setDrewYou(e.target.value)}
              required
              rows={3}
              maxLength={800}
              className={textarea}
            />
          </Field>
          <Field
            label="Tell us a little about yourself"
            helper="What you do, what you're interested in, and the kinds of people you enjoy meeting. Two to four sentences."
            error={errors.aboutYou}
            tone={t}
          >
            <textarea
              value={aboutYou}
              onChange={(e) => setAboutYou(e.target.value)}
              required
              rows={5}
              maxLength={1200}
              className={textarea}
            />
          </Field>
          <Field label="What are you hoping to get out of the evening?" error={errors.hopingFor} tone={t}>
            <textarea
              value={hopingFor}
              onChange={(e) => setHopingFor(e.target.value)}
              required
              rows={3}
              maxLength={800}
              className={textarea}
            />
          </Field>
          {goodFit}
        </>
      ) : (
        <>
          {identity}
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
          {goodFit}
        </>
      )}

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

      {extended && (
        <div className="flex flex-col gap-2">
          <label className="flex gap-3 items-start cursor-pointer">
            <input
              type="checkbox"
              checked={agreement}
              onChange={(e) => setAgreement(e.target.checked)}
              required
              className={`mt-[3px] h-[14px] w-[14px] flex-shrink-0 ${t.checkbox}`}
            />
            <span className={`text-sm leading-[1.45] ${t.consent}`}>
              I&rsquo;m 21 or older, I&rsquo;ll treat the room and everyone in it with respect, and I
              won&rsquo;t bring guests who haven&rsquo;t been approved. I understand that applying
              doesn&rsquo;t guarantee admission.
            </span>
          </label>
          {errors.agreement && <p className={`pl-[26px] text-xs ${t.error}`}>{errors.agreement}</p>}
        </div>
      )}

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

      {errors.form && (
        <p role="alert" className={`text-sm ${t.error}`}>
          {errors.form}
        </p>
      )}

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={submitting}
          className={`self-start inline-flex items-center justify-center h-[50px] px-10 text-xs font-medium uppercase tracking-[0.06em] transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${t.submit}`}
        >
          {submitting ? "Submitting…" : submitLabel ?? "Apply for an Invite"}
        </button>
        {extended && (
          <p className={`text-xs leading-relaxed ${t.fine}`}>
            Every application is read by a person, not scored by software. It takes about three
            minutes.
          </p>
        )}
      </div>
    </form>
  );
}

// Section marker for the extended form: gold tracked title, hairline, and a
// quiet step count so the length reads as deliberate rather than endless.
function Group({
  title,
  step,
  tone,
  first = false,
}: {
  title: string;
  step: string;
  tone: ToneClasses;
  first?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 ${first ? "" : "mt-6 md:mt-8"}`}>
      <h3 className={`text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap ${tone.group}`}>
        {title}
      </h3>
      <span className={`h-px flex-1 ${tone.groupRule}`} aria-hidden />
      <span className={`text-[11px] tracking-[0.08em] whitespace-nowrap ${tone.fine}`}>{step}</span>
    </div>
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
