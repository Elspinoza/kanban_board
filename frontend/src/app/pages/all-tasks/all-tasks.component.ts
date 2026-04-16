import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in space-y-16 text-on-surface">
      <div class="flex justify-between items-end px-4">
        <div>
          <h2 class="text-5xl font-black font-headline tracking-tighter text-on-surface leading-none">Répertoire Global</h2>
          <p class="text-on-surface-variant text-sm mt-6 font-medium italic opacity-60">Catalogue exhaustif des unités opérationnelles en cours.</p>
        </div>
        <div class="flex items-center gap-4">
           <button class="px-6 py-2.5 bg-surface-container-low rounded-md font-black text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all">Filtrer l'Archive</button>
        </div>
      </div>

      <div class="bg-surface-container-low/40 rounded-md p-2">
        <div class="bg-surface-container-lowest rounded-md shadow-premium overflow-hidden border-none transition-all">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-container-low/50">
                <th class="px-10 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Identité de la Mission</th>
                <th class="px-10 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">État Actuel</th>
                <th class="px-10 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Gravité</th>
                <th class="px-10 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Échéance</th>
                <th class="px-10 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-on-surface/5">
              <tr *ngFor="let task of tasks" class="hover:bg-primary/5 transition-all group">
                <td class="px-10 py-8 font-black text-on-surface tracking-tight text-lg group-hover:text-primary transition-colors">{{ task.title }}</td>
                <td class="px-10 py-8">
                  <span class="px-4 py-1.5 bg-surface-container-low rounded-full text-[9px] font-black uppercase tracking-[0.1em] text-on-surface">{{ task.status }}</span>
                </td>
                <td class="px-10 py-8">
                  <span class="px-4 py-1.5 bg-primary/5 text-primary rounded-md text-[9px] font-black uppercase tracking-[0.1em] border-l-2 border-primary/30">{{ task.priority }}</span>
                </td>
                <td class="px-10 py-8 text-[11px] font-black text-on-surface-variant opacity-40">{{ task.deadline | date:'longDate' }}</td>
                <td class="px-10 py-8 text-right">
                  <button class="w-10 h-10 rounded-md bg-surface-container-low flex items-center justify-center ml-auto hover:bg-primary hover:text-on-primary transition-all shadow-sm">
                    <span class="material-symbols-outlined text-sm">open_in_new</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div *ngIf="tasks.length === 0" class="py-32 flex flex-col items-center justify-center text-center">
             <span class="material-symbols-outlined text-6xl text-on-surface/5 mb-6">inventory_2</span>
             <p class="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-30">Aucune donnée archivée pour le moment</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AllTasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((res: any) => {
      this.tasks = res.content || [];
    });
  }
}
