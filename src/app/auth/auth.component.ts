import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/User';
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
    role: '',
  };

  // Injecting the required dependencies
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked when the user clicks on the login button
  onLoginClick() {
    const userRole =
      this.userInput.role === UserRole.LIBRARIAN
        ? UserRole.LIBRARIAN
        : UserRole.MEMBER;

    // Calling the api call for login
    this.authService
      .mockLoginUser(new User(this.userInput.name, userRole))
      .subscribe({
        next: () => {
          this.router.navigate(['../', 'home'], { relativeTo: this.route });
        },

        error: (error: Error) => {
          alert(`Error Occured ${error.message}`);
        },
      });
  }
}
