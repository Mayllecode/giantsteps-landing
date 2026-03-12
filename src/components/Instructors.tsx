"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const instructors = [
  {
    name: "Valeria Torres",
    role: "Directora · Salsa & Bachata",
    bio: "Fundadora de GiantSteps Studio con más de 8 años de experiencia formando bailarines. Especialista en técnica sensual y conexión de pareja.",
    gender: "F" as const,
    styles: ["Salsa", "Bachata", "Sensual"],
  },
  {
    name: "Marco Salinas",
    role: "Instructor Senior · Urbano",
    bio: "Especialista en estilos urbanos y hip-hop. Ha representado a Perú en competencias internacionales de breaking y street dance.",
    gender: "M" as const,
    styles: ["Hip Hop", "Reggaetón", "Breaking"],
  },
  {
    name: "Andrea Quispe",
    role: "Instructora · Ballet & Contemporáneo",
    bio: "Bailarina formada en el CNEF, se especializa en brindar bases técnicas sólidas que potencian cualquier estilo de baile.",
    gender: "F" as const,
    styles: ["Ballet", "Contemporáneo", "Lyrical"],
  },
  {
    name: "Diego Mamani",
    role: "Instructor · Niños & Adolescentes",
    bio: "Pedagogo del movimiento con 5 años dedicados a la formación de pequeños bailarines. Paciente, dinámico y apasionado.",
    gender: "M" as const,
    styles: ["Infantil", "Folclore", "Urbano básico"],
  },
];

export default function Instructors() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="instructores"
      ref={ref}
      style={{ backgroundColor: "#111111", padding: "7rem 2rem" }}
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
            El equipo
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
            Nuestros <span style={{ color: "#00c9b1" }}>instructores</span>
          </motion.h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {instructors.map((inst, i) => (
            <motion.div
              key={inst.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
              className="card-hover"
              style={{
                backgroundColor: "#1a1a1a",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "280px",
                  background: inst.gender === "F"
                    ? "linear-gradient(135deg, #6a0136 0%, #c2185b 50%, #e91e8c 100%)"
                    : "linear-gradient(135deg, #0a1628 0%, #0d47a1 50%, #1976d2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    fontSize: "8rem",
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.12)",
                    userSelect: "none",
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {inst.name.charAt(0)}
                </span>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60%",
                    background: "linear-gradient(to top, rgba(26,26,26,1) 0%, transparent 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "1.25rem",
                    left: "1.5rem",
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    background: inst.gender === "F"
                      ? "linear-gradient(135deg, #e91e63, #c2185b)"
                      : "linear-gradient(135deg, #1976d2, #0d47a1)",
                    border: "3px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  }}
                >
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.4rem" }}>
                    {inst.name.charAt(0)}
                  </span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "rgba(0,0,0,0.35)",
                      backdropFilter: "blur(8px)",
                      border: inst.gender === "F"
                        ? "1px solid rgba(233,30,99,0.5)"
                        : "1px solid rgba(25,118,210,0.5)",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: inst.gender === "F" ? "#e91e63" : "#42a5f5",
                    }}
                  >
                    <FaInstagram style={{ fontSize: "0.9rem" }} />
                  </div>
                </div>
              </div>

              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontWeight: 800, color: "#f5f5f5", fontSize: "1.15rem", marginBottom: "0.2rem" }}>
                  {inst.name}
                </h3>
                <p style={{ color: "#00c9b1", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
                  {inst.role}
                </p>
                <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.65, marginBottom: "1rem" }}>
                  {inst.bio}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {inst.styles.map((s) => (
                    <span
                      key={s}
                      style={{
                        backgroundColor: "rgba(0,201,177,0.1)",
                        border: "1px solid rgba(0,201,177,0.2)",
                        color: "#00c9b1",
                        padding: "0.2rem 0.7rem",
                        borderRadius: "999px",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            marginTop: "3rem",
            textAlign: "center",
            padding: "2rem",
            backgroundColor: "rgba(0,201,177,0.05)",
            border: "1px solid rgba(0,201,177,0.15)",
            borderRadius: "16px",
          }}
        >
          <p style={{ color: "#f5f5f5", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            ¿Quieres ser parte de nuestro staff?
          </p>
          <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "1.25rem" }}>
            Aprende cómo ganar becas y medias becas mientras enseñas.
          </p>
          <a
            href="https://wa.me/51970660430?text=Hola%2C%20quiero%20información%20sobre%20el%20staff"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#00c9b1",
              color: "#0a0a0a",
              padding: "0.75rem 1.75rem",
              borderRadius: "999px",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            <FaWhatsapp />
            Contactar para Staff
          </a>
        </motion.div>
      </div>
    </section>
  );
}
