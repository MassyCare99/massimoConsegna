import { DayWithSlots } from '../../models/DayWithSlots';
import { Location } from '../../models/Location';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DayWithSlot } from '../../models/DayWithSlot';

@Injectable({
  providedIn: 'root',
})
export class ApointmentsService {
  constructor(private http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(environment.apiUrl + '/locations');
  }

  getSlotsDisponibili(
    idLocation: string | undefined
  ): Observable<DayWithSlots[]> {
    return this.http.get<DayWithSlots[]>(
      environment.apiUrl + '/slots/' + idLocation
    );
  }

  saveApointment(day: DayWithSlot) {
    return this.http.post<DayWithSlot>(environment.apiUrl + '/schedule', day);
  }
}
