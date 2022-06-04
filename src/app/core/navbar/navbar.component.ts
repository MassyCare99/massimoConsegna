import { Router } from '@angular/router';
import { UserStore } from './../user.store';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'mc-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  constructor(
    public userStore: UserStore,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  logOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }
}
