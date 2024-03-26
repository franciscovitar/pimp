"use client";

import "../styles/_imagen2.scss";
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

function Imagen2() {
  return (
    <div className="contenedor-principal-demo">
      <div className="contenedor-secundario">
        <motion.h2 {...headingVariants}>También tenemos para ellos!</motion.h2>
        <motion.h3 {...subheadingVariants}>
          Descubre nuestro perfilado de cejas, depilación definitiva,
          cosmetología y tratamientos estéticos diseñados para aquellos que
          buscan cuidar y resaltar su cuerpo.
        </motion.h3>

        <Link target="blank" href="https://pimp.turnosya.com/landing/">
          <motion.button {...buttonVariants} viewport={{ once: true }}>
            Contactanos!
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default Imagen2;
