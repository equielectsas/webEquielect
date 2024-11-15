"use client";
import {
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from "@/utils/tailwind/index";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import logo from "@/assets/Logo-equielect.png";

const navbarOptions = [
  { name: "Pages", url: "#" },
  { name: "Account", url: "#" },
  { name: "Blocs", url: "#" },
  { name: "Docs", url: "#" },
];

const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navbarOptions.map((navbarOption, index) => {
        return (
          <Typography
            key={index}
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link href={navbarOption.url} className="flex items-center">
              {navbarOption.name}
            </Link>
          </Typography>
        );
      })}
    </ul>
  );

  return (
    <header className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-hidden">
      <Navbar className="bg-yellow-600 sticky top-0 z-10 h-max max-w-full rounded-none pt-10">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link href={"/"}>
            <Image
              src={logo}
              width={200}
              height="auto"
              alt="Logo Equielect"
              priority
            />
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>{navList}</Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
