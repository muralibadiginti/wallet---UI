import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Wallet, Transaction, TransactionResponse, WalletCredentials } from '../interfaces/wallet.interface';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  setupWallet(credentials: WalletCredentials): Observable<Wallet> {
    return this.http.post<Wallet>(`${this.apiUrl}/setup`, credentials);
  }

  login(credentials: WalletCredentials): Observable<Wallet> {
    return this.http.post<Wallet>(`${this.apiUrl}/login`, credentials);
  }

  getWallet(id: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.apiUrl}/wallet/${id}`);
  }

  transact(walletId: string, data: { amount: number; description: string }): Observable<Wallet> {
    return this.http.post<Wallet>(`${this.apiUrl}/transact/${walletId}`, data);
  }

  getTransactions(
    walletId: string, 
    skip: number, 
    limit: number, 
    sortColumn: string, 
    sortOrder: boolean
  ): Observable<TransactionResponse> {
    const params = new HttpParams()
      .set('walletId', walletId)
      .set('skip', skip.toString())
      .set('limit', limit.toString())
      .set('sortColumn', sortColumn)
      .set('sortOrder', sortOrder.toString());

    return this.http.get<TransactionResponse>(`${this.apiUrl}/transactions`, { params });
  }

  exportTransactions(walletId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export`, {
      params: { walletId },
      responseType: 'blob'
    });
  }
} 