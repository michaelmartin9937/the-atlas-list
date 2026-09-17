# Website → Airtable integration

Architecture (agreed 2026-09-15): **Website → Supabase → Make → Airtable**, then separately **Airtable status changes → Make → MailerLite**. The website never talks to Airtable or MailerLite directly; Supabase stays the immutable record of every submission.

## 1. Supabase side (done)

Migration `supabase/migrations/20260915070000_make_webhook_triggers.sql` (applied to project `vnnhcjvkhcwrenlglfnw`) adds:

- `pg_net` extension
- `public.integration_config` (RLS on, no policies — only the service/postgres role can read it) with three rows:
  - `make_webhook_url_lead_applications`
  - `make_webhook_url_partner_inquiries`
  - `make_webhook_secret` (random, sent as the `x-atlas-webhook-secret` header)
- `public.notify_make_webhook()` and two `AFTER INSERT` triggers: `lead_applications_to_make`, `partner_inquiries_to_make`

While a URL row is empty the trigger does nothing, so the site is unaffected until Make is ready.

### Turning a webhook on

Run as a migration (the Supabase MCP `apply_migration` tool, or the SQL editor):

```sql
update public.integration_config
   set value = 'https://hook.us1.make.com/XXXXXXXXXXXX', updated_at = now()
 where key = 'make_webhook_url_lead_applications';
```

Same for `make_webhook_url_partner_inquiries`. Set the value back to `''` to switch it off.

### Payload

Identical to Supabase's built-in Database Webhooks:

```json
{
  "type": "INSERT",
  "table": "lead_applications",
  "schema": "public",
  "record": {
    "id": "d4dd8ecf-a871-4e74-99bc-8d362e215034",
    "first_name": "Jane",
    "last_name": "Doe",
    "phone": "+14805550142",
    "email": "jane@example.com",
    "instagram_handle": "janedoe",
    "referral_source": "Instagram",
    "vouch_intro": "…",
    "sms_consent": true,
    "source_page": "desert-after-dark",
    "status": "pending",
    "created_at": "2026-09-15T04:43:09.104483+00:00"
  },
  "old_record": null
}
```

`partner_inquiries` records carry `id, company_name, contact_name, email, category, budget_range, message, status, created_at`.

The same secret is sent as a top-level `"secret"` body field and as the `x-atlas-webhook-secret` header. The Make scenarios filter on `{{1.secret}}` (body) because Make's webhook bundle exposes body fields directly; requests without the right secret stop at the filter.

## 2. Airtable schema changes (before building Make)

On **Contacts**:

- add `SMS Consent` (checkbox)
- add `SMS Consent Timestamp` (date/time) — populated from `record.created_at`; the site stores the boolean only, and the timestamp of the row is the moment the box was ticked
- add `Email Marketing Consent` (checkbox) — never inferred from SMS consent

On **Event Applications**:

- rename `WordPress Form Name` → `Website Form / Source`
- rename or remove `WordPress Source ID` (→ `Website Contact Source ID`)
- add `Website Source Page` (single select: Home, About, Desert After Dark)
- ensure `Website Submission ID` exists (single line text) — the Supabase `id`, and the dedupe key

On **Partnership Leads**:

- add `Website Submission ID` (single line text)

Then freeze the schema.

## 3. Make — Scenario 1: Applications → Airtable

Make organization 9005837 (us2), team "My Team" 2966135. Created via the Make API on 2026-09-15:

| Scenario | Scenario ID | Webhook (hook ID) | Supabase config key |
|---|---|---|---|
| Atlas — lead_applications | 6292264 | 2819799 | `make_webhook_url_lead_applications` (set) |
| Atlas — partner_inquiries | 6292265 | 2819800 | `make_webhook_url_partner_inquiries` (set) |

Airtable connection in Make: "Atlas Airtable (Claude token)" (id 11125406, personal-access-token type, base `applNZYG1lwtH3Lnc`). Both scenarios run **sequentially** (one execution at a time) so the search-then-create dedupe can't race when webhooks arrive together.

**Built and verified 2026-09-16** (end to end: create path, update path, replay). Both scenarios are:

`Webhook` → `Set variables` (filter: body `secret` = `make_webhook_secret`) → `Airtable: Search Records` on Contacts by `LOWER({Email})` → **Router**:

