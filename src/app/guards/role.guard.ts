import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data['roles'] as string[];
  const currentUser = authService.getCurrentUser();

  if (currentUser && expectedRoles.includes(currentUser.role)) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
