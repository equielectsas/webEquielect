"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
  const pathname = usePathname();

  if (pathname === "/" || pathname.includes("/productos/")) return;

  const pathNameArray = pathname.split("/");
  pathNameArray[0] = "Inicio";

  let hrefArray = "";
  const pahtNameArrayCapital = pathNameArray.map((name, index) => {
    hrefArray = index == 0 ? hrefArray + "/" : hrefArray + name + "/";

    return {
      name: `${name[0].toUpperCase() + name.substring(1)}`.split("-").join(" "),
      href: hrefArray,
    };
  });

  return (
    <div className="breadcrumb ml-4 my-4">
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
