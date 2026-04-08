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
import { Checkbox } from "@/components/ui/checkbox";
const BookingForm = ({
  onSubmit,
  buttonText,
  control,
  errors,
  isSubmitting,
  maxCapacity,
  disabled,
  descripton,
  isEdit = false,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className=" bg-primary-900 h-full py-6 px-4 md:px-8 xl:px-16 text-lg flex gap-6 flex-col"
    >
      {/* Number of guests */}
      <div className="space-y-2">
        <label className="text-sm md:text-base" htmlFor="numGuests">
          How many guests?
        </label>
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
        <label className="text-sm md:text-base" htmlFor="observations">
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

      <div className="space-y-2">
        <Controller
          name="hasBreakfast"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-3">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="hasBreakfast"
                disabled={isEdit}
              />
              <label
                htmlFor="hasBreakfast"
                className="text-sm md:text-base cursor-pointer"
              >
                Add breakfast to your stay
              </label>
            </div>
          )}
        />
        {errors.hasBreakfast && (
          <p className="text-destructive text-xs">
            {errors.hasBreakfast.message}
          </p>
        )}
      </div>
      <div className="flex justify-end items-center gap-6">
        {descripton && (
          <p className="text-primary-300 text-sm md:text-base">{descripton}</p>
        )}
        <Button type="submit" disabled={isSubmitting || disabled}>
          {isSubmitting && <SpinnerMini />}
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
