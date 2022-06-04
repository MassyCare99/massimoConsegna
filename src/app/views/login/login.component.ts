import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .loginCard {
        display: inline-block;
        width: 100%;
        max-width: 400px;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
