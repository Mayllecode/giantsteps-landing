"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Clases", href: "#clases" },
  { label: "Instructores", href: "#instructores" },
  { label: "Galería", href: "#galeria" },
  { label: "Precios", href: "#precios" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    gsap.from(logoRef.current, { x: -40, opacity: 0, duration: 0.8, ease: "power3.out" });
    gsap.from(".nav-link", {
      y: -20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      delay: 0.3,
      ease: "power2.out",
    });

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      backgroundColor: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, [scrolled]);

  return (
    <nav
      ref={navRef}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "1.25rem 2rem", borderBottom: scrolled ? "1px solid rgba(0,201,177,0.15)" : "1px solid transparent" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div ref={logoRef} style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontWeight: 900, fontSize: "1.5rem", color: "#00c9b1", letterSpacing: "-0.02em", textTransform: "uppercase" }}>
            GIANT
          </span>
          <span style={{ fontWeight: 900, fontSize: "1.5rem", color: "#f5f5f5", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "-4px" }}>
            STEPS
          </span>
        </div>

        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", alignItems: "center" }} className="hidden md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link"
                style={{ color: "#888", fontSize: "0.875rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", transition: "color 0.2s", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#00c9b1")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#888")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://wa.me/51970660430?text=Hola%2C%20quiero%20información%20sobre%20las%20clases"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex"
          style={{ backgroundColor: "#00c9b1", color: "#0a0a0a", padding: "0.6rem 1.4rem", borderRadius: "999px", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", letterSpacing: "0.03em", transition: "background 0.2s, transform 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#00a896"; (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#00c9b1"; (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; }}
        >
          Inscríbete
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="flex md:hidden"
          style={{ background: "none", border: "none", color: "#f5f5f5", cursor: "pointer", fontSize: "1.6rem" }}
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: "rgba(10,10,10,0.97)", backdropFilter: "blur(20px)", overflow: "hidden" }}
          >
            <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.5rem 2rem", listStyle: "none" }}>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{ color: "#f5f5f5", fontSize: "1.1rem", fontWeight: 600, textDecoration: "none" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
