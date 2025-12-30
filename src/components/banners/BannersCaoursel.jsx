"use client";
import { Carousel } from "@/utils/tailwind/index";
import Image from "next/image";

const images = [
  { fileName: "carusel-image-1.jpg", alt: "Image 1" },
  { fileName: "carusel-image-2.jpg", alt: "Image 2" },
  { fileName: "carusel-image-3.jpg", alt: "Image 3" },
];
const BannersCarousel = () => {
  return (
    <Carousel
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-8 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {images?.map((image, index) => (
        <Image
          key={index}
          src={`/assets/BannersCarousel/${image.fileName}`}
          alt={image.alt}
          width={800}
          height={400}
          className="h-full w-full object-cover"
          priority={index == 0 && true}
        />
      ))}
    </Carousel>
  );
};

export default BannersCarousel;
