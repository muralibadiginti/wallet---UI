import { Component, OnInit, ViewChild } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CeilPipe } from '../../pipes/ceil.pipe';

// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    CeilPipe,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatButtonModule
  ]
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  walletId = localStorage.getItem('walletId');
  page: number = 1;
  pageSize: number = 5; // Adjust the number of transactions per page
  paginatedTransactions: any[] = [];
  sortedColumn: string = 'amount'; // Default sorted column
  sortAscending: boolean = true;   // Default sorting order
  count: number = 0;

  // Define the displayed columns for the table.
  displayedColumns: string[] = ['date', 'amount', 'type', 'balance', 'description'];

  constructor(private walletService: WalletService, private router: Router, private location: Location) {}

  ngOnInit() {
    this.updatePagination();
  }

  sortTable(column: string) {
    if (this.sortedColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortedColumn = column;
      this.sortAscending = true;
    }
    this.updatePagination();
  }

  onSortChange(sort: Sort) {
    this.sortTable(sort.active);
  }

  updatePagination() {
    const start = (this.page - 1) * this.pageSize;
    if (this.walletId) {
      this.walletService.getTransactions(
        this.walletId,
        start,
        this.pageSize,
        this.sortedColumn,
        this.sortAscending
      ).subscribe((res: any) => {
        // Remove any "$" symbol from amount and balance fields if present
        this.transactions = res.data.map((tx: any) => {
          if (tx.amount && typeof tx.amount === 'string') {
            tx.amount = Number(tx.amount.replace(/\$/g, ''));
          }
          if (tx.balance && typeof tx.balance === 'string') {
            tx.balance = Number(tx.balance.replace(/\$/g, ''));
          }
          return tx;
        });
        this.paginatedTransactions = this.transactions;
        this.count = res.count;
      });
    }
  }

  nextPage() {
    if ((this.page * this.pageSize) < this.count) {
      this.page++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagination();
    }
  }

  // Handles paginator page events.
  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.updatePagination();
  }

  goHomePage() {
    this.transactions = [];
    this.page = 1;
    this.router.navigate(['/makeTransaction'], { queryParams: { walletId: this.walletId } });
  }

  exportCSV() {
    if (this.walletId) {
      this.walletService.exportTransactions(this.walletId).subscribe((res: Blob) => {
        saveAs(res, 'transactions.csv');
      });
    }
  }
}