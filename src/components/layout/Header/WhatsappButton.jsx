//Components
import ButtonRounded from "@/components/ui/ButtonRounded";
import Link from "next/link";

//Bootstrap
import { BsWhatsapp } from "react-icons/bs";

const WhatsappButton = () => {
  return (
    <Link href={"link-whatsapp"}>
      <ButtonRounded className="z-[2] fixed transition scale duration-500 bg-green-400 shadow-md bottom-8 left-8 cursor-pointer w-11 h-11 flex items-center justify-center md:bottom-14 md:left-14 md:w-14 md:h-14">
        <BsWhatsapp className="text-white text-2xl hover:scale-105 duration-200 md:text-3xl" />
      </ButtonRounded>
    </Link>
  );
};

export default WhatsappButton;
