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
        borderTop: "1px solid rgba(0,0,0,0.1)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <div ref={trackRef} className="marquee-track">
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
            <span style={{ color: "rgba(0,0,0,0.3)", fontSize: "1.2rem", lineHeight: 0 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
