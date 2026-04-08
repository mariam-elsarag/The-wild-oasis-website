"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import React from "react";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
const navLinks = [
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5! w-5! text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5! w-5! text-primary-600" />,
  },
];
const ProfileDropdown = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <figure className="flex items-center gap-4">
          <Image
            width={32}
            height={32}
            alt={user?.name}
            src={user?.image}
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
          />
          <span className="truncate">{user?.name}</span>
        </figure>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px]!">
        <DropdownMenuGroup>
          {navLinks?.map((item) => (
            <DropdownMenuItem key={item?.href}>
              <Link href={item?.href} className="flex items-center gap-2 ">
                {item?.icon}
                <span>{item?.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuGroup className="border-t border-primary-800/60">
          <DropdownMenuItem>
            <SignOutButton className="py-0! hover:bg-transparent! transition-none!" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
