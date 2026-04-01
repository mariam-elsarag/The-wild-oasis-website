import React from "react";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};
const Account = async () => {
  const session = await auth();

  const firstName = session?.user?.name?.split(" ")?.at(0);
  return (
    <div>
      <h2 className="font-medium truncate text-2xl text-accent-400 mb-7">
        Welcome, {firstName}
      </h2>
    </div>
  );
};

export default Account;
