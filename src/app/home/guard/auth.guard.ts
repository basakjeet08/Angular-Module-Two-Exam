import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

// This function checks if the user is authorized or logged in or not
export const authGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Checking if the current user is logged in or not
  if (!authService.getCurrentUser()) {
    router.navigate(['/auth']);
    return false;
  } else {
    return true;
  }
};
