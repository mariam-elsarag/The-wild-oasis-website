import { auth } from "@/app/_lib/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navigation = async () => {
  const session = await auth();

  const navList = [
    { id: 1, path: "/", label: "home" },
    { id: 2, path: "/cabins", label: "cabins" },
    { id: 3, path: "/about", label: "about" },
    { id: 4, path: "/account", label: "Guest area", img: session?.user?.image },
  ];
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        {navList?.map((nav) => (
          <li key={nav?.id}>
            <Link
              href={nav?.path}
              className={`hover:text-accent-400 transition-colors capitalize ${
                nav?.img ? "flex items-center gap-4" : ""
              } `}
            >
              {nav?.img && (
                <Image
                  width={32}
                  height={32}
                  alt={session?.user?.name}
                  src={nav?.img}
                  referrerPolicy="no-referrer"
                  className="h-8 rounded-full"
                />
              )}
              {nav?.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
