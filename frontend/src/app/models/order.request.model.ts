export interface OrderRequest {
  billingName?: string;
  billingPhone: string;
  billingAddress: string;
  cartId: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  userId: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  DISPATCHED = 'DISPATCHED',
  DELIVERED = 'DELIVERED',
}

export enum PaymentStatus {
  NOTPAID = 'NOTPAID',
  PAID = 'PAID',
}

// --------------------
