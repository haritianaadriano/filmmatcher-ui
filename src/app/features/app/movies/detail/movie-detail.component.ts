import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { DashboardNav } from '../../../../shared/dashboard-nav/dashboard-nav.component';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { MovieDetailsApi } from '../../../../types/movies-api.type';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from '../../../../shared/review/review.component';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [DashboardNav, CommonModule, ReviewComponent],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MoviesService);
  private cdr = inject(ChangeDetectorRef);

  movie?: MovieDetailsApi; // plus besoin de `null`
  isLoading = true;
  productionCountriesStr = '';
  spokenLanguagesStr = '';
  id = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (!this.id) return;

    this.movieService.getMovieById(this.id).subscribe({
      next: (data) => {
        this.movie = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
      },
    });

    if (this.movie) {
      this.productionCountriesStr =
        this.movie.production_countries?.map((c: any) => c.name).join(', ') ??
        '';

      this.spokenLanguagesStr =
        this.movie.spoken_languages
          ?.map((l: any) => l.english_name)
          .join(', ') ?? '';
    }
  }

  //TODO: export and use as utils
  get formattedDuration(): string {
    return this.movie?.duration_seconds + ' seconds';
  }
}
