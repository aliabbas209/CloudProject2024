import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from './models/loginresponse.model';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart.model';
import { User } from './models/user.model';
import { updateCart } from './store/cart/cart.actions';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { NavigationEnd, Router } from '@angular/router';
import { removeLoginData, setLoginData } from './store/auth/auth.actions';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-ecom';
  user?: User;
  token?: string;

  constructor(
    private toastr: ToastrService,
    private store: Store<{ auth: LoginResponse }>,
    private authService: AuthService,
    private cartService: CartService,
    private socialAuth: SocialAuthService,
    private cartStore: Store<{ cart: Cart }>,
    private router: Router
  ) {
    this.store.select('auth').subscribe({
      next: (loginData) => {
        this.authService.saveLoginDataToLocalStorage(loginData);
        this.user = loginData.user;
        this.token = loginData.jwtToken;
      },
    });

    if (this.user) {
      // console.log('loading cart on home page');
      this.cartService.getCartOfUser(this.user.userId).subscribe({
        next: (cart) => {
          this.cartStore.dispatch(updateCart({ cart: cart }));
        },
      });
    }

    this.socialAuth.authState.subscribe({
      next: (user) => {
        console.log(user);
        this.authService.signInWithGoogle(user).subscribe({
          next: (data: LoginResponse) => {
            console.log(data);
            this.store.dispatch(setLoginData(data));
            this.router.navigate(['/user']);
          },
          error: (error) => {
            this.toastr.error('Error in login from backend !!');
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  ngOnInit(): void {
    this.checkTokenExpiration();
    this.router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        console.log('router changed');
        this.checkTokenExpiration();
      }
    });
  }
  showToast() {
    this.toastr.error('Angular Ecommerce', 'This is success message', {
      closeButton: true,
    });
  }

  private checkTokenExpiration() {
    const helper = new JwtHelperService();
    //
    console.log('checking token expiration');
    console.log(this.token);

    if (this.token) {
      if (helper.isTokenExpired(this.token)) {
        this.toastr.error('Session expired !!');
        this.store.dispatch(removeLoginData());
        this.router.navigate(['/login']);
      }
    }
  }
}
