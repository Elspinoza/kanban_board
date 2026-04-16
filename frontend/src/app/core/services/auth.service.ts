import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Role } from '../models/user.model';

export interface AuthResponse {
  token: string;
  userId: number;
  email: string;
  role: Role;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  
  // Signals for reactive state
  public currentUser = signal<AuthResponse | null>(this.getStoredUser());
  public isAuthenticated = signal<boolean>(!!this.getStoredUser());

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.handleAuth(response))
    );
  }

  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => this.handleAuth(response))
    );
  }

  logout() {
    localStorage.removeItem('kanban_auth');
    localStorage.removeItem('kanban_token');
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem('kanban_token');
  }

  private handleAuth(response: AuthResponse) {
    localStorage.setItem('kanban_token', response.token);
    localStorage.setItem('kanban_auth', JSON.stringify(response));
    this.currentUser.set(response);
    this.isAuthenticated.set(true);
  }

  private getStoredUser(): AuthResponse | null {
    const data = localStorage.getItem('kanban_auth');
    return data ? JSON.parse(data) : null;
  }
}
