import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardNav } from '../../shared/dashboard-nav/dashboard-nav.component';
import { ProfileService } from './services/profile.service';
import { AuthService } from '../auth/services/auth.service';
import { UserProfile } from '../../types/user.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [DashboardNav, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  userProfile: UserProfile | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const email = this.authService.getUserEmail();

    if (!email) {
      this.errorMessage = 'User email not found';
      this.isLoading = false;
      return;
    }

    this.authService.whoami().subscribe({
      next: (profile) => {
        this.profileService.storeConnectedUserId(profile.id);
        this.userProfile = profile;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load profile';
        this.isLoading = false;
        this.cdr.detectChanges();
        console.error('Error fetching profile', err);
      },
    });
  }
}
