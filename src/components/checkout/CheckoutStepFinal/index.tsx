import CheckoutStepFinalDesktop from "@/components/checkout/CheckoutStepFinal/desktop";
import {ICart} from "@/store/slices/cart.slice";

interface ICheckoutStepFinalProps {
  cartData?: ICart[];
}

export default function CheckoutStepFinal({
  cartData,
}: ICheckoutStepFinalProps) {
  return <CheckoutStepFinalDesktop cartData={cartData} />
}
