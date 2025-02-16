import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WalletService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  setupWallet(data: { name: string; balance: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/setup`, data);
  }
  login(data: { name: string; balance: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  transact(walletId: string, data: { amount: number; description: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/transact/${walletId}`, data);
  }

  getTransactions(walletId: string, skip: number, limit: number, sortColumn : string, sortOrder : boolean): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions?walletId=${walletId}&skip=${skip}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`);
  }

  getWallet(walletId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/wallet/${walletId}`);
  }


  exportTransactions(walletId : string) : Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export?walletId=${walletId}&skip=${10}&limit=${100}`,{responseType : 'blob'});

  }
}