import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DashboardNav } from '../../../shared/dashboard-nav/dashboard-nav.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from './services/search.service';
import { AuthService } from '../../auth/services/auth.service';
import { MovieApi } from '../../../types/movies-api.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [DashboardNav, CommonModule, FormsModule],
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
  filteredMovies: MovieApi[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.filteredMovies = [...this.movies];
  }

  onSelectMovie(movie: MovieApi) {
    this.router.navigate(['/app/movies', movie.id]);
  }

  onSearchClick() {
    const query = this.searchQuery.trim();
    if (!query) {
      this.filteredMovies = [];
      return;
    }

    this.isLoading = true;
    this.searchService.searchMoviesByTitle(query).subscribe({
      next: (movies: MovieApi[]) => {
        this.movies = movies;
        this.filteredMovies = [...movies];
        this.isLoading = false;
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
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        } else {
          this.movies = [];
          this.filteredMovies = [];
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      },
    });
  }
}
