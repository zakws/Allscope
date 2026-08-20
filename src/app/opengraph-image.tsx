import { ImageResponse } from "next/og";

export const alt = "Allscope Concrete · Pour it right. First time.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Brand card for social previews. Uses system fonts; swap in the brand faces
 *  once the master logo file is supplied. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0c0d",
          padding: 72,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ fontSize: 64, fontWeight: 800, color: "#e32726" }}>A</span>
          <span style={{ fontSize: 64, fontWeight: 800, color: "#a9adb2" }}>llscope</span>
          <span style={{ fontSize: 28, fontWeight: 600, color: "#6d6e71", marginLeft: 16 }}>
            CONCRETE
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: "#f2efe9",
              textTransform: "uppercase",
              lineHeight: 1.02,
            }}
          >
            Pour it right.
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: "#6d6e71",
              textTransform: "uppercase",
              lineHeight: 1.02,
            }}
          >
            First time.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 26, color: "#b9bec2" }}>
            Commercial concrete placement and finishing · Sydney
          </span>
          <div style={{ display: "flex", width: 220, height: 8, background: "#e32726" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
