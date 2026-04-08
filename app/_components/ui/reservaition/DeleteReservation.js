// "use client";
// import SpinnerMini from "@/app/_components/feedback/SpinnerMini";
// import { TrashIcon } from "@heroicons/react/24/solid";
// import { useTransition } from "react";
// function DeleteReservation({ bookingId, onDelete }) {
//   const [isPending, starTransition] = useTransition();

//   const handleDelete = () => {
//     if (confirm("Are you sure you want to delete this reservation?"))
//       starTransition(() => onDelete(bookingId));
//   };
//   return (
//     <button
//       onClick={handleDelete}
//       className=" cursor-pointer group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
//       disabled={isPending}
//     >
//       {!isPending ? (
//         <>
//           {" "}
//           <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
//           <span className="mt-1">Delete</span>
//         </>
//       ) : (
//         <span className="mx-auto">
//           <SpinnerMini />
//         </span>
//       )}
//     </button>
//   );
// }

// export default DeleteReservation;

"use client";

import SpinnerMini from "@/app/_components/feedback/SpinnerMini";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function DeleteReservation({ bookingId, onDelete, className }) {
  const [isPending, startTransition] = useTransition();

  const handleConfirmDelete = () => {
    startTransition(() => onDelete(bookingId));
  };

  return (
    <Dialog>
      <DialogTrigger
        className={`cursor-pointer group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900  ${
          className ?? ""
        }`}
        asChild
      >
        <button
          disabled={isPending}
          className="cursor-pointer flex items-center juc gap-2"
        >
          {!isPending ? (
            <>
              <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Delete</span>
            </>
          ) : (
            <SpinnerMini />
          )}
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete reservation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this reservation? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={isPending}
          >
            {isPending ? <SpinnerMini /> : "Confirm Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteReservation;
