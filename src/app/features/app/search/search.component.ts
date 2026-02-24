import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DashboardNav } from '../../../shared/dashboard-nav/dashboard-nav.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from './services/search.service';
import { AuthService } from '../../auth/services/auth.service';
import { MovieApi } from '../../../types/movies-api.type';
import { Router } from '@angular/router';
import { TvShowApi } from '../../../types/tvshow.type';
import { MediaListComponent } from '../../../shared/media-list/media-list.component';

@Component({
  selector: 'app-search',
  imports: [DashboardNav, CommonModule, FormsModule, MediaListComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.css'],
})
export class AppSearchMovieComponent implements OnInit {
  private searchService = inject(SearchService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  searchQuery = '';
  movies: MovieApi[] = [];
  shows: TvShowApi[] = [];
  filteredMovies: MovieApi[] = [];
  filteredShows: TvShowApi[] = [];
  isLoadingMovies = false;
  isLoadingShows = false;

  ngOnInit(): void {
    this.filteredMovies = [...this.movies];
  }

  onSelectMovie(movie: MovieApi) {
    this.router.navigate(['/app/movies', movie.id]);
  }

  onSelectTvShow(tvshow: TvShowApi) {
    this.router.navigate(['/app/tvshows', tvshow.id]);
  }

  onSearchClick() {
    const query = this.searchQuery.trim();
    if (!query) {
      this.filteredMovies = [];
      return;
    }

    this.isLoadingMovies = true;
    this.isLoadingShows = true;
    this.searchService.searchMediaByTitle(query).subscribe({
      next: (media) => {
        this.movies = media.movies;
        this.filteredMovies = [...media.movies];
        this.isLoadingMovies = false;
        this.shows = media.shows;
        this.filteredShows = [...media.shows];
        this.isLoadingShows = false;
        this.cdr.detectChanges();
      },
      error: async (err) => {
        // Si erreur due au token expiré, on refresh le token
        if (err.status === 401) {
          try {
            await this.authService.refreshToken();
            // Retry la recherche après refresh
            this.onSearchClick();
          } catch (refreshErr) {
            console.error('Refresh token failed', refreshErr);
            this.movies = [];
            this.filteredMovies = [];
            this.shows = [];
            this.filteredShows = [];
            this.isLoadingMovies = false;
            this.isLoadingShows = false;
            this.cdr.detectChanges();
          }
        } else {
          this.movies = [];
          this.filteredMovies = [];
          this.isLoadingMovies = false;
          this.isLoadingShows = false;
          this.cdr.detectChanges();
        }
      },
    });
  }
}
