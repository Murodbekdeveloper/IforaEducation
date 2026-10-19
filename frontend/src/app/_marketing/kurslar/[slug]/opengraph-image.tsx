import { ImageResponse } from "next/og";
import { getCourseBySlug } from "@/lib/api";

export const alt = "Kurs | Ifora Isaqova";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  const title = course?.title ?? "Ifora Isaqova";
  const category = course?.category ?? "Tikuvchilik akademiyasi";
  const color = course?.coverColor ?? "#7A2E3B";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: `linear-gradient(150deg, ${color} 0%, #241C1A 100%)`,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            color: "#FBF7F1",
          }}
        >
          <div
            style={{
              display: "flex",
              height: 56,
              width: 56,
              borderRadius: 28,
              background: "#FBF7F1",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              color,
            }}
          >
            ✂
          </div>
          Ifora Isaqova
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              textTransform: "uppercase",
              letterSpacing: 3,
              color: "rgba(251,247,241,0.75)",
              marginBottom: 16,
            }}
          >
            {category}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              color: "#FBF7F1",
              lineHeight: 1.15,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
