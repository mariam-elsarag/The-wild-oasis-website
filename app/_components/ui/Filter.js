"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const filterList = [
  {
    id: 1,
    label: "All cabins",
    value: "all",
  },
  { id: 2, label: `1-3 guests`, value: "small" },
  { id: 3, label: `4-7 guests`, value: "medium" },
  { id: 4, label: `8-12 guests`, value: "large" },
];
const Filter = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const activeFilter = searchParam?.get("capacity") ?? "all";
  const handleFilter = (value) => {
    const params = new URLSearchParams(searchParam);
    params.set("capacity", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="border border-primary-800 flex">
      {filterList?.map((filterItem) => (
        <button
          className={` ${
            activeFilter === filterItem?.value
              ? "bg-primary-700 text-primary-50"
              : ""
          } cursor-pointer text-sm sm:text-base px-1.5 sm:px-5 py-2 hover:bg-primary-700 transition-all ease-in-out duration-300`}
          key={filterItem?.id}
          onClick={() => {
            handleFilter(filterItem?.value);
          }}
        >
          {filterItem?.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
