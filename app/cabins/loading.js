import Spinner from "@/starter/components/Spinner";
import React from "react";

const loading = () => {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
};

export default loading;
