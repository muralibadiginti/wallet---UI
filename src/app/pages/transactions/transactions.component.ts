import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { NgFor , NgIf} from '@angular/common';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CeilPipe } from "../../ceil.pipe";
@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  imports: [NgFor, NgIf, CeilPipe]
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  walletId = localStorage.getItem('walletId');
  page: number = 1;
  pageSize: number = 5; // Adjust the number of transactions per page
  paginatedTransactions :any= [];
  sortedColumn: string = 'amount'; // Default sorted column
  sortAscending: boolean = true;   // Default sorting order
  count : number = 0;

  constructor(private walletService: WalletService, private router : Router, private location : Location) {}

  ngOnInit() {
    this.sortTable(this.sortedColumn);
  }

  sortTable(column : string) {
    if(this.sortedColumn === column) {
      this.sortAscending = !this.sortAscending;
    }else{
      this.sortedColumn = column;
      this.sortAscending = true;
    }
    this.updatePagination();

  }

  updatePagination() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    
    if (this.walletId) {
      this.walletService.getTransactions(this.walletId, start, this.pageSize, this.sortedColumn, this.sortAscending).subscribe((res:any) => {
        this.transactions = res.data;
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
  

  goHomePage() {
    this.transactions = [];
    this.page = 0;
    // this.router.navigate(['/']);
    this.location.back();
  }
  exportCSV() {
    if(this.walletId){
    this.walletService.exportTransactions(this.walletId).subscribe((res:Blob) => {
      saveAs(res,'transactions.csv')
    });
  }
  }

  
}