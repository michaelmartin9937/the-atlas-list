"use client";

import { useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  posterAlt?: string;
  disclosure?: string | null;
  // Vertical clips (the BTS loop) use 9:16; the film is 16:9.
  vertical?: boolean;
  // Muted autoplaying loop (no audio track) for the BTS clip only.
  loop?: boolean;
  className?: string;
};

// Preview film: poster with a play button, native controls once playing,
// never autoplays with sound. Shows a quiet placeholder panel if the file
// isn't there yet or fails to load.
export function Film({ src, poster, posterAlt, disclosure, vertical = false, loop = false, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<"idle" | "playing" | "error">("idle");

  const play = () => {
    const el = ref.current;
    if (!el) return;
    el.play()
      .then(() => setState("playing"))
      .catch(() => setState("error"));
  };

  return (
    <figure className={className}>
      <div className={`relative w-full overflow-hidden rounded bg-velvet-card ${vertical ? "aspect-[4/5]" : "aspect-video"}`}>
        {state === "error" ? (
          <div className="absolute inset-0 flex items-center justify-center border border-velvet-line">
            <span className="text-[12px] uppercase tracking-[0.14em] text-velvet-text">Preview film coming soon</span>
          </div>
        ) : (
          <>
            <video
              ref={ref}
              className="absolute inset-0 h-full w-full object-cover"
              src={src}
              poster={poster}
              aria-label={posterAlt}
              playsInline
              preload={loop ? "auto" : "metadata"}
              loop={loop}
              muted={loop}
              autoPlay={loop}
              controls={state === "playing" && !loop}
              onPlay={() => setState("playing")}
              onError={() => setState("error")}
            />
            {state === "idle" && !loop && (
              <button
                type="button"
                onClick={play}
                aria-label="Play the preview"
                className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-colors"
              >
                <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gold text-noir shadow-lg">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 translate-x-[2px]" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </>
        )}
      </div>
      {disclosure && (
        <figcaption className="mt-3 text-[12px] leading-relaxed tracking-[0.04em] text-velvet-text">{disclosure}</figcaption>
      )}
    </figure>
  );
}
