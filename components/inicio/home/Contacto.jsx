"use client";

import React from "react";
import { motion } from "framer-motion";
import "../styles/_contacto.scss";
import Image from "next/image";
import ubi1 from "../../../Image/ubi1.png";
import ubi2 from "../../../Image/ubi2.png";

// Constantes para efectos de Framer Motion
const headingVariants = {
  viewport: { once: true },
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
};

const lineVariants = {
  viewport: { once: true },
  initial: { width: 0 },
  whileInView: { width: 60, transition: { duration: 0.5 } },
};

const linkVariants = {
  viewport: { once: true },
  initial: { opacity: 0, scale: 0.5 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay: 0.2 },
  },
};

function Contacto() {
  return (
    <div id="ubicacion" className="contacto-container">
      <motion.h2 {...headingVariants}>
        Ubicación:
        <motion.div {...lineVariants} className="line mt-2 m-auto"></motion.div>
      </motion.h2>
      <div className="contactos">
        <div className="contacto">
          <motion.a
            {...linkVariants}
            target="_blank"
            href="https://www.google.com/maps/place/Av.+Regimiento+de+Patricios+435,+C1265ADE+CABA/@-34.6340028,-58.3731286,17z/data=!3m1!4b1!4m6!3m5!1s0x95a334caa0ddd989:0x308b92496a8727fd!8m2!3d-34.6340072!4d-58.3705537!16s%2Fg%2F11cpgbykzh?hl=es-419&entry=ttu"
          >
            <Image src={ubi1}></Image>
          </motion.a>

          <div>
            <motion.h3 {...headingVariants}>Barracas </motion.h3>
            <motion.p {...headingVariants}>
              Av Regimiento Patricios 435
            </motion.p>
          </div>
        </div>
        <div className="contacto">
          <motion.a
            {...linkVariants}
            href="https://www.google.com/maps/place/Av.+Alicia+Moreau+de+Justo+1150,+C1107+CABA/@-34.6175684,-58.3681694,17z/data=!3m1!4b1!4m6!3m5!1s0x95a334d6ac705e09:0x33b113f800385567!8m2!3d-34.6175728!4d-58.3655945!16s%2Fg%2F11l5l476q2?hl=es-419&entry=ttu"
            target="_blank"
          >
            <Image src={ubi2}></Image>
          </motion.a>

          <div>
            <motion.h3 {...headingVariants}>Puerto Madero </motion.h3>
            <motion.p {...headingVariants}>
              Alicia Moreau de Justo 1150
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
