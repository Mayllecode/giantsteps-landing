"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const styles = [
  "SALSA", "BACHATA", "HIP HOP", "BALLET", "REGGAETÓN",
  "CONTEMPORÁNEO", "URBANO", "SALSA", "BACHATA", "HIP HOP",
  "BALLET", "REGGAETÓN", "CONTEMPORÁNEO", "URBANO",
];

export default function MarqueeBanner() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        backgroundColor: "#00c9b1",
        overflow: "hidden",
        padding: "1rem 0",
        borderTop: "1px solid rgba(0,0,0,0.12)",
        borderBottom: "1px solid rgba(0,0,0,0.12)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, #00c9b1 0%, transparent 8%, transparent 92%, #00c9b1 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "14%",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)",
          zIndex: 1,
          pointerEvents: "none",
          animation: "marquee-shimmer 4.5s ease-in-out 0.8s infinite",
        }}
      />
      <div ref={trackRef} className="marquee-track" style={{ position: "relative", zIndex: 0 }}>
        {[...styles, ...styles].map((s, i) => (
          <span
            key={i}
            style={{
              color: "#0a0a0a",
              fontWeight: 900,
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexShrink: 0,
            }}
          >
            {s}
            <span style={{ color: "rgba(0,0,0,0.25)", fontSize: "1rem", lineHeight: 0 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
