import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-make-transaction',
  standalone: true,
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.css'],
  imports: [
    FormsModule, NgIf, ReactiveFormsModule,
    MatCardModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatButtonToggleModule
  ],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class makeTransactionComponent implements OnInit, OnDestroy {
  walletForm: any = new FormGroup({
    name: new FormControl(''),
    balance: new FormControl(0)
  });
  wallet: any = null;
  transactionType: 'CREDIT' | 'DEBIT' = 'CREDIT';
  transactionAmount: number | null = null;
  transactionSubmitted: boolean = false;
  amount: number | null = null;
  description: string  = '';
  paramSubscription!: Subscription;

  constructor(private walletService: WalletService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubscription = this.route.queryParams.subscribe((params) => {
      this.transactionType = 'CREDIT';
      if (params['walletId']) {
        this.walletService.getWallet(params['walletId']).subscribe((res) => {
          this.wallet = res;
        });
      }
    });
  }

  goHomePage() {
      this.router.navigate(['/']);
  }

  setupWallet() {
    this.walletService.setupWallet(this.walletForm.value).subscribe((res) => {
      localStorage.setItem('walletId', res.id);
      this.wallet = res;
    });
  }

  makeTransaction(amount: any, type: 'CREDIT' | 'DEBIT') {
    const transactionAmount = type === 'CREDIT' ? amount : -amount;
    const walletId = localStorage.getItem('walletId');
    if (!walletId) return;
    this.walletService.transact(walletId, { amount: this.convertToDecimalPlaces(transactionAmount, 4), description: this.description }).subscribe((res) => {
      this.wallet.balance = res.balance;
    });
  }

  convertToDecimalPlaces(value: number, numberOfDigits: number) {
    return parseFloat(value.toFixed(numberOfDigits));
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}