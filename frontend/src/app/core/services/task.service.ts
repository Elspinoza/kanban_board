import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Task, TaskCreateRequest, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(status?: TaskStatus, assigneeId?: number, search?: string): Observable<any> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    if (assigneeId) params = params.set('assigneeId', assigneeId);
    if (search) params = params.set('search', search);

    return this.http.get<any>(this.apiUrl, { params });
  }

  createTask(task: TaskCreateRequest): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, updates: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, updates);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
