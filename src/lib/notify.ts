import { Resend } from "resend";

export type ApplicationNotification = {
  firstName: string;
  lastName: string;
  phone: string; // E.164
  email: string;
  instagram: string | null; // handle without the @
  vouchIntro: string;
  smsConsent: boolean;
  sourcePage: string;
};

const TO = process.env.NOTIFY_TO || "info@theatlaslist.club";
const FROM =
  process.env.NOTIFY_FROM || "The Atlas List <applications@theatlaslist.club>";
const FALLBACK_FROM = "The Atlas List <onboarding@resend.dev>";
const TABLE_URL =
  "https://supabase.com/dashboard/project/vnnhcjvkhcwrenlglfnw/editor/17547?schema=public";
const SEND_TIMEOUT_MS = 8_000;
const DEDUPE_WINDOW_MS = 60 * 60 * 1000;

const PAGE_LABEL: Record<string, string> = {
  home: "Home page",
  about: "About page",
  "desert-after-dark": "Desert After Dark (Oct 10)",
  "fashion-show": "Desert After Dark (Oct 10)", // legacy address of the same page
};

// Best-effort duplicate suppression, per server instance: a double-submit from
// the same address inside an hour still saves both rows but emails once.
const recentlyNotified = new Map<string, number>();

function esc(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string
  );
}

// Emails the team about a saved application. Never throws for a missing key —
// the form must keep working with email unconfigured. Callers should still
// catch: Resend/network errors are thrown so they land in the function logs.
export async function notifyNewApplication(
  a: ApplicationNotification
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: "RESEND_API_KEY is not set" };

  const dedupeKey = a.email.toLowerCase();
  const now = Date.now();
  for (const [k, t] of recentlyNotified) {
    if (now - t > DEDUPE_WINDOW_MS) recentlyNotified.delete(k);
  }
  if (recentlyNotified.has(dedupeKey)) {
    return { sent: false, reason: "same address notified within the last hour" };
  }

  const name = `${a.firstName} ${a.lastName}`.trim();
  const page = PAGE_LABEL[a.sourcePage] ?? a.sourcePage;
  const igLink = a.instagram
    ? `<a href="https://www.instagram.com/${encodeURIComponent(a.instagram)}/" style="color:#A8884F">@${esc(a.instagram)}</a>`
    : "—";

  const rows: [string, string][] = [
    ["Name", esc(name)],
    ["Email", `<a href="mailto:${esc(a.email)}" style="color:#A8884F">${esc(a.email)}</a>`],
    ["Phone", esc(a.phone)],
    ["Instagram", igLink],
    ["Applied from", esc(page)],
    ["SMS consent", a.smsConsent ? "Yes" : "No"],
  ];

  const html = `
<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#F2EBE0;color:#0E0E0E">
  <p style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#A8884F;margin:0 0 12px">New application</p>
  <h1 style="font-size:28px;font-weight:normal;margin:0 0 24px">${esc(name)}</h1>
  <table style="border-collapse:collapse;width:100%;font-family:Helvetica,Arial,sans-serif;font-size:14px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 12px 8px 0;color:#A89684;white-space:nowrap;vertical-align:top;border-top:1px solid rgba(168,136,79,.35)">${k}</td><td style="padding:8px 0;border-top:1px solid rgba(168,136,79,.35)">${v}</td></tr>`
      )
      .join("")}
  </table>
  <p style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#A89684;margin:28px 0 8px">Why they're a good fit</p>
  <blockquote style="margin:0;padding:12px 16px;border-left:2px solid #A8884F;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(a.vouchIntro)}</blockquote>
  <p style="margin:32px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:13px">
    <a href="${TABLE_URL}" style="display:inline-block;background:#0E0E0E;color:#F2EBE0;text-decoration:none;padding:12px 20px;letter-spacing:.15em;text-transform:uppercase;font-size:11px">Open in Supabase</a>
  </p>
  <p style="margin:24px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#A89684">Reply to this email to reach the applicant directly.</p>
</div>`;

  const text = [
    `New application — ${name}`,
    "",
    `Name: ${name}`,
    `Email: ${a.email}`,
    `Phone: ${a.phone}`,
    `Instagram: ${a.instagram ? "@" + a.instagram : "—"}`,
    `Applied from: ${page}`,
    `SMS consent: ${a.smsConsent ? "Yes" : "No"}`,
    "",
    "Why they're a good fit:",
    a.vouchIntro,
    "",
    `Open in Supabase: ${TABLE_URL}`,
  ].join("\n");

  const resend = new Resend(apiKey);
  const message = {
    to: TO,
    replyTo: a.email,
    subject: `New application — ${name} (${page})`,
    html,
    text,
  };
  const sendFrom = async (from: string) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(
        () => reject(new Error(`Resend did not respond within ${SEND_TIMEOUT_MS}ms`)),
        SEND_TIMEOUT_MS
      );
    });
    try {
      return await Promise.race([resend.emails.send({ from, ...message }), timeout]);
    } finally {
      clearTimeout(timer);
    }
  };

  let { data, error } = await sendFrom(FROM);
  // Until theatlaslist.club is verified in Resend, the branded sender is
  // rejected. Fall back to Resend's shared onboarding sender so the
  // notification still arrives — Resend delivers it only to the address that
  // owns the Resend account, which is the team inbox.
  if (error && /not verified/i.test(error.message) && FROM !== FALLBACK_FROM) {
    console.warn(`Resend: ${error.message} — retrying from ${FALLBACK_FROM}`);
    ({ data, error } = await sendFrom(FALLBACK_FROM));
  }
  if (error) throw new Error(`Resend: ${error.message}`);

  console.log("Application notification sent", { id: data?.id, to: TO });
  recentlyNotified.set(dedupeKey, now);
  return { sent: true };
}
