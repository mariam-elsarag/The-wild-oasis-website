import { z } from "zod";

export const bookingSchema = z.object({
  numGuests: z.coerce.number().int().min(1, "At least 1 guest is required"),

  observations: z
    .string()
    .max(500, "observations must be at most 500 characters")
    .optional(),
});
