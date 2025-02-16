import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Wallet } from '../interfaces/wallet.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentWalletSubject = new BehaviorSubject<Wallet | null>(null);
  currentWallet$ = this.currentWalletSubject.asObservable();

  constructor(private router: Router) {}

  setCurrentWallet(wallet: Wallet): void {
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