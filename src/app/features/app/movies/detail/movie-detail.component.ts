import { Component, OnInit, inject } from '@angular/core';
import { DashboardNav } from '../../../../shared/dashboard-nav/dashboard-nav.component';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { MovieDetailsApi } from '../../../../types/movies-api.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [DashboardNav, CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MoviesService);

  movie?: MovieDetailsApi; // plus besoin de `null`
  isLoading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.movieService.getMovieById(id).subscribe({
      next: (data) => {
        this.movie = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
