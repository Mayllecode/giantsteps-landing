"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const courses = [
  {
    title: "Salsa",
    level: "Principiante · Básico · Intermedio",
    desc: "Solo o en pareja. Aprende la técnica, el ritmo y el estilo de uno de los géneros más vibrantes del mundo.",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&q=80",
    tag: "Más popular",
    color: "#ff6b35",
  },
  {
    title: "Bachata",
    level: "Principiante · Básico · Intermedio",
    desc: "Sentimiento, conexión y técnica. La bachata que transforma tu manera de moverte y conectarte.",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&q=80",
    tag: "Nuevo",
    color: "#00c9b1",
  },
  {
    title: "Urbano / Urbano",
    level: "Todos los niveles",
    desc: "Hip hop, reggaeton y estilos urbanos para quienes quieren expresarse sin límites.",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&q=80",
    tag: null,
    color: "#9b59b6",
  },
  {
    title: "Ballet Básico",
    level: "Fundamental",
    desc: "Postura, balance y disciplina corporal como base para cualquier estilo de baile.",
    image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&q=80",
    tag: null,
    color: "#e91e8c",
  },
  {
    title: "Contemporáneo",
    level: "Intermedio",
    desc: "Expresión artística, fluidez y técnica. Para quienes buscan narrar historias con el cuerpo.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    tag: null,
    color: "#f5c518",
  },
  {
    title: "Niños y Adolescentes",
    level: "Desde 5 años",
    desc: "Clases especiales diseñadas para desarrollar coordinación, confianza y amor por el baile.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80",
    tag: "Familiar",
    color: "#2ecc71",
  },
];

export default function Courses() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="clases"
      ref={ref}
      style={{ backgroundColor: "#0a0a0a", padding: "7rem 2rem" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
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
            Lo que enseñamos
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
            Nuestras <span style={{ color: "#00c9b1" }}>clases</span>
          </motion.h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="card-hover"
              style={{
                backgroundColor: "#1a1a1a",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ position: "relative", height: "200px" }}>
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to top, rgba(26,26,26,1) 0%, rgba(26,26,26,0.3) 60%, transparent 100%)`,
                  }}
                />
                {course.tag && (
                  <span
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      backgroundColor: course.color,
                      color: "#0a0a0a",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    {course.tag}
                  </span>
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "1.25rem",
                    width: "4px",
                    height: "40px",
                    backgroundColor: course.color,
                    borderRadius: "2px",
                  }}
                />
              </div>
              <div style={{ padding: "1.5rem" }}>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "#f5f5f5",
                    marginBottom: "0.4rem",
                  }}
                >
                  {course.title}
                </h3>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: course.color,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    display: "block",
                    marginBottom: "0.75rem",
                  }}
                >
                  {course.level}
                </span>
                <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.65 }}>{course.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
