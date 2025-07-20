import React, { Dispatch, SetStateAction } from "react";
import CheckoutStepOneDesktop from "./desktop";
import { CourseDetail } from "@/api/types/course.type";

interface ICheckoutStepOneProps {
  setStep: Dispatch<SetStateAction<number>>;
  cartData?: CourseDetail[];
}

export default function CheckoutStepOne({
  setStep,
  cartData,
}: ICheckoutStepOneProps) {
  return (
    <div className="w-full">
      <div>
        <CheckoutStepOneDesktop setStep={setStep} cartData={cartData} />
      </div>
    </div>
  );
}
