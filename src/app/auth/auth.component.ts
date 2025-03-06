import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/Models/UserRole';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  // This is the variable which stores the user input
  userInput = {
    name: '',
    role: 'Member',
  };

  // Loading and error states of the Page
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the required dependencies
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked when the user clicks on the login button
  onLoginClick() {
    // Setting the loading state
    this.isLoading = true;

    // Finding the user role
    const userRole =
      this.userInput.role === UserRole.LIBRARIAN
        ? UserRole.LIBRARIAN
        : UserRole.MEMBER;

    // Calling the api call for login
    this.authService.mockLoginUser(this.userInput.name, userRole).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['../', 'home'], { relativeTo: this.route });
      },

      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }
}
