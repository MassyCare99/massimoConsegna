import { Transfer } from '../../models/transfer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(private http: HttpClient) {}

  addTransfer(transfer: Transfer): Observable<Transfer> {
    return this.http.post<Transfer>(environment.apiUrl + '/transfer', transfer);
  }
}