- *Contact exists* (`3.id` exists) → `Update a Record` (only non-empty website values overwrite; uses `ignore` for blanks)
- *New contact* (`3.id` missing) → `Create a Record` with Referral Source = Website, Atlas Relationship = Applicant (Partner on the partner scenario), Contact Status = Active

then on each route: `Search Records` on Event Applications by `{Website Submission ID}` → `Create a Record` filtered on "not found". Field mappings use Airtable **field IDs** (`useColumnId`), so renaming fields in Airtable will not break them.

Two Make quirks worth knowing: the Airtable search module always emits exactly one bundle (with an empty `id` when nothing matched), so filters test `id` exists / doesn't exist and no aggregator is needed; and the webhook's request headers are not reliably available to filters, which is why the secret travels in the body.

The partner scenario nests a second router for Organizations (exists → reuse, missing → create) and dedupes Partnership Leads by searching `Internal Notes` for "Supabase id: <id>" until a `Website Submission ID` field exists on that table.

Airtable schema changes applied 2026-09-16 (the site is Next.js, not WordPress — the WordPress-named fields were renamed): Contacts gained `SMS Consent`, `SMS Consent Timestamp`, `Email Marketing Consent` and `WordPress Source ID` → `Website Contact Source ID`; Event Applications gained `Website Source Page`, `Website Submitted At` and `WordPress Form Name` → `Website Form / Source`; Partnership Leads gained `Website Submission ID`, `Budget Range`, `Website Submitted At`. All are mapped in Make. `Email Marketing Consent` is never set by the website.

The original module-by-module plan follows for reference.

Modules, in order:

1. **Webhooks → Custom webhook.**
2. **Tools → Set variables** (optional but keeps mappings tidy):
   - `email_norm` = `lower(trim(1.record.email))`
   - `source_label` = `switch(1.record.source_page; "home"; "Home"; "about"; "About"; "desert-after-dark"; "Desert After Dark"; 1.record.source_page)`
   - `app_type` = `if(1.record.source_page = "desert-after-dark"; "Event Ticket Request"; "General Invite Application")`
   - `event_name` = `if(1.record.source_page = "desert-after-dark"; "Desert After Dark — October 10, 2026"; "")`
3. **Airtable → Search records** on `Contacts`, formula `LOWER({Email}) = "{{email_norm}}"`, max 1.
4. **Router.**
   - Route A (Contact found: `3.id` exists) → **Airtable → Update a record** on the found Contact: First Name, Last Name, Phone, Instagram Handle, Referral Source, SMS Consent, SMS Consent Timestamp (= `record.created_at`). Only fill blanks if you prefer not to overwrite; Make's `ifempty()` does that.
   - Route B (not found) → **Airtable → Create a record** on `Contacts` with the same fields plus Email.
   - Both routes end by passing the Contact record ID forward (use a **Tools → Set variable** `contact_id` in each route, or **Router → Converge** via a second webhook-free aggregator).
5. **Airtable → Search records** on `Event Applications`, formula `{Website Submission ID} = "{{1.record.id}}"`, max 1.
6. **Filter**: continue only if no record found (idempotency — a replayed webhook must not create a second application).
7. **Airtable → Create a record** on `Event Applications`:
   - `Website Submission ID` = `1.record.id`
   - `Contact` (linked) = `contact_id`
   - `Application Type` = `app_type`
   - `Event` = `event_name` (blank for Home/About)
   - `Requested Access Type` = `Not Specified` (event applications only)
   - `Application Status` = `New`
   - `Application Source` = `Website`
   - `Website Source Page` = `source_label`
   - `Website Form / Source` = `Application form`
   - `Why They Want to Attend` = `1.record.vouch_intro`
   - submission timestamp = `1.record.created_at`
   - do **not** map `record.status` onto Airtable's review status

Rules from Devaun's plan: one Contact per normalized email; one Event Application per Supabase `id`; never dedupe applications by email.

## 4. Make — Scenario 2: Partnership inquiries → Airtable

Trigger: Custom Webhook `Atlas — partner_inquiries`; URL into `make_webhook_url_partner_inquiries`.

1. Search `Contacts` by `LOWER({Email})`; update or create (split `contact_name` on the first space for First/Last if the base needs it).
2. Search `Organizations` by `{Organization Name} = company_name`; create if missing.
3. Search `Partnership Leads` by `{Website Submission ID} = record.id`; stop if found.
4. Create `Partnership Lead`: link Contact + Organization, `Category`, `Budget Range`, `Internal/Inquiry Notes` = `message`, `Inquiry Date` = `created_at`, `Lead Source` = `Website`, `Pipeline Stage` = `New Inquiry`, `Website Submission ID` = `record.id`.

