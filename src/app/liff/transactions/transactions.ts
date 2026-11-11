import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TransactionService } from './transactions.service';
import { Transaction } from './transactions.model';
import { DateFilter, DateRange } from '../../components/date-filter/date-filter';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [DatePipe, DecimalPipe, DateFilter],
  templateUrl: './transactions.html',
  host: {
    class: 'block h-full min-h-0',
  },
})
export class Transactions implements OnInit {
  private route = inject(ActivatedRoute);
  private transactionService = inject(TransactionService);

  transactions: Transaction[] = [];
  isLoading = false;

  accountId = Number(this.route.parent?.snapshot.paramMap.get('accountId'));

  async ngOnInit() {}

  async onDateRangeChange(range: DateRange) {
    await this.fetchTransactions(range);
  }

  async fetchTransactions(range: DateRange) {
    this.isLoading = true;

    try {
      this.transactions = await firstValueFrom(
        this.transactionService.findAll(this.accountId, range.startDate, range.endDate),
      );
      // console.log(this.transactions);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      this.isLoading = false;
      console.log('Loading finished:', this.isLoading);
    }
  }
}
