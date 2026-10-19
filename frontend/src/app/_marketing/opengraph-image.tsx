import { ImageResponse } from "next/og";

export const alt = "Ifora Isaqova — Tikuvchilik akademiyasi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(150deg, #7A2E3B 0%, #551F28 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            height: 120,
            width: 120,
            borderRadius: 60,
            background: "#FBF7F1",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
            color: "#7A2E3B",
            marginBottom: 36,
          }}
        >
          ✂
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, color: "#FBF7F1" }}>
          Ifora Isaqova
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 32,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(251,247,241,0.75)",
          }}
        >
          Tikuvchilik akademiyasi
        </div>
      </div>
    ),
    { ...size },
  );
}
