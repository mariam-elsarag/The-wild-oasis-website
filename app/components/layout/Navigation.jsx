import Link from "next/link";
import React from "react";

const navList = [
  { id: 1, path: "/", label: "home" },
  { id: 2, path: "/cabins", label: "cabins" },
  { id: 3, path: "/about", label: "about" },
  { id: 4, path: "/account", label: "Your account" },
];
const Navigation = () => {
  return (
    <ul>
      {navList?.map((nav) => (
        <Link className="capitalize" href={nav?.path} key={nav?.id}>
          {nav?.label}
        </Link>
      ))}
    </ul>
  );
};

export default Navigation;
