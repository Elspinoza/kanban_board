import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { TaskService } from '../../core/services/task.service';
import { Task, TaskStatus } from '../../core/models/task.model';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  // KPIs
  todoCount = 0;
  inProgressCount = 0;
  reviewCount = 0;
  doneCount = 0;

  // Pie Chart (Status)
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // On utilise notre propre légende stylisée
      }
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['À Faire', 'En Cours', 'En Revue', 'Terminé'],
    datasets: [ { 
      data: [0, 0, 0, 0],
      backgroundColor: ['#ffdad6', '#3525cd', '#fbbd23', '#006e4b'],
      borderWidth: 0
    } ]
  };
  public pieChartType: ChartType = 'pie';

  // Bar Chart (Priority)
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['URGENT', 'HIGH', 'MEDIUM', 'LOW'],
    datasets: [
      { 
        data: [0, 0, 0, 0], 
        label: 'Tâches', 
        backgroundColor: '#3525cd',
        borderRadius: 8,
        hoverBackgroundColor: '#4f46e5'
      }
    ]
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (response: any) => {
        const tasks: Task[] = response.content || [];
        this.processTasks(tasks);
      }
    });
  }

  processTasks(tasks: Task[]) {
    // Basic Counts
    this.todoCount = tasks.filter(t => t.status === TaskStatus.TODO).length;
    this.inProgressCount = tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length;
    this.reviewCount = tasks.filter(t => t.status === TaskStatus.REVIEW).length;
    this.doneCount = tasks.filter(t => t.status === TaskStatus.DONE).length;

    // Update Pie
    this.pieChartData.datasets[0].data = [
      this.todoCount,
      this.inProgressCount,
      this.reviewCount,
      this.doneCount
    ];
    // Force angular to detect change in Chart object reference
    this.pieChartData = { ...this.pieChartData };

    // Priorities
    const pUrgent = tasks.filter(t => t.priority === 'URGENT').length;
    const pHigh = tasks.filter(t => t.priority === 'HIGH').length;
    const pMed = tasks.filter(t => t.priority === 'MEDIUM').length;
    const pLow = tasks.filter(t => t.priority === 'LOW').length;

    this.barChartData.datasets[0].data = [pUrgent, pHigh, pMed, pLow];
    this.barChartData = { ...this.barChartData };
  }

  getCompletionPercentage(): number {
    const total = this.todoCount + this.inProgressCount + this.reviewCount + this.doneCount;
    if (total === 0) return 0;
    return Math.round((this.doneCount / total) * 100);
  }
}
