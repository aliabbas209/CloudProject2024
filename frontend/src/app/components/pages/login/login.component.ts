import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from 'src/app/models/loginresponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { setLoginData } from 'src/app/store/auth/auth.actions';
import { Router } from '@angular/router';
import { Observable, asyncScheduler, firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private store: Store<{ auth: LoginResponse }>,
    private router: Router
  ) {
    // this.store.select('auth').subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    // });
  }

  formSubmitted(event: SubmitEvent) {
    event.preventDefault();
    console.log(this.loginData);
    // VALIDATE
    if (
      this.loginData.email.trim() === '' ||
      this.loginData.password.trim() === ''
    ) {
      this.toastr.error('Values Required !!');
      return;
    }

    //login api
    this.authService.generateToken(this.loginData).subscribe({
      next: (value: LoginResponse) => {
        console.log(value);
        this.store.dispatch(setLoginData(value));
        this.router.navigate(['/user']);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message);
      },
    });
  }
}
