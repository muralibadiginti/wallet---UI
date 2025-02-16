import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent } from './pages/wallet/wallet.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { makeTransactionComponent } from './pages/make-transaction/make-transaction.component';

export const routes: Routes = [
  { path: 'wallet', component: WalletComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'makeTransaction/:walletId', component: makeTransactionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
