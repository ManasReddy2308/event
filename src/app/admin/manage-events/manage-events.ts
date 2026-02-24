import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar';
import { EventService } from '../../services/event';

@Component({
  selector: 'app-manage-events',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent],
  templateUrl: './manage-events.html',
  styleUrls: ['./manage-events.css']
})
export class ManageEventsComponent implements OnInit {

  events: any[] = [];
  loading = true;

  newEvent: any = {
    name: '',
    capacity: 0,
    deadline: ''
  };

  constructor(
    private eventService: EventService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;

    this.eventService.getEvents().subscribe({
      next: (data: any[]) => {
        console.log('Manage Events:', data);
        this.events = data;
        this.loading = false;
        this.cd.detectChanges(); // 🔥 forces UI refresh
      },
      error: () => {
        this.events = [];
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  addEvent(): void {
    if (!this.newEvent.name || !this.newEvent.capacity || !this.newEvent.deadline) {
      alert('Fill all fields including deadline ❗');
      return;
    }

    this.eventService.createEvent(this.newEvent).subscribe({
      next: () => {
        alert('Event Created 🎉');
        this.newEvent = { name: '', capacity: 0, deadline: '' };
        this.loadEvents();
      },
      error: () => alert('Failed to create event ❌')
    });
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      alert('Event Deleted 🗑');
      this.loadEvents();
    });
  }
}
