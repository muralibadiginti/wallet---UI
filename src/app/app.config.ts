// Angular 18 Wallet UI Code

// 1️⃣ app.config.ts - Standalone Configuration
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { WalletComponent } from './pages/wallet/wallet.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { makeTransactionComponent } from './pages/make-transaction/make-transaction.component';
import { AuthGuard } from './guards/auth.guard';
import { routes } from './app.routes';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations()
  ]
};