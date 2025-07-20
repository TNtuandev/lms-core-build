import { create } from "zustand";
import {CourseDetail} from "@/api/types/course.type";
import {persist} from "zustand/middleware";

export interface ICart {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  salesPrice?: number;
  imageUrl: string;
  description?: string;
}

interface CartState {
  count: number;
  orderId: string;
  cartId: string;
  setOrderId: (orderId: string) => void;
  listCart: CourseDetail[];
  setCount: (count: number) => void;
  setCartId: (idCart: string) => void;
  setListCart: (list: CourseDetail[]) => void;
  pushToCart: (product: CourseDetail) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  qrCodeUrl: string;
  setQrCodeUrl: (url: string) => void;
  voucher: string;
  setVoucher: (voucher: string) => void;
  isItemAdded: (productId: string) =>  boolean;
}
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      count: 0,
      listCart: [],
      qrCodeUrl: '',
      orderId: '',
      voucher: '',
      cartId: '',

      setVoucher: (voucher: string) => set({ voucher }),
      setCartId: (cartId: string) => {
        console.log("setCartId---", cartId);
        return set({ cartId });
      },
      setOrderId: (orderId: string) => {
        console.log("setOrderId---", orderId);
        return set({ orderId });
      },
      setQrCodeUrl: (url: string) => set({ qrCodeUrl: url }),
      setCount: (count: number) => set({ count }),
      setListCart: (list: CourseDetail[]) => {
        set({ listCart: [...list], count: list?.length });
      },
      pushToCart: (product: CourseDetail) =>
        set((state) => ({
          listCart: [...state.listCart, product],
          count: state.count + 1,
        })),
      removeFromCart: (productId: string) =>
        set((state) => ({
          listCart: state.listCart.filter((item) => item.id !== productId),
          count: state.count - 1,
        })),
      clearCart: () => set({ listCart: [], count: 0 }),
      isItemAdded: (productId: string) => {
        return get().listCart.some((item: CourseDetail) => item.id === productId);
      },
    }),
    {
      name: 'cart-storage', // key trong localStorage
      partialize: (state) => ({
        listCart: state.listCart,
        count: state.count,
        cartId: state.cartId,
        orderId: state.orderId,
        voucher: state.voucher,
        qrCodeUrl: state.qrCodeUrl,
      }),
    }
  )
);