import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaxesService {
  constructor(private http: HttpClient) {}

  adddTaxes(taxe: any): Observable<boolean> {
    return this.http.post<any>(environment.apiUrl + '/taxes', taxe);
  }
}
