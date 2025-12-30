 import Image from "next/image";
import { useState } from "react";

const ImageMagnifier = ({ image }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);

  function handleMouseHover(event) {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();

    const x = ((event.pageX - left) / width) * 100;
    const y = ((event.pageY - top) / height) * 100;
    setPosition({ x, y });
  }

  const glassMagnifier = (
    <div className="absolute pointer-events-none top-0 left-0 w-full h-full">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: `${position.x}% ${position.y}%`,
          backgroundSize: "150%",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );

  const originalImage = (
    <Image
      className="bg-no-repeat w-full h-full"
      src={image}
      alt="Product image"
      width={500} // Establece dimensiones base
      height={500} // Establece dimensiones base
      sizes="100vw"
    />
  );

  return (
    <div
      className="relative overflow-hidden sm:mx-auto w-[350px] h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]"
      onMouseMove={handleMouseHover}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
    >
      {showMagnifier ? glassMagnifier : originalImage}
    </div>
  );
};

export default ImageMagnifier;
