import { Product } from './product.model';
import { User } from './user.model';

export interface Cart {
  cartId: string;
  createdAt: Date;
  items: CartItem[];
  user: User;
}

export interface CartItem {
  cartItemId: number;
  product: Product;
  quantity: number;
  totalPrice: number;
}
