import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B2430",
        }}
      >
        <svg width="132" height="54" viewBox="0 0 136 56">
          <path
            d="M42.4,8.8 A24,24 0 1 0 42.4,47.2 L93.6,8.8 A24,24 0 1 1 93.6,47.2 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="8"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
