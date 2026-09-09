"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import "../styles/_trabaja.scss";
import emailjs from "@emailjs/browser";

// IDs públicos de EmailJS: por diseño del SDK viajan en el bundle del
// cliente, no son un secreto equivalente a una contraseña o API key privada.
const EMAILJS_SERVICE_ID = "service_635uy0r";
const EMAILJS_TEMPLATE_ID = "template_elw9q1j";
const EMAILJS_PUBLIC_KEY = "oLZ3JPZNchn1ZIslH";

const INITIAL_FORM_STATE = {
  nombre: "",
  edad: "",
  correo: "",
  telefono: "",
  consulta: "",
};

// EmailJS cobra por adjuntos, así que el CV no viaja por el formulario: se
// ofrece mandarlo por WhatsApp al número general de Pimp en dos momentos
// distintos, cada uno con su propio mensaje precargado.
const CV_WHATSAPP_NUMBER = "5491126834248";

const CV_DIRECT_WHATSAPP_URL = `https://wa.me/${CV_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, me quiero postular para formar parte del Staff de Pimp. Te envío mi CV."
)}`;

const CV_SUCCESS_WHATSAPP_URL = `https://wa.me/${CV_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, recién envié mi postulación desde la web de Pimp. Te envío mi CV."
)}`;

function Trabaja() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCvWhatsapp, setShowCvWhatsapp] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isFormValid = () =>
    Object.values(formData).every((value) => value.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!isFormValid()) {
      toast.error("Por favor completa todos los campos requeridos.");
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      toast.success("Formulario enviado con exito");
      setFormData(INITIAL_FORM_STATE);
      setShowCvWhatsapp(true);
    } catch (error) {
      console.error("Error al enviar el formulario de Trabaja en Pimp:", error);
      toast.error("No se pudo enviar el formulario. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
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

        <form ref={formRef} className="formulario" onSubmit={handleSubmit}>
          <input
            onChange={handleChange("nombre")}
            name="nombre"
            type="text"
            value={formData.nombre}
            placeholder="Nombre y apellido"
            aria-label="Nombre y apellido"
          />

          <input
            onChange={handleChange("edad")}
            name="edad"
            type="text"
            inputMode="numeric"
            value={formData.edad}
            placeholder="Edad"
            aria-label="Edad"
          />

          <input
            onChange={handleChange("correo")}
            name="correo"
            type="email"
            value={formData.correo}
            placeholder="Email"
            aria-label="Email"
          />

          <input
            onChange={handleChange("telefono")}
            name="telefono"
            type="tel"
            value={formData.telefono}
            placeholder="Celular / WhatsApp"
            aria-label="Celular / WhatsApp"
          />

          <textarea
            onChange={handleChange("consulta")}
            name="consulta"
            rows={1}
            value={formData.consulta}
            placeholder="Mensaje"
            aria-label="Mensaje"
            // El SCSS define ".formulario textarea { height: 200px }" para un
            // futuro cuadro de mensaje más alto. Se mantiene el tamaño actual
            // (una línea, igual que el resto de los campos) a pedido
            // explícito: cambiar la altura visible requiere aprobación.
            style={{ height: "auto" }}
          />

          <div className="acciones-formulario">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.07 }}
            >
              {isSubmitting ? "Enviando..." : "Consultar"}
            </motion.button>

            <motion.a
              href={CV_DIRECT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-whatsapp-link"
              whileHover={{ scale: 1.07 }}
            >
              <i className="bi bi-whatsapp"></i>
              <span>Enviar CV por WhatsApp</span>
            </motion.a>
          </div>
        </form>

        {showCvWhatsapp && (
          <div className="post-envio">
            <p className="post-envio-titulo">
              ¡Postulación enviada correctamente!
            </p>
            <p className="post-envio-texto">
              Si tenés CV, podés enviarlo ahora por WhatsApp.
            </p>
            <a
              href={CV_SUCCESS_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="post-envio-cta"
            >
              <i className="bi bi-whatsapp"></i>
              <span>Enviar mi CV por WhatsApp</span>
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Trabaja;
