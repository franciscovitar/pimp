"use client";

import React from "react";
import "../styles/_botonFlotante.scss";
import { motion } from "framer-motion";

// Constantes para efectos de Framer Motion
const buttonVariants = {
  viewport: { once: true },
  initial: { opacity: 0, scale: 0 },
  whileInView: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  whileHover: { scale: 1.05 },
};

function BotonFlotante() {
  return (
    <div className="btn-flotante">
      <motion.a
        {...buttonVariants}
        href="https://wa.me/5491163671328"
        className="boton-wsp"
        target="blank"
      >
        <i className="bi bi-whatsapp"></i>
        <span> Escribeme!</span>
      </motion.a>
    </div>
  );
}

export default BotonFlotante;
