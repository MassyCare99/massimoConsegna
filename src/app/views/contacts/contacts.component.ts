import { BehaviorSubject, filter, map, combineLatest } from 'rxjs';
import { ContactsService } from '../../core/api/contacts.service';
import { TransferComponent } from './../transfer/transfer.component';
import { Contact } from './../../models/Contact';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Inject,
  Pipe,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'mc-contacts',
  templateUrl: './contacts.component.html',
  styles: [],
})
export class ContactsComponent implements OnInit {
  //contattoSelezionato: Contact | null = null;
  //contatti: Contact[] = [];
  contacts$ = new BehaviorSubject<Contact[]>([]);
  state$ = new BehaviorSubject<tipoStato>({ type: 'list' });
  selectedContact$ = combineLatest([this.contacts$, this.state$]).pipe(
    map(([contacts, state]) => {
      if (contacts) {
        if (state.type == 'edit') {
          const index = contacts?.findIndex((c) => c._id === state.id);
          return contacts[index];
        }
      }
      return null;
    })
  );
  constructor(
    private dialogRef: MatDialogRef<TransferComponent>,
    private contactsService: ContactsService,
    @Inject(MAT_DIALOG_DATA) public dataContactInput: DataContactInput
  ) {
    this.contacts$.next(dataContactInput.contacts);
  }

  ngOnInit(): void {}

  nuovoContatto() {
    this.state$.next({ type: 'new' });
  }

  eliminaContatto(id: string) {
    this.contactsService.deleteContacts(id).subscribe((res) => {
      //this.contatti = this.contatti.filter((c) => c._id !== id);
      this.contacts$.pipe(
        map((c) => {
          return c?.filter((c) => c._id !== id);
        })
      );
    });
    this.state$.next({ type: 'list' });
  }

  modificaContatto(id: string) {
    //let index: number;
    //index = this.contatti.findIndex((c) => c._id === id);
    //this.contattoSelezionato = this.contatti[index];

    this.state$.next({ type: 'edit', id: id });
  }

  selezionaContatto(id: string) {
    let index: number | null;
    index = this.contacts$.getValue().findIndex((c) => c._id === id);
    this.dialogRef.close({ data: this.contacts$.getValue()[index]._id });
  }

  chiudiModale() {
    this.dialogRef.close();
  }

  salvaContatto(contact: Contact) {
    if (this.state$.getValue().type === 'edit') {
      const index = this.contacts$
        .getValue()
        .findIndex((c) => c._id === this.state$.getValue().id);
      const contattoDaModificare: Contact = {
        ...this.contacts$.getValue()[index],
        ...contact,
      };

      this.contactsService
        .updateContacts(contattoDaModificare)
        .subscribe((res) => {
          //modifica
          this.contacts$.next(
            this.contacts$.getValue().map((contact) => {
              if (contact._id !== contattoDaModificare._id) return contact;
              return contattoDaModificare;
            })
          );
        });
    } else {
      //nuovo
      this.contactsService.addContacts(contact).subscribe((res) => {
        this.contacts$.next([...this.contacts$.getValue(), res]);
      });
    }
    this.state$.next({ type: 'list' });
  }
}

export interface DataContactInput {
  contacts: Contact[];
}

export interface tipoStato {
  type: 'list' | 'new' | 'edit';
  id?: string;
}
