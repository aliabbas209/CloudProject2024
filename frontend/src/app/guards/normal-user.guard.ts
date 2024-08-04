import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const normalUserGuard: CanActivateFn = (route, state) => {
  console.log('normal user guard ');

  // logic ---
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  return authService.checkLoginAndNormalUser().pipe(
    map((value) => {
      if (value) return true;
      else {
        //navigate ...login
        toastr.warning('you are not logged in !!');
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
