import React from "react";
import DateSelector from "../../DateSelector";
import ReservationForm from "../../ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";

const Reservaition = async ({ cabin }) => {
  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabin?.id),
    getSettings(),
  ]);
  return (
    <div className="grid grid-cols-2 border border-primary-800  ">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
};

export default Reservaition;
