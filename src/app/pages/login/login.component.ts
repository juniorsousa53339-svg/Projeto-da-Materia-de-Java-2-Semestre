import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  template: `
    <div class="login-page">
      <mat-card class="login-card">
        <div class="login-header">
          <h1>Entrar no sistema</h1>
          <p>Use as credenciais demonstrativas abaixo.</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>E-mail</mat-label>
            <input matInput formControlName="email" placeholder="admin@empresa.com" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Senha</mat-label>
            <input matInput type="password" formControlName="password" />
          </mat-form-field>

          <button mat-flat-button color="primary" class="full-width" [disabled]="form.invalid">Entrar</button>
        </form>

        <div class="hint">
          <p><strong>Admin:</strong> admin@empresa.com / 123456</p>
          <p><strong>Funcionário:</strong> funcionario@empresa.com / 123456</p>
        </div>
      </mat-card>
    </div>
  `,
  styles: [
    `.login-page { min-height: 100vh; display: grid; place-items: center; background: linear-gradient(135deg, #eff6ff, #f8fafc); padding: 20px; }`,
    `.login-card { width: min(100%, 430px); padding: 8px 4px 20px; }`,
    `.login-header { text-align: center; margin-bottom: 16px; }`,
    `.full-width { width: 100%; margin-bottom: 8px; }`,
    `.hint { margin-top: 16px; color: #475569; font-size: 0.95rem; }`
  ]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit(): void {
    const user = this.authService.login(this.form.value.email ?? '', this.form.value.password ?? '');

    if (user) {
      this.router.navigate([user.role === 'ADMINISTRADOR' ? '/dashboard' : '/funcionario/perfil']);
      return;
    }

    this.snackBar.open('Credenciais inválidas', 'Fechar', { duration: 2500 });
  }
}
