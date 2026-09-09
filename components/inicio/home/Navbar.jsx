"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "../styles/navBar.scss";
import Logo from "../../../Image/pimp.png";
import LogoBlanco from "../../../Image/pimp-blanco.png";

// `sectionKey` solo se define en los links cuyo estado activo se resalta
// mientras se hace scroll (ver handleScroll). El resto de las secciones no
// tenía seguimiento de "activo" en el diseño original.
const DESKTOP_LINKS = [
  { href: "#inicio", label: "Inicio", sectionKey: "inicio" },
  { href: "#nosotros", label: "Nosotros", sectionKey: "nosotros" },
  { href: "#tratamientos", label: "Servicios" },
  {
    href: "https://pimp.turnosya.com/landing/",
    label: "Reserva online",
    external: true,
  },
  { href: "#giftcard", label: "Gift Card" },
  {
    href: "https://wa.me/5491149366466",
    label: "Franquicias",
    external: true,
  },
  { href: "#trabaja", label: "Trabaja en Pimp" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
];

// El menú mobile mantiene sus propios textos (p. ej. "Reserva Online" con
// mayúscula) tal como estaban en el diseño original.
const MOBILE_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#tratamientos", label: "Servicios" },
  { href: "https://pimp.turnosya.com/landing/", label: "Reserva Online" },
  { href: "#giftcard", label: "Gift Card" },
  { href: "https://wa.me/5491149366466", label: "Franquicias" },
  { href: "#trabaja", label: "Trabaja en Pimp" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
];

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

  useEffect(() => {
    const inicioSection = document.getElementById("inicio");
    const nosotrosSection = document.getElementById("nosotros");
    const tratamientosSection = document.getElementById("tratamientos");

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < nosotrosSection.offsetTop) {
        setActiveSection("inicio");
      } else if (scrollY < tratamientosSection.offsetTop) {
        setActiveSection("nosotros");
      } else {
        setActiveSection("tratamientos");
      }
    };

    const changeBg = () => setNavbar(window.scrollY > 80);

    window.addEventListener("scroll", changeBg);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", changeBg);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getLinkClassName = ({ sectionKey }) => {
    const base = navbar ? "underline-black" : "underline-white";
    return sectionKey && activeSection === sectionKey ? `${base} active` : base;
  };

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
            {DESKTOP_LINKS.map((link) => (
              <a
                key={link.href}
                className={getLinkClassName(link)}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
          <i
            role="button"
            tabIndex={0}
            aria-label={clicked ? "Cerrar menú" : "Abrir menú"}
            onClick={handleClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleClick();
            }}
            className={`bi ${navbar ? "text-black" : "text-white"} ${
              clicked ? "bi-x text-white" : "bi-list"
            }`}
          ></i>
        </motion.div>
        <div ref={bgDiv} className="bg-div">
          <div ref={linksActive} className="links-active">
            {MOBILE_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={handleClick}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
