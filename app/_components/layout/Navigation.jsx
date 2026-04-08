"use client";
import Image from "next/image";
import Link from "next/link";
import MobileNavigation from "./MobileNavigation";
import ProfileDropdown from "../ui/ProfileDropdown";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Navigation = ({ session }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navList = [
    { id: 1, path: "/", label: "home" },
    { id: 2, path: "/cabins", label: "cabins" },
    { id: 3, path: "/about", label: "about" },
    // {
    //   id: 4,
    //   path: "/account/reservations",
    //   label: "Guest area",
    //   img: session?.user?.image,
    // },
  ];
  return (
    <>
      <ul className="hidden md:flex  gap-16 items-center text-xl z-10">
        {navList?.map((nav) => {
          const isActive = pathName === nav?.path;
          return (
            <li key={nav?.id}>
              <Link
                href={nav?.path}
                className={`${
                  isActive ? "text-accent-400" : ""
                } hover:text-accent-400 transition-colors capitalize ${
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
          );
        })}
      </ul>
      <div className="z-10 flex items-center gap-2">
        <div className="hidden md:flex">
          {session?.user ? (
            <ProfileDropdown user={session?.user} />
          ) : (
            <Button onClick={() => router.push("/login")} size="lg">
              Sign In
            </Button>
          )}
        </div>
        <button
          onClick={() => setIsOpen((pre) => !pre)}
          className="w-10 h-10 cursor-pointer   flex md:hidden items-center justify-center"
        >
          <Bars3Icon className="text-white w-7 h-7" />
        </button>
      </div>

      <MobileNavigation
        list={navList}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        session={session}
      />
    </>
  );
};

export default Navigation;
