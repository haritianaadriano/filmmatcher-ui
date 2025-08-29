import { Component } from '@angular/core';
import { DashboardNav } from '../../../shared/dashboard-nav/dashboard-nav.component';

@Component({
  selector: 'app-features-movies',
  imports: [DashboardNav],
  templateUrl: './movies.component.html',
  styleUrl: './movies.css',
})
export class AppMoviesComponent {}
