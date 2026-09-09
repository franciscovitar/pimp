import Unas from "../../../Image/Unas.jpg";
import TratCorporal from "../../../Image/faciales.jpg";
import Corporal from "../../../Image/corporales.jpg";
import Masajista from "../../../Image/masajes.jpg";
import Pestanas from "../../../Image/pestanas.jpg";
import Medicos from "../../../Image/tratmedicos.jpg";
import Depilacion from "../../../Image/depilacion.jpg";

// En escritorio (".galeria.normal") cada servicio alterna el lado de la
// imagen: "text-image" replica el layout original de renderSection()
// (texto a la izquierda) y "image-text" el de renderSection2() (imagen a
// la izquierda). En mobile (".galeria.invert", ver _servicios.scss) todos
// los servicios usan siempre el orden texto-imagen, por eso solo afecta al
// layout de escritorio.
export const services = [
  {
    id: "faciales",
    title: "Tratamientos Faciales",
    text: "Experimenta el lujo del cuidado facial personalizado con sesiones revitalizantes de mesoterapia y tecnologías avanzadas como microneedling y peeling. Confía en nosotros para lograr una piel luminosa y radiante.",
    image: TratCorporal,
    desktopLayout: "text-image",
    items: [
      "Limpieza Facial Profunda",
      "Radiofrecuencia",
      "Punta de Diamante",
      "Espátula Ultrasónica",
      "Máscara Regeneradora",
      "Electroporación",
      "Peeling",
      "HIFU",
    ],
  },
  {
    id: "corporales",
    title: "Tratamientos Corporales",
    text: "Tenemos todos los tratamientos para vos. Sumérgete en el bienestar total con nuestros tratamientos corporales especializados, desde HIFU y criolipólisis para esculpir tu figura hasta la relajación de la presoterapia! Descubre una experiencia única que combina tecnología avanzada con un cuidado integral para mejorar tu bienestar. Tenemos citas personalizadas con nuestro equipo, para orientar tus necesidades y adaptarnos a tu presupuesto.",
    image: Corporal,
    desktopLayout: "image-text",
    items: [
      "Control celulitis",
      "HIFU",
      "Electrodos / Ondas Rusas",
      "Body Up / Mio Up",
      "Electroporador ",
      "Vela slim ",
      "Vela korper",
      "Ultracavitador ",
      "Radiofrecuencia ",
    ],
  },
  {
    id: "depilacion",
    title: "Depilación Definitiva",
    text: "Bienvenido a nuestra sección de depilación definitiva con la avanzada tecnología Soprano Ice. Con irresistibles promociones y resultados visibles desde la primera sesión, nos despedimos del vello no deseado sin complicaciones. Personalizamos tu experiencia con promociones flexibles. ¡Chau vello, hola a una piel suave y sin preocupaciones! Descubre la nueva era de la depilación definitiva con nosotros. ¡Te esperamos para transformar tu rutina de belleza!",
    image: Depilacion,
    desktopLayout: "text-image",
    items: [],
  },
  {
    id: "masajes",
    title: "Masajes",
    text: "Revitaliza cuerpo y mente con nuestros masajes terapéuticos. Desde descontracturantes hasta piedras calientes, experimenta el máximo bienestar en nuestra sección de Masajes.",
    image: Masajista,
    desktopLayout: "image-text",
    items: [
      "Descontracturantes",
      "Piedras calientes",
      "Full reductor",
      "Full CELU",
      "Drenaje linfático",
      "Maderoterapia",
      "Reflexología",
      "Osteopatía (enfocado en artritis, hernias, escoliosis)",
    ],
  },
  {
    id: "medicos",
    title: "Tratamientos Médicos",
    text: "Descubre nuestra sección de Tratamientos Médicos, donde fusionamos belleza e innovación. Desde botox hasta correcciones precisas, ofrecemos soluciones avanzadas para realzar tu belleza natural. Nuestro equipo cuenta con una doctora cirujana, especializada en estética. Tenemos turnos para poder asesorarte y escucharte.",
    image: Medicos,
    desktopLayout: "text-image",
    items: [
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
    ],
  },
  {
    id: "pestanas",
    title: "Pestañas y Cejas",
    text: "Tu mirada, tu presentación. Bienvenida a tu cambio, donde la expresividad en tus ojos y la elegancia se fusionan. Descubre la belleza de extensiones de Pestañas, logrando una mirada cautivadora y única. Tenemos la variedad que buscas para lograr lo que deseas. Vos elegis y nosotras hacemos! Que largo, volumen, y estilo buscas?",
    image: Pestanas,
    desktopLayout: "image-text",
    items: [
      "Full Set - Service Pelo x Pelo",
      "Extensiones y service 3D, 5D, 7D",
      "Mega Volumen Ligero y Mega Volumen",
      "Perfilado de Cejas ",
      "Laminado de Cejas",
      "Lifting, Permanente, Botox, Tintura ",
      "Retiro de Extensiones de Pestañas",
    ],
  },
  {
    id: "unas",
    title: "Uñas",
    text: "Bienvenido a nuestro espacio exclusivo de Uñas, donde la elegancia se encuentra en cada detalle. Desde las últimas tendencias hasta el mantenimiento impecable, descubre el arte de resaltar tu estilo único con nosotros. Tenemos más de 9 años de experiencia, y contamos con todas las técnicas del mercado para lograr lo que deseas.",
    image: Unas,
    desktopLayout: "text-image",
    items: [
      "Esculpidas Full Set y Service",
      "Full y Service Baby Boomer ",
      "Esmaltado semipermanente en Manos y Pies",
      "Capping",
      "Decoración, Nail Art.",
      "Pedicuría, Uñas Encarnadas, Reconstrucción",
    ],
  },
];
