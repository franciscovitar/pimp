"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import "../styles/_trabaja.scss";

function Trabaja() {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);

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
        <Formik
          initialValues={{
            nombre: "",
            edad: "",
            email: "",
            textarea: "",
          }}
          validate={(valores) => {
            let errores = {};

            // Validacion nombre
            if (!valores.nombre) {
              errores.nombre = "Por favor ingresa un nombre";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,20}$/.test(valores.nombre)) {
              errores.nombre =
                "El nombre solo puede contener letras y espacios, no debe tener más de 20 caracteres.";
            }
            // Validacion edad
            if (!valores.edad) {
              errores.edad = "Por favor ingresa un valor correcto";
            } else if (/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.edad)) {
              errores.edad = "La edad no es válida";
            }
            // Validacion correo
            if (!valores.email) {
              errores.email = "Por favor ingresa un correo electrónico.";
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                valores.email
              )
            ) {
              errores.email = "El correo es inválido.";
            }
            //Validacion textarea
            if (!valores.textarea) {
              errores.textarea = "Por favor ingresa tu consulta";
            }

            return errores;
          }}
          onSubmit={async (valores, { resetForm }) => {
            const url = "/api/trabajapimp";
            const data = {
              nombre: valores.nombre,
              edad: valores.edad,
              correo: valores.email,
              consulta: valores.textarea,
            };

            await axios
              .post(url, data)
              .then(function (response) {
                console.log("success");
              })
              .catch(function (error) {
                console.log(error);
              });
            resetForm();
            cambiarFormularioEnviado(true);
            setTimeout(() => cambiarFormularioEnviado(false), 5000);
          }}
        >
          {({ errors }) => (
            <Form className="formulario">
              <Field
                name="nombre"
                type="text"
                placeholder="Nombre y apellido"
              ></Field>
              <ErrorMessage
                name="nombre"
                component={() => <div className="error">{errors.nombre}</div>}
              />
              <Field name="edad" type="text" placeholder="Edad"></Field>
              <ErrorMessage
                name="edad"
                component={() => <div className="error">{errors.edad}</div>}
              />
              <Field name="email" type="text" placeholder="Email"></Field>
              <ErrorMessage
                name="email"
                component={() => <div className="error">{errors.email}</div>}
              />
              <Field
                as="textarea"
                name="textarea"
                type="text"
                placeholder="Mensaje"
              ></Field>
              <ErrorMessage
                name="textarea"
                component={() => <div className="error">{errors.textarea}</div>}
              />
              <motion.button type="submit" whileHover={{ scale: 1.07 }}>
                Consultar
              </motion.button>
              {formularioEnviado && <p className="exito">Enviado con éxito!</p>}
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
}

export default Trabaja;
