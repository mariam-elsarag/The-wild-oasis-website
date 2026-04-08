import React from "react";
import SideNavigation from "@/app/_components/ui/SideNavigation";

const AccountLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:grid  md:grid-cols-[16rem_1fr] h-full gap-6 lg:gap-12">
      <SideNavigation />
      <div className="py-1 ">{children}</div>
    </div>
  );
};

export default AccountLayout;
