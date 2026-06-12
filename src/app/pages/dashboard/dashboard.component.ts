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
      <h1>📊 Dashboard Administrativo</h1>
      <p class="subtitle">Resumo visual do ambiente de gestão de pessoas.</p>

      <div class="stats-grid">
        <mat-card class="stat-card">
          <div class="stat-top">
            <mat-icon>groups</mat-icon>
            <span>Total</span>
          </div>
         <div class="stat-number">{{ employees.length }}</div>
          <p>Funcionários cadastrados</p>
        </mat-card>

        <mat-card class="stat-card">
          <div class="stat-top">
            <mat-icon>check_circle</mat-icon>
            <span>Ativos</span>
          </div>
          <div class="stat-number">{{ activeEmployees.length }}</div>
          <p>Ativos no período atual</p>
        </mat-card>

        <mat-card class="stat-card">
          <div class="stat-top">
            <mat-icon>business</mat-icon>
            <span>Departamentos</span>
          </div>
          <div class="stat-number">4</div>
          <p>Setores com presença</p>
        </mat-card>
      </div>

      <div class="panel-grid">
        <mat-card>
          <h3>📋 Próximas ações</h3>
          <ul>
            <li>Revisar cadastro de novos colaboradores</li>
            <li>Confirmar equipe de suporte</li>
            <li>Atualizar agenda de treinamentos</li>
          </ul>
        </mat-card>
        <mat-card>
          <h3>📈 Indicadores RH</h3>
          <p>Taxa de permanência: 92%</p>
          <p>Tempo médio de admissão: 3 anos</p>
          <p>Meta de contratação: 6 neste trimestre</p>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
  `.dashboard {
      display: flex;
      flex-direction: column;
      gap: 24px;
   }`,

  `.subtitle {
      color: #64748b;
      margin-top: -8px;
      font-size: 1rem;
   }`,

  `.stats-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
   }`,

  `.stat-card {
      padding: 20px;
      border-radius: 16px;
      transition: all .25s ease;
      cursor: pointer;
   }`,

  `.stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,.12);
   }`,

  `.stat-top {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #3f51b5;
      font-weight: 600;
      margin-bottom: 12px;
   }`,

  `.stat-number {
      font-size: 2.8rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 10px;
   }`,

  `.panel-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 20px;
   }`,

  `.panel-grid mat-card {
      padding: 20px;
      border-radius: 16px;
   }`,

  `.panel-grid h3 {
      margin-top: 0;
      color: #0f172a;
   }`,

  `.panel-grid ul {
      padding-left: 20px;
      line-height: 1.8;
   }`,

  `.panel-grid p {
      line-height: 1.8;
   }`,

  `@media (max-width: 900px) {
      .stats-grid,
      .panel-grid {
        grid-template-columns: 1fr;
      }
   }`
]
})
export class DashboardComponent {
  private employeeService = inject(EmployeeService);
  protected employees = this.employeeService.getEmployees();
  protected activeEmployees = this.employeeService.getActiveEmployees();
}
