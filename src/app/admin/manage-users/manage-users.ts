import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './manage-users.html',
  styleUrls: ['./manage-users.css']
})
export class ManageUsersComponent implements OnInit {

  users: any[] = [];
  loading = true;

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    this.adminService.getUsers().subscribe({
      next: (res: any[]) => {
        console.log('Users:', res);

        // 🔥 Force new array reference
        this.users = [...res];

        this.loading = false;

        // 🔥 Ensure Angular detects update
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        alert('Failed to load users');
      }
    });
  }

  toggleBlock(user: any) {
    this.adminService.toggleBlock(user.id).subscribe(() => {
      user.isBlocked = !user.isBlocked;
    });
  }
}
