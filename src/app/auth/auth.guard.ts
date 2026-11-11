import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.checkAuth();

  return isAuthenticated
    ? true
    : router.createUrlTree(['/liff'], {
        queryParams: {
          returnUrl: state.url,
        },
      });
};
