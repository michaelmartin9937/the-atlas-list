# SOP — Adding a Brand Ambassador

**Use when:** Mike gives a name and an Instagram handle and says to add them as a Brand Ambassador.
**Time:** about three minutes, almost all of it waiting for the deploy.
**Result:** the person has a tracking link, a personal kit page with their name on it, a personalized share card, a row on the master list, and a Contact in Airtable that their referrals get credited to.

## The one command

From the repository root:

```bash
python3 scripts/onboard-ambassador.py "viralvalentino=Valentino"
```

Several people at once:

```bash
python3 scripts/onboard-ambassador.py "handle1=First Last" "handle2=First Last"
```

The part before `=` is the Instagram handle. A leading `@` or a full profile URL is fine. The part after `=` is the name exactly as it should appear on their page and share card. The first word becomes the greeting ("Valentino, here's your kit").

## What the command does

1. **Airtable.** Finds the Contact with that Instagram handle, or creates one. Ticks **Ambassador**, sets **Referral Code** to the lowercase handle, and fills the name on new records. It never overwrites an existing name.
2. **Export.** Rewrites `src/content/ambassadors.ts` from Airtable. That file is what the site builds the pages from.
3. **Build.** Runs the production build. If it fails, nothing is committed or deployed.
4. **Deploy.** Commits only the data file, pushes to the working branch, and pushes to `main`. Vercel deploys from `main`.
5. **Verify.** Waits for the deploy, then checks on the live site that each person's kit page loads with the right greeting, the share card image loads, the tracking link redirects to the Desert After Dark page, and they appear on the master list. Any failed check prints `PROBLEM` and the command exits with an error.
6. **Report.** Prints the two links per person and the master list link.

## What to tell Mike afterwards

- The page link he sends them: `https://www.theatlaslist.club/ambassador/<handle>`
- The tracking link they post: `https://www.theatlaslist.club/r/<handle>`
- That they are on the master list, where **Copy DM** and **Open DM** do the sending.
- Whether Airtable matched an existing Contact or created a new one. A new Contact has no email, so if that person later applies through the site Make creates a second Contact for them (it dedupes by email). Merge by hand if it matters.

## Before running it

- **Confirm the handle.** The handle is the tracking code, so a typo breaks credit. If a handle looks off, open `https://www.instagram.com/<handle>/` first.
- **Confirm the spelling of the name** with Mike when it is unusual. Known ones: Koanasaky (one word), Malcolm Marzett, Al'mer.
- **Do not guess** a last name. A first name alone is fine.

## Related tasks

| Task | How |
|---|---|
| Fix a name | Mike edits First Name / Last Name in Airtable Contacts. Then run `AIRTABLE_PAT=… python3 scripts/export-ambassadors.py`, build, commit `src/content/ambassadors.ts`, push to `main`. |
| Remove an ambassador | In Airtable, untick **Ambassador** and clear **Referral Code** on their Contact, then export, build, commit, push as above. Their kit page becomes a 404. Their `/r/` link still redirects but no longer credits anyone. |
| Re-pull the runway models | They live in the Model Casting base (`appnTh7Nih9btv0ux`, table MODELS). A model counts as walking if `Designer Selection` names a current designer or `Walking Designer` is set. Svetik withdrew on 2026-09-19, so ignore her picks. |
| Change the wording on every kit page | Edit `src/content/ambassador-kit.ts` (copy blocks and the long message) or `src/app/ambassador/[handle]/page.tsx` (steps). |
| Rotate the private team link | Change `AMBASSADOR_TEAM_KEY` in `src/lib/ambassador-access.ts` and deploy. The old link stops working. |

## Where the Airtable token lives

The script reads `$AIRTABLE_PAT`, or else the macOS Keychain item `atlas-airtable-pat` on Mike's Mac. It is never stored in the repository. If the token is ever replaced, update the Keychain item:

```bash
security add-generic-password -U -a "$USER" -s atlas-airtable-pat -w 'NEW_TOKEN'
```

## Rules that do not change

- Kit pages and team pages stay out of the navigation, the footer and search engines.
- Tracking links go to the Desert After Dark page only.
- The team pages are reachable only with the exact keyed link.
- Manual Airtable pieces (Count fields, views) are Mike's to click in; the API cannot create them.
