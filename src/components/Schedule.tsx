"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiClock, HiLocationMarker } from "react-icons/hi";

const schedule = [
  {
    day: "Lunes",
    classes: [
      { time: "09:00 - 10:30", name: "Salsa Principiante", instructor: "Valeria Torres", location: "Sala A" },
      { time: "17:00 - 18:30", name: "Ballet Básico", instructor: "Andrea Quispe", location: "Sala B" },
      { time: "19:00 - 20:30", name: "Hip Hop", instructor: "Marco Salinas", location: "Sala A" },
    ],
  },
  {
    day: "Martes",
    classes: [
      { time: "09:20 - 10:50", name: "Salsa Básico", instructor: "Valeria Torres", location: "Los Olivos" },
      { time: "09:20 - 10:50", name: "Bachata Principiante", instructor: "Valeria Torres", location: "Los Olivos" },
      { time: "17:00 - 18:30", name: "Niños (5-10 años)", instructor: "Diego Mamani", location: "Sala B" },
    ],
  },
  {
    day: "Miércoles",
    classes: [
      { time: "09:00 - 10:30", name: "Bachata Intermedio", instructor: "Valeria Torres", location: "Sala A" },
      { time: "17:30 - 19:00", name: "Contemporáneo", instructor: "Andrea Quispe", location: "Sala B" },
      { time: "19:30 - 21:00", name: "Salsa Intermedio", instructor: "Valeria Torres", location: "Sala A" },
    ],
  },
  {
    day: "Jueves",
    classes: [
      { time: "09:20 - 10:50", name: "Salsa Básico", instructor: "Valeria Torres", location: "Los Olivos" },
      { time: "09:20 - 10:50", name: "Bachata Básico", instructor: "Valeria Torres", location: "Los Olivos" },
      { time: "17:00 - 18:30", name: "Adolescentes (11-17)", instructor: "Diego Mamani", location: "Sala B" },
    ],
  },
  {
    day: "Sábado",
    classes: [
      { time: "09:00 - 10:30", name: "Salsa Pareja", instructor: "Valeria Torres", location: "Sala A" },
      { time: "10:30 - 12:00", name: "Hip Hop Avanzado", instructor: "Marco Salinas", location: "Sala A" },
      { time: "15:00 - 16:30", name: "Niños Integral", instructor: "Diego Mamani", location: "Sala B" },
    ],
  },
];

const dayColors = ["#00c9b1", "#f5c518", "#e91e8c", "#9b59b6", "#ff6b35"];

export default function Schedule() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="horarios"
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
            Organiza tu semana
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
            Horario de <span style={{ color: "#00c9b1" }}>clases</span>
          </motion.h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {schedule.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{
                backgroundColor: "#1a1a1a",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  padding: "1rem 1.5rem",
                  borderBottom: `2px solid ${dayColors[i]}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3 style={{ fontWeight: 800, color: "#f5f5f5", fontSize: "1.1rem" }}>{day.day}</h3>
                <span
                  style={{
                    backgroundColor: `${dayColors[i]}20`,
                    color: dayColors[i],
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  {day.classes.length} clases
                </span>
              </div>
              <div style={{ padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {day.classes.map((cls) => (
                  <div
                    key={cls.name + cls.time}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.03)",
                      borderRadius: "10px",
                      padding: "0.9rem",
                      borderLeft: `3px solid ${dayColors[i]}`,
                    }}
                  >
                    <div style={{ fontWeight: 700, color: "#f5f5f5", fontSize: "0.9rem", marginBottom: "0.4rem" }}>
                      {cls.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#888", fontSize: "0.78rem", marginBottom: "0.2rem" }}>
                      <HiClock />
                      {cls.time}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#888", fontSize: "0.78rem" }}>
                      <HiLocationMarker style={{ color: dayColors[i] }} />
                      {cls.location} · {cls.instructor}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{
            marginTop: "2rem",
            textAlign: "center",
            color: "#666",
            fontSize: "0.875rem",
          }}
        >
          ¿Tienes dudas sobre el horario?{" "}
          <a
            href="https://wa.me/51970660430"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00c9b1", fontWeight: 600, textDecoration: "none" }}
          >
            Consúltanos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
