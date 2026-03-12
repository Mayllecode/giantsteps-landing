"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const photos = [
  { src: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80", label: "Salsa en pareja" },
  { src: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80", label: "Urban dance" },
  { src: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&q=80", label: "Bachata sensual" },
  { src: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&q=80", label: "Ballet clásico" },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80", label: "Contemporáneo" },
  { src: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80", label: "Clases grupales" },
  { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80", label: "Presentación" },
  { src: "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?w=800&q=80", label: "Show en escenario" },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : 0));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : 0));

  return (
    <section
      id="galeria"
      ref={ref}
      style={{ backgroundColor: "#111111", padding: "7rem 2rem" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{
              color: "#00c9b1",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            Momentos que inspiran
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900,
              color: "#f5f5f5",
              letterSpacing: "-0.02em",
            }}
          >
            Nuestra <span style={{ color: "#00c9b1" }}>galería</span>
          </motion.h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              onClick={() => setLightboxIndex(i)}
              style={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                aspectRatio: i % 5 === 0 ? "1/1.3" : "1/1",
                cursor: "pointer",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.08)")}
                onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "1")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "0")}
              >
                <span
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "1rem",
                    color: "#f5f5f5",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                  }}
                >
                  {photo.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(12px)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "min(90vw, 900px)",
                aspectRatio: "16/10",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <Image
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].label}
                fill
                style={{ objectFit: "cover" }}
              />
            </motion.div>

            <button
              onClick={prev}
              style={{
                position: "fixed",
                left: "1.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#fff",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                cursor: "pointer",
                fontSize: "1.4rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HiChevronLeft />
            </button>
            <button
              onClick={next}
              style={{
                position: "fixed",
                right: "1.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#fff",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                cursor: "pointer",
                fontSize: "1.4rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HiChevronRight />
            </button>
            <button
              onClick={() => setLightboxIndex(null)}
              style={{
                position: "fixed",
                top: "1.5rem",
                right: "1.5rem",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#fff",
                borderRadius: "50%",
                width: "42px",
                height: "42px",
                cursor: "pointer",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HiX />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
