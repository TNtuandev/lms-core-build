import React, { Dispatch, SetStateAction } from "react";
import CheckoutStepTwoDesktop from "@/components/checkout/CheckoutStepTwo/desktop";
import { CourseDetail } from "@/api/types/course.type";

interface ICheckoutStepTwoProps {
  setStep: Dispatch<SetStateAction<number>>;
  cartData?: CourseDetail[];
}

export default function CheckoutStepTwo({
  setStep,
  cartData,
}: ICheckoutStepTwoProps) {
  return <CheckoutStepTwoDesktop setStep={setStep} cartData={cartData} />;
}
