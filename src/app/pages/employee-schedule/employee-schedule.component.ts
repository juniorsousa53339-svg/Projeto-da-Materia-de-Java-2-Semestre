import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-employee-schedule',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="schedule-grid">
      <mat-card>
        <h2>Agenda demonstrativa</h2>
        <ul>
          <li>09:00 • Reunião semanal</li>
          <li>11:00 • Atendimento ao cliente</li>
          <li>14:00 • Treinamento interno</li>
          <li>16:30 • Revisão de tarefas</li>
        </ul>
      </mat-card>
      <mat-card>
        <h2>Resumo do dia</h2>
        <p>3 compromissos confirmados</p>
        <p>1 tarefa pendente</p>
        <p>Status: Produtivo</p>
      </mat-card>
    </div>
  `,
  styles: [`.schedule-grid { display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; } @media (max-width: 700px) { .schedule-grid { grid-template-columns: 1fr; } }`]
})
export class EmployeeScheduleComponent {}
