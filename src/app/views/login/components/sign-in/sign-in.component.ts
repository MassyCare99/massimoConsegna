import { AuthService } from './../../../../core/api/auth.service';
import { UserStore } from './../../../../core/user.store';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'mc-sign-in',
  templateUrl: './sign-in.component.html',
  styles: [
    `
      mat-form-field {
        width: 300px;
      }
    `,
  ],
})
export class SignInComponent implements OnInit {
  hide = true;
  erroreLogin: string | null = null;
  psw: string = '';

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  save(value: any) {
    this.authService.login(value.email, value.password).subscribe((res) => {
      if (res) {
        this.router.navigate(['dashboard']);
        this.erroreLogin = null;
      } else {
        this.erroreLogin = 'Username o PSW errati';
        this.psw = '';
      }
    });
  }
}
