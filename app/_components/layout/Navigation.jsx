import Link from "next/link";
import React from "react";

const navList = [
  { id: 1, path: "/", label: "home" },
  { id: 2, path: "/cabins", label: "cabins" },
  { id: 3, path: "/about", label: "about" },
  { id: 4, path: "/account", label: "Guest area" },
];
const Navigation = () => {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        {navList?.map((nav) => (
          <li key={nav?.id}>
            <Link
              href={nav?.path}
              className="hover:text-accent-400 transition-colors capitalize"
            >
              {nav?.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
