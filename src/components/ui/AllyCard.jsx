import Image from "next/image";
import Link from "next/link";

const AllyCard = ({ imageSrc, description, link, buttonLink }) => {
  return (
    <div className="flex flex-col p-[20px] m-[8px] max-w-[260px] text-center justify-between items-center bg-white border-solid border-[#98989A] border-[1px]">
      <Image
        src={imageSrc}
        alt={description}
        width={200}
        height={200}
        className="object-contain w-full h-[120px] text-[rgba(248, 248, 248, 0.5)]"
      />

      <p className="leading-5 mb-[12px] text-sm font-normal text-center my-1">
        {description}
      </p>
      <div className="flex gap-[10px]">
        <Link href={buttonLink} passHref legacyBehavior>
          <a>
            <button className="bg-transparent border-[1px] border-[#343434] text-[#343434] px-[10px] py-[12px] text-sm font-normal cursor-pointer transition-all duration-200 hover:bg-[#FFCD00] hover:text-white hover:border-transparent">
              Productos
            </button>
          </a>
        </Link>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <button className="bg-transparent border-[1px] border-[#343434] text-[#343434] px-[10px] py-[12px] text-sm font-normal cursor-pointer transition-all duration-200 hover:bg-[#FFCD00] hover:text-white hover:border-transparent">
            Sitio Web
          </button>
        </a>
      </div>
    </div>
  );
};

export default AllyCard;