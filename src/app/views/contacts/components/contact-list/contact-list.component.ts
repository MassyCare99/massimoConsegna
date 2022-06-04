import { Contact } from '../../../../models/Contact';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mc-contact-list',
  templateUrl: './contact-list.component.html',
  styles: [],
})
export class ContactListComponent implements OnInit {
  @Input() contatti: Contact[] | null = [];
  @Output() seleziona = new EventEmitter<string>();
  @Output() modifica = new EventEmitter<string>();
  @Output() elimina = new EventEmitter<string>();
  @Output() chiudi = new EventEmitter<string>();

  valueText: string = '';

  constructor() {}

  ngOnInit(): void {}
}
