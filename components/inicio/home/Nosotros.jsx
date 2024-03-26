"use client";

import React from "react";
import { motion } from "framer-motion";
import BudaImage from "../../../image/pexels-laura-paredis-13012336.jpg";
import "../styles/_nosotros.scss";
import Image from "next/image";

// Constantes para efectos de Framer Motion
const imageVariants = {
  initial: { scale: 0.8, opacity: 0 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
  viewport: { once: true },
};

const hoverVariants = {
  whileHover: {
    scale: 1.08,
    transition: { duration: 0.4 },
  },
};

const textVariants = {
  viewport: { once: true },
  initial: { opacity: 0, y: 10 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0 },
  },
};

const lineVariants = {
  viewport: { once: true },
  initial: { width: 5 },
  whileInView: { width: 60, transition: { duration: 0.5 } },
};

const paragraphVariants = {
  viewport: { once: true },
  initial: { opacity: 0, y: 50 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2 },
  },
};

function Nosotros() {
  return (
    <div id="nosotros" className="nosotros-container container-fluid">
      <div className="fila">
        <motion.div className="imagen" {...imageVariants}>
          <div className="imagen-zoom">
            <motion.div {...hoverVariants}>
              <Image alt="Img1" className="img" src={BudaImage}></Image>
            </motion.div>
          </div>
        </motion.div>
        <div className="texto">
          <motion.h3 {...textVariants}>Nosotros</motion.h3>
          <motion.div className="line" {...lineVariants}></motion.div>
          <motion.p {...paragraphVariants}>
            <strong>Pimp</strong> es un centro de{" "}
            <strong>belleza integral</strong> que se dedica a preservar la
            estética de nuestros clientes mediante métodos poco invasivos,
            garantizando la <strong>belleza natural</strong> a través de un{" "}
            <strong>servicio personalizado</strong>. Nos esforzamos por
            proporcionar <strong>tratamientos adaptados</strong> a tus{" "}
            necesidades, siempre buscando{" "}
            <strong>mantener la autenticidad</strong>.
          </motion.p>
          <motion.a
            target="blank"
            href="https://pimp.turnosya.com/landing/"
            {...paragraphVariants}
            className="continuar"
          >
            Reserva online!
          </motion.a>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;
