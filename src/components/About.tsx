"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";
import { BsStarFill } from "react-icons/bs";

const values = [
  {
    title: "Técnica completa",
    desc: "Movimiento, estilo, disociación corporal, postura, balance y seguridad escénica.",
  },
  {
    title: "Ambiente empático",
    desc: "Crecemos en conjunto, respetando el proceso de cada persona.",
  },
  {
    title: "Empoderamiento real",
    desc: "No solo enseñamos pasos. Te ayudamos a ganar confianza desde adentro.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="nosotros"
      ref={ref}
      style={{
        backgroundColor: "#111111",
        padding: "7rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-200px",
          right: "-200px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,201,177,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        <div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
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
            Quiénes somos
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
              color: "#f5f5f5",
            }}
          >
            Más que una
            <br />
            <span style={{ color: "#00c9b1" }}>academia de baile</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: "#999", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "2rem" }}
          >
            En GiantSteps Studio creamos un espacio donde puedes explotar tus
            habilidades desde la teoría, la trayectoria y la práctica. Contamos
            con más de 8 años formando bailarines con técnica, carácter y
            confianza escénica.
          </motion.p>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2.5rem" }}>
            {[...Array(5)].map((_, i) => (
              <BsStarFill key={i} style={{ color: "#f5c518", fontSize: "1rem" }} />
            ))}
            <span style={{ color: "#888", fontSize: "0.9rem", marginLeft: "0.5rem" }}>
              100% recomendado por nuestros alumnos
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#00c9b1",
                    marginTop: "0.45rem",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontWeight: 700, color: "#f5f5f5", marginBottom: "0.25rem" }}>{v.title}</div>
                  <div style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6 }}>{v.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ position: "relative" }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "4/5",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&q=80"
              alt="Clase de baile GiantSteps"
              fill
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 60%)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "1.5rem",
              backgroundColor: "rgba(10,10,10,0.85)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0,201,177,0.3)",
              borderRadius: "12px",
              padding: "1rem 1.4rem",
            }}
          >
            <div style={{ color: "#00c9b1", fontWeight: 900, fontSize: "1.8rem" }}>+8</div>
            <div style={{ color: "#aaa", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Años de experiencia
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: "2px solid rgba(0,201,177,0.3)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
