"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import type { VenuePin } from "@/content/venues";

type Area = { label: string; lat: number; lng: number; radiusM: number };

type Props = {
  pins: readonly VenuePin[];
  area?: Area;
  theme?: "dark" | "light";
  // Dashed line between the first two pins (the car-service route).
  route?: boolean;
  className?: string;
};

// Leaflet is loaded from the CDN (no npm dependency). CARTO's basemaps now
// demand an API key, so the tiles are OpenStreetMap's, muted with a CSS
// filter (inverted and desaturated on the dark page, desaturated on light). Pins are numbered discs; a click opens a popup with Directions
// (Apple Maps on iPhone/iPad, Google Maps elsewhere) and Copy address.
// Scroll-wheel zoom stays off until the guest clicks the map, so the page
// scrolls normally. Address cards elsewhere on the page can focus a pin by
// dispatching `window.dispatchEvent(new CustomEvent("atlas-map-focus",
// { detail: "pickup" }))`.
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export function directionsUrl(address: string): string {
  const apple = typeof navigator !== "undefined" && /iPhone|iPad|iPod/.test(navigator.userAgent);
  return apple
    ? `https://maps.apple.com/?daddr=${encodeURIComponent(address)}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function VenueMap({ pins, area, theme = "dark", route = false, className = "" }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markers = useRef<Record<string, any>>({});
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(false);

  const init = useCallback(() => {
    const L = (window as any).L;
    if (!L || !el.current || mapRef.current) return;

    const map = L.map(el.current, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
    mapRef.current = map;
    L.tileLayer(TILES, { attribution: ATTRIBUTION, maxZoom: 19, className: `atlas-tiles-${theme}` }).addTo(map);
    map.on("click", () => map.scrollWheelZoom.enable());

    const bounds: [number, number][] = [];
    pins.forEach((p) => {
      const icon = L.divIcon({
        className: "",
        html: `<span class="atlas-pin atlas-pin-${p.tone}">${p.n}</span>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -18],
      });
      const m = L.marker([p.lat, p.lng], { icon, title: p.label }).addTo(map);
      const html = `<div class="atlas-pop">
        <span class="atlas-pop-label">${p.n} · ${p.label}</span>
        <span class="atlas-pop-address">${p.address}</span>
        <span class="atlas-pop-links">
          <a href="${directionsUrl(p.address)}" target="_blank" rel="noopener noreferrer">Directions →</a>
          <button type="button" data-copy="${p.address}">Copy address</button>
        </span></div>`;
      m.bindPopup(html, { closeButton: true, maxWidth: 280 });
      markers.current[p.id] = m;
      bounds.push([p.lat, p.lng]);
    });

    if (area) {
      L.circle([area.lat, area.lng], {
        radius: area.radiusM,
        color: theme === "dark" ? "#F2EBDB" : "#0C0A0A",
        weight: 1,
        dashArray: "4 6",
        fillColor: theme === "dark" ? "#F2EBDB" : "#0C0A0A",
        fillOpacity: 0.06,
      })
        .addTo(map)
        .bindTooltip(area.label, { permanent: true, direction: "center", className: "atlas-area-label" });
      bounds.push([area.lat + area.radiusM / 111000, area.lng], [area.lat - area.radiusM / 111000, area.lng]);
    }

    if (route && pins.length >= 2) {
      L.polyline(
        [
          [pins[0].lat, pins[0].lng],
          [pins[1].lat, pins[1].lng],
        ],
        { color: "#E87A5C", weight: 1.5, dashArray: "6 8", opacity: 0.8 }
      ).addTo(map);
    }

    if (bounds.length > 1) map.fitBounds(bounds, { padding: [48, 48] });
    else map.setView(bounds[0], 15);

    // Copy buttons inside popups (Leaflet renders them as plain HTML).
    el.current.addEventListener("click", async (e) => {
      const t = e.target as HTMLElement;
      const text = t?.getAttribute?.("data-copy");
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        setToast(true);
        setTimeout(() => setToast(false), 1600);
      } catch {
        /* clipboard blocked; the address is visible */
      }
    });
    setReady(true);
  }, [pins, area, theme, route]);

  // Leaflet may already be on the page (second map, client navigation).
  useEffect(() => {
    if ((window as any).L) init();
  }, [init]);

  // Address cards focus a pin.
  useEffect(() => {
    const onFocus = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const m = markers.current[id];
      const map = mapRef.current;
      if (!m || !map) return;
      map.flyTo(m.getLatLng(), Math.max(map.getZoom(), 15), { duration: 0.8 });
      setTimeout(() => m.openPopup(), 850);
    };
    window.addEventListener("atlas-map-focus", onFocus);
    return () => window.removeEventListener("atlas-map-focus", onFocus);
  }, []);

  useEffect(
    () => () => {
      mapRef.current?.remove();
      mapRef.current = null;
    },
    []
  );

  const dark = theme === "dark";
  return (
    <div className={`relative ${className}`}>
      <link rel="stylesheet" href={LEAFLET_CSS} crossOrigin="" />
      <Script src={LEAFLET_JS} strategy="afterInteractive" onLoad={init} onReady={init} />
      <div
        ref={el}
        className={`h-[300px] md:h-[380px] w-full border ${dark ? "border-hairline-dark bg-[#121010]" : "border-hairline bg-[#EDE7DD]"}`}
        aria-label="Map of the pickup point"
        role="region"
      />
      {!ready && (
        <span className={`pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.24em] ${dark ? "text-bone/50" : "text-ink/50"}`}>
          Loading map
        </span>
      )}
      <span
        className={`pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition-opacity ${
          toast ? "opacity-100" : "opacity-0"
        } ${dark ? "border-hairline-dark bg-[#141110] text-bone" : "border-hairline bg-[#FFFDF9] text-noir"}`}
        aria-live="polite"
      >
        Copied
      </span>
      <style>{`
        .atlas-tiles-dark{filter:invert(1) hue-rotate(180deg) brightness(.72) contrast(.92) saturate(.25)}
        .atlas-tiles-light{filter:saturate(.3) contrast(.95) brightness(1.02)}
        .atlas-pin{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9999px;font:600 12px/1 ui-monospace,"IBM Plex Mono",monospace;box-shadow:0 2px 8px rgba(0,0,0,.35)}
        .atlas-pin-coral{background:#E87A5C;color:#0C0A0A;border:2px solid #0C0A0A}
        .atlas-pin-cream{background:#F2EBDB;color:#0C0A0A;border:2px solid #0C0A0A}
        .leaflet-container{font-family:inherit}
        .leaflet-popup-content-wrapper,.leaflet-popup-tip{background:${dark ? "#141110" : "#FFFDF9"};color:${dark ? "#F2EBDB" : "#0C0A0A"};border-radius:0;box-shadow:0 8px 30px rgba(0,0,0,.35);border:1px solid ${dark ? "#35322F" : "#CDC7C1"}}
        .leaflet-popup-content{margin:16px 18px}
        .leaflet-container a.leaflet-popup-close-button{color:${dark ? "#F2EBDB" : "#0C0A0A"}}
        .atlas-pop{display:flex;flex-direction:column;gap:8px}
        .atlas-pop-label{font-family:var(--font-mono),ui-monospace,monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;opacity:.7}
        .atlas-pop-address{font-family:var(--font-playfair),Georgia,serif;font-size:17px;line-height:1.3}
        .atlas-pop-links{display:flex;gap:16px;margin-top:4px;font-family:var(--font-mono),ui-monospace,monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase}
        .atlas-pop-links a,.atlas-pop-links button{color:#E87A5C;background:none;border:0;padding:0;cursor:pointer;font:inherit;letter-spacing:inherit;text-transform:inherit}
        .atlas-area-label{background:transparent;border:0;box-shadow:none;color:${dark ? "#F2EBDB" : "#0C0A0A"};font-family:var(--font-mono),ui-monospace,monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;text-align:center;white-space:normal;width:200px;opacity:.85}
        .leaflet-control-attribution{background:${dark ? "rgba(12,10,10,.7)" : "rgba(255,253,249,.8)"};color:${dark ? "#BDB7AE" : "#5a554e"};font-size:10px}
        .leaflet-control-attribution a{color:inherit}
        .leaflet-bar a{background:${dark ? "#141110" : "#FFFDF9"};color:${dark ? "#F2EBDB" : "#0C0A0A"};border-color:${dark ? "#35322F" : "#CDC7C1"}}
      `}</style>
    </div>
  );
}
