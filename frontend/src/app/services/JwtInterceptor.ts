import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { EMPTY, Observable, switchMap, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/loginresponse.model';
import { Store } from '@ngrx/store';
import { removeLoginData } from '../store/auth/auth.actions';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<{ auth: LoginResponse }>,
    private router: Router,
    private toastr: ToastrService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('jwt  interceptor works');

    // write login to add jwt token
    return this.authService.getLoggedInData().pipe(
      take(1),
      switchMap((value) => {
        // console.log(value.jwtToken + ' from switch map');
        //add token to header

        const helper = new JwtHelperService();
        if (value.jwtToken && helper.isTokenExpired(value.jwtToken)) {
          // token expired wala kam kar lo
          this.store.dispatch(removeLoginData());
          this.router.navigate(['/login']);
          this.toastr.error('Session expired ! Relogin');
          return EMPTY;
        }

        if (value.login) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${value.jwtToken}`,
            },
          });
        }
        return next.handle(req);
      })
    );
  }
}
