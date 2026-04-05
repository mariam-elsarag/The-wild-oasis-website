import Spinner from "@/app/_components/feedback/Spinner";
import Cabin from "@/app/_components/ui/cabin/Cabin";
import Reservaition from "@/app/_components/ui/cabin/Reservaition";
import { getCabin } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { name } = await getCabin(id);
  return { title: `Cabin ${name}` };
}

const CabinDetails = async ({ params }) => {
  const { id } = await params;
  const cabin = await getCabin(id);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-400 mb-10">
          Reserve {cabin?.na} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservaition cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
};

export default CabinDetails;
