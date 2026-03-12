"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Camila Herrera",
    role: "Alumna · Salsa básico",
    comment:
      "Llegué sin saber ni dar un paso y ahora bailo en pareja con total confianza. Valeria es increíble, no solo enseña pasos sino que te da seguridad en ti misma.",
    gender: "F" as const,
    stars: 5,
  },
  {
    name: "Rodrigo Paredes",
    role: "Alumno · Bachata & Salsa",
    comment:
      "El ambiente es incomparable. Todos se apoyan, no hay juicio. En 3 meses aprendí más de lo que pensaba posible. 100% recomendado.",
    gender: "M" as const,
    stars: 4,
  },
  {
    name: "Sofía Quispe",
    role: "Alumna · Niños (hija 8 años)",
    comment:
      "Mi hija espera con ansias cada clase. Diego es muy paciente y sabe cómo motivar a los niños. En 4 meses cambió completamente su postura y coordinación.",
    gender: "F" as const,
    stars: 4.5,
  },
  {
    name: "Luis Mendoza",
    role: "Alumno · Hip Hop urbano",
    comment:
      "Marco tiene un nivel altísimo pero sabe bajarlo para que cualquiera pueda seguirlo. Las clases son energéticas y siempre salgo con ganas de más.",
    gender: "M" as const,
    stars: 5,
  },
];

function renderStars(rating: number) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div style={{ display: "flex", gap: "0.3rem" }}>
      {[...Array(full)].map((_, i) => (
        <BsStarFill key={i} style={{ color: "#f5c518", fontSize: "0.9rem" }} />
      ))}
      {half && <BsStarHalf style={{ color: "#f5c518", fontSize: "0.9rem" }} />}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonios"
      ref={ref}
      style={{ backgroundColor: "#0a0a0a", padding: "7rem 2rem" }}
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
            Lo que dicen nuestros alumnos
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
            Historias de <span style={{ color: "#00c9b1" }}>éxito</span>
          </motion.h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="card-hover"
              style={{
                backgroundColor: "#1a1a1a",
                borderRadius: "20px",
                padding: "2rem",
                border: "1px solid rgba(255,255,255,0.06)",
                position: "relative",
              }}
            >
              <FaQuoteLeft
                style={{
                  color: "rgba(0,201,177,0.15)",
                  fontSize: "3rem",
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                }}
              />
              <div style={{ marginBottom: "1.25rem" }}>
                {renderStars(t.stars)}
              </div>
              <p style={{ color: "#cccccc", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                &ldquo;{t.comment}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: t.gender === "F"
                      ? "linear-gradient(135deg, #c2185b, #e91e63)"
                      : "linear-gradient(135deg, #0d47a1, #1976d2)",
                    border: t.gender === "F"
                      ? "2px solid rgba(233,30,99,0.5)"
                      : "2px solid rgba(25,118,210,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: t.gender === "F"
                      ? "0 0 12px rgba(233,30,99,0.3)"
                      : "0 0 12px rgba(25,118,210,0.3)",
                  }}
                >
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#f5f5f5", fontSize: "0.9rem" }}>{t.name}</div>
                  <div style={{ color: "#00c9b1", fontSize: "0.75rem", fontWeight: 600 }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
