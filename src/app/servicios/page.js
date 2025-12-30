import Link from "next/link";
import {
  BsFillLightningChargeFill,
  BsFillLightbulbFill,
  BsWrench,
  BsUsbPlugFill,
} from "react-icons/bs";

const ServicesPage = () => {
  const iconsInfo = [
    {
      icon: BsFillLightningChargeFill,
      message: "Dispositivos electrónicos",
    },
    { icon: BsUsbPlugFill, message: "Cableado estructurado" },
    { icon: BsFillLightbulbFill, message: "Luminaría y soluciones LED" },
    { icon: BsWrench, message: "Herramientas especializadas" },
  ];

  return (
    <section className="max-w-sm px-4 mx-auto text-[#343434] md:max-w-xl lg:max-w-4xl">
      <h1 className="text-lg mb-10 font-semibold">
        Proveemos soluciones de alta calidad para los sectores industrial,
        comercial y de construcción.
      </h1>

      <section>
        <h2 className="text-lg mb-2 font-medium">
          Venta y Distribución de Productos
        </h2>
        <p className="mb-8">
          Somos{" "}
          <Link
            href={"/aliados"}
            className="text-[#FFCD00] font-semibold underline"
          >
            aliados
          </Link>{" "}
          y distribuidores oficiales de las mejores marcas en el mercado.
          Ofrecemos una amplia gama de productos en categorías como:
        </p>
        <ul className="flex flex-wrap text-md mb-10">
          {iconsInfo.map((iconInfo, index) => {
            return (
              <li
                key={index}
                className="flex flex-col justify-center items-center w-1/2 p-4 text-center border-[1px] border-[#FFCD00] lg:w-1/4"
              >
                <iconInfo.icon className="text-[#FFCD00] text-4xl my-5" />
                <p>{iconInfo.message}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="lg:flex lg:items-center gap-3">
        <div className="mb-8 lg:w-1/2">
          <h2 className="text-lg mb-2 font-medium">Soporte técnico</h2>
          <p className="mb-4">
            Ayudamos a nuestros clientes a seleccionar los productos adecuados
            para sus proyectos y ofrecemos asistencia técnica en el proceso de
            instalación y puesta en marcha.
          </p>
          <p>
            Nos aseguramos de que cada cliente obtenga las soluciones más
            adecuadas a sus necesidades específicas.
          </p>
        </div>
        <img
          src="/assets/servicios/Soporte-tecnico.png"
          alt="Soporte técnico"
          className="mb-10 lg:w-1/2"
        />
      </section>

      <section className="lg:flex lg:items-center flex-row-reverse gap-3">
        <div className="mb-8 lg:w-1/2">
          <h2 className="text-lg mb-2 font-medium">Garantía de calidad</h2>
          <p>
            Todos nuestros productos cuentan con certificaciones que cumplen con
            los más altos estándares internacionales, garantizando seguridad,
            durabilidad y eficiencia.
          </p>
        </div>
        <img
          src="/assets/servicios/garantia-calidad.jpg"
          alt="Garantía de calidad"
          className="mb-10 lg:w-1/2"
        />
      </section>

      <div className="mb-12">
        <h2 className="text-lg mb-2 font-medium">
          ¿Deseas conocer nuestros productos?
        </h2>
        <p className="mb-10">
          Tenemos un grupo de productos que pueden satisfacer tus necesidades y
          ayudarte a alcanzar tus metas.
        </p>
        <Link href="/productos" className="bg-[#FFCD00] px-5 py-3">
          <button>Ver Catálogo</button>
        </Link>
      </div>
    </section>
  );
};

export default ServicesPage;
