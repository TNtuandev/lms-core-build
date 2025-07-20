import CheckoutStepFinalDesktop from "@/components/checkout/CheckoutStepFinal/desktop";
import { CourseDetail } from "@/api/types/course.type";

interface ICheckoutStepFinalProps {
  cartData?: CourseDetail[];
}

export default function CheckoutStepFinal({
  cartData,
}: ICheckoutStepFinalProps) {
  return <CheckoutStepFinalDesktop cartData={cartData} />;
}
