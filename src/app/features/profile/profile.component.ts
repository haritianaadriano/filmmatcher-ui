import { Component } from '@angular/core';
import { DashboardNav } from '../../shared/dashboard-nav/dashboard-nav.component';

@Component({
  selector: 'app-profile',
  imports: [DashboardNav],
  templateUrl: './profile.component.html',
  styleUrl: './profile.css',
})
export class Profile {}
