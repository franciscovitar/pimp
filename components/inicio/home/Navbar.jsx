"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "../styles/navBar.scss";
import Logo from "../../../Image/pimp.png";
import LogoBlanco from "../../../Image/pimp-blanco.png";

const NavBar = () => {
  const [clicked, setClicked] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const bgDiv = useRef(null);
  const linksActive = useRef(null);

  const handleClick = () => {
    bgDiv.current.classList.toggle("active");
    linksActive.current.classList.toggle("d-flex");
    setClicked(!clicked);
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const inicioSection = document.getElementById("inicio");
    const nosotrosSection = document.getElementById("nosotros");
    const tratamientosSection = document.getElementById("tratamientos"); // Agrega esta línea

    if (scrollY < nosotrosSection.offsetTop) {
      setActiveSection("inicio");
    } else if (scrollY < tratamientosSection.offsetTop) {
      setActiveSection("nosotros");
    } else {
      setActiveSection("tratamientos"); // Agrega este bloque según tus secciones
    }
    // ... Actualiza según las secciones adicionales
  };

  const changeBg = () => {
    setNavbar(window.scrollY > 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBg);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", changeBg);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="navbar-container">
      <div className={navbar ? "navbar-bg" : "navbar-nobg"}>
        <div className="left">
          <motion.div
            className="logo"
            viewport={{ once: true }}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.5, delay: 0.3 },
            }}
            whileHover={{ scale: 1.1 }}
          >
            <a className="logo">
              <Image
                className="logo"
                src={navbar ? Logo : LogoBlanco}
                alt="Logo"
              />
            </a>
          </motion.div>
        </div>
        <motion.div
          className="centro"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.3 },
          }}
        >
          <div className="links">
            <a
              className={
                navbar
                  ? activeSection === "inicio"
                    ? "underline-black active"
                    : "underline-black"
                  : activeSection === "inicio"
                  ? "underline-white active"
                  : "underline-white"
              }
              href="#inicio"
            >
              Inicio
            </a>
            <a
              className={
                navbar
                  ? activeSection === "inicio"
                    ? "underline-black active"
                    : "underline-black"
                  : activeSection === "inicio"
                  ? "underline-white active"
                  : "underline-white"
              }
              href="#nosotros"
            >
              Nosotros
            </a>
            <a
              className={navbar ? "underline-black" : "underline-white"}
              href="#tratamientos"
            >
              Servicios
            </a>
            <a
              className={navbar ? "underline-black" : "underline-white"}
              href="https://pimp.turnosya.com/landing/"
              target="blank"
            >
              Reserva online
            </a>
            <a
              className={navbar ? "underline-black" : "underline-white"}
              href="#giftcard"
            >
              Gift Card
            </a>

            <a
              className={navbar ? "underline-black" : "underline-white"}
              href="https://wa.me/5491149366466"
              target="blank"
            >
              Franquicias
            </a>
            <a
              className={navbar ? "underline-black" : "underline-white"}
              href="#trabaja"
            >
              Trabaja en Pimp
            </a>
            <a
              className={navbar ? "underline-black" : "underline-white"}
              href="#ubicacion"
            >
              Ubicación
            </a>
            <a
              className={navbar ? "underline-black" : "underline-white"}
              href="#contacto"
            >
              Contacto
            </a>
          </div>
          <i
            type="button"
            onClick={handleClick}
            className={`bi ${navbar ? "text-black" : "text-white"} ${
              clicked ? "bi-x text-white" : "bi-list"
            }`}
          ></i>
        </motion.div>
        <div ref={bgDiv} className="bg-div">
          <div ref={linksActive} className="links-active">
            <a href="#inicio" onClick={handleClick}>
              Inicio
            </a>
            <a href="#nosotros" onClick={handleClick}>
              Nosotros
            </a>
            <a href="#tratamientos" onClick={handleClick}>
              Servicios
            </a>
            <a href="https://pimp.turnosya.com/landing/" onClick={handleClick}>
              Reserva Online
            </a>
            <a href="#giftcard" onClick={handleClick}>
              Gift Card
            </a>
            <a href="https://wa.me/5491149366466" onClick={handleClick}>
              Franquicias
            </a>
            <a href="#trabaja" onClick={handleClick}>
              Trabaja en Pimp
            </a>
            <a href="#ubicacion" onClick={handleClick}>
              Ubicación
            </a>
            <a href="#contacto" onClick={handleClick}>
              Contacto
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
