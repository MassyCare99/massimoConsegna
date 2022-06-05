import { CardsService } from './../../../core/api/cards.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addCard,
  addCardFail,
  addCardsuccess,
  closeSnackbar,
  closeSnackbarSuccess,
  getCards,
  getCardsFail,
  getCardsSuccess,
  openSnackbar,
  openSnackbarSuccess,
  removeCard,
  removeCardFail,
  removeCardsuccess,
} from './cards.actions';
import {
  of,
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  delay,
  debounceTime,
} from 'rxjs';

import { Store } from '@ngrx/store';
import { CardForm } from 'src/app/models/CardForm';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CardsEffects {
  constructor(
    private actions: Actions,
    private CardsService: CardsService,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  getCards$ = createEffect(() =>
    this.actions.pipe(
      ofType(getCards),
      switchMap(() =>
        this.CardsService.getCards().pipe(
          map((Cards) => getCardsSuccess({ Cards })),
          catchError(() => of(getCardsFail()))
        )
      )
    )
  );

  addCard$ = createEffect(() =>
    this.actions.pipe(
      ofType(addCard),
      mergeMap((action) => {
        const Card: CardForm = action.card;
        return this.CardsService.addCards(Card).pipe(
          map((Card) => addCardsuccess({ Card })),
          catchError(() => of(addCardFail()))
        );
      })
    )
  );

  removeCard$ = createEffect(() =>
    this.actions.pipe(
      ofType(removeCard),
      mergeMap((action) => {
        const idCard: string = action.id;
        return this.CardsService.deleteCard(idCard).pipe(
          map((Card) => removeCardsuccess({ id: idCard })),
          catchError(() => of(removeCardFail()))
        );
      })
    )
  );

  openSnackbar$ = createEffect(() =>
    this.actions.pipe(
      ofType(openSnackbar),
      tap((action) =>
        this.snackBar.open(action.message, 'close', {
          //duration: 3000,
        })
      ),
      map((Card) => openSnackbarSuccess({ message: Card.message }))
    )
  );

  openSnackbarSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(openSnackbarSuccess),

      debounceTime(3000),
      map((Card) => closeSnackbar())
    )
  );
  closeSnackbar$ = createEffect(() =>
    this.actions.pipe(
      ofType(closeSnackbar),
      map((Card) => this.snackBar.dismiss()),
      map((Card) => closeSnackbarSuccess())
    )
  );
}
