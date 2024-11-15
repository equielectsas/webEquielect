import Link from "next/link";
import { Typography } from "@/utils/tailwind/index";

const NavOption = ({ name, url }) => {
  return (
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal "
    >
      <Link href={url} className="block w-full text-center">
        {name}
      </Link>
    </Typography>
  );
};

export default NavOption;
