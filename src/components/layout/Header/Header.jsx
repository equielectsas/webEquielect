"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconButton } from "@/utils/tailwind/index";
import logo from "@/../public/assets/Logo-equielect.png";
import NavList from "./NavList";

const navBarOptions = [
  { name: "Quiénes somos", url: "/quienesSomos" },
  { name: "Servicios", url: "/servicios" },
  { name: "Productos", url: "/productos" },
  { name: "Aliados", url: "/aliados" },
  { name: "Contáctanos", url: "/contactanos" },
];

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const [navBar, setNavBar] = useState({ isGone: false, isFixed: false });
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const handleScroll = (event) => {
      var timer;
      setPosition((prev) => window.scrollY);

      if (window.scrollY > 0) {
        if (position > 0) return;

        clearTimeout(timer);
        setNavBar({ isGone: true, isFixed: false });

        timer = setTimeout(() => {
          setNavBar({ isGone: false, isFixed: true });
        }, 300);

        return;
      }

      setNavBar({ isGone: false, isFixed: false });
    };

    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [position]);

  const fixedClass = navBar.isFixed
    ? "fixed top-0 left-0 right-0 z-10 transition-transform transform translate-y-0"
    : "";

  const isGoneClass = navBar.isGone
    ? "absolute top-[-100px] left-0 right-0 z-10 transition-transform transform translate-y-[-100%]"
    : "";

  return (
    <>
      <header
        className={`${isGoneClass} ${fixedClass} flex w-full max-h-[768px] overflow-hidden`}
      >
        <nav
          className={`bg-yellow-600 sticky top-0 z-10 max-w-full w-full h-full rounded-none py-5 px-5`}
        >
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
      </header>
      <div
        className={`${
          !openNav ? "right-[-100%]" : "flex"
        } transition-all duration-500 flex-col fixed right-0 z-[9] bg-yellow-600 h-full w-[300px] lg:hidden`}
      >
        <NavList navBarOptions={navBarOptions} isDesktop={false} />
      </div>
    </>
  );
};

export default Header;
