"use client";

import React from "react";
import "../styles/Footer.scss";

function Footer() {
  return (
    <div className="detalleFooter">
      <p>
        © 2023,{" "}
        <a
          href="https://genovasite.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Genova
        </a>
        , agencia diseñadora y desarrolladora de software. Todos los derechos
        reservados.
      </p>
    </div>
  );
}

export default Footer;
