import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../core/services/task.service';
import { Task, TaskStatus } from '../../core/models/task.model';
import { TaskModalComponent } from '../../components/task-modal/task-modal';

interface KanbanBoard {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, TaskModalComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boards: KanbanBoard[] = [
    { id: TaskStatus.TODO, title: 'À Faire', tasks: [] },
    { id: TaskStatus.IN_PROGRESS, title: 'En Cours', tasks: [] },
    { id: TaskStatus.REVIEW, title: 'En Revue', tasks: [] },
    { id: TaskStatus.DONE, title: 'Terminé', tasks: [] },
  ];

  showModal = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (response: any) => {
        // response.content contains the paginated tasks
        const allTasks: Task[] = response.content || [];
        
        // Reset 
        this.boards.forEach(b => b.tasks = []);
        
        allTasks.forEach(task => {
          const board = this.boards.find(b => b.id === task.status);
          if (board) {
            board.tasks.push(task);
          }
        });
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      // Update backend
      const task = event.container.data[event.currentIndex];
      const newStatusId = event.container.id as TaskStatus;
      
      this.taskService.updateTask(task.id!, { status: newStatusId }).subscribe();
    }
  }

  getBadgeClass(priority: string) {
    switch (priority) {
      case 'URGENT': return 'bg-error-container text-error';
      case 'HIGH': return 'bg-primary/10 text-primary';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-700';
      case 'LOW': return 'bg-tertiary-container text-on-tertiary-container';
      default: return 'bg-surface-container-high text-on-surface-variant';
    }
  }

  getPriorityColor(priority: string) {
    switch (priority) {
      case 'URGENT': return 'badge-error';
      case 'HIGH': return 'badge-warning';
      case 'MEDIUM': return 'badge-info';
      case 'LOW': return 'badge-ghost';
      default: return 'badge-ghost';
    }
  }
}
