import React from "react";
import { ReservationProvider } from "./ReservationContext";

const Providers = ({ children }) => {
  return <ReservationProvider>{children}</ReservationProvider>;
};

export default Providers;
