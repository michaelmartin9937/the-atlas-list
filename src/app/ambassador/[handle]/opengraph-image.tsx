import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ambassadors } from "@/content/ambassadors";

// The preview card shown when an ambassador's page link is pasted into
// iMessage, Instagram DMs, WhatsApp, etc. One per ambassador, with their name.
export const runtime = "nodejs";
export const alt = "Brand Ambassador · The Atlas List · Desert After Dark";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return ambassadors.map((a) => ({ handle: a.handle }));
}

const GOLD = "#C59C55";
const BONE = "#F2EBDB";
const VELVET = "#0D0D0D";

export default async function Image({ params }: { params: Promise<{ handle: string }> }) {
  const { handle: raw } = await params;
  const handle = decodeURIComponent(raw).toLowerCase();
  const person = ambassadors.find((a) => a.handle === handle);
  const name = person?.name || `@${handle}`;
  // Long names step down so they stay on one or two lines inside 700px.
  const nameSize = name.length <= 12 ? 96 : name.length <= 18 ? 80 : name.length <= 26 ? 64 : 52;

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
              Brand Ambassador
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                maxWidth: 700,
                fontFamily: "Playfair",
                fontSize: nameSize,
                lineHeight: 1.05,
                color: BONE,
              }}
            >
              {name}
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
      ...size,
      fonts: [
        { name: "Playfair", data: serif, weight: 500, style: "normal" },
        { name: "Playfair", data: serifItalic, weight: 500, style: "italic" },
        { name: "Inter", data: sans, weight: 600, style: "normal" },
      ],
    }
  );
}
