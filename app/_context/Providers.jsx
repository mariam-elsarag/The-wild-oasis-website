import React from "react";
import { ReservationProvider } from "./ReservationContext";
import { Toaster } from "@/components/ui/sonner";

const Providers = ({ children }) => {
  return (
    <ReservationProvider>
      {children}
      <Toaster position="top-right" theme="light" closeButton richColors />
    </ReservationProvider>
  );
};

export default Providers;
