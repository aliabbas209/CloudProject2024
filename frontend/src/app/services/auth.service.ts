import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/loginresponse.model';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login/public-api';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // login   and  normal user
  // Obserable contain the login check status
  signInWithGoogle(user: SocialUser) {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/google`,
      user
    );
  }
  constructor(
    private http: HttpClient,
    private store: Store<{ auth: LoginResponse }>
  ) {}

  generateToken(loginData: { email: string; password: string }) {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/login`,
      loginData
    );
  }

  checkLoginAndNormalUser() {
    // login   and  normal user
    // Obserable contain the login check status
    return this.store.select('auth').pipe(
      map((value) => {
        // condition... for checking login
        // console.log(value.login);
        // console.log(value.jwtToken);
        // console.log(value.user);
        // console.log(value.user?.roles);

        const isNormalRole = value.user?.roles.find(
          (role) =>
            role.roleName == environment.ROLE_NORMAL_NAME &&
            role.roleId === environment.ROLE_NORMAL_ID
        );
        // console.log(isNormalRole);

        if (value.login && value.jwtToken && value.user && isNormalRole)
          return true;
        else return false;
      })
    );
  }

  checkLoginAndAdminUser(): Observable<boolean> {
    // login and admin

    // login   and  normal user
    // Obserable contain the login check status
    return this.store.select('auth').pipe(
      map((value) => {
        // condition... for checking login
        // console.log(value.login);
        // console.log(value.jwtToken);
        // console.log(value.user);
        // console.log(value.user?.roles);

        const isAdminRole = value.user?.roles.find(
          (role) =>
            role.roleName == environment.ROLE_ADMIN_NAME &&
            role.roleId === environment.ROLE_ADMIN_ID
        );
        // console.log(isNormalRole);

        if (value.login && value.jwtToken && value.user && isAdminRole)
          return true;
        else return false;
      })
    );
  }

  // get login data

  getLoggedInData() {
    return this.store.select('auth');
  }

  // helper method for localStorage

  saveLoginDataToLocalStorage(loginData: LoginResponse) {
    localStorage.setItem('data', JSON.stringify(loginData));
  }

  static getLoginDataFromLocalStorage() {
    const dataString = localStorage.getItem('data');
    if (dataString) return JSON.parse(dataString);
    else return null;
  }
}
