import React from "react";
import Logo from "../ui/Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SignInButton from "../ui/SignInButton";
import SignOutButton from "../ui/SignOutButton";
import { Button } from "@/components/ui/button";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";

const MobileNavigation = ({ isOpen, onClose, list, session }) => {
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useOutsideClick(onClose);
  return (
    <div
      className={`fixed bg-foreground/40 backdrop-blur-sm inset-0 p-4 ${
        isOpen ? "z-20 opacity-100 visited:" : "z-[-1] opacity-0 invisible"
      }`}
    >
      <aside
        ref={navRef}
        className={` transition-all ease-in-out duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } h-dvh py-10 px-6 flex flex-col gap-8 justify-between bg-primary-900 w-[300px] rounded-lg`}
      >
        <button onClick={onClose}>
          <Logo size="md" />
        </button>
        <nav className="flex-1 flex flex-col gap-4">
          {list?.map((item) => {
            const isActive = item?.path === pathname;
            return (
              <Link
                key={item?.id}
                href={item?.path}
                onClick={onClose}
                className={` text-base capitalize ${
                  isActive
                    ? "text-accent-500"
                    : "text-primary-200 hover:text-accent-500!"
                }`}
              >
                {item?.label}
              </Link>
            );
          })}
        </nav>
        <footer className="flex flex-col gap-4">
          {session?.user ? (
            <>
              <Link
                href={`/account/profile`}
                className="flex items-center gap-4"
                onClick={onClose}
              >
                <Image
                  width={32}
                  height={32}
                  alt={session?.user?.name}
                  src={session?.user?.image}
                  referrerPolicy="no-referrer"
                  className="h-8 rounded-full"
                />
                <span className="truncate">{session?.user?.name}</span>
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                className="flex items-center gap-2 text-start "
                onClick={() => {
                  router.push("/login");
                  onClose();
                }}
              >
                <ArrowLeftEndOnRectangleIcon className="h-5! w-5! text-secondary-foreground" />
                <span>Sign in</span>
              </Button>
            </>
          )}
        </footer>
      </aside>
    </div>
  );
};

export default MobileNavigation;
