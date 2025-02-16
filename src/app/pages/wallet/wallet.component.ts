import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-wallet-setup',
  standalone: true,
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  imports: [FormsModule, NgIf, ReactiveFormsModule]
})
export class WalletComponent implements OnInit {
  isSignUp = true;

  authForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    balance: new FormControl(0, [Validators.required, Validators.min(0)]) // Only for signup
  });

  wallet: any = null;

  constructor(private walletService: WalletService, private router: Router) {}

  ngOnInit() {
    this.isSignUp = true;
  }

  toggleAuthMode() {
    this.isSignUp = !this.isSignUp;
    this.authForm.reset();
    if (!this.isSignUp) {
      this.authForm.removeControl('balance'); // Remove balance for login
    } else {
      this.authForm.addControl('balance', new FormControl(0, [Validators.required, Validators.min(0)]));
    }
  }

  setupWallet() {
    if (this.authForm.invalid) {
      alert('Please enter valid wallet details.');
      return;
    }

    this.walletService.setupWallet(this.authForm.value)
      .pipe(
        catchError((error) => {
          alert(error.error.message);
          return of(null);
        })
      )
      .subscribe((res) => {
        if (res) {
          localStorage.setItem('walletId', res.id);
          this.wallet = res;
          this.router.navigate(['/makeTransaction'], { queryParams: { walletId: res.id } });
        }
      });
  }

  login() {
    this.walletService.login({name : this.authForm.value.name,balance: 0})
      .pipe(
        catchError((error) => {
          alert(error.error.message);
          return of(null);
        })
      )
      .subscribe((res:any) => {
        if (res) {
          localStorage.setItem('walletId', res.id);
          this.wallet = res;
          this.router.navigate(['/makeTransaction'], { queryParams: { walletId: res.id } });
        }
      });
  }
}
