import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Generates the app favicon: a wrench glyph on a brass-ringed ink circle. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c2b45",
          borderRadius: "50%",
          border: "2px solid #c0883d",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M14.7 6.3a4 4 0 0 0-5.66 4.24L2 17.59V22h4.41l7.06-7.06a4 4 0 0 0 4.24-5.66l-2.83 2.83-2.83-.7-.7-2.83 2.83-2.83Z"
            stroke="#f5f2ea"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
