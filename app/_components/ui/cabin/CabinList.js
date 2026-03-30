import { getCabins } from "@/app/_lib/data-service";
import React from "react";
import CabinCard from "./CabinCard";
import { unstable_noStore as noStore } from "next/cache";

const CabinList = async ({ filter }) => {
  const cabins = await getCabins(filter);
  // if i wanna prevent cash for component and i don't use fetch, will be usefull when PPR
  noStore();
  return (
    <>
      {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {cabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default CabinList;
