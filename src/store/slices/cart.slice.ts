import { create } from "zustand";

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
  setOrderId: (orderId: string) => void;
  listCart: ICart[];
  setCount: (count: number) => void;
  setListCart: (list: ICart[]) => void;
  pushToCart: (product: ICart) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  qrCodeUrl: string;
  setQrCodeUrl: (url: string) => void;
  voucher: string;
  setVoucher: (voucher: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  count: 0,
  listCart: [],
  qrCodeUrl: '',
  orderId: '',
  voucher: '',
  setVoucher: (voucher: string) => {
    return set({ voucher })
  },
  setOrderId: (orderId: string) => {
    console.log("setOrderId---", orderId);
    return set({ orderId })
  },
  setQrCodeUrl: (url: string) => {
    console.log("setQrCodeUrl---", url);
    return set({ qrCodeUrl: url })
  },
  setCount: (count: number) => set({ count }),
  setListCart: (list: ICart[]) => {
    set({ listCart: [...list], count: list?.length})
  },
  pushToCart: (product: ICart) => set((state) => ({
    listCart: [...state.listCart, product],
    count: state.count + 1,
  })),
  removeFromCart: (productId: string) => set((state) => ({
    listCart: state.listCart.filter((item) => item.id !== productId),
    count: state.count - 1,
  })),
  clearCart: () => set({ listCart: [], count: 0} )
}));

