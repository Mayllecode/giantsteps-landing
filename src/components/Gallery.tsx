"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";
import Image from "next/image";
import { FaFire, FaMusic, FaStar, FaUsers, FaTrophy } from "react-icons/fa";

const chips = [
  { icon: FaFire, label: "Salsa · Bachata · Urbano", delay: 0 },
  { icon: FaMusic, label: "6 estilos de baile", delay: 0.6 },
  { icon: FaStar, label: "100% recomendado", delay: 1.2 },
];

const stats = [
  { value: "+500", label: "Alumnos formados" },
  { value: "8", label: "Años de experiencia" },
  { value: "6", label: "Estilos de baile" },
  { value: "+20", label: "Shows realizados" },
];

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

function DragCard({
  photo,
  onSwipe,
}: {
  photo: { src: string; label: string };
  onSwipe: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-22, 0, 22]);
  const likeOpacity = useTransform(x, [30, 100], [0, 1]);
  const skipOpacity = useTransform(x, [-100, -30], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 600) {
      animate(x, info.offset.x > 0 ? 700 : -700, { duration: 0.3 });
      setTimeout(onSwipe, 260);
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 28 });
      animate(y, 0, { type: "spring", stiffness: 400, damping: 28 });
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.85}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.93, opacity: 0, y: 18 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "22px",
        overflow: "hidden",
        touchAction: "none",
        cursor: "grab",
        x,
        y,
        rotate,
        zIndex: 30,
        boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
      }}
      whileDrag={{ cursor: "grabbing" }}
    >
      <Image
        src={photo.src}
        alt={photo.label}
        fill
        sizes="400px"
        style={{ objectFit: "cover", pointerEvents: "none" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "1.5rem",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1.05rem",
          letterSpacing: "0.01em",
        }}
      >
        {photo.label}
      </div>
      <motion.div
        style={{
          position: "absolute",
          top: "1.2rem",
          right: "1.2rem",
          background: "transparent",
          color: "#00c9b1",
          padding: "0.3rem 0.9rem",
          borderRadius: "999px",
          fontWeight: 800,
          fontSize: "0.8rem",
          border: "2px solid #00c9b1",
          opacity: likeOpacity,
        }}
      >
        ¡GENIAL!
      </motion.div>
      <motion.div
        style={{
          position: "absolute",
          top: "1.2rem",
          left: "1.2rem",
          background: "transparent",
          color: "#ff5555",
          padding: "0.3rem 0.9rem",
          borderRadius: "999px",
          fontWeight: 800,
          fontSize: "0.8rem",
          border: "2px solid #ff5555",
          opacity: skipOpacity,
        }}
      >
        PASAR
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const bgBase = isTransitioning
    ? (currentIndex - 1 + photos.length) % photos.length
    : currentIndex;

  const next = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((i) => (i + 1) % photos.length);
    setTimeout(() => setIsTransitioning(false), 420);
  }, []);

  const top = photos[currentIndex];
  const mid = photos[(bgBase + 1) % photos.length];
  const bot = photos[(bgBase + 2) % photos.length];

  return (
    <section
      id="galeria"
      ref={ref}
      style={{ backgroundColor: "#111111", padding: "7rem 2rem" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
            style={{ color: "#777", marginTop: "0.75rem", fontSize: "0.9rem" }}
          >
            Arrastra las cartas para explorar ✦
          </motion.p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr min(360px, 75vw) 1fr",
            alignItems: "center",
            gap: "clamp(1rem, 3vw, 3rem)",
          }}
        >
          {/* Left: floating chips */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "flex-end",
            }}
          >
            {chips.map((chip, i) => (
              <motion.div
                key={chip.label}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? {
                  opacity: 1,
                  x: 0,
                  y: [0, -7, 0],
                } : {}}
                transition={{
                  opacity: { delay: 0.4 + chip.delay, duration: 0.5 },
                  x: { delay: 0.4 + chip.delay, duration: 0.5 },
                  y: { delay: 0.4 + chip.delay, duration: 3.2 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(0,201,177,0.2)",
                  borderRadius: "999px",
                  padding: "0.5rem 1rem",
                  whiteSpace: "nowrap",
                }}
              >
                <chip.icon style={{ color: "#00c9b1", fontSize: "0.75rem", flexShrink: 0 }} />
                <span style={{ color: "#ccc", fontSize: "0.78rem", fontWeight: 600 }}>{chip.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Center: card stack */}
          <div
            style={{
              position: "relative",
              width: "min(360px, 75vw)",
              height: "min(490px, 82vw)",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "22px",
                overflow: "hidden",
                zIndex: 10,
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
              }}
              animate={{ scale: 0.84, y: 56, rotate: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={bot.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <Image src={bot.src} alt={bot.label} fill sizes="360px" style={{ objectFit: "cover" }} />
                </motion.div>
              </AnimatePresence>
              <div style={{ position: "absolute", inset: 0, background: "rgba(17,17,17,0.35)", zIndex: 1 }} />
            </motion.div>

            <motion.div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "22px",
                overflow: "hidden",
                zIndex: 20,
                boxShadow: "0 18px 55px rgba(0,0,0,0.5)",
              }}
              animate={{ scale: 0.91, y: 30, rotate: 4 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={mid.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <Image src={mid.src} alt={mid.label} fill sizes="360px" style={{ objectFit: "cover" }} />
                </motion.div>
              </AnimatePresence>
              <div style={{ position: "absolute", inset: 0, background: "rgba(17,17,17,0.2)", zIndex: 1 }} />
            </motion.div>

            <AnimatePresence mode="wait">
              <DragCard
                key={currentIndex}
                photo={top}
                onSwipe={next}
              />
            </AnimatePresence>
          </div>

          {/* Right: stats */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.8rem",
              paddingLeft: "clamp(0.5rem, 2vw, 1.5rem)",
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              >
                <div
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    fontWeight: 900,
                    color: "#00c9b1",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginTop: "0.3rem",
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            marginTop: "2.5rem",
          }}
        >
          {photos.map((_, i) => (
            <motion.div
              key={i}
              onClick={() => setCurrentIndex(i)}
              animate={{
                width: i === currentIndex ? 28 : 8,
                backgroundColor: i === currentIndex ? "#00c9b1" : "rgba(255,255,255,0.25)",
              }}
              transition={{ duration: 0.25 }}
              style={{ height: 8, borderRadius: 999, cursor: "pointer" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
