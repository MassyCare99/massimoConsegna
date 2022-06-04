import { AuthService } from './../../../../core/api/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Credentials } from 'src/app/models/credential';
import { PasswordErrorStateMatcher } from './utility/passwordErrorStateMatcher';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styles: [
    `
      mat-form-field {
        width: 300px;
      }
    `,
  ],
})
export class RegisterComponent implements OnInit {
  hide = false;
  hide2 = false;
  constructor(private authService: AuthService) {}

  passwordMatcher = new PasswordErrorStateMatcher();

  ngOnInit(): void {}

  register(value: Credentials) {
    // email, password, name, surname
    const cred = {
      email: value.email,
      password: value.password,
      name: value.name,
      surname: value.surname,
    };
    console.log(cred);
    this.authService.register(cred).subscribe((res) => {
      console.log(res);
    });
  }
}
