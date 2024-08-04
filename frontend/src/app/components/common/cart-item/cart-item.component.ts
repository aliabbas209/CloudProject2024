import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() cartItem?: CartItem;

  @Output() itemIncreaseQuantityEvent = new EventEmitter<CartItem>();

  @Output() itemDecreaseQuantityEvent = new EventEmitter<CartItem>();

  @Output() itemDeleteEvent = new EventEmitter<CartItem>();

  constructor(public _product: ProductService) {}

  increaseQantity(cartItem: CartItem) {
    this.itemIncreaseQuantityEvent.next(cartItem);
  }

  decreaseQuantity(cartItem: CartItem) {
    this.itemDecreaseQuantityEvent.next(cartItem);
  }

  deleteItem(cartItem: CartItem) {
    this.itemDeleteEvent.next(cartItem);
  }
}
