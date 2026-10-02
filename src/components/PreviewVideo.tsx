"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
  // Short line under the player.
  caption?: string;
};

// The 49-second event preview. Autoplays muted and looping (the only way a
// browser will autoplay), with a single "tap for sound" control; native
// controls appear once sound is on so people can scrub or pause. Falls back
// to the poster with a play button wherever autoplay is blocked.
export function PreviewVideo({ src, poster, className = "", caption }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    const next = !muted;
    el.muted = next;
    setMuted(next);
    if (!next) {
      el.currentTime = 0;
      el.play().catch(() => undefined);
      setPlaying(true);
    }
  };

  const play = () => {
    const el = ref.current;
    if (!el) return;
    el.play().then(() => setPlaying(true)).catch(() => undefined);
  };

  return (
    <figure className={className}>
      <div className="relative w-full aspect-video overflow-hidden rounded bg-black">
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          playsInline
          loop
          muted
          autoPlay
          preload="metadata"
          controls={!muted}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {!playing && (
          <button
            type="button"
            onClick={play}
            aria-label="Play the preview"
            className="absolute inset-0 flex items-center justify-center bg-black/30"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-noir">
              <svg viewBox="0 0 24 24" className="h-6 w-6 translate-x-[2px]" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
        {playing && muted && (
          <button
            type="button"
            onClick={toggleSound}
            className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-bone backdrop-blur hover:bg-gold hover:text-noir transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M11 5 6 9H3v6h3l5 4V5zM16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12" />
            </svg>
            Tap for sound
          </button>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-[12px] uppercase tracking-[0.1em] text-velvet-text">{caption}</figcaption>}
    </figure>
  );
}
