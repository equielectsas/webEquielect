"use client";
import { Carousel } from "@/utils/tailwind/index";
import Image from "next/image";

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
      <Image
        src="/assets/BannersCarousel/image_1.png"
        alt="Image 1"
        width={800}
        height={400}
        className="h-full w-full object-cover"
      />
      <Image
        src="/assets/BannersCarousel/image_2.png"
        alt="Image 2"
        width={800}
        height={400}
        className="h-full w-full object-cover"
      />
      <Image
        src="/assets/BannersCarousel/image_3.png"
        alt="Image 3"
        width={800}
        height={400}
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
};

export default BannersCarousel;
