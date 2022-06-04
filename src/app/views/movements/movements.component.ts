import { CardsService } from '../../core/api/cards.service';
import { Movement } from './../../models/movement';
import { HttpClient } from '@angular/common/http';
import { Card } from './../../models/card';
import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mc-movements',
  templateUrl: './movements.component.html',
  styles: [],
})
export class MovementsComponent implements OnInit {
  //elencoCarte: Card[] = [];
  cards$ = new BehaviorSubject<Card[]>([]);

  //selectedCardId$ = new BehaviorSubject<string>('');
  selectedCardId$: Observable<string> = this.route.params.pipe(
    map((p) => p['cardId']),
    tap(() => {
      this.movements$.next([]);

      this.getAllMovements(true);
    }),
    shareReplay(1)
  );

  selectedCard$ = combineLatest([this.cards$, this.selectedCardId$]).pipe(
    map(([cards, id]) => {
      const index = cards.findIndex((card) => card._id === id);
      return cards[index];
    })
  );

  //electedCard: Card | null = null;
  //visualizzaTastoAltri: boolean = false;

  //listMovements: Movement[] = [];
  movements$ = new BehaviorSubject<Movement[]>([]);

  total$ = new BehaviorSubject<number>(0);

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
  //numberOfMovementVisible: number = 0;

  constructor(
    private http: HttpClient,
    private cardsService: CardsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCard();
  }

  changeCard(idCard: string) {
    //this.selectedCardId$.next(idCard);
    this.router.navigateByUrl('/dashboard/movements/' + idCard);
    //const index = this.elencoCarte.findIndex((c) => (c._id = idCard));
    //this.selectedCard = this.elencoCarte[index];

    //this.numberOfMovementVisible = 0;
    //this.visualizzaTastoAltri = true;
    //this.movements$.next([]);
    //this.getAllMovements();
  }

  showMore() {
    this.getAllMovements(false);
  }

  getAllCard(): void {
    // this.cardsService
    //   .getCards()
    //   .subscribe((result) => (this.elencoCarte = result));
    this.cardsService.getCards().subscribe(this.cards$);
  }

  getAllMovements(clear: boolean): void {
    const stepMovementVisible: number = 5;
    let offset = 0;
    if (clear) {
      offset = 0;
    } else {
      offset = this.movements$.getValue().length;
    }
    if (this.selectedCard$) {
      this.selectedCardId$
        .pipe(
          switchMap((id) => {
            return this.cardsService.getMovements(
              id,
              stepMovementVisible,
              offset
            );
          })
        )
        .subscribe((res) => {
          if (clear) {
            this.movements$.next(res.data);
          } else {
            this.movements$.next([...this.movements$.getValue(), ...res.data]);
          }

          this.total$.next(res.total);

          //if (res.length < stepMovementVisible) {
          //  this.visualizzaTastoAltri = false;
          //}
          //this.numberOfMovementVisible =            this.numberOfMovementVisible + this.stepMovementVisible;
        });
    }
  }
}
