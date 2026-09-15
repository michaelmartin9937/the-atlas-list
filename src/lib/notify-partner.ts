import { Resend } from "resend";

export type PartnerInquiryNotification = {
  companyName: string;
  contactName: string;
  email: string;
  category: string | null;
  budgetRange: string | null;
  message: string | null;
};

const TO = process.env.NOTIFY_TO || "info@theatlaslist.club";
const FROM =
  process.env.NOTIFY_FROM || "The Atlas List <applications@theatlaslist.club>";
const FALLBACK_FROM = "The Atlas List <onboarding@resend.dev>";
const SEND_TIMEOUT_MS = 8_000;

function esc(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string
  );
}

// Emails the team about a saved partnership inquiry (from /partner). Same
// contract as notifyNewApplication: never throws for a missing key.
export async function notifyPartnerInquiry(
  p: PartnerInquiryNotification
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: "RESEND_API_KEY is not set" };

  const rows: [string, string][] = [
    ["Company", esc(p.companyName)],
    ["Contact", esc(p.contactName)],
    ["Email", `<a href="mailto:${esc(p.email)}" style="color:#A8884F">${esc(p.email)}</a>`],
    ["Category", p.category ? esc(p.category) : "—"],
    ["Budget", p.budgetRange ? esc(p.budgetRange) : "—"],
  ];

  const html = `
<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#F2EBE0;color:#0E0E0E">
  <p style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#A8884F;margin:0 0 12px">Partnership inquiry</p>
  <h1 style="font-size:28px;font-weight:normal;margin:0 0 24px">${esc(p.companyName)}</h1>
  <table style="border-collapse:collapse;width:100%;font-family:Helvetica,Arial,sans-serif;font-size:14px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 12px 8px 0;color:#A89684;white-space:nowrap;vertical-align:top;border-top:1px solid rgba(168,136,79,.35)">${k}</td><td style="padding:8px 0;border-top:1px solid rgba(168,136,79,.35)">${v}</td></tr>`
      )
      .join("")}
  </table>
  ${
    p.message
      ? `<p style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#A89684;margin:28px 0 8px">Message</p>
  <blockquote style="margin:0;padding:12px 16px;border-left:2px solid #A8884F;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(p.message)}</blockquote>`
      : ""
  }
  <p style="margin:24px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#A89684">Reply to this email to reach them directly.</p>
</div>`;

  const text = [
    `Partnership inquiry — ${p.companyName}`,
    "",
    `Company: ${p.companyName}`,
    `Contact: ${p.contactName}`,
    `Email: ${p.email}`,
    `Category: ${p.category ?? "—"}`,
    `Budget: ${p.budgetRange ?? "—"}`,
    "",
    p.message ? `Message:\n${p.message}` : "",
  ].join("\n");

  const resend = new Resend(apiKey);
  const message = {
    to: TO,
    replyTo: p.email,
    subject: `Partnership inquiry — ${p.companyName}`,
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
  if (error && /not verified/i.test(error.message) && FROM !== FALLBACK_FROM) {
    ({ data, error } = await sendFrom(FALLBACK_FROM));
  }
  if (error) throw new Error(`Resend: ${error.message}`);

  console.log("Partner inquiry notification sent", { id: data?.id, to: TO });
  return { sent: true };
}
