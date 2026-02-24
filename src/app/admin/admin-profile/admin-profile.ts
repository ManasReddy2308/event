import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar';
import { ProfileService } from '../../services/profile';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminSidebarComponent],
  templateUrl: './admin-profile.html',
  styleUrls: ['./admin-profile.css']
})
export class AdminProfileComponent implements OnInit {

  passwordForm: FormGroup;
  profile: any = null;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private cd: ChangeDetectorRef
  ) {
    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.matchValidator }
    );
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.loading = true;

    this.profileService.getProfile(userId).subscribe({
      next: (res) => {
        console.log('Profile:', res);
        this.profile = res;
        this.loading = false;
        this.cd.detectChanges(); // 🔥 ensures UI updates immediately
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cd.detectChanges();
        alert('Failed to load profile');
      }
    });
  }

  get f() {
    return this.passwordForm.controls;
  }

  matchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  updatePassword(): void {
    if (this.passwordForm.valid) {
      const userId = Number(localStorage.getItem('userId'));

      this.profileService.updatePassword({
        userId,
        newPassword: this.passwordForm.value.password
      }).subscribe({
        next: () => {
          alert('Password Updated Successfully 🔐');
          this.passwordForm.reset();
        },
        error: () => alert('Password update failed ❌')
      });
    }
  }
}
