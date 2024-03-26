import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { nombre, correo, edad, consulta } = req.body;

  contentHTML = `<div style="background-color: #000; color: #fff; border-radius: 10px;">
  <h1
    style="
            background-color:rgb(62, 125, 128);
            text-align: center;
            font-size: 1.5rem;
            padding: 15px 5px;
            border-radius: 10px 10px 0px 0px;
            "
  >
    Trabaja en Pimp
  </h1>

  <div style="padding: 10px 15px 30px 15px">
    <b>
      <label style="font-size: 1.1rem;">Datos del contacto:</label>
    </b>
    <ul>
      <li>Nombre: ${nombre}</li>
      <li>Correo: ${correo}</li>
      <li>Edad: ${edad}</li>
    </ul>

    <br />
    <hr />
    <br />
    <br />

    <b>
      <label style="font-size: 1.1rem;">Mensaje:</label>
    </b>
    <p>${consulta}</p>
  </div>
</div>`;

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: '"Pimp" <contactotuweb@pimpestetica.com>',
    to: "franvitar15@gmail.com",
    subject: `Formulario de contacto sitio web ${nombre}`,
    html: contentHTML,
  });

  return NextResponse.json({ status: 200 }, info);
}
