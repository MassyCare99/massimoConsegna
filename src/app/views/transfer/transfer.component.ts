import { NgForm } from '@angular/forms';
import { TransferService } from '../../core/api/transfer.service';
import { CardsService } from '../../core/api/cards.service';
import { ContactsService } from '../../core/api/contacts.service';
import { ContactsComponent } from './../contacts/contacts.component';
import { Contact } from './../../models/Contact';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalYesNoComponent } from './../modal-yes-no/modal-yes-no.component';
import { Card } from './../../models/card';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalYesNoComponentData } from 'src/app/models/ModalYesNoComponentData';
import { Transfer } from 'src/app/models/transfer';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'mc-transfer',
  templateUrl: './transfer.component.html',
  styles: [],
})
export class TransferComponent implements OnInit {
  //elencoCarte: Card[] = [];
  cards$ = new BehaviorSubject<Card[]>([]);
  contatti: Contact[] = [];
  contattoSelezionato: Contact | null = null;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private contactsService: ContactsService,
    private cardsService: CardsService,
    private transferService: TransferService
  ) {}

  ngOnInit(): void {
    this.getContatti();
    this.getAllCard();
  }

  save(form: NgForm) {
    const value: Transfer = form.value;
    let data: ModalYesNoComponentData = {
      title: `Vuoi procedere con il trasferimento a favore di ${value.name}  €${value.surname}
      ${value.amount} ?
    `,
    };

    let dialogRef = this.dialog.open(ModalYesNoComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        //answer yes

        this.transferService.addTransfer(value).subscribe((res) => {
          form.resetForm();

          let snackBarRef = this.snackBar.open(
            'Trasferimento avvenuto con successo',
            '',
            {
              duration: 3000,
            }
          );
        });
      }
    });
  }

  openContact() {
    let dialogRef = this.dialog.open(ContactsComponent, {
      data: { contacts: this.contatti },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        //riaggiorno per eventuali modifiche
        this.getContatti();
        //ritornato selezionato contatto
        let index: number;
        index = this.contatti.findIndex((c) => c._id === result.data);
        this.contattoSelezionato = this.contatti[index];
      }
    });
  }

  getContatti() {
    this.contactsService
      .getContacts()
      .subscribe((res) => (this.contatti = res));
  }

  getAllCard(): void {
    this.cardsService.getCards().subscribe(this.cards$);
  }
}
