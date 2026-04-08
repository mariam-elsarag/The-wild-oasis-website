import { z } from "zod";

export const bookingSchema = z.object({
  numGuests: z.coerce.number().int().min(1, "At least 1 guest is required"),
  hasBreakfast: z.boolean(),
  observations: z
    .string()
    .max(500, "observations must be at most 500 characters")
    .optional(),
});

export const profileSchema = z.object({
  nationality: z.string().min(1, "Please select a country"),
  nationalId: z
    .string()
    .regex(
      /^[a-zA-Z0-9]{6,12}$/,
      "National ID must be 6–12 characters and contain only letters and numbers"
    ),
});
