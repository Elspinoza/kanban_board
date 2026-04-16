import { User } from './user.model';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline?: string;
  assignee?: User;
  creator?: User;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskCreateRequest {
  title: string;
  description?: string;
  priority: TaskPriority;
  deadline?: string;
  assigneeId?: number;
}
