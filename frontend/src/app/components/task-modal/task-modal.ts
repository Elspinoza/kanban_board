import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskCreateRequest, TaskPriority, TaskStatus } from '../../core/models/task.model';
import { TaskService } from '../../core/services/task.service';
import { UserService, UserSummary } from '../../core/services/user.service';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-modal.html',
  styleUrls: ['./task-modal.scss']
})
export class TaskModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() taskCreated = new EventEmitter<void>();
  
  taskForm: FormGroup;
  priorities = Object.values(TaskPriority);
  statuses = Object.values(TaskStatus);
  users: UserSummary[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder, 
    private taskService: TaskService,
    private userService: UserService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      status: [TaskStatus.TODO],
      priority: [TaskPriority.MEDIUM],
      assigneeId: [null],
      startDate: [''],
      deadline: ['']
    });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.isLoading = true;
      const request: TaskCreateRequest = this.taskForm.value;
      
      this.taskService.createTask(request).subscribe({
        next: () => {
          this.isLoading = false;
          this.taskCreated.emit();
          this.close.emit();
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Failed to create task', err);
        }
      });
    }
  }
}
