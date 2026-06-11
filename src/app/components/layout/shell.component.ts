import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatSidenavModule, MatToolbarModule, MatButtonModule, MatListModule, MatIconModule, MatDividerModule],
  template: `
    <div class="app-shell">
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #drawer mode="side" opened class="sidenav">
          <div class="brand">
            <div class="brand-badge">RH</div>
            <div>
              <h2>Gestão RH</h2>
              <p>Portal interno</p>
            </div>
          </div>

          <mat-nav-list>
            <a mat-list-item routerLink="/dashboard" *ngIf="isAdmin()">
              <mat-icon matListItemIcon>dashboard</mat-icon>
              <span matListItemTitle>Dashboard</span>
            </a>
            <a mat-list-item routerLink="/funcionario/perfil" *ngIf="!isAdmin()">
              <mat-icon matListItemIcon>person</mat-icon>
              <span matListItemTitle>Meu perfil</span>
            </a>
            <a mat-list-item routerLink="/funcionario/agenda" *ngIf="!isAdmin()">
              <mat-icon matListItemIcon>calendar_today</mat-icon>
              <span matListItemTitle>Agenda</span>
            </a>
            <a mat-list-item routerLink="/employees" *ngIf="isAdmin()">
              <mat-icon matListItemIcon>groups</mat-icon>
              <span matListItemTitle>Funcionários</span>
            </a>
            <a mat-list-item routerLink="/employees/new" *ngIf="isAdmin()">
              <mat-icon matListItemIcon>person_add</mat-icon>
              <span matListItemTitle>Cadastrar</span>
            </a>
            <a mat-list-item routerLink="/employees/active" *ngIf="isAdmin()">
              <mat-icon matListItemIcon>check_circle</mat-icon>
              <span matListItemTitle>Ativos</span>
            </a>
          </mat-nav-list>

          <mat-divider></mat-divider>

          <div class="user-card">
            <div class="avatar">{{ currentUser()?.avatar }}</div>
            <div>
              <strong>{{ currentUser()?.nome }}</strong>
              <p>{{ currentUser()?.role }}</p>
            </div>
          </div>
        </mat-sidenav>

        <mat-sidenav-content>
          <mat-toolbar color="primary" class="topbar">
            <span>Bem-vindo ao sistema</span>
            <span class="spacer"></span>
            <button mat-button (click)="logout()">Sair</button>
          </mat-toolbar>

          <main class="page-content">
            <router-outlet></router-outlet>
          </main>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [
    `:host { display: block; height: 100%; }`,
    `.app-shell { height: 100%; }`,
    `.sidenav-container { height: 100%; }`,
    `.sidenav { width: 270px; background: #0f172a; color: white; }`,
    `.brand { display: flex; gap: 12px; padding: 24px 16px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); }`,
    `.brand-badge { width: 42px; height: 42px; border-radius: 50%; display: grid; place-items: center; background: linear-gradient(135deg, #2563eb, #7c3aed); font-weight: 700; }`,
    `.brand h2 { margin: 0; font-size: 1rem; }`,
    `.brand p { margin: 2px 0 0; color: rgba(255,255,255,0.7); font-size: 0.875rem; }`,
    `.user-card { display: flex; gap: 12px; align-items: center; padding: 16px; margin-top: 12px; }`,
    `.avatar { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: rgba(255,255,255,0.12); font-weight: 700; }`,
    `.topbar { box-shadow: 0 6px 20px rgba(0,0,0,0.08); }`,
    `.spacer { flex: 1; }`,
    `.page-content { padding: 24px; background: #f8fafc; min-height: calc(100vh - 64px); }`
  ]
})
export class ShellComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  protected currentUser = () => this.authService.getCurrentUser();
  protected isAdmin = computed(() => this.authService.getCurrentUser()?.role === 'ADMINISTRADOR');

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
