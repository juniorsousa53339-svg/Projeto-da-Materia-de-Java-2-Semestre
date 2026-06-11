import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ShellComponent } from './components/layout/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeListComponent } from './pages/employees/employee-list.component';
import { EmployeeFormComponent } from './pages/employees/employee-form.component';
import { EmployeeActiveComponent } from './pages/employees/employee-active.component';
import { EmployeeProfileComponent } from './pages/employee-profile/employee-profile.component';
import { EmployeeScheduleComponent } from './pages/employee-schedule/employee-schedule.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [roleGuard],
        data: { roles: ['ADMINISTRADOR'] }
      },
      {
        path: 'employees',
        component: EmployeeListComponent,
        canActivate: [roleGuard],
        data: { roles: ['ADMINISTRADOR'] }
      },
      {
        path: 'employees/new',
        component: EmployeeFormComponent,
        canActivate: [roleGuard],
        data: { roles: ['ADMINISTRADOR'] }
      },
      {
        path: 'employees/edit/:id',
        component: EmployeeFormComponent,
        canActivate: [roleGuard],
        data: { roles: ['ADMINISTRADOR'] }
      },
      {
        path: 'employees/active',
        component: EmployeeActiveComponent,
        canActivate: [roleGuard],
        data: { roles: ['ADMINISTRADOR'] }
      },
      {
        path: 'funcionario/perfil',
        component: EmployeeProfileComponent,
        canActivate: [roleGuard],
        data: { roles: ['FUNCIONÁRIO'] }
      },
      {
        path: 'funcionario/agenda',
        component: EmployeeScheduleComponent,
        canActivate: [roleGuard],
        data: { roles: ['FUNCIONÁRIO'] }
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
