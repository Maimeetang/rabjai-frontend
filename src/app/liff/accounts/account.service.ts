import { inject, Injectable } from '@angular/core';
import { Account } from './account.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);

  getPersonalAccount() {
    return this.http.get<Account>('/api/accounts/me');
  }
}
