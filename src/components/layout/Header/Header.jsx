"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconButton } from "@/utils/tailwind/index";
import logo from "@/assets/Logo-equielect.png";
import NavList from "./NavList";

const navBarOptions = [
  { name: "Pages", url: "/prueba" },
  { name: "Account", url: "/prueba" },
  { name: "Blocs", url: "/prueba" },
  { name: "Docs", url: "/prueba" },
];

const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <header className="flex w-full max-h-[768px] overflow-hidden">
      <nav className="bg-yellow-600 sticky top-0 z-10 max-w-full w-full h-full rounded-none py-5 px-5">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link href={"/"}>
            <Image
              src={logo}
              width={150}
              height="auto"
              alt="Logo Equielect"
              priority
            />
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">
              <NavList navBarOptions={navBarOptions} isDesktop={true} />
            </div>
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
      </nav>
      <div
        className={`${
          !openNav ? "right-[-100%]" : "flex"
        } transition-property: right duration-500 flex-col fixed right-0 bg-yellow-600 h-full w-[300px] lg:hidden`}
      >
        <NavList navBarOptions={navBarOptions} isDesktop={false} />
      </div>
    </header>
  );
};

export default Header;
