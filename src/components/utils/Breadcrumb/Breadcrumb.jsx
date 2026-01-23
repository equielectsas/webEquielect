"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
  const pathname = usePathname();

  // ✅ Ocultar en home, productos y páginas de marca (para que no quede encima del banner)
  if (
    pathname === "/" ||
    pathname.includes("/productos/") ||
    pathname.startsWith("/marca/")
  )
    return null;

  const pathNameArray = pathname.split("/");
  pathNameArray[0] = "Inicio";

  let hrefArray = "";
  const pahtNameArrayCapital = pathNameArray.map((name, index) => {
    hrefArray = index === 0 ? hrefArray + "/" : hrefArray + name + "/";

    return {
      name: `${name[0].toUpperCase() + name.substring(1)}`
        .split("-")
        .join(" "),
      href: hrefArray,
    };
  });

  return (
    <div className="breadcrumb ml-3 my-2">
      {pahtNameArrayCapital.map((item, index) => {
        if (index === pahtNameArrayCapital.length - 1) {
          return (
            <Link key={index} href={`${item.href}`}>
              <p className="inline-block border-transparent border-b hover:border-black">
                {item.name}
              </p>
            </Link>
          );
        }

        return (
          <Link key={index} href={`${item.href}`}>
            <p className="inline-block border-transparent border-b hover:border-black">
              {item.name}
            </p>{" "}
            &gt;{" "}
          </Link>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
