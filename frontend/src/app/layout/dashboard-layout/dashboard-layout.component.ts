import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService, AuthResponse } from '../../core/services/auth.service';
import { TaskModalComponent } from '../../components/task-modal/task-modal';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, TaskModalComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {
  currentTheme: string = 'winter';
  showNewTaskModal = false;

  constructor(private authService: AuthService, private router: Router) {
  }
  
  // Correction: Signal read safely for template
  get user() {
    return this.authService.currentUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'winter' ? 'dracula' : 'winter';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  onTaskCreated() {
    this.showNewTaskModal = false;
    // Forcer un rafraîchissement si on est sur le board ou stats?
    // On pourrait utiliser un service mais pour l'instant un re-navigate vers l'actuel
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
