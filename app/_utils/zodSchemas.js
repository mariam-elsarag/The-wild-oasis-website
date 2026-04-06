import z from "zod";

export const updateBookingSchema = z.object({
  numGuests: z.number({
    required_error: "Number of guests is required",
    invalid_type_error: "Number of guests must be a number",
  }),
  observations: z
    .string()
    .max(500, "observations must be at most 500 characters"),
});
