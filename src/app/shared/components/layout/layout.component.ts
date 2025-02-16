import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary" class="toolbar">
        <span>Wallet Manager</span>
        <span class="spacer"></span>
        @if (authService.isAuthenticated()) {
          <button mat-icon-button (click)="authService.logout()">
            <mat-icon>logout</mat-icon>
          </button>
        }
      </mat-toolbar>

      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .content {
      margin-top: 64px;
      padding: 20px;
      background: #f5f5f5;
      min-height: calc(100vh - 64px);
    }
  `]
})
export class LayoutComponent {
  constructor(public authService: AuthService) {}
} 