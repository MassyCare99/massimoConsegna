import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Actions from './store/movements.actions';

import { combineLatest, map, shareReplay, Subscription, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectCards,
  selectMovements,
  selectSelectedCardID,
  selectTotal,
} from './store/movements.selectors';

@Component({
  selector: 'mc-movements',
  templateUrl: './movements.component.html',
  styles: [],
})
export class MovementsComponent implements OnInit, OnDestroy {
  //cards$ = new BehaviorSubject<Card[]>([]);
  cards$ = this.store.select(selectCards);

  selectedCardId$ = this.store.select(selectSelectedCardID);

  selectedCard$ = combineLatest([this.cards$, this.selectedCardId$]).pipe(
    map(([cards, id]) => {
      const index = cards.findIndex((card) => card._id === id);
      return cards[index];
    })
  );

  //movements$ = new BehaviorSubject<Movement[]>([]);
  movements$ = this.store.select(selectMovements);

  //total$ = new BehaviorSubject<number>(0);
  total$ = this.store.select(selectTotal);

  shouldLoadMore$ = combineLatest([this.movements$, this.total$]).pipe(
    map(([movement, total]) => {
      if (movement) {
        if (total > movement.length) {
          return true;
        }
      }
      return false;
    })
  );

  subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public store: Store
  ) {
    const sub = this.route.params
      .pipe(
        map((p) => p['cardId']),
        tap((idCard) => {
          this.store.dispatch(Actions.setCardSelect({ idCard }));

          this.getAllMovements(idCard, true);
        }),
        shareReplay(1)
      )
      .subscribe();

    this.subscription.add(sub);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllCard();
  }

  changeCard(idCard: string) {
    this.router.navigateByUrl('/dashboard/movements/' + idCard);
  }

  showMore() {
    this.store.dispatch(Actions.getMovements({ clear: false }));
  }

  getAllCard(): void {
    this.store.dispatch(Actions.getCards());
  }

  getAllMovements(idCard: string, clear: boolean): void {
    if (this.selectedCard$) {
      this.store.dispatch(Actions.getMovements({ clear }));
    }
  }
}
