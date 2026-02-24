import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {

  totalUsers = 0;
  totalEvents = 0;
  registrations = 0;

  constructor(
    private adminService: AdminService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.adminService.getStats().subscribe({
      next: (res: any) => {
        console.log('Stats:', res);

        this.totalUsers = res.totalUsers;
        this.totalEvents = res.totalEvents;
        this.registrations = res.totalRegistrations;

        // 🔥 FORCE UI UPDATE
        this.cd.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
}
