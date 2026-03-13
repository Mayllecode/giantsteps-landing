"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { HiArrowDown } from "react-icons/hi";
import Image from "next/image";

const PARTICLE_ANGLES = [0, 60, 120, 180, 240, 300];

function MagneticButton({
  href,
  children,
  primary,
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [firing, setFiring] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    animate(x, (e.clientX - rect.left - rect.width / 2) * 0.3, { type: "spring", stiffness: 500, damping: 35 });
    animate(y, (e.clientY - rect.top - rect.height / 2) * 0.3, { type: "spring", stiffness: 500, damping: 35 });
  };

  const handleMouseEnter = () => {
    setFiring(true);
    setTimeout(() => setFiring(false), 450);
  };

  const handleMouseLeave = () => {
    animate(x, 0, { type: "spring", stiffness: 500, damping: 35 });
    animate(y, 0, { type: "spring", stiffness: 500, damping: 35 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.88 }}
      animate={primary ? {
        boxShadow: [
          "0 0 10px rgba(0,201,177,0.22), 0 4px 24px rgba(0,0,0,0.3)",
          "0 0 30px rgba(0,201,177,0.65), 0 4px 24px rgba(0,0,0,0.3)",
          "0 0 10px rgba(0,201,177,0.22), 0 4px 24px rgba(0,0,0,0.3)",
        ],
      } : undefined}
      transition={primary ? {
        boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        default: { type: "spring", stiffness: 400, damping: 20 },
      } : { type: "spring", stiffness: 400, damping: 20 }}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: primary ? "0.9rem 2rem" : "0.9rem 2rem",
        borderRadius: "999px",
        fontWeight: primary ? 800 : 600,
        fontSize: "1rem",
        textDecoration: "none",
        cursor: "pointer",
        overflow: "visible",
        backgroundColor: primary ? "#00c9b1" : "transparent",
        color: primary ? "#0a0a0a" : "#f5f5f5",
        border: primary ? "none" : "1px solid rgba(245,245,245,0.2)",
        boxShadow: primary ? "0 0 0 rgba(0,201,177,0)" : "none",
        x,
        y,
      }}
    >
      <AnimatePresence>
        {firing &&
          PARTICLE_ANGLES.map((angle, i) => (
            <motion.span
              key={angle}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
              animate={{
                x: Math.cos((angle * Math.PI) / 180) * 52,
                y: Math.sin((angle * Math.PI) / 180) * 52,
                opacity: 0,
                scale: 1.3,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.42, delay: i * 0.03, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: "-4px",
                marginTop: "-4px",
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: primary ? "#00c9b1" : "rgba(245,245,245,0.7)",
                pointerEvents: "none",
                zIndex: 50,
              }}
            />
          ))}
      </AnimatePresence>
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(bgRef.current, { scale: 1.1, duration: 1.6, ease: "power3.out" })
      .from(headingRef.current, { y: 80, opacity: 0, duration: 0.9, ease: "power4.out" }, "-=1")
      .from(subtitleRef.current, { y: 40, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");

    gsap.to(bgRef.current, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: "#inicio",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      id="inicio"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
      }}
    >
      <div
        ref={bgRef}
        style={{ position: "absolute", inset: "-10%", zIndex: 0 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1547153760-18fc86324498?w=1600&q=80"
          alt="Bailarines en acción"
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(10,10,10,0.92) 40%, rgba(10,10,10,0.5) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 50%)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "8rem 2rem 4rem",
          width: "100%",
        }}
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            display: "inline-block",
            backgroundColor: "rgba(0,201,177,0.15)",
            border: "1px solid rgba(0,201,177,0.4)",
            color: "#00c9b1",
            padding: "0.3rem 1rem",
            borderRadius: "999px",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          +8 años de experiencia
        </motion.span>

        <h1
          ref={headingRef}
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
            maxWidth: "800px",
          }}
        >
          <span style={{ color: "#f5f5f5" }}>ExpresARTE</span>
          <br />
          <span
            style={{
              WebkitTextStroke: "2px #00c9b1",
              color: "transparent",
            }}
          >
            es empoderARTE
          </span>
        </h1>

        <p
          ref={subtitleRef}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "#aaaaaa",
            maxWidth: "520px",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          Salsa, bachata y más. Clases para todos los niveles en Los Olivos,
          Lima. Un espacio donde crecer, moverte y brillar.
        </p>

        <div
          ref={ctaRef}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <MagneticButton
            href="https://wa.me/51970660430?text=Hola%2C%20quiero%20información%20sobre%20las%20clases"
            target="_blank"
            rel="noopener noreferrer"
            primary
          >
            <FaWhatsapp style={{ fontSize: "1.2rem" }} />
            Quiero inscribirme
          </MagneticButton>

          <MagneticButton href="#clases">
            Ver clases
          </MagneticButton>
        </div>

        <div
          style={{
            display: "flex",
            gap: "2.5rem",
            marginTop: "4rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "+8", label: "Años de experiencia" },
            { value: "+500", label: "Alumnos formados" },
            { value: "6", label: "Estilos de baile" },
            { value: "100%", label: "Recomendado" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "#00c9b1",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.a
        href="#nosotros"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          color: "#00c9b1",
          fontSize: "1.5rem",
        }}
      >
        <HiArrowDown />
      </motion.a>
    </section>
  );
}
