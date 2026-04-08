"use client";
import { useReservation } from "@/app/_context/ReservationContext";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

function ReservationReminder() {
  const { range, resetRange } = useReservation();
  console.log(range, "ran");
  if (!range.from || !range.to) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 py-3 sm:py-4 px-4 sm:px-7 text-sm sm:text-base w-full max-w-[95%] sm:w-fit rounded-full bg-accent-500 text-primary-800 text  font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center">
      <p className="flex-1 text-nowrap ">
        <span>👋</span> Don&apos;t forget to reserve your dates <br /> from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        onClick={resetRange}
        className=" cursor-pointer rounded-full p-1 hover:bg-accent-600 transition-all"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;
