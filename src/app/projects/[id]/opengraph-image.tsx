import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";
import { AUTHOR, SITE_URL } from "@/lib/site";

export const alt = "Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same set the page prerenders, so every card is generated at build time.
export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

const BG = "#101317";
const FG = "#e0e3e6";
const MUTED = "#a2a8af";
const ACCENT = "#5cdcce";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

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
            fontSize: 30,
            color: MUTED,
            marginBottom: 16,
          }}
        >
          Project
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            color: FG,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {project?.name ?? "Project"}
        </div>
        {project?.subheading && (
          <div
            style={{
              display: "flex",
              fontSize: 38,
              color: ACCENT,
              marginTop: 20,
            }}
          >
            {project.subheading}
          </div>
        )}
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
