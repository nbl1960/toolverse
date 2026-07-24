import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ToolVerse — A Growing Catalog of Focused Web Tools";

/** Generates the site-wide social share image. */
export default function OpengraphImage() {
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
          background: "#f5f2ea",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(192,136,61,0.16) 0%, rgba(192,136,61,0) 45%)",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 84,
            height: 84,
            borderRadius: "50%",
            background: "#1c2b45",
            border: "3px solid #c0883d",
            marginBottom: 36,
          }}
        >
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
            <path
              d="M14.7 6.3a4 4 0 0 0-5.66 4.24L2 17.59V22h4.41l7.06-7.06a4 4 0 0 0 4.24-5.66l-2.83 2.83-2.83-.7-.7-2.83 2.83-2.83Z"
              stroke="#f5f2ea"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            fontSize: 72,
            fontStyle: "italic",
            fontWeight: 600,
            color: "#1c2b45",
            letterSpacing: "-0.02em",
          }}
        >
          ToolVerse
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 26,
            fontFamily: "sans-serif",
            color: "#5b5142",
            textAlign: "center",
            maxWidth: 760,
          }}
        >
          A whole universe of tools, one clean workshop.
        </div>
      </div>
    ),
    { ...size }
  );
}
