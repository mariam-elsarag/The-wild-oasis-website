"use client";
import { updateBookingSchema } from "@/app/_utils/zodSchemas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { updateReservation } from "@/app/_lib/actions";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import SpinnerMini from "../../feedback/SpinnerMini";

const UpdateReservation = ({ maxCapacity, booking }) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateBookingSchema),
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      {/* Number of guests */}
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <Controller
          name="numGuests"
          control={control}
          render={({ field }) => (
            <Select defaultValue={field?.value} onValueChange={field?.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select number of guests..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(
                    (x) => (
                      <SelectItem key={x} value={x}>
                        {x} {x === 1 ? "guest" : "guests"}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.numGuests && (
          <p className="text-destructive text-xs">{errors.numGuests.message}</p>
        )}
      </div>

      {/* Observations */}
      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <Controller
          name="observations"
          control={control}
          render={({ field }) => <Textarea {...field} />}
        />
        {errors.observations && (
          <p className="text-destructive text-xs">
            {errors.observations.message}
          </p>
        )}
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <SpinnerMini />}
          Update reservation
        </Button>
      </div>
    </form>
  );
};

export default UpdateReservation;
