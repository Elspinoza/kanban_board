import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard/board', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      { path: '', redirectTo: 'board', pathMatch: 'full' },
      { 
        path: 'board', 
        loadComponent: () => import('./pages/board/board.component').then(m => m.BoardComponent)
      },
      { 
        path: 'stats', 
        loadComponent: () => import('./pages/stats/stats.component').then(m => m.StatsComponent)
      },
      { 
        path: 'all-tasks', 
        loadComponent: () => import('./pages/all-tasks/all-tasks').then(m => m.AllTasksComponent)
      },
      { 
        path: 'team', 
        loadComponent: () => import('./pages/team/team').then(m => m.TeamComponent)
      }
    ]
  },
  { path: '**', redirectTo: '/dashboard/board' }
];
