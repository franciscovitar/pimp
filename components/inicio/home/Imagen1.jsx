"use client";

import "../styles/_imagen.scss";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Constantes para efectos de Framer Motion
const headingVariants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0 } },
};

const subheadingVariants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
};

const buttonVariants = {
  initial: { opacity: 0, scale: 0 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: 0.4 },
  },
};

function Imagen1() {
  return (
    <div className="contenedor-principal-demo2">
      <div className="contenedor-secundario">
        <motion.h2 viewport={{ once: true }} {...headingVariants}>
          Programa tu Cambio
        </motion.h2>
        <motion.h3 viewport={{ once: true }} {...subheadingVariants}>
          Descubre tratamientos personalizados para resaltar tu esplendor.
          ¡Reserva ahora y permítenos realzar tu belleza!
        </motion.h3>

        <Link target="blank" href="https://pimp.turnosya.com/landing/">
          <motion.button {...buttonVariants} viewport={{ once: true }}>
            Solicitar turno
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default Imagen1;
