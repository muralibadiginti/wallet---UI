import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  apiUrl = 'http://localhost:3000/transactions';

  getTransactions(walletId: string, skip: number, limit: number): Observable<any> {
    return from(axios.get(`${this.apiUrl}?walletId=${walletId}&skip=${skip}&limit=${limit}`));
  }
}
