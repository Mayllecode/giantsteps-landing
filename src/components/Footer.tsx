"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { HiLocationMarker, HiPhone, HiMail, HiClock } from "react-icons/hi";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Clases", href: "#clases" },
  { label: "Instructores", href: "#instructores" },
  { label: "Galería", href: "#galeria" },
  { label: "Precios", href: "#precios" },
];

export default function Footer() {
  return (
    <footer id="contacto" style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 2rem 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem",
            marginBottom: "4rem",
          }}
        >
          <div>
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontWeight: 900, fontSize: "1.6rem", color: "#00c9b1", lineHeight: 1, letterSpacing: "-0.02em" }}>
                GIANT
              </div>
              <div style={{ fontWeight: 900, fontSize: "1.6rem", color: "#f5f5f5", letterSpacing: "0.15em", marginTop: "-4px" }}>
                STEPS
              </div>
            </div>
            <p style={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "240px", marginBottom: "1.5rem" }}>
              ExpresARTE es empoderARTE. Más de 8 años formando bailarines con técnica, carácter y confianza escénica.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { icon: <FaInstagram />, href: "https://instagram.com/giantsteps.pe", label: "Instagram" },
                { icon: <FaFacebook />, href: "https://facebook.com/giantstepsp", label: "Facebook" },
                { icon: <FaWhatsapp />, href: "https://wa.me/51970660430", label: "WhatsApp" },
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.label}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#888",
                    fontSize: "1rem",
                    textDecoration: "none",
                    transition: "color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#00c9b1";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(0,201,177,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#888";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#f5f5f5", fontWeight: 700, marginBottom: "1.25rem", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Navegación
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{ color: "#666", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#00c9b1")}
                    onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#666")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: "#f5f5f5", fontWeight: 700, marginBottom: "1.25rem", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Contacto
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { icon: <HiLocationMarker />, text: "Confraternidad 598, Los Olivos 15307, Lima" },
                { icon: <HiPhone />, text: "970 660 430 / 932 695 132" },
                { icon: <HiMail />, text: "giantstepsp@gmail.com" },
                { icon: <HiClock />, text: "Mar–Jue 9:20–10:50pm · Sáb 9:00–12:00" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <span style={{ color: "#00c9b1", marginTop: "2px", flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#f5f5f5", fontWeight: 700, marginBottom: "1.25rem", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Ubicación
            </h4>
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.8937853498!2d-77.07!3d-11.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDU4JzQ4LjAiUyA3N8KwMDQnMTIuMCJX!5e0!3m2!1ses!2spe!4v1234567890"
                width="100%"
                height="180"
                style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación GiantSteps Studio"
              />
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "#444", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} GiantSteps Studio. Todos los derechos reservados.
          </p>
          <p style={{ color: "#333", fontSize: "0.75rem" }}>
            Hecho con pasión en Lima, Perú
          </p>
        </div>
      </div>
    </footer>
  );
}
