"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const titleVariants = {
  viewport: { once: true },
  initial: { opacity: 0, x: -50 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, delay: 0.1 },
  },
};

const paragraphVariants = {
  viewport: { once: true },
  initial: { opacity: 0, y: 50 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.2 },
  },
};

const lineVariants = {
  viewport: { once: true },
  initial: { width: 0 },
  whileInView: { width: 60, transition: { duration: 1 } },
};

const imageContainerVariants = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
};

const imageVariants = {
  initial: { scale: 1.2 },
  whileInView: {
    scale: 1,
    transition: { duration: 3, ease: [1, 1, 1, 1] },
  },
  viewport: { once: true },
};

const listItemVariants = {
  viewport: { once: true },
  initial: { opacity: 0, x: -20 },
};

function ServicioTexto({ title, text, items }) {
  return (
    <div className="texto-blanco">
      <div className="padding">
        <motion.h3 {...titleVariants}>{title}</motion.h3>
        <motion.div {...lineVariants} className="line"></motion.div>
        <div>
          <motion.p {...paragraphVariants}>{text}</motion.p>
          <ul>
            {items.map((item, i) => (
              <motion.li
                key={i}
                {...listItemVariants}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, delay: i * 0.2 },
                }}
              >
                <div className="green-line"></div>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ServicioImagen({ title, image }) {
  return (
    <motion.div {...imageContainerVariants} className="imagen">
      <div className="imagen-zoom">
        <motion.div {...imageVariants}>
          <Image className="img" src={image} loading="lazy" alt={title} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// `layout` controla el orden en escritorio: "text-image" replica
// renderSection() (texto primero) y "image-text" replica renderSection2()
// (imagen primero). Ver components/inicio/home/servicios.data.js.
function ServicioGaleria({ service, galeriaClassName, layout }) {
  const texto = (
    <ServicioTexto
      title={service.title}
      text={service.text}
      items={service.items}
    />
  );
  const imagen = <ServicioImagen title={service.title} image={service.image} />;

  return (
    <div className={galeriaClassName}>
      {layout === "image-text" ? (
        <>
          {imagen}
          {texto}
        </>
      ) : (
        <>
          {texto}
          {imagen}
        </>
      )}
    </div>
  );
}

export default ServicioGaleria;
