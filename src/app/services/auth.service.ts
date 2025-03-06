import { Injectable } from '@angular/core';
import { Subject, tap, timer } from 'rxjs';
import { User } from '../Models/User';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // This is the key for the local storage
  private USER_DATA_KEY = 'USER_DATA_KEY';
  private currentUserSubject = new Subject<User | null>();

  // Initializing the constructor if there is a user already present
  constructor() {
    const user = this.getUserFromLocal();
    this.currentUserSubject.next(user);
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

  // This function exposes the current user as readonly observable
  getCurrentUserSubject() {
    return this.currentUserSubject.asObservable();
  }

  // This function mocks a api call with the delay time of 2 seconds
  mockLoginUser(user: User) {
    return timer(2000).pipe(
      tap(() => {
        // Setting the user at this execution context
        this.currentUserSubject.next(user);

        // Setting the user for persistence
        this.setUserToLocal(user);
      })
    );
  }
}
