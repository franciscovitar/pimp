"use client";

import React from "react";
import "../styles/_giftcard.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import Gift from "../../../Image/gifcard_cleanup.png";

// Constantes para efectos de Framer Motion
const headingVariants = {
  viewport: { once: true },
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0 } },
};

const lineVariants = {
  viewport: { once: true },
  initial: { width: 0 },
  whileInView: { width: 60, transition: { duration: 0.5 } },
};

const imageVariants = {
  viewport: { once: true },
  initial: { opacity: 0, scale: 0 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 2, delay: 0.2 },
  },
};

const subheadingVariants = {
  viewport: { once: true },
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
};

const textVariants = {
  viewport: { once: true },
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};

const linkVariants = {
  viewport: { once: true },
  initial: { opacity: 0, scale: 0 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.4 },
  },
};

function Giftcard() {
  return (
    <div id="giftcard" className="giftcard-container">
      <motion.h2 {...headingVariants}>Gift Card</motion.h2>
      <motion.div {...lineVariants} className="line m-auto"></motion.div>
      <div className="giftcard">
        <motion.div {...imageVariants} className="img">
          <Image src={Gift}></Image>
        </motion.div>
        <div className="texto">
          <motion.h2 {...subheadingVariants}>Regalá una Gift Card</motion.h2>
          <motion.div {...lineVariants} className="line"></motion.div>
          <motion.p {...textVariants}>
            Puedes regalar una Tarjeta de Regalo con un conjunto de opciones
            prediseñadas, seleccionar los servicios que desees incluir o elegir
            entre nuestras Tarjetas de Regalo con saldo disponible, permitiendo
            al destinatario escoger el servicio de su preferencia. No dejes
            pasar la oportunidad de sorprender con un regalo único e
            inolvidable.
          </motion.p>
          <motion.a {...linkVariants} href="#contacto">
            Contacto
          </motion.a>
        </div>
      </div>
    </div>
  );
}

export default Giftcard;
