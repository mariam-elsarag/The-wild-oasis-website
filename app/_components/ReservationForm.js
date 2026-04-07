"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useReservation } from "../_context/ReservationContext";
import { createReservation } from "../_lib/actions";
import { bookingSchema } from "../_utils/zodSchemas";
import BookingForm from "./ui/reservaition/BookingForm";

function ReservationForm({ cabin, user }) {
  const router = useRouter();
  const { range, resetRange } = useReservation();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      numGuests: null,
      observations: "",
    },
  });
  const { maxCapacity, price, discount, id } = cabin;
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (price - discount);
  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };
  const onSubmit = async (data) => {
    const result = await createReservation({ ...data, ...bookingData });
    if (result?.status === "error") {
      toast.error(result?.message);
    } else {
      resetRange();
      router.push("/cabins/thank-you");
      toast.success(result?.message);
    }
  };
  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <Image
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            width={32}
            height={32}
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>
      <BookingForm
        onSubmit={handleSubmit(onSubmit)}
        buttonText="Reserve now"
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        maxCapacity={maxCapacity}
        disabled={!(startDate && endDate)}
      />
    </div>
  );
}

export default ReservationForm;
