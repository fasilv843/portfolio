import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";
import { AUTHOR, SITE_URL } from "@/lib/site";

export const alt = `Projects by ${AUTHOR}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0a0b0f";
const FG = "#e6e6ea";
const MUTED = "#a8a8b0";
const ACCENT = "#00ffd1";

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
            fontSize: 88,
            fontWeight: 700,
            color: FG,
            letterSpacing: -2,
          }}
        >
          Projects
        </div>
        {/* Single interpolated string: Satori requires an explicit `display` on
            any element with more than one child, and `{n} text` is two. */}
        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: ACCENT,
            marginTop: 20,
          }}
        >
          {`${projects.length} full-stack builds`}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 28,
          color: MUTED,
        }}
      >
        <span>{AUTHOR}</span>
        <span>{SITE_URL.replace("https://", "")}</span>
      </div>
    </div>,
    size,
  );
}
