import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '../../../../models/Location';

@Component({
  selector: 'mc-appointments-list',
  templateUrl: './appointments-list.component.html',
  styles: [],
})
export class AppointmentsListComponent implements OnInit {
  @Output() ritornaSelezionato = new EventEmitter<string>();
  @Input() sedi: Location[] | null = [];
  constructor() {}

  ngOnInit(): void {}
}
