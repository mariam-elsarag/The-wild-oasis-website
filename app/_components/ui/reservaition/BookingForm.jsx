"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import SpinnerMini from "@/app/_components/feedback/SpinnerMini";
import { Button } from "@/components/ui/button";
const BookingForm = ({
  onSubmit,
  buttonText,
  control,
  errors,
  isSubmitting,
  maxCapacity,
  disabled,
}) => {
  console.log(errors, "er");
  return (
    <form
      onSubmit={onSubmit}
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
          render={({ field }) => (
            <Textarea
              placeholder="Any pets, allergies, special requirements, etc.?"
              {...field}
            />
          )}
        />
        {errors.observations && (
          <p className="text-destructive text-xs">
            {errors.observations.message}
          </p>
        )}
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button type="submit" disabled={isSubmitting || disabled}>
          {isSubmitting && <SpinnerMini />}
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
