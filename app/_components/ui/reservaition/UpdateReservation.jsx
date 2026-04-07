"use client";
import { bookingSchema } from "@/app/_utils/zodSchemas";

import { updateReservation } from "@/app/_lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import BookingForm from "./BookingForm";

const UpdateReservation = ({ maxCapacity, booking }) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: booking,
  });
  const onSubmit = async (value) => {
    const result = await updateReservation({ ...value, bookingId: booking.id });
    if (result.status === "error") {
      toast.error(result?.message);
    } else {
      router.push("/account/reservations");
      toast.success(result?.message);
    }
  };
  return (
    <>
      <BookingForm
        onSubmit={handleSubmit(onSubmit)}
        buttonText="Update reservation"
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        maxCapacity={maxCapacity}
      />
    </>
  );
};

export default UpdateReservation;
