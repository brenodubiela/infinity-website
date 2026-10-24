import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero } from "@/data/home";

export const alt = "Infinity Engenharia e Perícias";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "node_modules/@fontsource");
const sans = await readFile(join(fontDir, "ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff"));
const mono = await readFile(join(fontDir, "ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff"));

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 72,
          padding: "0 96px",
          background: "#1B2430",
          fontFamily: "Plex Sans",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            width: 288,
            height: 288,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 16,
            border: "2px solid #2C3742",
            background: "#12181F",
            flexShrink: 0,
          }}
        >
          <svg width="216" height="89" viewBox="0 0 136 56">
            <path
              d="M42.4,8.8 A24,24 0 1 0 42.4,47.2 L93.6,8.8 A24,24 0 1 1 93.6,47.2 Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="8"
            />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 128, lineHeight: 1, letterSpacing: -2 }}>Infinity</div>
          <div style={{ fontFamily: "Plex Mono", fontSize: 24, letterSpacing: 8, color: "#C7CDD4", marginTop: 16 }}>
            ENGENHARIA E PERÍCIAS
          </div>
          <div style={{ width: 64, height: 4, background: "#E24B4A", marginTop: 40 }} />
          <div style={{ fontSize: 32, lineHeight: 1.3, color: "#A8B1BA", marginTop: 32, maxWidth: 620 }}>
            {hero.title}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Plex Sans", data: sans, style: "normal", weight: 600 },
        { name: "Plex Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
