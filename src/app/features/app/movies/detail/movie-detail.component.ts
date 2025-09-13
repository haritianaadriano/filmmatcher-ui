import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  movie?: MovieDetailsApi; // plus besoin de `null`
  isLoading = true;
  productionCountriesStr = '';
  spokenLanguagesStr = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.movieService.getMovieById(id).subscribe({
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
  if (!this.movie?.duration_seconds) return '';

  const totalMinutes = Math.floor(this.movie.duration_seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}h ${minutes
      .toString()
      .padStart(2, '0')}`;
  } else {
    return `${minutes} min`; // < 1h
  }
}
}
