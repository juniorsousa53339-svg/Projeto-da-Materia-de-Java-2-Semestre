import { Injectable, signal } from '@angular/core';
import { Employee } from '../models/employee.model';

const initialEmployees: Employee[] = [
  {
    id: 1,
    nome: 'Ana Silva',
    cargo: 'Gerente de Operações',
    departamento: 'Administrativo',
    email: 'ana.silva@empresa.com',
    telefone: '(11) 99999-1111',
    status: 'Ativo',
    dataAdmissao: '2020-02-10',
    role: 'ADMINISTRADOR'
  },
  {
    id: 2,
    nome: 'Bruno Costa',
    cargo: 'Analista de Suporte',
    departamento: 'TI',
    email: 'bruno.costa@empresa.com',
    telefone: '(11) 98888-2222',
    status: 'Ativo',
    dataAdmissao: '2021-08-16',
    role: 'FUNCIONÁRIO'
  },
  {
    id: 3,
    nome: 'Carla Mendes',
    cargo: 'Coordenadora RH',
    departamento: 'Recursos Humanos',
    email: 'carla.mendes@empresa.com',
    telefone: '(11) 97777-3333',
    status: 'Inativo',
    dataAdmissao: '2019-03-19',
    role: 'FUNCIONÁRIO'
  }
];

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employeesSignal = signal<Employee[]>(initialEmployees);
  readonly employees = this.employeesSignal.asReadonly();

  getEmployees(): Employee[] {
    return this.employeesSignal();
  }

  getActiveEmployees(): Employee[] {
    return this.employeesSignal().filter((employee) => employee.status === 'Ativo');
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employeesSignal().find((employee) => employee.id === id);
  }

  createEmployee(employee: Omit<Employee, 'id'>): Employee {
    const created: Employee = {
      ...employee,
      id: Date.now()
    };

    this.employeesSignal.update((list) => [created, ...list]);
    return created;
  }

  updateEmployee(id: number, employee: Partial<Employee>): Employee | undefined {
    let updated: Employee | undefined;

    this.employeesSignal.update((list) =>
      list.map((item) => {
        if (item.id === id) {
          updated = { ...item, ...employee };
          return updated;
        }
        return item;
      })
    );

    return updated;
  }

  deleteEmployee(id: number): void {
    this.employeesSignal.update((list) => list.filter((employee) => employee.id !== id));
  }
}
