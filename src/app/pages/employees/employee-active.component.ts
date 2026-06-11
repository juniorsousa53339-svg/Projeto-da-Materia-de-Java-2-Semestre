import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-active',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  template: `
    <mat-card>
      <h2>Funcionários ativos</h2>
      <mat-list>
        <mat-list-item *ngFor="let employee of activeEmployees">
          <mat-icon matListItemIcon>person</mat-icon>
          <div matListItemTitle>{{ employee.nome }}</div>
          <div matListItemLine>{{ employee.cargo }} • {{ employee.departamento }}</div>
        </mat-list-item>
      </mat-list>
    </mat-card>
  `,
  styles: [`.mat-card { padding: 16px; }`]
})
export class EmployeeActiveComponent {
  private employeeService = inject(EmployeeService);
  protected activeEmployees = this.employeeService.getActiveEmployees();
}
