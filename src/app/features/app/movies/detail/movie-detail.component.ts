import { Component, inject, OnInit } from '@angular/core';
import { DashboardNav } from '../../../../shared/dashboard-nav/dashboard-nav.component';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { MovieDetailsApi } from '../../../../types/movies-api.type';

@Component({
  selector: 'app-id',
  imports: [DashboardNav],
  templateUrl: './movie-detail.component.html',
  styleUrl: './id.css',
})
export class MovieDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MoviesService);

  movie: MovieDetailsApi | null = null;
  isLoading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieById(id).subscribe((data) => {
        this.movie = data;
        this.isLoading = false;
      });
    }
  }
}
