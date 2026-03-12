"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    const timer = setTimeout(() => setPulse(false), 4000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 60 }}
        >
          {pulse && (
            <motion.div
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                backgroundColor: "#25D366",
              }}
            />
          )}
          <a
            href="https://wa.me/51970660430?text=Hola%2C%20quiero%20información%20sobre%20las%20clases"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contáctanos por WhatsApp"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "58px",
              height: "58px",
              borderRadius: "50%",
              backgroundColor: "#25D366",
              color: "#fff",
              fontSize: "1.6rem",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
            }}
          >
            <FaWhatsapp />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
