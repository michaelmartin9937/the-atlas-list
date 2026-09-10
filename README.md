# The Atlas List

Marketing website for The Atlas List — an invitation-only social club hosting curated gatherings in Scottsdale, AZ.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Supabase.

## Quick start

```bash
npm install
cp .env.local.example .env.local   # then fill in your Supabase keys
npm run dev
```

Visit http://localhost:3000.

## Environment variables

None are required. The database target is resolved in `src/lib/supabase/server.ts`, in this order:

1. `ATLAS_SUPABASE_URL` + `ATLAS_SUPABASE_KEY` — explicit override (any key).
2. `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — the pair the Vercel ↔ Supabase integration injects for the **the-curated-life** project (`vnnhcjvkhcwrenlglfnw`). Service role bypasses RLS. Used only when both are present.
3. Built-in default — the same project through its **anon** key, which is public by design and limited by RLS to *inserting* pending applications (see the policy migration below). This is what lets the form work with no deploy-time secrets.

All three end in the same place today: Supabase Dashboard → **the-curated-life** → Table Editor → `lead_applications`.

The project is on Supabase's free tier, which pauses after about a week without API traffic — that took the form down once. `GET /api/keepalive` runs daily via Vercel Cron (`vercel.json`) to keep it awake. Set `CRON_SECRET` in Vercel if you want that endpoint restricted to Vercel's scheduler.

## Email notifications

Every saved application emails the team via [Resend](https://resend.com) — subject `New application — <name> (<page>)`, all fields, **Reply-To set to the applicant**, and a link to the row in Supabase. It's sent *after* the response is returned (`after()`), so a Resend outage can never slow or fail a submission: the row is always saved first, and email problems only appear in the Vercel function logs. A repeat submission from the same address within an hour saves the row but doesn't send a second email.

One-time setup:

1. Create a Resend account and an API key.
2. Vercel → Settings → Environment Variables → add `RESEND_API_KEY` (Production) → redeploy. `GET /api/keepalive` reports `"emailConfigured": true` once it's live.
3. Verify the sending domain: Resend → Domains → add `theatlaslist.club` and create the DNS records it shows (DKIM + SPF). Until the domain is verified Resend only sends from `onboarding@resend.dev`, and only *to* the address that owns the Resend account — so if the account is `info@theatlaslist.club`, setting `NOTIFY_FROM=onboarding@resend.dev` works with no DNS changes at all.

| Variable | Default |
|---|---|
| `RESEND_API_KEY` | — (nothing is sent without it) |
| `NOTIFY_TO` | `info@theatlaslist.club` |
| `NOTIFY_FROM` | `The Atlas List <applications@theatlaslist.club>` |

## Supabase setup

1. Create a new project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run the migrations in order:
   - `supabase/migrations/20260501000000_create_lead_applications.sql` — creates the `lead_applications` table with RLS enabled.
   - `supabase/migrations/20260504000000_add_instagram_handle.sql` — adds the optional `instagram_handle` column.
   - `supabase/migrations/20260909000000_lead_applications_anon_insert_policy.sql` — the insert-only policy for the `anon` role (pins `status = 'pending'`).
3. The form posts to `/api/apply`, which validates, rate-limits, and inserts server-side. With the anon key, RLS means the key can add applications but never read, change, or delete them.

To view incoming applications, open the Supabase Dashboard → Table Editor → `lead_applications`.

## Adding real images

The site references these placeholder image paths under `/public/images/`. Drop in real assets with the same filenames:

| Path | Used on | Suggested aspect |
|---|---|---|
| `hero-rooftop.jpg` | Home hero | 16:9 wide, ≥ 2400px |
| `about-hero.jpg` | About hero | 16:9 wide, ≥ 2400px |
| `photographer.jpg` | Home — photographer benefit | 4:5 portrait |
| `event-1.jpg` … `event-4.jpg` | Home — event gallery | mix of portrait + landscape |
| `og-image.jpg` | Social sharing card | 1200 × 630 |
| `favicon.ico` | Browser tab | 32 × 32 |

Without images, the site still renders — sections show muted taupe placeholders.

## Editing copy

All page copy lives in `src/content/`. Edit:
- `home.ts` — home page sections
- `about.ts` — about page
- `privacy.ts` — privacy policy
- `terms.ts` — terms of service

No component changes needed for copy edits.

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # root layout: fonts, nav, footer, metadata
│   ├── page.tsx            # /
│   ├── about/page.tsx      # /about
│   ├── desert-after-dark/page.tsx  # /desert-after-dark — the Oct 10 event (/fashion-show redirects here)
│   ├── privacy/page.tsx    # /privacy
│   ├── terms/page.tsx      # /terms
│   ├── thank-you/page.tsx  # /thank-you (post-submit)
│   └── api/apply/route.ts  # POST handler → Supabase
├── components/             # Hero, Nav, Footer, ApplicationForm, etc.
├── content/                # all editable copy
└── lib/
    ├── supabase/server.ts  # service-role client (server-only)
    ├── validation.ts       # zod schema
    ├── phone.ts            # E.164 normalization + display formatting
    └── rateLimit.ts        # in-memory per-IP limit
```

## Form behavior

`ApplicationForm` posts to `/api/apply`. The route:

1. Rate-limits by IP (5 submissions / hour). In-memory — fine for a single server. For multi-instance production deploys, swap to Upstash Redis or Vercel KV.
2. Validates with zod (`src/lib/validation.ts`).
3. Drops honeypot submissions silently (returns 200 with no insert).
4. Normalizes phone to E.164 with `libphonenumber-js`.
5. Inserts into Supabase using the service role key.
6. Returns field-level errors on validation failure or `{ ok: true }` on success.

The form requires SMS consent (TCPA-compliant language wired into the checkbox).

## TCPA / SMS compliance

The Privacy Policy and Terms include the disclosures required by TCPA and CTIA carrier guidelines for automated SMS:

- Express written consent (unchecked checkbox by default)
- Message frequency disclosure
- "Reply STOP / HELP"
- "Message and data rates may apply"
- "Consent is not a condition of [admission]"
- No sharing of mobile numbers with third parties

**Have an attorney review before going live.** The boilerplate is solid but legal review is non-negotiable for SMS programs.

## Deploy

The fastest path is Vercel:

```bash
npx vercel
```

Set the three environment variables in the Vercel project settings. Push to your repo and Vercel will deploy on every commit.

Live at https://www.theatlaslist.club (the `the-curated-life.vercel.app` deployment URL still resolves to the same site).

## Design system

| | |
|---|---|
| Display font | Fraunces (Google Fonts) |
| Body font | Inter (Google Fonts) |
| Background | `#F2EBE0` (bone) / `#FAF7F2` (pearl) |
| Text | `#0E0E0E` (noir) / `#2A2522` (ink) |
| Accent | `#A8884F` (bronze) |
| Secondary | `#A89684` (taupe) |

Fonts load via `next/font` for zero layout shift.

## Scripts

```bash
npm run dev        # dev server
npm run build      # production build
npm run start      # serve production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```
# the-curated-life
