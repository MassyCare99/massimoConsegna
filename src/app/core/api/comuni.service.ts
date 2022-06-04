import { Comune, Provincia2 } from '../../models/comune';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComuniService {
  constructor(private http: HttpClient) {}

  getProvince(ricStr: string): Observable<Provincia2[]> {
    return this.http
      .get<Provincia2[]>(
        'https://gist.githubusercontent.com/stockmind/8bcbbf9ac41bc196401b96084ec8c5d3/raw/2edda5cd32eb2b99d3d9b45413bc8b1135564260/province-italia.json'
      )
      .pipe(
        map((list) => {
          const newList = list.filter((comune) => {
            return comune.nome.toUpperCase().startsWith(ricStr.toUpperCase());
          });
          return newList;
        })
      );
  }

  getComuni(ricStr: string): Observable<Comune[]> {
    return this.http
      .get<Comune[]>(
        'https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json'
      )
      .pipe(
        map((list) => {
          const newList = list.filter((comune) => {
            const condizione = comune.nome
              .toUpperCase()
              .startsWith(ricStr.toUpperCase());

            if (condizione) {
              return true;
            }
            return false;
          });
          return newList;
        })
      );
  }
}
