import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

const router = inject(Router);

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  if (localStorage.getItem('auth_token')) {
  return true;
  }
  router.navigate(['/auth', 'login']);
return false;
};
