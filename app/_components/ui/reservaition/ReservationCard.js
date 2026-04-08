import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (date) => {
  const parsedDate = date instanceof Date ? date : parseISO(date);

  return formatDistance(parsedDate, new Date(), {
    addSuffix: true,
  }).replace("about ", "");
};

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    createdAt,
    cabin: { name, image },
  } = booking;

  return (
    <div className="flex flex-col sm:flex-row border border-primary-800">
      {/* IMAGE */}
      <div className="relative h-40 sm:h-32 sm:aspect-square w-full sm:w-auto">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover sm:border-r border-primary-800"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-grow px-4 sm:px-6 py-3 flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>

          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm w-fit">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm w-fit">
              upcoming
            </span>
          )}
        </div>

        <p className="text-sm sm:text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-auto items-center">
          <p className="text-lg sm:text-xl font-semibold text-accent-400">
            ${totalPrice}
          </p>
          <p className="text-primary-300 hidden sm:block">&bull;</p>
          <p className="text-sm sm:text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="sm:ml-auto text-xs sm:text-sm text-primary-400">
            Booked {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {!isPast(startDate) && (
        <div className=" grid grid-cols-2 sm:flex sm:flex-col border-t sm:border-t-0 sm:border-l border-primary-800 w-full sm:w-[100px]">
          <Link
            href={`/account/reservations/edit/${id}`}
            className="group flex flex-1 items-center justify-center gap-2 border-r  uppercase text-xs font-bold text-primary-300 sm:border-b sm:border-r-0 border-primary-800 px-3 py-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
          >
            <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span>Edit</span>
          </Link>

          <DeleteReservation
            className="justify-center sm:justify-baseline"
            bookingId={id}
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  );
}

export default ReservationCard;
