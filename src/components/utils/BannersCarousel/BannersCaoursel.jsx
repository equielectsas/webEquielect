"use client";
import { Carousel } from "@/utils/tailwind/index";
import Image from "next/image";

const BannersCarousel = () => {
  return (
    <Carousel className="rounded-xl">
      <Image
        src="/assets/BannersCarousel/image_1.png" // Ruta correcta dentro de la carpeta public
        alt="Image 1"
        width={800} // Ajusta el tamaño según sea necesario
        height={400}
        className="h-full w-full object-cover"
      />
      <Image
        src="/assets/BannersCarousel/image_2.png" // Ruta correcta
        alt="Image 2"
        width={800}
        height={400}
        className="h-full w-full object-cover"
      />
      <Image
        src="/assets/BannersCarousel/image_3.png" // Ruta correcta
        alt="Image 3"
        width={800}
        height={400}
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
};

export default BannersCarousel;
