import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction } from './transactions.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private http = inject(HttpClient);

  findAll(accountId: number, startDate: string, endDate: string) {
    return this.http.get<Transaction[]>(`/api/transactions/account/${accountId}`, {
      params: {
        startDate,
        endDate,
      },
    });
  }
}
