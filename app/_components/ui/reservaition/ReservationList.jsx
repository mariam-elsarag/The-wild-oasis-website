"use client";
import React, { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "@/app/_lib/actions";
import { toast } from "sonner";

const ReservationList = ({ bookings }) => {
  const [optimisticBooking, optimisticDelete] = useOptimistic(
    bookings,
    (currentBooking, bookingId) => {
      return currentBooking?.filter((booking) => booking?.id !== bookingId);
    }
  );
  const handleDelte = async (bookingId) => {
    optimisticDelete(bookingId);
    const result = await deleteReservation(bookingId);
    if (result?.status === "error") {
      toast.error(result?.message);
    } else {
      toast.success(result?.message);
    }
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
