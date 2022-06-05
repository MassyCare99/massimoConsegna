import { Movement } from './../../../models/movement';
import { CardsService } from './../../../core/api/cards.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getCards,
  getCardsFail,
  getCardsSuccess,
  getMovements,
  getMovementsFail,
  getMovementsSuccess,
} from './movements.actions';
import { of, catchError, map, switchMap, withLatestFrom } from 'rxjs';

import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectMovements, selectSelectedCardID } from './movements.selectors';

@Injectable()
export class MovementsEffects {
  constructor(
    private actions: Actions,
    private cardService: CardsService,
    private store: Store,
    private snackBar: MatSnackBar,
    private cardsService: CardsService
  ) {}

  getMovements$ = createEffect(() =>
    this.actions.pipe(
      ofType(getMovements),
      withLatestFrom(
        this.store.select(selectSelectedCardID),
        this.store.select(selectMovements)
      ),
      switchMap(([data, cardId, movements]) => {
        let offset: number = 0;
        const limit: number = 5;

        //vedo, se non devo pulire, prendo l'offset
        if (!data.clear) {
          offset = movements.length;
        }
        return this.cardService.getMovements(cardId, limit, offset).pipe(
          map((movements) =>
            getMovementsSuccess({
              Movements: movements.data as Movement[],
              clear: data.clear,
              total: movements.total,
            })
          ),
          catchError(() => of(getMovementsFail()))
        );
      })
    )
  );

  getCards$ = createEffect(() =>
    this.actions.pipe(
      ofType(getCards),
      switchMap(() =>
        this.cardsService.getCards().pipe(
          map((Cards) => getCardsSuccess({ Cards })),
          catchError(() => of(getCardsFail()))
        )
      )
    )
  );
}
