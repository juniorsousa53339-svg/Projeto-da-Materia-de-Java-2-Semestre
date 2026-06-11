import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule],
  template: `
    <mat-card class="form-card">
      <h2>{{ isEditMode ? 'Editar funcionário' : 'Cadastrar funcionário' }}</h2>
      <form [formGroup]="form" (ngSubmit)="save()">
        <div class="grid">
          <mat-form-field appearance="outline">
            <mat-label>Nome</mat-label>
            <input matInput formControlName="nome" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Cargo</mat-label>
            <input matInput formControlName="cargo" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Departamento</mat-label>
            <input matInput formControlName="departamento" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>E-mail</mat-label>
            <input matInput formControlName="email" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Telefone</mat-label>
            <input matInput formControlName="telefone" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Status</mat-label>
            <mat-select formControlName="status">
              <mat-option value="Ativo">Ativo</mat-option>
              <mat-option value="Inativo">Inativo</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Data de admissão</mat-label>
            <input matInput type="date" formControlName="dataAdmissao" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Perfil</mat-label>
            <mat-select formControlName="role">
              <mat-option value="ADMINISTRADOR">Administrador</mat-option>
              <mat-option value="FUNCIONÁRIO">Funcionário</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="actions">
          <button mat-stroked-button type="button" routerLink="/employees">Cancelar</button>
          <button mat-flat-button color="primary" [disabled]="form.invalid">Salvar</button>
        </div>
      </form>
    </mat-card>
  `,
  styles: [
    `.form-card { padding: 20px; }`,
    `.grid { display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }`,
    `.actions { display:flex; justify-content:flex-end; gap: 12px; margin-top: 12px; }`,
    `@media (max-width: 700px) { .grid { grid-template-columns: 1fr; } }`
  ]
})
export class EmployeeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  isEditMode = false;
  employeeId?: number;

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    cargo: ['', Validators.required],
    departamento: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', Validators.required],
    status: ['Ativo' as 'Ativo' | 'Inativo', Validators.required],
    dataAdmissao: ['', Validators.required],
    role: ['FUNCIONÁRIO' as 'ADMINISTRADOR' | 'FUNCIONÁRIO', Validators.required]
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.employeeId = Number(id);
        const employee = this.employeeService.getEmployeeById(this.employeeId);
        if (employee) {
          this.form.patchValue(employee);
        }
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const payload = this.form.getRawValue();

    if (this.isEditMode && this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, payload);
      this.snackBar.open('Funcionário atualizado com sucesso', 'Fechar', { duration: 2000 });
    } else {
      this.employeeService.createEmployee(payload);
      this.snackBar.open('Funcionário cadastrado com sucesso', 'Fechar', { duration: 2000 });
    }

    this.router.navigate(['/employees']);
  }
}
