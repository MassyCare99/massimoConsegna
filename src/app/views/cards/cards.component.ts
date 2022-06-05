import { selectCards } from './store/cards.selectors';
import { CardsService } from '../../core/api/cards.service';
import { CardFormComponent } from './components/card-form/card-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';

import { CardForm } from 'src/app/models/CardForm';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Actions from './store/cards.actions';

@Component({
  selector: 'mc-cards',
  templateUrl: './cards.component.html',
  styles: [
    `
      app-sidenav {
        display: flex;
      }
      mat-drawer-container {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class CardsComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer | null = null;
  @ViewChild('cardForm') cardForm: CardFormComponent | null = null;

  cards$ = this.store.select(selectCards);

  constructor(
    private snackBar: MatSnackBar,
    private cardsService: CardsService,
    private router: Router,
    public store: Store
  ) {}

  ngOnInit(): void {
    this.getAllCard();
  }

  addNew(card: CardForm) {
    this.store.dispatch(Actions.addCard({ card }));

    this.store.dispatch(
      Actions.openSnackbar({ message: 'Carta aggiunta correttamente!' })
    );
    this.toogle();
  }

  deleteCard(idCard: string) {
    this.store.dispatch(Actions.removeCard({ id: idCard }));

    this.store.dispatch(
      Actions.openSnackbar({ message: 'Carta rimossa correttamente!' })
    );
  }

  getAllCard(): void {
    this.store.dispatch(Actions.getCards());
  }

  toogle() {
    this.drawer?.toggle();
    this.cleanCardForm;
  }

  cleanCardForm() {
    this.cardForm?.cleanup();
  }

  vediDettaglioMovimenti(idCard: string) {
    this.router.navigateByUrl('/dashboard/movements/' + idCard);
  }
}
