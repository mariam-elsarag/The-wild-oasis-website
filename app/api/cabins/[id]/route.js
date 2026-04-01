import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const [cabin, bookingDates] = await Promise.all([
      getCabin(id),
      getBookedDatesByCabinId(id),
    ]);
    return Response.json({ cabin, bookingDates });
  } catch (err) {
    return Response.json({ message: "Cabin nout found" });
  }
}
