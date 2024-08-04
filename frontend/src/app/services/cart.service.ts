import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  // get user cart
  getCartOfUser(userId: string) {
    return this.httpClient.get<Cart>(`${environment.apiUrl}/carts/${userId}`);
  }

  // add  item to  cart
  addItemToCart(userId: string, data: { productId: string; quantity: number }) {
    return this.httpClient.post<Cart>(
      `${environment.apiUrl}/carts/${userId}`,
      data
    );
  }

  // clear  cart
  clearCart(userId: string) {
    return this.httpClient.delete(`${environment.apiUrl}/carts/${userId}`);
  }

  // remove item from cart

  removeItemFromCart(userId: string, itemId: number) {
    return this.httpClient.delete(
      `${environment.apiUrl}/carts/${userId}/items/${itemId}`
    );
  }

  getTotalPriceOfCart(items: CartItem[]) {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.totalPrice;
    });

    return totalPrice;
  }
}
