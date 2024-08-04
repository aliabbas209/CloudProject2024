import { LoginResponse } from 'src/app/models/loginresponse.model';
import { createReducer, on } from '@ngrx/store';
import { removeLoginData, setLoginData } from './auth.actions';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

export const intialState: LoginResponse =
  AuthService.getLoginDataFromLocalStorage()
    ? AuthService.getLoginDataFromLocalStorage()
    : {
        jwtToken: '',
        user: undefined,
        login: false,
      };

export const authReducer = createReducer(
  intialState,
  on(setLoginData, (oldState, payload) => {
    // console.log('set login data action with reducer');
    // console.log(oldState);
    return { ...payload, login: true };
  }),
  on(removeLoginData, (state) => {
    return {
      jwtToken: '',
      user: undefined,
      login: false,
    };
  })
);
