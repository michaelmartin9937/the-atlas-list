"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bone/95 backdrop-blur-sm border-b border-taupe/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Wordmark size="md" tone="noir" />
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/about"
            className="hidden sm:inline text-xs uppercase tracking-widest text-noir hover:text-bronze transition-colors"
          >
            About
          </Link>
          <Link
            href="/#apply"
            className="text-xs uppercase tracking-widest text-bone bg-noir px-5 py-3 hover:bg-ink transition-colors"
          >
            Apply
          </Link>
        </div>
      </nav>
    </header>
  );
}
