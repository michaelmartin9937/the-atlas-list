#!/usr/bin/env python3
"""Onboard one or more Brand Ambassadors, end to end.

    python3 scripts/onboard-ambassador.py "viralvalentino=Valentino" "handle2=First Last"

What it does, in order (it stops at the first failure):
  1. Registers each person on Airtable Contacts (Ambassador ✓, Referral Code,
     name) via add-ambassadors.py. Idempotent.
  2. Re-exports src/content/ambassadors.ts from Airtable.
  3. Builds the site (so a broken page can never be deployed).
  4. Commits only that data file and pushes to the working branch and to main
     (Vercel deploys from main).
  5. Waits for the deploy, then checks each person's kit page, greeting, share
     card, tracking redirect, and their row on the master list.
  6. Prints the links to hand to Mike.

The Airtable token is read from $AIRTABLE_PAT, or from the macOS Keychain item
"atlas-airtable-pat". It is never written to the repo.
"""
import os, re, subprocess, sys, time

SITE = "https://www.theatlaslist.club"
TEAM_KEY_FILE = "src/lib/ambassador-access.ts"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


def sh(cmd, **kw):
    return subprocess.run(cmd, cwd=ROOT, text=True, capture_output=True, **kw)


def must(cmd, what):
    r = sh(cmd)
    if r.returncode != 0:
        sys.exit(f"FAILED: {what}\n{r.stdout[-1500:]}\n{r.stderr[-1500:]}")
    return r.stdout


def token():
    t = os.environ.get("AIRTABLE_PAT")
    if t:
        return t
    r = subprocess.run(["security", "find-generic-password", "-s", "atlas-airtable-pat", "-w"],
                       text=True, capture_output=True)
    if r.returncode == 0 and r.stdout.strip():
        return r.stdout.strip()
    sys.exit("No Airtable token: set AIRTABLE_PAT or add the Keychain item 'atlas-airtable-pat'.")


def curl(url, *args):
    return subprocess.run(["curl", "-s", *args, url], text=True, capture_output=True).stdout


def main():
    entries = [a for a in sys.argv[1:] if not a.startswith("-")]
    if not entries:
        sys.exit(__doc__)
    people = []
    for e in entries:
        handle, _, name = e.partition("=")
        handle = re.sub(r"^https?://(www\.)?instagram\.com/", "", handle.strip(), flags=re.I)
        handle = handle.split("?")[0].strip().lstrip("@").rstrip("/").lower()
        if not re.match(r"^[a-z0-9._]{1,30}$", handle):
            sys.exit(f"Not a valid Instagram handle: {e!r}")
        people.append((handle, name.strip()))

    env = dict(os.environ, AIRTABLE_PAT=token())
    listfile = os.path.join(ROOT, ".onboard-tmp.txt")
    with open(listfile, "w") as fh:
        fh.write("\n".join(f"{h}={n}" if n else h for h, n in people) + "\n")
    try:
        print("1/5 Airtable …")
        r = subprocess.run([sys.executable, "scripts/add-ambassadors.py", "--file", listfile,
                            "--note", f"Brand Ambassador, added {time.strftime('%Y-%m-%d')}"],
                           cwd=ROOT, env=env, text=True, capture_output=True)
        if r.returncode != 0:
            sys.exit(f"FAILED: Airtable registration\n{r.stdout}\n{r.stderr}")
        print("   " + r.stdout.strip().replace("\n", "\n   "))
    finally:
        os.remove(listfile)

    print("2/5 Export …")
    r = subprocess.run([sys.executable, "scripts/export-ambassadors.py"], cwd=ROOT, env=env,
                       text=True, capture_output=True)
    if r.returncode != 0:
        sys.exit(f"FAILED: export\n{r.stdout}\n{r.stderr}")
    print("   " + r.stdout.strip())

    if not sh(["git", "status", "--porcelain", "src/content/ambassadors.ts"]).stdout.strip():
        print("   Nothing changed in the data file — everyone was already live. Verifying anyway.")
        deployed = False
    else:
        print("3/5 Build …")
        must(["npx", "next", "build"], "next build")
        print("4/5 Commit and deploy …")
        names = ", ".join(n or f"@{h}" for h, n in people)
        must(["git", "add", "src/content/ambassadors.ts"], "git add")
        must(["git", "commit", "-q", "-m",
              f"Ambassadors: add {names}\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"], "git commit")
        must(["git", "push", "-q", "origin", "HEAD"], "push branch")
        must(["git", "push", "-q", "origin", "HEAD:main"], "push main")
        deployed = True

    print("5/5 Verify live …")
    key = re.search(r'AMBASSADOR_TEAM_KEY = "([^"]+)"', open(os.path.join(ROOT, TEAM_KEY_FILE)).read()).group(1)
    deadline = time.time() + 480
    while deployed and time.time() < deadline:
        codes = [curl(f"{SITE}/ambassador/{h}", "-o", "/dev/null", "-w", "%{http_code}") for h, _ in people]
        if all(c == "200" for c in codes):
            break
        time.sleep(15)

    master = curl(f"{SITE}/brand-ambassadors/{key}/links")
    ok_all = True
    for h, n in people:
        page = curl(f"{SITE}/ambassador/{h}")
        h1 = (re.search(r"<h1[^>]*>([^<]*)", page) or [None, ""])[1].replace("&#x27;", "'")
        og = re.search(r'property="og:image" content="([^"]*)"', page)
        card = curl(og.group(1).replace("&amp;", "&"), "-o", "/dev/null", "-w", "%{http_code} %{content_type}") if og else "missing"
        redirect = curl(f"{SITE}/r/{h}", "-o", "/dev/null", "-w", "%{http_code} %{redirect_url}")
        checks = {
            "kit page": bool(page) and "here's your kit" in h1.lower().replace("&#x27;", "'"),
            "share card": card.startswith("200 image/"),
            "tracking link": redirect.startswith("307") and redirect.endswith("/desert-after-dark"),
            "on master list": f"/ambassador/{h}" in master,
        }
        ok_all &= all(checks.values())
        print(f"\n   {n or '@' + h}  (@{h})")
        print(f"     greeting      : {h1}")
        for k, v in checks.items():
            print(f"     {k:<14}: {'OK' if v else 'PROBLEM'}")
        print(f"     send them     : {SITE}/ambassador/{h}")
        print(f"     they post     : {SITE}/r/{h}")
    print(f"\n   master list     : {SITE}/brand-ambassadors/{key}/links")
    sys.exit(0 if ok_all else 1)


if __name__ == "__main__":
    main()
