import { Contact } from '../../../../models/Contact';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mc-contact-form',
  templateUrl: './contact-form.component.html',
  styles: [],
})
export class ContactFormComponent implements OnInit {
  @Output() salvaContatto = new EventEmitter<Contact>();
  @Input() contattoSelezionato: Contact | null = null;

  constructor() {}

  ngOnInit(): void {}

  salva(value: Contact) {
    this.salvaContatto.emit(value);
  }
}
