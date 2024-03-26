"use client";

import React from "react";
import { motion } from "framer-motion";
import "../styles/_homewelcome.scss";
import Typed from "react-typed";
import Image from "next/image";
import Pimp from "../../../Image/pimp-blanco.png";

// Constantes para efectos de Framer Motion
const imageVariants = {
  viewport: { once: true },
  initial: { opacity: 1, scale: 0 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0 },
  },
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

function HomeWelcome() {
  return (
    <div id="inicio" className="HomeWelcome-container">
      <div className="container">
        <motion.div {...imageVariants}>
          <Image src={Pimp}></Image>
        </motion.div>

        <motion.p {...textVariants}>
          Descubre tu belleza <br />
          <Typed
            strings={["Auténtica", "Unica", "Real", "Verdadera"]}
            typeSpeed={60}
            backSpeed={60}
            loop
          />
        </motion.p>
        <br />
        <motion.a {...linkVariants} href="#contacto">
          Contactanos!
        </motion.a>
      </div>
    </div>
  );
}

export default HomeWelcome;
