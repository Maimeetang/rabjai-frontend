import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export interface DateRange {
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.html',
})
export class DateFilter implements OnInit {
  @Output() dateRangeChange = new EventEmitter<DateRange>();

  selectedDate = new Date();

  get monthLabel(): string {
    return new Intl.DateTimeFormat('th-TH', {
      month: 'long',
      year: 'numeric',
    }).format(this.selectedDate);
  }

  ngOnInit() {
    this.emitDateRange();
  }

  previousMonth() {
    this.selectedDate = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth() - 1,
      1,
    );

    this.emitDateRange();
  }

  nextMonth() {
    this.selectedDate = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth() + 1,
      1,
    );

    this.emitDateRange();
  }

  goToCurrentMonth() {
    this.selectedDate = new Date();
    this.emitDateRange();
  }

  private emitDateRange() {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth();

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    this.dateRangeChange.emit({
      startDate: this.formatDate(startDate),
      endDate: this.formatDate(endDate),
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
