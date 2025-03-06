import { Injectable } from '@angular/core';
import { tap, timer } from 'rxjs';
import { User } from '../Models/User';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // This is the key for the local storage
  private USER_DATA_KEY = 'USER_DATA_KEY';
  private currentUser: User | null = null;

  // Initializing the constructor if there is a user already present
  constructor() {
    const user = this.getUserFromLocal();
    this.currentUser = user;
  }

  // This function fetches the data from the local storage
  private getUserFromLocal(): User | null {
    const data = localStorage.getItem(this.USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  }

  // This function sets the user in the local storage
  private setUserToLocal(user: User) {
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user));
  }

  // This function encapculates the current user data as a readonly data
  getCurrentUser() {
    return this.currentUser ? { ...this.currentUser } : null;
  }

  // This function mocks a api call with the delay time of 2 seconds
  mockLoginUser(user: User) {
    return timer(2000).pipe(
      tap(() => {
        // Setting the user at this execution context
        this.currentUser = user;

        // Setting the user for persistence
        this.setUserToLocal(user);
      })
    );
  }
}
