import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../Models/UserRole';

export const librarianGuard: CanActivateFn = (_route, _state) => {
  // Injecting the necessary dependencies
  const authService = inject(AuthService);
  const router = inject(Router);

  // Fetching the current user data
  const user = authService.getCurrentUser();

  // Checking if the user is a librarian
  if (user?.role === UserRole.LIBRARIAN) {
    return true;
  } else {
    router.navigate(['/home', 'checkout']);
    return false;
  }
};
