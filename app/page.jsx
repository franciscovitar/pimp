import NavBar from "@/components/inicio/home/Navbar";
import Footer from "@/components/inicio/home/Footer";
import HomeWelcome from "@/components/inicio/home/HomeWelcome";
import Nosotros from "@/components/inicio/home/Nosotros";
import Servicios from "@/components/inicio/home/Servicios";
import Contacto from "@/components/inicio/home/Contacto";
import Giftcard from "@/components/inicio/home/Giftcard";
import Trabaja from "@/components/inicio/home/Trabaja";
import Imagen1 from "@/components/inicio/home/Imagen1";
import Imagen2 from "@/components/inicio/home/Imagen2";
import BotonFlotante from "@/components/inicio/home/BotonFlotante";
import Contactar from "../components/inicio/home/Contactar";

export default function Home() {
  return (
    <main className="main">
      <NavBar></NavBar>
      <HomeWelcome></HomeWelcome>
      <Nosotros></Nosotros>
      <Imagen1></Imagen1>
      <Servicios></Servicios>
      <Imagen2></Imagen2>
      <Giftcard></Giftcard>
      <Trabaja></Trabaja>
      <Contacto></Contacto>
      <Contactar></Contactar>
      <Footer></Footer>
      <BotonFlotante></BotonFlotante>
    </main>
  );
}
