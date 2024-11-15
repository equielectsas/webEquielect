import Link from "next/link";

const NavOption = ({ name, url }) => {
  return (
    <li>
      <Link
        href={url}
        className="px-1 block w-full text-center text-white font-medium hover:[text-shadow:_1px_1px_0_rgb(255_255_255_/_40%)]"
      >
        {name}
      </Link>
    </li>
  );
};

export default NavOption;
