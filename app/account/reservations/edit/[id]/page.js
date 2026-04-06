import UpdateReservation from "@/app/_components/ui/reservaition/UpdateReservation";
import SubmitButton from "@/app/_components/ui/SubmitButton";
import { updateReservation } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getBooking } from "@/app/_lib/data-service";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default async function Page({ params }) {
  const session = await auth();
  const { id } = await params;

  const booking = await getBooking(+id, session.user.userId);

  const reservationId = id;
  const maxCapacity = booking?.cabin?.maxCapacity;
  const updateBooking = updateReservation.bind(null, id);
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <UpdateReservation maxCapacity={maxCapacity} booking={booking} />
    </div>
  );
}
