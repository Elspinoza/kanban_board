import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-tasks.html',
  styleUrls: ['./all-tasks.scss']
})
export class AllTasksComponent implements OnInit {
  tasks: Task[] = [];
  isLoading = true;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.tasks = response.content || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load tasks', err);
        this.isLoading = false;
      }
    });
  }

  getPriorityClass(priority: string) {
    switch (priority) {
      case 'URGENT': return 'bg-error-container text-error';
      case 'HIGH': return 'bg-primary/10 text-primary';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-surface-container-high text-on-surface-variant';
    }
  }
}
