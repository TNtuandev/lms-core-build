export interface OrderPayment {
  createdAt: string
  updatedAt: string
  deletedAt: any
  id: string
  userId: string
  cartId: string
  totalAmountBefore: number
  totalAmountAfter: number
  totalDiscount: number
  currency: string
  notes: any
  status: string
  items: Item[]
  paymentId: string
  payment: Payment
}

export interface Item {
  createdAt: string
  updatedAt: string
  deletedAt: any
  id: string
  orderId: string
  productId: string
  regularPrice: number
  discountedPrice: number
  discountAmount: number
  quantity: number
  thumbnail: string
  title: string
}

export interface Payment {
  createdAt: string
  updatedAt: string
  deletedAt: any
  id: string
  userId: string
  orderId: string
  amount: number
  currency: string
  method: string
  status: string
  notes: any
  manualPayment: any
  gatewayPayment: GatewayPayment
}

export interface GatewayPayment {
  createdAt: string
  updatedAt: string
  deletedAt: any
  id: string
  paymentId: string
  gateway: string
  providerTransactionId: string
  providerEventId: string
  providerResponse: any
  providerStatus: any
  providerMessage: any
  processedAt: any
  payUrl: string
  qrCodeUrl: string
  deeplink: string
  deeplinkMiniApp: string
}
