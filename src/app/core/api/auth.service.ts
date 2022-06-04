import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import {
  Observable,
  of,
  switchMap,
  take,
  tap,
  map,
  mapTo,
  catchError,
} from 'rxjs';
import { UserStore } from '../user.store';
import { User } from 'src/app/models/user';
import { Credentials } from 'src/app/models/credential';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userStore: UserStore
  ) {
    httpClient.get<void>(`${env.apiUrl}/csrf-token`).subscribe();
  }

  register(credentials: any): Observable<boolean> {
    console.log(credentials);
    let res = this.httpClient
      .post<void>(`${env.apiUrl}/register`, credentials)
      .subscribe((res) => {
        switchMap(this.fetchUser);
        mapTo(of(true));
        catchError((error) => {
          return of(false);
        });
      });
    return of(true);
  }

  //E l’interfaccia Credentials avrà 4 campi di tipo stringa: email, password, name, surname.

  login(email: string, password: string): Observable<boolean> {
    let res = this.httpClient
      .post<void>(`${env.apiUrl}/login`, { email: email, password: password })
      .pipe(
        switchMap((x) => this.fetchUser(true)),
        mapTo(true),
        catchError((error) => {
          return of(false);
        })
      );

    return res;
  }

  logOut() {
    let res = this.httpClient.get(`${env.apiUrl}/logout`).subscribe((res) => {
      this.userStore.removeUser();
    });
  }

  fetchUser(forceReload = false): Observable<User> {
    return this.userStore.user$.pipe(
      take(1),
      switchMap((user) => {
        return !!user && !forceReload
          ? of(user)
          : this.httpClient
              .get<any>(`${env.apiUrl}/me`, {})
              .pipe(tap((u) => this.userStore.setUser(u)));
      })
    );
  }
}
