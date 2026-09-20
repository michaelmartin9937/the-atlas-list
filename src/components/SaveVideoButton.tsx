"use client";

import { useRef, useState } from "react";

type Props = { src: string; filename: string };
type Phase = "idle" | "loading" | "ready" | "done" | "fallback";

// Gets the promo into the phone's camera roll with as few taps as the
// platform allows.
//
// iPhone/Android browsers that support sharing files: tap once to fetch the
// video, tap again to open the system share sheet, where "Save Video" puts it
// straight into Photos. Two taps because the share sheet may only open from a
// fresh tap, and the download takes longer than that tap stays "fresh".
//
// Everywhere else (including some in-app browsers): a normal download, plus a
// hint to open the page in Safari or Chrome.
export function SaveVideoButton({ src, filename }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [pct, setPct] = useState(0);
  const file = useRef<File | null>(null);

  const download = () => {
    const a = document.createElement("a");
    a.href = file.current ? URL.createObjectURL(file.current) : src;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const share = async () => {
    const f = file.current;
    if (!f) return;
    try {
      await navigator.share({ files: [f] });
      setPhase("done");
    } catch (err) {
      // AbortError = they closed the sheet; leave the button ready to retry.
      if ((err as DOMException)?.name !== "AbortError") {
        download();
        setPhase("fallback");
      }
    }
  };

  const fetchVideo = async () => {
    setPhase("loading");
    setPct(0);
    try {
      const res = await fetch(src);
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const total = Number(res.headers.get("content-length")) || 0;
      const reader = res.body.getReader();
      const chunks: BlobPart[] = [];
      let got = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        got += value.length;
        if (total) setPct(Math.round((got / total) * 100));
      }
      file.current = new File(chunks, filename, { type: "video/mp4" });
      const canShareFiles =
        typeof navigator.canShare === "function" && navigator.canShare({ files: [file.current] });
      if (canShareFiles) {
        setPhase("ready");
      } else {
        download();
        setPhase("fallback");
      }
    } catch {
      file.current = null;
      download();
      setPhase("fallback");
    }
  };

  const onClick = () => {
    if (phase === "idle" || phase === "fallback") return fetchVideo();
    if (phase === "ready" || phase === "done") return share();
  };

  const label =
    phase === "idle"
      ? "Save the video to my phone"
      : phase === "loading"
        ? `Getting the video… ${pct ? pct + "%" : ""}`
        : phase === "ready"
          ? "Tap again → choose “Save Video”"
          : phase === "done"
            ? "Saved ✓  Tap to save again"
            : "Download started — tap to retry";

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={phase === "loading"}
        className={`w-full h-[56px] text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors disabled:opacity-80 ${
          phase === "ready"
            ? "bg-gold text-noir animate-pulse"
            : phase === "done"
              ? "bg-[#2f6b3f] text-white"
              : "bg-noir text-bone hover:bg-gold hover:text-noir active:bg-gold active:text-noir"
        }`}
        aria-live="polite"
      >
        {label}
      </button>
      {phase === "ready" && (
        <p className="mt-3 text-sm leading-[1.5] text-ink/75">
          The video is ready. Tap the gold button, then pick <strong>Save Video</strong> in the menu
          that slides up. It goes straight to your camera roll.
        </p>
      )}
      {phase === "fallback" && (
        <p className="mt-3 text-sm leading-[1.5] text-ink/75">
          Your browser downloaded the file instead of offering Save Video. Look in your Downloads or
          Files app, open the video, and save it to Photos. If you opened this page inside Instagram,
          tap the <strong>•••</strong> menu at the top and choose <strong>Open in browser</strong>,
          then try again. It works best in Safari or Chrome.
        </p>
      )}
    </div>
  );
}
