import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TransactionService } from './transactions.service';
import { Transaction } from './transactions.model';
import { DateFilter, DateRange } from '../../components/date-filter/date-filter';
import { DatePipe, DecimalPipe, NgClass, formatDate } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [DatePipe, DecimalPipe, DateFilter, NgClass],
  templateUrl: './transactions.html',
  host: {
    class: 'block h-full min-h-0',
  },
})
export class Transactions {
  private route = inject(ActivatedRoute);
  private transactionService = inject(TransactionService);

  transactions = signal<Transaction[]>([]);
  isLoading = signal(false);

  accountId = Number(this.route.parent?.snapshot.paramMap.get('accountId'));

  async onDateRangeChange(range: DateRange) {
    await this.fetchTransactions(range);
  }

  async fetchTransactions(range: DateRange) {
    this.isLoading.set(true);

    try {
      const result = await firstValueFrom(
        this.transactionService.findAll(this.accountId, range.startDate, range.endDate),
      );

      this.transactions.set(result);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  readonly groupedTransactions = computed(() => {
    const items = this.transactions();

    const groups = new Map<
      string,
      {
        date: Date;
        items: typeof items;
        total: number;
      }
    >();

    for (const item of items) {
      const dateKey = formatDate(item.transactionDate, 'yyyy-MM-dd', 'th-TH');

      if (!groups.has(dateKey)) {
        groups.set(dateKey, {
          date: new Date(item.transactionDate),
          items: [],
          total: 0,
        });
      }

      const group = groups.get(dateKey)!;

      group.items.push(item);

      group.total += Number(item.amount) * (item.category.type === 'EXPENSE' ? -1 : 1);
    }

    return Array.from(groups.values());
  });
}
