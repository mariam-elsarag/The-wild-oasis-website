"use client";
import SpinnerMini from "@/app/_components/feedback/SpinnerMini";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ text, disabled }) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending || disabled}
      className=" cursor-pointer flex items-center gap-1 bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending && (
        <span>
          <SpinnerMini />
        </span>
      )}
      <span>{text}</span>
    </button>
  );
};

export default SubmitButton;
