import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  
  const walletId = localStorage.getItem('walletId');
  if (!walletId) {
    router.navigate(['/']);
    return false;
  }
  return true;
}; 