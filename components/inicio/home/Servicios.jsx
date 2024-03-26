"use client";

import React from "react";
import { motion } from "framer-motion";
import "../styles/_servicios.scss";
import Unas from "../../../Image/Unas.jpg";
import TratCorporal from "../../../Image/faciales.jpg";
import Corporal from "../../../Image/corporales.jpg";
import Masajista from "../../../Image/masajes.jpg";
import Pestanas from "../../../Image/pestanas.jpg";
import Medicos from "../../../Image/tratmedicos.jpg";
import Image from "next/image";
import Depilacion from "../../../Image/depilacion.jpg";

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

function Tratamientos() {
  const renderListItems = (items) => {
    return items.map((item, i) => (
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
    ));
  };

  const renderSection = (title, text, imageSrc, items) => (
    <div className="galeria normal">
      <div className="texto-blanco">
        <div className="padding">
          <motion.h3 {...titleVariants}>{title}</motion.h3>
          <motion.div {...lineVariants} className="line"></motion.div>
          <div>
            <motion.p {...paragraphVariants}>{text}</motion.p>
            <ul>{renderListItems(items)}</ul>
          </div>
        </div>
      </div>
      <motion.div {...imageContainerVariants} className="imagen">
        <div className="imagen-zoom">
          <motion.div {...imageVariants}>
            <Image className="img" src={imageSrc} loading="lazy" alt={title} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

  const renderSection2 = (title, text, imageSrc, items) => (
    <div className="galeria normal">
      <motion.div {...imageContainerVariants} className="imagen">
        <div className="imagen-zoom">
          <motion.div {...imageVariants}>
            <Image className="img" src={imageSrc} loading="lazy" alt={title} />
          </motion.div>
        </div>
      </motion.div>
      <div className="texto-blanco">
        <div className="padding">
          <motion.h3 {...titleVariants}>{title}</motion.h3>
          <motion.div {...lineVariants} className="line"></motion.div>
          <div>
            <motion.p {...paragraphVariants}>{text}</motion.p>
            <ul>{renderListItems(items)}</ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionInvert = (title, text, imageSrc, items) => (
    <div className="galeria invert">
      <div className="texto-blanco">
        <div className="padding">
          <motion.h3 {...titleVariants}>{title}</motion.h3>
          <motion.div {...lineVariants} className="line"></motion.div>
          <div>
            <motion.p {...paragraphVariants}>{text}</motion.p>
            <ul>{renderListItems(items)}</ul>
          </div>
        </div>
      </div>
      <motion.div {...imageContainerVariants} className="imagen">
        <div className="imagen-zoom">
          <motion.div {...imageVariants}>
            <Image className="img" src={imageSrc} loading="lazy" alt={title} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="nos-diag-com-container" id="tratamientos">
      <div className="titulo">
        <motion.h2 {...titleVariants}>Servicios</motion.h2>
        <motion.div {...lineVariants} className="line"></motion.div>
      </div>

      <div className="fila">
        {renderSection(
          "Tratamientos Faciales",
          "Experimenta el lujo del cuidado facial personalizado con sesiones revitalizantes de mesoterapia y tecnologías avanzadas como microneedling y peeling. Confía en nosotros para lograr una piel luminosa y radiante.",
          TratCorporal,
          [
            "Limpieza Facial Profunda",
            "Radiofrecuencia",
            "Punta de Diamante",
            "Espátula Ultrasónica",
            "Máscara Regeneradora",
            "Electroporación",
            "Peeling",
            "HIFU",
          ]
        )}

        {renderSection2(
          "Tratamientos Corporales",
          "Tenemos todos los tratamientos para vos. Sumérgete en el bienestar total con nuestros tratamientos corporales especializados, desde HIFU y criolipólisis para esculpir tu figura hasta la relajación de la presoterapia! Descubre una experiencia única que combina tecnología avanzada con un cuidado integral para mejorar tu bienestar. Tenemos citas personalizadas con nuestro equipo, para orientar tus necesidades y adaptarnos a tu presupuesto.",
          Corporal,
          [
            "Control celulitis",
            "HIFU",
            "Electrodos / Ondas Rusas",
            "Body Up / Mio Up",
            "Electroporador ",
            "Vela slim ",
            "Vela korper",
            "Ultracavitador ",
            "Radiofrecuencia ",
          ]
        )}

        {renderSection(
          "Depilación Definitiva",
          "Bienvenido a nuestra sección de depilación definitiva con la avanzada tecnología Soprano Ice. Con irresistibles promociones y resultados visibles desde la primera sesión, nos despedimos del vello no deseado sin complicaciones. Personalizamos tu experiencia con promociones flexibles. ¡Chau vello, hola a una piel suave y sin preocupaciones! Descubre la nueva era de la depilación definitiva con nosotros. ¡Te esperamos para transformar tu rutina de belleza!",
          Depilacion,
          []
        )}

        {renderSection2(
          "Masajes",
          "Revitaliza cuerpo y mente con nuestros masajes terapéuticos. Desde descontracturantes hasta piedras calientes, experimenta el máximo bienestar en nuestra sección de Masajes.",
          Masajista,
          [
            "Descontracturantes",
            "Piedras calientes",
            "Full reductor",
            "Full CELU",
            "Drenaje linfático",
            "Maderoterapia",
            "Reflexología",
            "Osteopatía (enfocado en artritis, hernias, escoliosis)",
          ]
        )}

        {renderSection(
          "Tratamientos Médicos",
          "Descubre nuestra sección de Tratamientos Médicos, donde fusionamos belleza e innovación. Desde botox hasta correcciones precisas, ofrecemos soluciones avanzadas para realzar tu belleza natural. Nuestro equipo cuenta con una doctora cirujana, especializada en estética. Tenemos turnos para poder asesorarte y escucharte.",
          Medicos,
          [
            "Mesoterapia corporal y capilar",
            "Plasma rico en plaquetas corporal",
            "Toxina botulínica",
            "Escleroterapia corporal",
            "Ácido Hialurónico",
            "Mesoterapia facial",
            "Plasma rico en plaquetas",
            "Toxina botulínica",
            "Escleroterapia",
            "Corrección cicatriz queloide",
            "Resección de quistes-lunares",
          ]
        )}

        {renderSection2(
          "Pestañas y Cejas",
          "Tu mirada, tu presentación. Bienvenida a tu cambio, donde la expresividad en tus ojos y la elegancia se fusionan. Descubre la belleza de extensiones de Pestañas, logrando una mirada cautivadora y única. Tenemos la variedad que buscas para lograr lo que deseas. Vos elegis y nosotras hacemos! Que largo, volumen, y estilo buscas?",
          Pestanas,
          [
            "Full Set - Service Pelo x Pelo",
            "Extensiones y service 3D, 5D, 7D",
            "Mega Volumen Ligero y Mega Volumen",
            "Perfilado de Cejas ",
            "Laminado de Cejas",
            "Lifting, Permanente, Botox, Tintura ",
            "Retiro de Extensiones de Pestañas",
          ]
        )}

        {renderSection(
          "Uñas",
          "Bienvenido a nuestro espacio exclusivo de Uñas, donde la elegancia se encuentra en cada detalle. Desde las últimas tendencias hasta el mantenimiento impecable, descubre el arte de resaltar tu estilo único con nosotros. Tenemos más de 9 años de experiencia, y contamos con todas las técnicas del mercado para lograr lo que deseas.",
          Unas,
          [
            "Esculpidas Full Set y Service",
            "Full y Service Baby Boomer ",
            "Esmaltado semipermanente en Manos y Pies",
            "Capping",
            "Decoración, Nail Art.",
            "Pedicuría, Uñas Encarnadas, Reconstrucción",
          ]
        )}
        {renderSectionInvert(
          "Tratamientos Faciales",
          "Experimenta el lujo del cuidado facial personalizado con sesiones revitalizantes de mesoterapia y tecnologías avanzadas como microneedling y peeling. Confía en nosotros para lograr una piel luminosa y radiante.",
          TratCorporal,
          [
            "Limpieza Facial Profunda",
            "Radiofrecuencia",
            "Punta de Diamante",
            "Espátula Ultrasónica",
            "Máscara Regeneradora",
            "Electroporación",
            "Peeling",
            "HIFU",
          ]
        )}

        {renderSectionInvert(
          "Tratamientos Corporales",
          "Tenemos todos los tratamientos para vos. Sumérgete en el bienestar total con nuestros tratamientos corporales especializados, desde HIFU y criolipólisis para esculpir tu figura hasta la relajación de la presoterapia! Descubre una experiencia única que combina tecnología avanzada con un cuidado integral para mejorar tu bienestar. Tenemos citas personalizadas con nuestro equipo, para orientar tus necesidades y adaptarnos a tu presupuesto.",
          Corporal,
          [
            "Control celulitis",
            "HIFU",
            "Electrodos / Ondas Rusas",
            "Body Up / Mio Up",
            "Electroporador ",
            "Vela slim ",
            "Vela korper",
            "Ultracavitador ",
            "Radiofrecuencia ",
          ]
        )}

        {renderSectionInvert(
          "Depilación Definitiva",
          "Bienvenido a nuestra sección de depilación definitiva con la avanzada tecnología Soprano Ice. Con irresistibles promociones y resultados visibles desde la primera sesión, nos despedimos del vello no deseado sin complicaciones. Personalizamos tu experiencia con promociones flexibles. ¡Chau vello, hola a una piel suave y sin preocupaciones! Descubre la nueva era de la depilación definitiva con nosotros. ¡Te esperamos para transformar tu rutina de belleza!",
          Depilacion,
          []
        )}

        {renderSectionInvert(
          "Masajes",
          "Revitaliza cuerpo y mente con nuestros masajes terapéuticos. Desde descontracturantes hasta piedras calientes, experimenta el máximo bienestar en nuestra sección de Masajes.",
          Masajista,
          [
            "Descontracturantes",
            "Piedras calientes",
            "Full reductor",
            "Full CELU",
            "Drenaje linfático",
            "Maderoterapia",
            "Reflexología",
            "Osteopatía (enfocado en artritis, hernias, escoliosis)",
          ]
        )}

        {renderSectionInvert(
          "Tratamientos Médicos",
          "Descubre nuestra sección de Tratamientos Médicos, donde fusionamos belleza e innovación. Desde botox hasta correcciones precisas, ofrecemos soluciones avanzadas para realzar tu belleza natural. Nuestro equipo cuenta con una doctora cirujana, especializada en estética. Tenemos turnos para poder asesorarte y escucharte.",
          Medicos,
          [
            "Mesoterapia corporal y capilar",
            "Plasma rico en plaquetas corporal",
            "Toxina botulínica",
            "Escleroterapia corporal",
            "Ácido Hialurónico",
            "Mesoterapia facial",
            "Plasma rico en plaquetas",
            "Toxina botulínica",
            "Escleroterapia",
            "Corrección cicatriz queloide",
            "Resección de quistes-lunares",
          ]
        )}

        {renderSectionInvert(
          "Pestañas y Cejas",
          "Tu mirada, tu presentación. Bienvenida a tu cambio, donde la expresividad en tus ojos y la elegancia se fusionan. Descubre la belleza de extensiones de Pestañas, logrando una mirada cautivadora y única. Tenemos la variedad que buscas para lograr lo que deseas. Vos elegis y nosotras hacemos! Que largo, volumen, y estilo buscas?",
          Pestanas,
          [
            "Full Set - Service Pelo x Pelo",
            "Extensiones y service 3D, 5D, 7D",
            "Mega Volumen Ligero y Mega Volumen",
            "Perfilado de Cejas ",
            "Laminado de Cejas",
            "Lifting, Permanente, Botox, Tintura ",
            "Retiro de Extensiones de Pestañas",
          ]
        )}

        {renderSectionInvert(
          "Uñas",
          "Bienvenido a nuestro espacio exclusivo de Uñas, donde la elegancia se encuentra en cada detalle. Desde las últimas tendencias hasta el mantenimiento impecable, descubre el arte de resaltar tu estilo único con nosotros. Tenemos más de 9 años de experiencia, y contamos con todas las técnicas del mercado para lograr lo que deseas.",
          Unas,
          [
            "Esculpidas Full Set y Service",
            "Full y Service Baby Boomer ",
            "Esmaltado semipermanente en Manos y Pies",
            "Capping",
            "Decoración, Nail Art.",
            "Pedicuría, Uñas Encarnadas, Reconstrucción",
          ]
        )}
      </div>
    </div>
  );
}

export default Tratamientos;
