import CabinList from "../_components/ui/cabin/CabinList";
import { Suspense } from "react";
import Spinner from "@/app/_components/feedback/Spinner";
import Filter from "../_components/ui/Filter";
import ReservationReminder from "../_components/ui/reservaition/ReservationReminder";

// this for revalidate to stop cashing (need to be value not calc one and with seconds) zero for no cash and if we set time that meen ISR
// export const revalidate = 0;
// export const revalidate = 3600;
// export const revalidate = 15;

export const metadata = {
  title: "Cabins",
};
export default async function Cabins({ searchParams }) {
  const { capacity } = await searchParams;
  const filter = capacity ?? "all";
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense key={filter} fallback={<Spinner />}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
