import Link from "next/link";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="bg-noir text-bone py-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="flex flex-col gap-4">
          <Wordmark size="lg" tone="bone" />
          <p className="text-sm text-bone/60 max-w-sm">
            Private gatherings in Scottsdale, AZ. By invitation only.
          </p>
        </div>
        <div className="flex flex-col md:items-end gap-3">
          <div className="flex gap-6 text-xs uppercase tracking-widest">
            <Link href="/about" className="text-bone/80 hover:text-bronze transition-colors">
              About
            </Link>
            <Link href="/privacy" className="text-bone/80 hover:text-bronze transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-bone/80 hover:text-bronze transition-colors">
              Terms
            </Link>
          </div>
          <p className="text-xs text-bone/40">
            © 2026 The Curated Life. Scottsdale, AZ.
          </p>
        </div>
      </div>
    </footer>
  );
}
