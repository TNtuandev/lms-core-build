import React, { Dispatch, SetStateAction } from 'react';
import {ICart} from "@/store/slices/cart.slice";
import CheckoutStepOneDesktop from "./desktop";

interface ICheckoutStepOneProps {
  setStep: Dispatch<SetStateAction<number>>;
  cartData?: ICart[];
}

export default function CheckoutStepOne({setStep, cartData}: ICheckoutStepOneProps) {
  return (
    <div className="w-full">
      <div>
          <CheckoutStepOneDesktop setStep={setStep} cartData={cartData} />
      </div>
    </div>
  );
}
