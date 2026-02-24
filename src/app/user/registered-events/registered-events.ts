import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../layout/sidebar/sidebar';
import { RegistrationService } from '../../services/registration';

@Component({
  selector: 'app-registered-events',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './registered-events.html',
  styleUrls: ['./registered-events.css']
})
export class RegisteredEventsComponent implements OnInit {

  registeredEvents: any[] = [];
  loading = true;

  constructor(
    private regService: RegistrationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRegisteredEvents();
  }

  loadRegisteredEvents(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.loading = true;

    this.regService.getRegisteredEvents(userId).subscribe({
      next: (data: any[]) => {
        console.log('Registered Events:', data);
        this.registeredEvents = data || [];
        this.loading = false;
        this.cd.detectChanges(); // 🔥 forces UI refresh immediately
      },
      error: () => {
        alert('Failed to load registered events ❌');
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }
}
