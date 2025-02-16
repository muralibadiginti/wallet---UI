import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentWalletSubject = new BehaviorSubject<any>(null);
  currentWallet$ = this.currentWalletSubject.asObservable();

  constructor(private router: Router) {}

  setCurrentWallet(wallet: any): void {
    localStorage.setItem('walletId', wallet.id);
    this.currentWalletSubject.next(wallet);
  }

  logout(): void {
    localStorage.removeItem('walletId');
    this.currentWalletSubject.next(null);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('walletId');
  }
} 