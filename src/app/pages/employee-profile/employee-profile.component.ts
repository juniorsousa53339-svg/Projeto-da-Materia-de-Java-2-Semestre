import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="profile-card">
      <div class="profile-header">
        <div class="avatar">{{ currentUser()?.avatar }}</div>
        <div>
          <h1>{{ currentUser()?.nome }}</h1>
          <p>Funcionário • {{ currentUser()?.email }}</p>
        </div>
      </div>
      <div class="details">
        <p><strong>Perfil:</strong> Funcionário</p>
        <p><strong>Departamento:</strong> Tecnologia</p>
        <p><strong>Status:</strong> Ativo</p>
        <p><strong>Última atualização:</strong> Hoje</p>
      </div>
    </mat-card>
  `,
  styles: [
    `.profile-card { padding: 24px; }`,
    `.profile-header { display:flex; align-items:center; gap:16px; margin-bottom: 20px; }`,
    `.avatar { width: 64px; height: 64px; border-radius:50%; display:grid; place-items:center; background: linear-gradient(135deg, #2563eb, #7c3aed); color:white; font-weight:700; font-size:1.2rem; }`,
    `.details { display:grid; gap:8px; }`
  ]
})
export class EmployeeProfileComponent {
  private authService = inject(AuthService);
  protected currentUser = () => this.authService.getCurrentUser();
}