## 4b. Airtable → MailerLite (built 2026-09-17, waiting on the Make plan)

MailerLite account 2639575 (Devaun's). Groups, custom fields and four automations ("01 — Atlas Approved Guest", "02 — Desert After Dark Approved", "03 — Desert After Dark Confirmed", "04 — Partner Inquiry / Qualified Partner") already exist there; the automations are **disabled** until Devaun enables them.

Three Make scenarios poll Airtable every 15 minutes for rows whose `Last Modified` (new field on each table) is within the last 25 minutes, then upsert the linked Contact into MailerLite by email (`POST /api/subscribers`, which is an upsert) and add groups with `POST /api/subscribers/{id}/groups/{group}`:

| Scenario | ID | Watches | Sets | Adds groups |
|---|---|---|---|---|
| Atlas — Airtable Event Applications → MailerLite | 6303722 | Event Applications | `application_status`, `source_page`, `current_event` + contact fields | always **Atlas — Applicants**; if Approved **Atlas — Approved Guests**; if Approved and Desert After Dark **Event — Desert After Dark 2026** + **… Approved** |
| Atlas — Airtable Guest Operations → MailerLite | 6303723 | Guest Operations | `invitation_status`, `access_level`, `current_event`, `last_event_attended` (when Checked In) | if Confirmed and Desert After Dark **Event — Desert After Dark 2026** + **… Confirmed** |
| Atlas — Airtable Partnership Leads → MailerLite | 6303724 | Partnership Leads | contact fields | if Pipeline Stage is Qualified or later **Atlas — Partners & Sponsors** |

Contact fields synced on every run: `name`, `last_name`, `phone`, `instagram`, `atlas_relationship`, `airtable_contact_id`, `sms_consent` (yes/no), `email_marketing_consent` (yes/no). Select values are lowercased with underscores (`approved_guest`, `invite_sent`, `general_admission`) to match Devaun's segment values. Groups are only ever added, never removed (per the MVP scope).

Verified end to end on 2026-09-17 with a test contact: New → Applicants; Approved → Approved Guests + both DAD groups; Confirmed guest → DAD Confirmed with `invitation_status = confirmed`; Qualified lead → Partners & Sponsors.

**Status:** Make was upgraded to Core on 2026-09-17 and all three are **active**, polling every 30 minutes with a 40-minute look-back (each empty poll costs one Make operation; at 15 minutes the three scenarios alone would have used most of Core's 10,000 operations a month). A status change in Airtable therefore reaches MailerLite within about 30 minutes.

Sender domain `theatlaslist.club` was authenticated in MailerLite on 2026-09-17 (verification TXT, DKIM CNAME `litesrv._domainkey`, SPF include merged into GoDaddy's managed SPF, existing DMARC kept). Two Make gotchas discovered while building: the Airtable "Watch Records" trigger returned 422 with every parameter combination tried, so the scenarios use a scheduled Search instead; and inside a raw HTTP body Make treats any literal `}}` as an expression closer and does not unescape `\"` inside expressions, so nested JSON is written with `} }` and group logic lives in filtered modules rather than in the body.

Still to do outside Make: verify the sending domain `theatlaslist.club` in MailerLite (DNS records) so `info@theatlaslist.club` can send, and enable the four automations.

## 5. Out of scope for the MVP

No MailerLite, approval emails, guest-operations records, SMS, or ticketing in these scenarios. MailerLite is driven by Airtable status changes in a later scenario, gated on `Email Marketing Consent`.

## 6. Verifying end to end

1. Submit the form on the site with an `@example.com` address.
2. Confirm the row in Supabase (`lead_applications`) and the Make execution log.
3. Confirm one Contact and one Event Application in Airtable, with `Website Submission ID` equal to the Supabase `id`.
4. Delete the test row from Supabase via a migration (`delete from public.lead_applications where email = '…@example.com'`) — deletes do not fire the webhook.

Reconciliation (later): a scheduled Make scenario that lists Supabase rows from the last 24 h and creates any application whose `Website Submission ID` is missing in Airtable, covering the no-retry gap in `pg_net`.
