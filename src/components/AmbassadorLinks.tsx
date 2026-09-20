"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { copyText } from "@/lib/copy";

type Person = { handle: string; name: string; kitUrl: string; referralUrl: string; dm: string };
type Props = { people: Person[]; messagesHref: string };

const SENT_KEY = "atlas.ambassadorKitSent.v1";

// Mike's send list: for each ambassador, copy a short DM that carries the link
// to their personal kit page, jump straight to their Instagram DM thread, and
// tick them off. Ticks are kept in this browser only.
export function AmbassadorLinks({ people, messagesHref }: Props) {
  const [query, setQuery] = useState("");
  const [hideSent, setHideSent] = useState(false);
  const [sent, setSent] = useState<Record<string, true>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    try {
      setSent(JSON.parse(window.localStorage.getItem(SENT_KEY) || "{}"));
    } catch {
      // storage blocked — still usable, just won't remember ticks
    }
  }, []);

  const toggleSent = (handle: string) =>
    setSent((prev) => {
      const next = { ...prev };
      if (next[handle]) delete next[handle];
      else next[handle] = true;
      try {
        window.localStorage.setItem(SENT_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

  const onCopy = async (id: string, text: string) => {
    const ok = await copyText(text);
    setFailed(!ok);
    if (ok) {
      setCopied(id);
      window.setTimeout(() => setCopied((c) => (c === id ? null : c)), 1600);
    }
  };

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      people.filter(
        (p) =>
          (!q || p.handle.includes(q) || p.name.toLowerCase().includes(q)) &&
          !(hideSent && sent[p.handle])
      ),
    [people, q, hideSent, sent]
  );
  const sentCount = people.filter((p) => sent[p.handle]).length;

  const btn =
    "inline-flex items-center justify-center h-11 px-4 text-xs font-medium uppercase tracking-[0.06em] border transition-colors";
  const ok = "bg-[#2f6b3f] border-[#2f6b3f] text-white";

  return (
    <section className="bg-pearl min-h-[80vh] px-5 md:px-10 pt-12 md:pt-16 pb-24">
      <div className="max-w-[900px] mx-auto">
        <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
          Private · Team only
        </span>
        <h1 className="mt-4 font-serif text-4xl md:text-[52px] leading-[1.1] text-noir">
          Ambassador Page Links
        </h1>
        <p className="mt-5 max-w-[700px] text-base leading-[1.5] text-ink/75">
          Every ambassador has a personal page with their link, the video, and the posting steps.
          For each person: <strong className="font-semibold text-noir">Copy DM</strong>, tap{" "}
          <strong className="font-semibold text-noir">Open DM</strong> to land in their Instagram
          thread, paste, send, and tick <strong className="font-semibold text-noir">Sent</strong>.
        </p>
        <p className="mt-3 text-sm text-ink/70">
          Want the full written instructions as one long message instead?{" "}
          <Link href={messagesHref} className="underline decoration-gold underline-offset-4 hover:text-gold">
            Open the full-message list
          </Link>
          .
        </p>

        <div className="sticky top-20 md:top-[104px] z-10 -mx-2 mt-8 px-2 py-3 bg-pearl/95 backdrop-blur border-b border-sand flex flex-wrap items-center gap-4">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or handle…"
            aria-label="Search ambassadors"
            className="flex-1 min-w-[200px] h-11 px-4 text-base bg-white border border-sand text-noir placeholder:text-ink/40 focus:outline-none focus:border-gold"
          />
          <label className="flex items-center gap-2 text-sm text-ink/70 cursor-pointer">
            <input
              type="checkbox"
              checked={hideSent}
              onChange={(e) => setHideSent(e.target.checked)}
              className="accent-noir"
            />
            Hide sent
          </label>
          <span className="text-sm text-ink/60 whitespace-nowrap" aria-live="polite">
            {sentCount} of {people.length} sent · showing {visible.length}
          </span>
        </div>

        {failed && (
          <p role="alert" className="mt-4 text-sm text-red-700">
            Your browser blocked the copy. Press and hold the link text to copy it by hand.
          </p>
        )}

        <ul className="mt-6 flex flex-col gap-3">
          {visible.map((p) => {
            const isSent = !!sent[p.handle];
            return (
              <li
                key={p.handle}
                className={`bg-white border border-sand p-4 md:p-5 transition-opacity ${isSent ? "opacity-55" : ""}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                  <div className="min-w-0">
                    <h2 className="font-serif text-xl leading-tight text-noir">
                      {p.name || `@${p.handle}`}
                    </h2>
                    <p className="mt-1 text-[13px] text-ink/60">@{p.handle}</p>
                    <a
                      href={p.kitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block font-mono text-[13px] text-ink/80 break-all underline decoration-sand underline-offset-4 hover:decoration-gold select-all"
                    >
                      {p.kitUrl.replace("https://www.", "")}
                    </a>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-ink/70 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSent}
                      onChange={() => toggleSent(p.handle)}
                      className="h-4 w-4 accent-noir"
                    />
                    Sent
                  </label>
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => onCopy(`${p.handle}:dm`, p.dm)}
                    className={`${btn} ${
                      copied === `${p.handle}:dm`
                        ? ok
                        : "bg-noir border-noir text-bone hover:bg-gold hover:border-gold hover:text-noir"
                    }`}
                  >
                    {copied === `${p.handle}:dm` ? "Copied ✓" : "Copy DM"}
                  </button>
                  <a
                    href={`https://ig.me/m/${p.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${btn} bg-white border-noir text-noir hover:bg-gold hover:border-gold`}
                  >
                    Open DM
                  </a>
                  <button
                    type="button"
                    onClick={() => onCopy(`${p.handle}:kit`, p.kitUrl)}
                    className={`${btn} ${
                      copied === `${p.handle}:kit` ? ok : "bg-white border-sand text-noir hover:border-gold"
                    }`}
                  >
                    {copied === `${p.handle}:kit` ? "Copied ✓" : "Copy page link"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onCopy(`${p.handle}:ref`, p.referralUrl)}
                    className={`${btn} ${
                      copied === `${p.handle}:ref` ? ok : "bg-white border-sand text-noir hover:border-gold"
                    }`}
                  >
                    {copied === `${p.handle}:ref` ? "Copied ✓" : "Copy tracking link"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        {visible.length === 0 && <p className="mt-10 text-center text-ink/60">No ambassadors match.</p>}
      </div>
    </section>
  );
}
