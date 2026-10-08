"use client";

import { useEffect, useState } from "react";
import { directionsUrl } from "./VenueMap";

// Directions link that opens Apple Maps on iPhone/iPad and Google Maps
// everywhere else. Renders the Google URL on the server, swaps on mount.
export function DirectionsLink({ address, className = "" }: { address: string; className?: string }) {
  const [href, setHref] = useState(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`);
  useEffect(() => setHref(directionsUrl(address)), [address]);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={(e) => e.stopPropagation()}>
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" />
        <circle cx="12" cy="11" r="2.2" />
      </svg>
      Directions
    </a>
  );
}
