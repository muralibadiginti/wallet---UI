import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { WalletService } from '../../services/wallet.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    MaterialModule, 
    CommonModule, 
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class WalletComponent implements OnInit {
  isSignUp = true;
  loading = false;
  authForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private walletService: WalletService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // if (this.authService.isAuthenticated()) {
    //   this.router.navigate(['/transactions']);
    // }
    this.initForm();
  }

  private initForm(): void {
    this.authForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      balance: [0, [
        Validators.required, 
        Validators.min(0),
        (control: AbstractControl) => {
          const value = control.value;
          if (value !== null && (value < 0 || !Number.isInteger(value * 10000))) {
            return { invalidAmount: true };
          }
          return null;
        }
      ]]
    });
  }

  // Helper method to check if amount is valid
  isValidAmount(amount: number): boolean {
    return amount >= 0 && Number.isInteger(amount * 100);
  }

  onBalanceInput(event: any): void {
    let value = event.target.value;
    
    // Remove any non-numeric characters except decimal point
    value = value.replace(/[^\d.]/g, '');
    
    // Ensure only four decimal places
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts.length === 2 && parts[1].length > 4) {
      value = parts[0] + '.' + parts[1].slice(0, 4);
    }
    
    // Update form control value
    this.authForm.get('balance')?.setValue(value ? parseFloat(value) : null);
  }

  toggleAuthMode(): void {
    this.isSignUp = !this.isSignUp;
    if (!this.isSignUp) {
      this.authForm.get('balance')?.disable();
    } else {
      this.authForm.get('balance')?.enable();
    }
    this.authForm.reset();
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.notificationService.showError('Please check your input');
      return;
    }

    const balance = this.authForm.get('balance')?.value;
    if (this.isSignUp && !this.isValidAmount(balance)) {
      this.notificationService.showError('Please enter a valid positive amount with up to 2 decimal places');
      return;
    }

    this.loading = true;
    const credentials = this.authForm.value;
    
    const action$ = this.isSignUp ? 
      this.walletService.setupWallet(credentials) : 
      this.walletService.login(credentials);

    action$.pipe(
      catchError(error => {
        this.notificationService.showError(error.error.message || 'An error occurred');
        return of(null);
      }),
      finalize(() => this.loading = false)
    ).subscribe(response => {
      if (response) {
        this.authService.setCurrentWallet(response);
        this.notificationService.showSuccess(
          this.isSignUp ? 'Wallet created successfully!' : 'Login successful!'
        );
        this.router.navigate(['/makeTransaction'], { queryParams: { walletId: response.id } });
      }
    });
  }

  // Example validator function with explicit type for 'control'
  myValidator(control: AbstractControl): { [key: string]: any } | null {
    // Add custom validation logic as needed
    return null;
  }

  preventMinus(event: KeyboardEvent): void {
    if (event.key === '-') {
      event.preventDefault();
    }
  }
}
