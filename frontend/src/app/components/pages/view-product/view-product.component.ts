import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { updateCart } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent {
  productId?: string;
  product?: Product;
  user?: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    public _productService: ProductService,
    private _authService: AuthService,
    private _cartService: CartService,
    private _toastr: ToastrService,
    private title: Title,
    private cartStore: Store<{ cart: Cart }>
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params['productId'];
      console.log(this.productId);
      this.loadProduct();
    });

    this._authService.getLoggedInData().subscribe({
      next: (data) => {
        this.user = data.user;
      },
    });
  }
  loadProduct() {
    if (this.productId) {
      this._productService.getProduct(this.productId).subscribe({
        next: (data) => {
          console.log(data);
          this.product = data;
          this.title.setTitle(data.title + ' | Electonic Store ');
        },
      });
    }
  }

  addToCartRequest(product: Product) {
    if (!product.stock) {
      this._toastr.error('Product is not in stock');
      return;
    }

    // request to add item in cart
    if (this.user) {
      this._cartService
        .addItemToCart(this.user.userId, {
          productId: product.productId,
          quantity: 1,
        })
        .subscribe({
          next: (cart) => {
            console.log(cart);
            this._toastr.success('Item is added to cart');
            this.cartStore.dispatch(updateCart({ cart: cart }));
          },
          error: (error) => {
            console.log(error);
            this._toastr.error('Failed to add item to cart');
          },
        });
    } else {
      this._toastr.error('Need to login first ');
    }
  }
}
