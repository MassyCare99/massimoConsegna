import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  constructor() {}

  private privateUser$ = new BehaviorSubject<User | null>(null);

  user$ = this.privateUser$.asObservable();

  setUser(user: User): void {
    this.privateUser$.next(user);
  }
  removeUser(): void {
    this.privateUser$.next(null);
  }

  displayName$ = this.privateUser$.pipe(map((r) => r?.displayName));
}
