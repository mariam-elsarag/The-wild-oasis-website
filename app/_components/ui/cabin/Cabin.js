import React from "react";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import TextExpander from "../TextExpander";

const Cabin = ({ cabin }) => {
  const { name, maxCapacity, price, discount, image, description } = cabin;

  return (
    <div className="grid relative md:grid-cols-[3fr_4fr] gap-6 md:gap-8 lg:gap-20 border border-primary-800 lg:py-3 lg:px-10 mb-24">
      <div className="relative h-[320px]! md:h-['auto']! lg:scale-[1.15] lg:-translate-x-3">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover"
        />
      </div>

      <div className="px-4 lg:px-0">
        <h3 className="absolute top-4 -right-1  md:relative md:top-['auto'] md:right-0 w-fit flex items-center justify-center text-accent-100 font-black text-2xl md:text-3xl  lg:text-6xl mb-5 md:translate-x-[-120px] lg:translate-x-[-254px] bg-primary-950 px-4 py-4 lg:p-6 lg:pb-1 ">
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cabin;
