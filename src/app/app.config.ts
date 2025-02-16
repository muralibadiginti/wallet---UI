// Angular 18 Wallet UI Code

// 1️⃣ app.config.ts - Standalone Configuration
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { WalletComponent } from './pages/wallet/wallet.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { makeTransactionComponent } from './pages/make-transaction/make-transaction.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: WalletComponent, pathMatch: 'full' },
      { path: 'transactions', component: TransactionsComponent },
        { path: 'makeTransaction', component: makeTransactionComponent },
      
    ]),
    provideHttpClient()
  ]
};