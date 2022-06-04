import { CardsService } from '../../core/api/cards.service';
import { CardFormComponent } from './components/card-form/card-form.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardForm } from 'src/app/models/CardForm';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, filter, map } from 'rxjs';
import { Route, Router } from '@angular/router';

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

  //cards: Card[] = [];
  cards$ = new BehaviorSubject<Card[]>([]);

  constructor(
    private snackBar: MatSnackBar,
    private cardsService: CardsService,
    private router: Router
  ) {}

  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 3000,
    });
  }

  ngOnInit(): void {
    this.getAllCard();
  }

  addNew(value: CardForm) {
    this.cardsService.addCards(value).subscribe((res) => {
      //this.cards = [...this.cards, res];
      this.cards$.next([...this.cards$.getValue(), res]);
      this.cleanCardForm();

      this.openSnackBar('Carta aggiunta correttamente!');
    });
  }

  deleteCard(idCard: string) {
    this.cardsService.deleteCard(idCard).subscribe((res) => {
      if (res) {
        //let index: number = 0;
        //index = this.cards.findIndex((e) => e._id === idCard);
        //this.cards.splice(index, 1);

        this.cards$.pipe(
          map((cards) => cards.find((card) => card._id !== idCard))
        );

        this.openSnackBar('Carta rimossa correttamente!');
      }
    });
  }

  getAllCard(): void {
    //this.cardsService.getCards().subscribe((result) => (this.cards = result));
    this.cardsService.getCards().subscribe(this.cards$);
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
