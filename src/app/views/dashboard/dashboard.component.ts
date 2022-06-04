import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mc-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      .container {
        height: 100vh;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
