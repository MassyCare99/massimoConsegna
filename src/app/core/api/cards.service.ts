import { Movement } from '../../models/movement';
import { CardForm } from '../../models/CardForm';
import { Card } from '../../models/card';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(environment.apiUrl + '/cards');
  }

  addCards(value: CardForm) {
    return this.http.post<Card>(environment.apiUrl + '/cards', value);
  }

  deleteCard(idCard: string) {
    return this.http.delete<boolean>(environment.apiUrl + '/cards/' + idCard);
  }

  getMovements(cardId: string, limit: number, offset: number): Observable<any> {
    return this.http
      .get<any>(
        environment.apiUrl +
          '/cards/' +
          cardId +
          '/movements?limit=' +
          limit +
          '&offset=' +
          offset
      )
      .pipe(map((list) => list));
  }
}
