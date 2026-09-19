#!/usr/bin/env python3
"""Register Brand Ambassadors in the Airtable Operations CRM.

Usage:
    AIRTABLE_PAT=pat... python3 scripts/add-ambassadors.py handle1 handle2 ...
    AIRTABLE_PAT=pat... python3 scripts/add-ambassadors.py --file handles.txt [--note "Runway model"]

A file holds one person per line: `handle` or `handle=Full Name`. The name is
only used when a new Contact has to be created; existing names are never
overwritten.

For each Instagram handle: finds the Contact whose Instagram Handle matches
(or creates one), ticks "Ambassador" and sets "Referral Code" to the lowercase
handle. Idempotent — safe to re-run. Prints each person's link.

The link itself needs no registration: theatlaslist.club/r/<handle> records
the code for any well-formed handle. Registration is what lets Make link an
application to the ambassador's Contact so the counts work.
"""
import json, os, re, subprocess, sys

BASE, CONTACTS = "applNZYG1lwtH3Lnc", "tbl4wyPvac4ILZDRQ"
SITE = "https://www.theatlaslist.club/r/"
PAT = os.environ.get("AIRTABLE_PAT") or sys.exit("Set AIRTABLE_PAT")
CODE = re.compile(r"^[a-z0-9._]{1,30}$")


def api(method, path, body=None):
    cmd = ["curl", "-s", "-X", method, f"https://api.airtable.com/v0/{BASE}/{CONTACTS}{path}",
           "-H", f"Authorization: Bearer {PAT}", "-H", "Content-Type: application/json"]
    if body is not None:
        cmd += ["-d", json.dumps(body)]
    out = json.loads(subprocess.run(cmd, capture_output=True, text=True).stdout)
    if "error" in out:
        sys.exit(f"Airtable error: {out['error']}")
    return out


def norm(h):
    h = re.sub(r"^https?://(www\.)?instagram\.com/", "", (h or "").strip(), flags=re.I)
    return h.strip().lstrip("@").rstrip("/").lower()


def main():
    args, note, entries = sys.argv[1:], None, []
    while args:
        a = args.pop(0)
        if a == "--file":
            for line in open(args.pop(0)).read().splitlines():
                entries += [line] if "=" in line else line.split()
        elif a == "--note":
            note = args.pop(0)
        else:
            entries.append(a)
    names = {}
    for e in entries:
        h, _, name = e.partition("=")
        if norm(h):
            names.setdefault(norm(h), name.strip())
    handles = list(names)
    bad = [h for h in handles if not CODE.match(h)]
    if bad:
        sys.exit(f"Not valid Instagram handles: {bad}")

    contacts, offset = [], None
    while True:
        page = api("GET", "?pageSize=100" + (f"&offset={offset}" if offset else ""))
        contacts += page["records"]
        offset = page.get("offset")
        if not offset:
            break

    by_handle = {}
    for r in contacts:
        by_handle.setdefault(norm(r["fields"].get("Instagram Handle")), []).append(r)

    for h in handles:
        matches = by_handle.get(h, [])
        # Several contacts can share a handle (typos, test rows). Prefer one
        # already marked, then a non-Applicant (team/partner), then the oldest.
        matches.sort(key=lambda r: (not r["fields"].get("Ambassador"),
                                    r["fields"].get("Atlas Relationship") == "Applicant",
                                    r["createdTime"]))
        fields = {"Ambassador": True, "Referral Code": h}
        if matches:
            r = matches[0]
            if r["fields"].get("Ambassador") and r["fields"].get("Referral Code") == h:
                status = "already set"
            else:
                api("PATCH", f"/{r['id']}", {"fields": fields})
                status = "marked existing contact"
            who = r["fields"].get("Full Name") or "(no name)"
            extra = f"  [{len(matches)} contacts share this handle; used {r['id']}]" if len(matches) > 1 else ""
        else:
            first, _, last = names[h].partition(" ")
            if first:
                fields["First Name"] = first
            if last:
                fields["Last Name"] = last.strip()
            fields.update({
                "Instagram Handle": h,
                "Instagram URL": f"https://www.instagram.com/{h}/",
                "Contact Status": "Active",
                "Internal Notes": "Added as a Brand Ambassador" + (f" ({note})" if note else "")
                                  + (". Email to be filled in." if names[h] else ". Name and email to be filled in."),
            })
            api("POST", "", {"fields": fields})
            status, who, extra = "created contact", names[h] or "(new)", ""
        print(f"{SITE}{h:<28} {status:<26} {who}{extra}")


if __name__ == "__main__":
    main()
