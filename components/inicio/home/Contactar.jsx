"use client";

import React from "react";
import { motion } from "framer-motion";
import "../styles/_contactar.scss";
import Image from "next/image";
import Logo from "../../../Image/pimp-blanco.png";

// Constantes para efectos de Framer Motion
const containerVariants = {
  viewport: { once: true },
  initial: { opacity: 0, scale: 0 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: 0.2, ease: "easeInOut" },
  },
};

const textVariants = {
  viewport: { once: true },
  initial: { opacity: 0, y: 30 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.4, ease: "easeInOut" },
  },
};

const iconVariants = {
  viewport: { once: true },
  initial: { opacity: 0, scale: 0 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: 0.4, ease: "easeInOut" },
  },
};

function Contactar() {
  return (
    <div id="contacto" className="contactar-container">
      <div className="contacto">
        <motion.div {...containerVariants}>
          <Image src={Logo}></Image>
        </motion.div>
        <div>
          <motion.h2 {...textVariants}>Horarios de atención:</motion.h2>
          <motion.p {...textVariants}>Lunes a Viernes 9hs - 20hs</motion.p>
        </div>
        <div>
          <motion.h2 {...textVariants}>Contacto:</motion.h2>
          <div className="iconos">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/pimp.ok/?hl=es"
            >
              <motion.i
                {...iconVariants}
                className="bi bi-instagram"
              ></motion.i>
            </a>

            <a
              href="https://wa.me/5491163671328"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.i {...iconVariants} className="bi bi-whatsapp"></motion.i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactar;
