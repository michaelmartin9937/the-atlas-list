"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  className?: string;
};

// Ambient background loop for hero sections.
//
// Client component for two reasons: React doesn't reliably serialize `muted`
// in server-rendered markup and browsers refuse to autoplay un-muted video —
// so we set muted imperatively before calling play(). And we fade the video in
// only once frames are actually advancing, so the underlying hero photo (the
// LCP image) shows instantly and there's no hard cut when the first frame
// arrives.
export function HeroVideo({ src, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const markPlaying = () => setPlaying(true);
    const play = () => {
      el.muted = true;
      el.play().catch(() => {
        // Autoplay blocked — the hero photo stays visible underneath.
      });
    };

    // The browser may have started playback from the `autoplay` attribute
    // before React hydrated (cached video, fast connection). In that case the
    // one-off `playing` event already fired and won't fire again during
    // continuous playback, so read the live state now, and let a one-shot
    // `timeupdate` (which only fires once frames advance) cover the window
    // where playback has begun but currentTime is still 0.
    if (!el.paused && el.currentTime > 0) markPlaying();
    el.addEventListener("timeupdate", markPlaying, { once: true });
    el.addEventListener("playing", markPlaying);
    play();

    // Browsers pause muted background video while the tab is hidden and don't
    // all resume it on their own; kick it again when the page is visible.
    const onVisible = () => {
      if (document.visibilityState === "visible" && el.paused) play();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      el.removeEventListener("timeupdate", markPlaying);
      el.removeEventListener("playing", markPlaying);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={`${className} transition-opacity duration-1000 ${
        playing ? "opacity-70" : "opacity-0"
      } motion-reduce:hidden`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
