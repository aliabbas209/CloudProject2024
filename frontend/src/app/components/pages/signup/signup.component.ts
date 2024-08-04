import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user = new User('', '', '', 'male', '');
  loading = false;

  constructor(
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  formSubmit(event: SubmitEvent, signUpForm: NgForm) {
    event.preventDefault();
    // console.log(event);
    // console.log(signUpForm);

    // console.log(this.user);
    console.log(signUpForm.valid);

    if (signUpForm.valid) {
      //submit the form
      this.loading = true;
      this.userService.signupUser(this.user).subscribe({
        next: (user) => {
          //success
          this.toastr.success('User is successfully registered !!');
          console.log(user);
          this.user = new User('', '', '', 'male', '');
          signUpForm.resetForm();
        },
        error: (error) => {
          //error
          this.toastr.error('Error in creating user !!');
          this.toastr.error('This email might exists , try with another one');
          console.log(error);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          console.log('completed');
        },
      });

      console.log(this.user);
    } else {
      this.toastr.error('Form is not valid !!', '', {
        positionClass: 'toast-top-right',
      });
    }
  }

  resetForm(signupForm: NgForm) {
    this.user = new User('', '', '', 'male', '');
    signupForm.resetForm();
  }
}
