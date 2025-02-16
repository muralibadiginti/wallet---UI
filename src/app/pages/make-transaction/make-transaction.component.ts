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
import { MatSnackBar } from '@angular/material/snack-bar';
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
export class MakeTransactionComponent implements OnInit, OnDestroy {
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
  isLoading: boolean = false;

  constructor(private walletService: WalletService, public router: Router, private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

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

  onTransactionTypeChange(newType: 'CREDIT' | 'DEBIT') {
    this.transactionType = newType;
    this.amount = null;
    this.description = '';
  }

  makeTransaction(amount: number, type: 'CREDIT' | 'DEBIT') {
    if (this.isLoading) {
      return;
    }
    if (amount < 0) {
      this.snackBar.open('Amount cannot be negative', 'Dismiss', { duration: 3000 });
      return;
    }
    const transactionAmount = type === 'CREDIT' ? amount : -amount;
    const walletId = localStorage.getItem('walletId');
    if (!walletId) return;
    this.isLoading = true;
    this.walletService.transact(walletId, { 
      amount: this.convertToDecimalPlaces(transactionAmount, 4), 
      description: this.description 
    }).subscribe(
      (res) => {
        this.wallet.balance = this.convertToDecimalPlaces(res.balance, 4);
        this.isLoading = false;
        this.snackBar.open('Transaction successful', 'Dismiss', { duration: 3000 });
        this.amount = null;
        this.description = '';
        this.transactionType = 'CREDIT';
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Transaction failed: ' + error.message, 'Dismiss', { duration: 3000 });
      }
    );
  }

  convertToDecimalPlaces(value: number, numberOfDigits: number) {
    return parseFloat(value.toFixed(numberOfDigits));
  }

  onAmountInput(event: any): void {
    const inputValue: string = event.target.value;
    if (inputValue.includes('.')) {
      const parts = inputValue.split('.');
      if (parts[1].length > 4) {
        // Limit decimals to 4 places
        const trimmed = parts[0] + '.' + parts[1].substring(0, 4);
        event.target.value = trimmed;
        this.amount = parseFloat(trimmed);
      }
    }
  }

  preventMinus(event: KeyboardEvent): void {
    if (event.key === '-') {
      event.preventDefault();
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}