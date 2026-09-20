"use client";

import { useEffect, useMemo, useState } from "react";

type Person = { handle: string; name: string; link: string; message: string };
type Props = { people: Person[]; videoUrl: string };

const SENT_KEY = "atlas.ambassadorSent.v1";

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(ta);
  return ok;
}

// One card per ambassador: copy the whole message (or just the link) in one
// click, and tick "Sent" to keep track. Sent ticks live in this browser only.
export function AmbassadorMessages({ people, videoUrl }: Props) {
  const [query, setQuery] = useState("");
  const [hideSent, setHideSent] = useState(false);
  const [sent, setSent] = useState<Record<string, true>>({});
  const [copied, setCopied] = useState<string | null>(null); // "<handle>:msg" | "<handle>:link"
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    try {
      setSent(JSON.parse(window.localStorage.getItem(SENT_KEY) || "{}"));
    } catch {
      // storage blocked — the page still works, it just won't remember ticks
    }
  }, []);

  const toggleSent = (handle: string) => {
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
  };

  const onCopy = async (p: Person, kind: "msg" | "link") => {
    const ok = await copyText(kind === "msg" ? p.message : p.link);
    setFailed(!ok);
    if (ok) {
      const id = `${p.handle}:${kind}`;
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
    "inline-flex items-center justify-center h-11 px-5 text-xs font-medium uppercase tracking-[0.06em] border transition-colors";

  return (
    <section className="bg-pearl min-h-[80vh] px-6 md:px-10 pt-12 md:pt-16 pb-24">
      <div className="max-w-[860px] mx-auto">
        <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
          Private · Team only
        </span>
        <h1 className="mt-4 font-serif text-4xl md:text-[52px] leading-[1.1] text-noir">
          Brand Ambassadors
        </h1>
        <p className="mt-5 max-w-[680px] text-base leading-[1.5] text-ink/75">
          {people.length} ambassadors for Desert After Dark, October 10. Click{" "}
          <strong className="font-semibold text-noir">Copy message</strong>, paste it into a text or
          an Instagram DM, and attach the promo video.{" "}
          <a href={videoUrl} className="underline decoration-gold underline-offset-4 hover:text-gold">
            Download the video
          </a>
          .
        </p>

        <div className="sticky top-20 md:top-[104px] z-10 -mx-2 mt-8 px-2 py-3 bg-pearl/95 backdrop-blur border-b border-sand flex flex-wrap items-center gap-4">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or handle…"
            aria-label="Search ambassadors"
            className="flex-1 min-w-[220px] h-11 px-4 bg-white border border-sand text-noir placeholder:text-ink/40 focus:outline-none focus:border-gold"
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
            Your browser blocked the copy. Open “Preview message” and copy it by hand.
          </p>
        )}

        <ul className="mt-6 flex flex-col gap-3">
          {visible.map((p) => {
            const isSent = !!sent[p.handle];
            const msgCopied = copied === `${p.handle}:msg`;
            const linkCopied = copied === `${p.handle}:link`;
            return (
              <li
                key={p.handle}
                className={`bg-white border border-sand p-4 md:p-5 transition-opacity ${isSent ? "opacity-55" : ""}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-xl leading-tight text-noir">
                      {p.name || `@${p.handle}`}
                    </h2>
                    <p className="mt-1 text-[13px] text-ink/60">
                      @{p.handle}
                      {!p.name && " · no name on file, greeting says “Hey there”"}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onCopy(p, "msg")}
                      className={`${btn} ${
                        msgCopied
                          ? "bg-[#2f6b3f] border-[#2f6b3f] text-white"
                          : "bg-noir border-noir text-bone hover:bg-gold hover:border-gold hover:text-noir"
                      }`}
                    >
                      {msgCopied ? "Copied ✓" : "Copy message"}
                    </button>
                    <button
                      type="button"
                      onClick={() => onCopy(p, "link")}
                      className={`${btn} ${
                        linkCopied
                          ? "bg-[#2f6b3f] border-[#2f6b3f] text-white"
                          : "bg-white border-noir text-noir hover:bg-gold hover:border-gold"
                      }`}
                    >
                      {linkCopied ? "Copied ✓" : "Copy link only"}
                    </button>
                    <label className="ml-1 flex items-center gap-2 text-sm text-ink/70 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isSent}
                        onChange={() => toggleSent(p.handle)}
                        className="accent-noir"
                      />
                      Sent
                    </label>
                  </div>
                </div>
                <details className="mt-3">
                  <summary className="cursor-pointer text-[13px] text-ink/60 hover:text-noir">
                    Preview message
                  </summary>
                  <pre className="mt-3 whitespace-pre-wrap break-words bg-pearl border border-sand p-4 text-[13px] leading-[1.55] text-ink font-mono">
                    {p.message}
                  </pre>
                </details>
              </li>
            );
          })}
        </ul>
        {visible.length === 0 && (
          <p className="mt-10 text-center text-ink/60">No ambassadors match.</p>
        )}
      </div>
    </section>
  );
}
