import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../layout/sidebar/sidebar';
import { EventService } from '../../services/event';
import { RegistrationService } from '../../services/registration';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  events: any[] = [];
  loading = true;

  constructor(
    private eventService: EventService,
    private regService: RegistrationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;

    this.eventService.getEvents().subscribe({
      next: (res: any[]) => {
        console.log('Normalized Events:', res);
        this.events = res;
        this.loading = false;

        // 🔥 FORCE UI UPDATE (fix for “comes then disappears” bug)
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.events = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  register(event: any): void {
    const userId = Number(localStorage.getItem('userId'));

    if (!userId) {
      alert('User not logged in ❌');
      return;
    }

    this.regService.registerEvent({ userId, eventId: event.id }).subscribe({
      next: () => {
        alert('Registered Successfully 🎉');
        this.loadEvents();
      },
      error: (err) => alert(err.error || 'Registration failed ❌')
    });
  }
}
