import { OrderStatus, PaymentStatus } from './order.request.model';
import { Product } from './product.model';
import { User } from './user.model';

export interface Order {
  billingName: string;
  billingPhone: string;
  billingAddress: string;
  deliveredDate: Date;
  orderAmount: number;
  orderId: string;
  orderStatus: OrderStatus;
  orderedDate: Date;
  paymentStatus: PaymentStatus;
  orderItems: OrderItem[];
  user: User;
}

export interface OrderItem {
  orderItemId: number;
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface OrderResponse {
  content: Order[];
  lastPage: boolean;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
