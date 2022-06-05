import { cardType } from '../../../../models/card';
import { NgForm } from '@angular/forms';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CardForm } from 'src/app/models/CardForm';

@Component({
  selector: 'mc-card-form',
  templateUrl: './card-form.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class CardFormComponent implements OnInit {
  typeCard: cardType[] = ['mastercard', 'visa'];
  @Output() inserisciNuovaCarta = new EventEmitter<CardForm>();
  @Output() esci = new EventEmitter<void>();

  @ViewChild('f', { read: NgForm }) form!: NgForm;
  constructor() {}

  ngOnInit(): void {}

  save(value: CardForm) {
    this.inserisciNuovaCarta.emit(value);
  }

  capitalize(str: string) {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  }

  public cleanup() {
    this.form.resetForm();
  }
}
