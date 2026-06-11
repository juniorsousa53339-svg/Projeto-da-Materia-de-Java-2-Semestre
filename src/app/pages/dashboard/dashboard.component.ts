import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="dashboard">
      <h1>Dashboard administrativo</h1>
      <p class="subtitle">Resumo visual do ambiente de gestão de pessoas.</p>

      <div class="stats-grid">
        <mat-card class="stat-card">
          <div class="stat-top">
            <mat-icon>groups</mat-icon>
            <span>Total</span>
          </div>
          <h2>{{ employees.length }}</h2>
          <p>Funcionários cadastrados</p>
        </mat-card>

        <mat-card class="stat-card">
          <div class="stat-top">
            <mat-icon>check_circle</mat-icon>
            <span>Ativos</span>
          </div>
          <h2>{{ activeEmployees.length }}</h2>
          <p>Ativos no período atual</p>
        </mat-card>

        <mat-card class="stat-card">
          <div class="stat-top">
            <mat-icon>business</mat-icon>
            <span>Departamentos</span>
          </div>
          <h2>4</h2>
          <p>Setores com presença</p>
        </mat-card>
      </div>

      <div class="panel-grid">
        <mat-card>
          <h3>Próximas ações</h3>
          <ul>
            <li>Revisar cadastro de novos colaboradores</li>
            <li>Confirmar equipe de suporte</li>
            <li>Atualizar agenda de treinamentos</li>
          </ul>
        </mat-card>
        <mat-card>
          <h3>Indicadores</h3>
          <p>Taxa de permanência: 92%</p>
          <p>Tempo médio de admissão: 3 anos</p>
          <p>Meta de contratação: 6 neste trimestre</p>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `.dashboard { display: flex; flex-direction: column; gap: 20px; }`,
    `.subtitle { color: #64748b; margin-top: 4px; }`,
    `.stats-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }`,
    `.stat-card { padding: 8px 12px; }`,
    `.stat-top { display: flex; align-items: center; gap: 8px; color: #2563eb; font-weight: 600; }`,
    `.panel-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 16px; }`,
    `@media (max-width: 900px) { .stats-grid, .panel-grid { grid-template-columns: 1fr; } }`
  ]
})
export class DashboardComponent {
  private employeeService = inject(EmployeeService);
  protected employees = this.employeeService.getEmployees();
  protected activeEmployees = this.employeeService.getActiveEmployees();
}
