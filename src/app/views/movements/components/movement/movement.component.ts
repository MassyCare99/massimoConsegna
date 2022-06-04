import { Movement, MovementType } from '../../../../models/movement';
import { Card } from '../../../../models/card';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mc-movement',
  templateUrl: './movement.component.html',
  styles: [
    `
      .timestamp {
        width: 100px;
      }
      .ammount {
        width: 100px;
      }
    `,
  ],
})
export class MovementComponent implements OnInit {
  panelOpenState: boolean = false;
  @Input() timestamp: number = 0;
  @Input() ammount: number = 0;
  @Input() type: MovementType = 'out';
  @Input() title: string = '';
  @Input() description: string = '';

  constructor() {}

  ngOnInit(): void {}
}
