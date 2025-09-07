import { Component, OnInit } from '@angular/core';
import { DashboardNav } from '../../../../shared/dashboard-nav/dashboard-nav.component';

@Component({
  selector: 'app-id',
  imports: [DashboardNav],
  templateUrl: './movie-detail.component.html',
  styleUrl: './id.css',
})
export class MovieDetailComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
