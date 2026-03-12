"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";

const plans = [
  {
    name: "Básico",
    price: "S/ 80",
    period: "/mes",
    description: "Ideal para comenzar tu camino en el baile.",
    features: [
      "1 estilo de baile",
      "2 clases por semana",
      "Acceso a sala de práctica libre",
      "Asesoría básica de instructor",
    ],
    highlight: false,
    color: "#888",
  },
  {
    name: "Intensivo",
    price: "S/ 130",
    period: "/mes",
    description: "Para quienes quieren avanzar rápido con más dedicación.",
    features: [
      "2 estilos de baile",
      "4 clases por semana",
      "Acceso ilimitado a sala de práctica",
      "Seguimiento personalizado",
      "Acceso a clases especiales",
    ],
    highlight: true,
    color: "#00c9b1",
  },
  {
    name: "Staff / Beca",
    price: "S/ 0",
    period: "/mes",
    description: "Postula y forma parte del equipo GiantSteps.",
    features: [
      "Beca completa o media beca",
      "Todos los estilos disponibles",
      "Formación como instructor",
      "Participación en shows y eventos",
      "Certificación interna GiantSteps",
    ],
    highlight: false,
    color: "#f5c518",
  },
];

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="precios"
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
            Invierte en ti
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
            Planes y <span style={{ color: "#00c9b1" }}>precios</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ color: "#888", marginTop: "0.75rem", fontSize: "0.95rem" }}
          >
            ¿Tienes dudas de cuál elegir? Escríbenos al{" "}
            <a
              href="https://wa.me/51942740632"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#00c9b1", textDecoration: "none", fontWeight: 600 }}
            >
              #942740632
            </a>
          </motion.p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            alignItems: "start",
          }}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              style={{
                backgroundColor: plan.highlight ? "rgba(0,201,177,0.05)" : "#1a1a1a",
                borderRadius: "20px",
                padding: "2.5rem 2rem",
                border: plan.highlight
                  ? "2px solid rgba(0,201,177,0.5)"
                  : "1px solid rgba(255,255,255,0.06)",
                position: "relative",
                transform: plan.highlight ? "scale(1.04)" : "scale(1)",
              }}
            >
              {plan.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#00c9b1",
                    color: "#0a0a0a",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    padding: "0.3rem 1rem",
                    borderRadius: "999px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Más popular
                </div>
              )}
              <div style={{ marginBottom: "0.5rem" }}>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: plan.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {plan.name}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "0.25rem", marginBottom: "0.5rem" }}>
                <span
                  style={{
                    fontSize: "3.2rem",
                    fontWeight: 900,
                    color: plan.color === "#888" ? "#f5f5f5" : plan.color,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                <span style={{ color: "#666", fontSize: "0.9rem", marginBottom: "0.4rem" }}>{plan.period}</span>
              </div>
              <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.75rem" }}>
                {plan.description}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: `${plan.color}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <HiCheck style={{ color: plan.color, fontSize: "0.75rem" }} />
                    </div>
                    <span style={{ color: "#ccc", fontSize: "0.875rem" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/51942740632?text=Hola%2C%20quiero%20información%20sobre%20el%20plan"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  backgroundColor: plan.highlight ? "#00c9b1" : "transparent",
                  border: `2px solid ${plan.color}`,
                  color: plan.highlight ? "#0a0a0a" : plan.color,
                  padding: "0.85rem",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)")}
              >
                <FaWhatsapp style={{ fontSize: "1rem" }} />
                {plan.name === "Staff / Beca" ? "Postular ahora" : "Inscribirme"}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
