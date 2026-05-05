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

Set these in `.env.local`:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API → `anon` `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Project Settings → API → `service_role` `secret` key (server-only — never expose to the browser) |

## Supabase setup

1. Create a new project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run both migrations in order:
   - `supabase/migrations/20260501000000_create_lead_applications.sql` — creates the `lead_applications` table with RLS enabled.
   - `supabase/migrations/20260504000000_add_instagram_handle.sql` — adds the optional `instagram_handle` column.
3. The form posts to `/api/apply`, which inserts using the **service role key** server-side. RLS stays locked down — no client ever touches the table directly.

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

Custom domain: point `the-curated.life` to Vercel via the dashboard's Domains tab.

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
