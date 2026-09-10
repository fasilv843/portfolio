import { ImageResponse } from "next/og";
import { AUTHOR, ROLE, SITE_URL } from "@/lib/site";

export const alt = `${AUTHOR} — ${ROLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette is inlined rather than read from CSS tokens: this renders outside the
// browser, so --background and friends do not exist here. Values match the dark
// theme in globals.css.
const BG = "#101317";
const FG = "#e0e3e6";
const MUTED = "#a2a8af";
const ACCENT = "#5cdcce";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: BG,
        padding: 80,
        // ImageResponse ships a limited font stack; do not assume Inter.
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{ display: "flex", height: 8, width: 180, background: ACCENT }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: MUTED,
            marginBottom: 16,
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: FG,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {AUTHOR}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 44,
            color: ACCENT,
            marginTop: 20,
          }}
        >
          {ROLE}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 28, color: MUTED }}>
        {SITE_URL.replace("https://", "")}
      </div>
    </div>,
    size,
  );
}
