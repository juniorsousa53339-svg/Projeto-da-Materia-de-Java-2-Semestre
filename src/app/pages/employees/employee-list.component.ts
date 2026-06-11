import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule],
  template: `
    <div class="page-header">
      <div>
        <h1>Lista de funcionários</h1>
        <p>Gerencie colaboradores em memória.</p>
      </div>
      <a mat-flat-button color="primary" routerLink="/employees/new">Novo funcionário</a>
    </div>

    <mat-card>
      <table mat-table [dataSource]="employees()" class="full-width-table">
        <ng-container matColumnDef="nome">
          <th mat-header-cell *matHeaderCellDef>Nome</th>
          <td mat-cell *matCellDef="let employee">{{ employee.nome }}</td>
        </ng-container>

        <ng-container matColumnDef="cargo">
          <th mat-header-cell *matHeaderCellDef>Cargo</th>
          <td mat-cell *matCellDef="let employee">{{ employee.cargo }}</td>
        </ng-container>

        <ng-container matColumnDef="departamento">
          <th mat-header-cell *matHeaderCellDef>Departamento</th>
          <td mat-cell *matCellDef="let employee">{{ employee.departamento }}</td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let employee">{{ employee.status }}</td>
        </ng-container>

        <ng-container matColumnDef="acoes">
          <th mat-header-cell *matHeaderCellDef>Ações</th>
          <td mat-cell *matCellDef="let employee">
            <a mat-icon-button color="primary" [routerLink]="['/employees/edit', employee.id]">
              <mat-icon>edit</mat-icon>
            </a>
            <button mat-icon-button color="warn" (click)="deleteEmployee(employee)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </mat-card>
  `,
  styles: [
    `.page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px; gap:16px; }`,
    `.full-width-table { width:100%; }`
  ]
})
export class EmployeeListComponent {
  private employeeService = inject(EmployeeService);
  private dialog = inject(MatDialog);
  protected employees = signal<Employee[]>(this.employeeService.getEmployees());
  protected displayedColumns = ['nome', 'cargo', 'departamento', 'status', 'acoes'];

  deleteEmployee(employee: Employee): void {
    this.employeeService.deleteEmployee(employee.id);
    this.employees.set(this.employeeService.getEmployees());
  }
}
