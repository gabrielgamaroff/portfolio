import { ImageResponse } from "next/og";

export const alt = "Gabriel Gamaroff — Full-Stack & Agentic Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontFamily: "monospace",
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#818cf8",
          }}
        >
          Full-Stack & Agentic Engineer
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#fafafa",
              letterSpacing: -2,
            }}
          >
            Gabriel Gamaroff
          </div>
          <div style={{ fontSize: 34, color: "#a1a1aa", maxWidth: 900 }}>
            Building the layer where people and AI meet.
          </div>
        </div>
        <div style={{ display: "flex", height: 8, width: 220, backgroundColor: "#6366f1", borderRadius: 9999 }} />
      </div>
    ),
    { ...size },
  );
}
