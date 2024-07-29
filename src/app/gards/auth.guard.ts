import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _AuthService = inject(AuthService);
  const router = inject(Router);
  if (_AuthService.IsAuthenticated()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  } 
};
