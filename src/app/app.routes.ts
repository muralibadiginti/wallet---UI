import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/wallet/wallet.component').then(m => m.WalletComponent) },
  { 
    path: 'transactions', 
    loadComponent: () => import('./pages/transactions/transactions.component').then(m => m.TransactionsComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'makeTransaction', 
    loadComponent: () => import('./pages/make-transaction/make-transaction.component').then(m => m.MakeTransactionComponent),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
