import React from "react";
import DateSelector from "../../DateSelector";
import ReservationForm from "../../ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";
import LoginMessage from "../LoginMessage";

const Reservaition = async ({ cabin }) => {
  const session = await auth();

  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabin?.id),
    getSettings(),
  ]);
  return (
    <div className="grid md:grid-cols-2 border border-primary-800 overflow-hidden ">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session?.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservaition;
