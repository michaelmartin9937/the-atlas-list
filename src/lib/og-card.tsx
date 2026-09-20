import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Shared 1200×630 link-preview card for the ambassador pages: gold eyebrow,
// large serif headline, the event lockup, and the fire-performer photo.
export const OG_SIZE = { width: 1200, height: 630 };

const GOLD = "#C59C55";
const BONE = "#F2EBDB";
const VELVET = "#0D0D0D";

export async function renderOgCard({ eyebrow, headline }: { eyebrow: string; headline: string }) {
  // Long headlines step down so they stay on one or two lines inside 700px.
  const headlineSize =
    headline.length <= 12 ? 96 : headline.length <= 18 ? 80 : headline.length <= 28 ? 64 : 52;

  const root = process.cwd();
  const [serif, serifItalic, sans, poster] = await Promise.all([
    readFile(join(root, "src/assets/fonts/PlayfairDisplay-Medium.ttf")),
    readFile(join(root, "src/assets/fonts/PlayfairDisplay-MediumItalic.ttf")),
    readFile(join(root, "src/assets/fonts/Inter-SemiBold.ttf")),
    readFile(join(root, "public/images/dad/story-poster.jpg")),
  ]);
  const posterSrc = `data:image/jpeg;base64,${poster.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: VELVET, position: "relative" }}>
        {/* Event photo, right side, fading into the velvet on its left edge */}
        <img
          src={posterSrc}
          width={400}
          height={630}
          style={{ position: "absolute", right: 0, top: 0, width: 400, height: 630, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            right: 220,
            top: 0,
            width: 180,
            height: 630,
            display: "flex",
            backgroundImage: `linear-gradient(to right, ${VELVET}, rgba(13,13,13,0))`,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 800,
            height: "100%",
            padding: "64px 0 60px 72px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Inter",
                fontSize: 22,
                letterSpacing: 5,
                color: GOLD,
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                maxWidth: 700,
                fontFamily: "Playfair",
                fontSize: headlineSize,
                lineHeight: 1.05,
                color: BONE,
              }}
            >
              {headline}
            </div>
            <div style={{ display: "flex", marginTop: 34, width: 120, height: 2, background: GOLD }} />
            <div style={{ display: "flex", marginTop: 30, fontFamily: "Playfair", fontSize: 44, color: BONE }}>
              Desert After Dark
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 6,
                fontFamily: "Playfair",
                fontStyle: "italic",
                fontSize: 30,
                color: GOLD,
              }}
            >
              powered by Thundr
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Inter",
              fontSize: 18,
              letterSpacing: 4,
              color: "rgba(242,235,219,0.78)",
              textTransform: "uppercase",
            }}
          >
            The Atlas List · October 10 · Paradise Valley
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Playfair", data: serif, weight: 500, style: "normal" },
        { name: "Playfair", data: serifItalic, weight: 500, style: "italic" },
        { name: "Inter", data: sans, weight: 600, style: "normal" },
      ],
    }
  );
}
