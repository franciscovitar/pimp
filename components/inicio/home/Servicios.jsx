"use client";

import React from "react";
import { motion } from "framer-motion";
import "../styles/_servicios.scss";
import ServicioGaleria from "./ServicioGaleria";
import { services } from "./servicios.data";

const titleVariants = {
  viewport: { once: true },
  initial: { opacity: 0, x: -50 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, delay: 0.1 },
  },
};

const lineVariants = {
  viewport: { once: true },
  initial: { width: 0 },
  whileInView: { width: 60, transition: { duration: 1 } },
};

function Tratamientos() {
  return (
    <div className="nos-diag-com-container" id="tratamientos">
      <div className="titulo">
        <motion.h2 {...titleVariants}>Servicios</motion.h2>
        <motion.div {...lineVariants} className="line"></motion.div>
      </div>

      <div className="fila">
        {services.map((service) => (
          <ServicioGaleria
            key={`${service.id}-desktop`}
            service={service}
            galeriaClassName="galeria normal"
            layout={service.desktopLayout}
          />
        ))}

        {services.map((service) => (
          <ServicioGaleria
            key={`${service.id}-mobile`}
            service={service}
            galeriaClassName="galeria invert"
            layout="text-image"
          />
        ))}
      </div>
    </div>
  );
}

export default Tratamientos;
