import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // Injecting the necessary Dependencies
  constructor(private authService: AuthService, private router: Router) {}

  // This button logs out the user
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
