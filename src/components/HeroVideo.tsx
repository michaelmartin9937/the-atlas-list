"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  className?: string;
};

// Ambient background loop for hero sections.
//
// Client component for two reasons: React doesn't serialize the `muted`
// attribute in server-rendered markup, and browsers refuse to autoplay
// un-muted video — so we set muted imperatively before calling play(). And we
// fade the video in only once it's actually playing, so the underlying hero
// photo (the LCP image) shows instantly and there's no hard cut when the first
// frame arrives.
export function HeroVideo({ src, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.muted = true;
    el.play().catch(() => {
      // Autoplay blocked — the hero photo stays visible underneath.
    });
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
      onPlaying={() => setPlaying(true)}
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
