"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "@/app/_components/ui/SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathName = usePathname();
  return (
    <nav className=" pb-2 md:pb-0 border-b md:border-r md:border-b-0 border-primary-900">
      <ul className="flex  md:flex-col gap-2 h-full text-sm sm:text-base md:text-lg">
        {navLinks.map((link) => {
          const isActive = link?.href === pathName;
          return (
            <li key={link.name}>
              <Link
                className={` rounded-sm md:rounded-none ${
                  isActive ? "bg-primary-900" : ""
                } py-3 px-2 sm:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors duration-300 ease-in-out  flex items-center gap-4 font-semibold text-primary-200`}
                href={link.href}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SideNavigation;
