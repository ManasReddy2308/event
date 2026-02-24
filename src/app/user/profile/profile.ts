import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../layout/sidebar/sidebar';
import { ProfileService } from '../../services/profile';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  user: any = null;
  loading = true;
  passwordForm: FormGroup;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      this.loading = false;
      return;
    }

    this.loading = true;

    this.profileService.getProfile(userId).subscribe({
      next: (data) => {
        console.log('Profile:', data);
        this.user = data;
        this.loading = false;
        this.cd.detectChanges(); // 🔥 ensure UI updates immediately
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  updatePassword(): void {
    if (this.passwordForm.invalid) return;

    const userId = Number(localStorage.getItem('userId'));

    this.profileService.updatePassword({
      userId,
      newPassword: this.passwordForm.value.newPassword
    }).subscribe({
      next: () => {
        alert('Password Updated Successfully 🔐');
        this.passwordForm.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update password ❌');
      }
    });
  }
}
