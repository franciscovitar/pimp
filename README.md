# Pimp — sitio web

Landing page de una sola página (Next.js 14 / App Router) para el centro de
estética Pimp (Barracas y Puerto Madero, CABA). Presenta servicios, gift
card, ubicación, contacto y un formulario para postularse a trabajar en el
staff.

## Requisitos

- Node.js 18.18 o superior (recomendado usar la misma versión que corre en
  producción).

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

| Script          | Qué hace                                      |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Servidor de desarrollo con hot reload           |
| `npm run build` | Build de producción                             |
| `npm run start` | Sirve el build de producción                    |
| `npm run lint`  | ESLint (`eslint-config-next`)                   |
| `npm test`      | Corre la suite de tests (Vitest)                |

## Variables de entorno

El sitio **no requiere ninguna variable de entorno obligatoria** hoy. Ver
[`.env.example`](./.env.example) para más contexto (por qué, y qué agregar
si en el futuro se suma un envío de mail server-side).

El formulario "Forma parte del Staff" envía los mails desde el navegador
usando [EmailJS](https://www.emailjs.com/) (`@emailjs/browser`). El "public
key" de EmailJS no es un secreto — está pensado para viajar en el bundle del
cliente — por eso vive como constante en
[`components/inicio/home/Trabaja.jsx`](./components/inicio/home/Trabaja.jsx)
en lugar de una variable de entorno.

## Arquitectura

```
app/
  layout.jsx        # <html>, fuentes, metadata/SEO, Google Tag Manager
  page.jsx           # arma la home ensamblando las secciones
  robots.js           # /robots.txt
  sitemap.js           # /sitemap.xml
components/inicio/
  home/                # un componente por sección de la home
  styles/                # un .scss por componente, importado localmente
provider/
  toast-provider.jsx    # <Toaster /> de react-hot-toast
Image/                    # assets estáticos usados vía import o url() en SCSS
```

- Cada sección de la home (`Navbar`, `HomeWelcome`, `Nosotros`, `Servicios`,
  `Giftcard`, `Trabaja`, `Contacto`, `Contactar`, `Footer`,
  `BotonFlotante`, etc.) es un componente independiente en
  `components/inicio/home`, con su propio archivo `.scss` en
  `components/inicio/styles`.
- **Servicios** está armado a partir de datos: los 7 servicios (Faciales,
  Corporales, Depilación, Masajes, Médicos, Pestañas, Uñas) viven como datos
  planos en `servicios.data.js` y se renderizan con el componente
  reutilizable `ServicioGaleria`. La sección se renderiza dos veces — una
  vez con layout alternado para escritorio (clase `.normal`) y otra con
  layout fijo para mobile (clase `.invert`) — porque el CSS
  (`_servicios.scss`) muestra un set y oculta el otro según el ancho de
  pantalla, en vez de reordenar con JS.
- Animaciones con [Framer Motion](https://www.framer.com/motion/) (fade/slide
  al entrar en viewport). Estilos con Sass + utilidades puntuales de
  Bootstrap (`bootstrap` para clases como `d-flex`/`container-fluid`,
  `bootstrap-icons` para los íconos `bi-*`).

## Formulario "Forma parte del Staff"

`components/inicio/home/Trabaja.jsx` es un formulario controlado (nombre,
edad, correo, consulta) que envía los datos con `emailjs.sendForm()` contra
un `<form>` real (sin manipulación manual del DOM). Tiene:

- Validación de campos requeridos antes de enviar.
- Estado de envío (`isSubmitting`): el botón se deshabilita y cambia a
  "Enviando..." mientras la petición está en curso.
- El mensaje de éxito solo se muestra si `emailjs.sendForm()` resuelve
  correctamente; un error de red o de EmailJS muestra un toast de error en
  vez de una falsa confirmación.

## Testing

`npm test` corre Vitest + Testing Library sobre los puntos de mayor riesgo:
la lógica de validación/envío del formulario de Staff, la integridad de los
datos de Servicios, y el comportamiento observable del Navbar (links,
`target=_blank` en enlaces externos, apertura del menú mobile).

## Deploy

Pensado para desplegarse en [Vercel](https://vercel.com/) (o cualquier
hosting compatible con Next.js 14 App Router). No hay variables de entorno
que configurar en el hosting por el momento — ver la sección de arriba.
