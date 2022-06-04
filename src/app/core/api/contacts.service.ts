import { Contact } from '../../models/Contact';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.apiUrl + '/contacts');
  }

  addContacts(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(environment.apiUrl + '/contacts', contact);
  }

  deleteContacts(idContact: string): Observable<Contact> {
    return this.http.delete<Contact>(
      environment.apiUrl + '/contacts/' + idContact
    );
  }

  updateContacts(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(
      environment.apiUrl + '/contacts/' + contact._id,
      contact
    );
  }
}
