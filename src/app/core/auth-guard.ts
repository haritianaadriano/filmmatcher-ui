import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();

  if (!isLoggedIn) {
    return router.createUrlTree(['/auth/login']);
  }

  return true;
};
