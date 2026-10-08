// Map pins for the Desert After Dark guest pages. Geocoded once
// (Nominatim, 2026-10-07) and stored here so nothing geocodes at runtime.
// The pickup pin was nudged east of the 44th St frontage into the lot east
// of Bank of America, south of AJ's Fine Foods.
export type VenuePin = {
  id: "pickup" | "estate";
  n: 1 | 2;
  label: string;
  address: string;
  lat: number;
  lng: number;
  // "coral" = pickup, "cream" = the estate (Figma pin colours).
  tone: "coral" | "cream";
};

export const PICKUP_PIN: VenuePin = {
  id: "pickup",
  n: 1,
  label: "Pickup · Camelback Village Center",
  address: "5041 N 44th St, Phoenix, AZ 85018",
  lat: 33.5102,
  lng: -111.9852,
  tone: "coral",
};

// Shown only after purchase (confirmation page). Never on the public page.
export const ESTATE_PIN: VenuePin = {
  id: "estate",
  n: 2,
  label: "The estate · Drop-off",
  address: "4536 E Foothill Dr, Paradise Valley, AZ 85253",
  lat: 33.5534,
  lng: -111.9832,
  tone: "cream",
};

// Soft marker for the public page: a wide circle over Paradise Valley,
// deliberately not centred on the estate.
export const ESTATE_AREA = {
  label: "Paradise Valley estate · address sent after purchase",
  lat: 33.541,
  lng: -111.963,
  radiusM: 2600,
} as const;
