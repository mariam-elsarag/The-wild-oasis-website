"use client";
import React, { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "@/app/_lib/actions";

const ReservationList = ({ bookings }) => {
  const [optimisticBooking, optimisticDelete] = useOptimistic(
    bookings,
    (currentBooking, bookingId) => {
      return currentBooking?.filter((booking) => booking?.id !== bookingId);
    }
  );
  const handleDelte = async (bookingId) => {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  };
  return (
    <ul className="space-y-6">
      {optimisticBooking.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelte}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
