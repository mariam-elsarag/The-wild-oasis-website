import React from "react";
import Logo from "../ui/Logo";
import Navigation from "./Navigation";
import { auth } from "@/app/_lib/auth";

const Header = async () => {
  const session = await auth();

  return (
    <header className=" border-b border-primary-900 px-4 md:px-8 py-5">
      <div className="flex! z-10 justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation session={session} />
      </div>
    </header>
  );
};

export default Header;
