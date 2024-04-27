"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import "../styles/_trabaja.scss";
import emailjs from "@emailjs/browser";

function Trabaja() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [edad, setEdad] = useState("");
  const [consulta, setConsulta] = useState("");

  const sendEmail = () => {
    // Crear un formulario temporal en el DOM

    const form = document.createElement("form");

    // Agregar campos al formulario
    form.innerHTML = `
      <input type="hidden" name="nombre" value="${nombre}">
      <input type="hidden" name="telefono" value="${correo}">
      <input type="hidden" name="mail" value="${edad}">
      <input type="hidden" name="consulta" value="${consulta}">
    `;

    document.body.appendChild(form);

    emailjs
      .sendForm(
        "service_635uy0r",
        "template_elw9q1j",
        form,
        "oLZ3JPZNchn1ZIslH"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );

    document.body.removeChild(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consulta || !edad || !correo || !nombre) {
      toast.error("Por favor completa todos los campos requeridos.");
      return;
    }

    sendEmail();
    toast.success("Formulario enviado con exito");
    setNombre("");
    setCorreo("");
    setEdad("");
    setConsulta("");
  };

  return (
    <div id="trabaja" className="trabaja-container ">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5 },
        }}
        viewport={{ once: true }}
        className="container"
      >
        <div className="titulos">
          <h2>Forma parte del Staff</h2>
          <div className="line"></div>
        </div>

        <form className="formulario">
          <input
            onChange={(e) => setNombre(e.target.value)}
            name="nombre"
            type="text"
            value={nombre}
            placeholder="Nombre y apellido"
          ></input>

          <input
            onChange={(e) => setEdad(e.target.value)}
            name="edad"
            type="text"
            value={edad}
            placeholder="Edad"
          ></input>

          <input
            onChange={(e) => setCorreo(e.target.value)}
            name="email"
            type="text"
            value={correo}
            placeholder="Email"
          ></input>

          <input
            onChange={(e) => setConsulta(e.target.value)}
            as="textarea"
            name="textarea"
            type="text"
            value={consulta}
            placeholder="Mensaje"
          ></input>

          <motion.button onClick={handleSubmit} whileHover={{ scale: 1.07 }}>
            Consultar
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Trabaja;
