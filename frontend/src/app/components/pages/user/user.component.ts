import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from 'src/app/models/loginresponse.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { setLoginData } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  user?: User;
  previewImageUrl?: string;
  imageFile?: File;
  loginResponse?: LoginResponse;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private authStore: Store<{ auth: LoginResponse }>
  ) {
    this.authService.getLoggedInData().subscribe({
      next: (loginData) => {
        this.user = { ...loginData.user } as User;
        this.loginResponse = loginData;
      },
    });
  }

  openUpdateModal(updateContent: any) {
    this.modalService.open(updateContent, {
      size: 'lg',
      centered: false,
    });
  }

  imageFieldChanged(event: any) {
    this.imageFile = (event.target as HTMLInputElement).files![0];
    if (
      this.imageFile.type == 'image/png' ||
      this.imageFile.type == 'image/jpeg'
    ) {
      //preview ..
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
      // upload file
    } else {
      this.toastr.error('Only JPEG or PNG allowed !!');
      this.imageFile = undefined;
    }
  }

  updateFormSubmitted(event: SubmitEvent) {
    event.preventDefault();
    if (this.user?.name.trim() === '') {
      this.toastr.error('Name cannot be blank !!');
      return;
    }
    // apply rest of validations
    this.userService.updateUser(this.user as User).subscribe({
      next: (newUser) => {
        console.log(newUser);
        const newLoginResponse = {
          jwtToken: this.loginResponse?.jwtToken,
          user: newUser,
          login: this.loginResponse?.login,
        };
        this.authStore.dispatch(
          setLoginData(newLoginResponse as LoginResponse)
        );
        this.toastr.success('Information Updated !!');
        // call  image upate api if new image is selected
        if (this.imageFile) {
          this.userService
            .uploadUserImage(this.user!.userId, this.imageFile)
            .subscribe({
              next: (data: any) => {
                console.log(data);
                this.user!.imageName = data.imageName;
                console.log(this.user);
                const newLoginResponse = {
                  jwtToken: this.loginResponse?.jwtToken,
                  user: { ...this.user, imageName: data.imageName },
                  login: this.loginResponse?.login,
                };
                this.authStore.dispatch(
                  setLoginData(newLoginResponse as LoginResponse)
                );
                this.toastr.success(data.message);
                this.imageFile = undefined;
                this.previewImageUrl = '';
                this.modalService.dismissAll();
              },
              error: (error) => {
                console.log(error);
                this.toastr.error('Error in updating image !!');
              },
            });
        }
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Update Error !');
      },
    });
  }
}
