import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DashboardNav } from '../../../shared/dashboard-nav/dashboard-nav.component';
import { CommonModule } from '@angular/common';
import { MoviesService } from './services/movies.service';
import { MovieApi } from '../../../types/movies-api.type';
import { AuthService } from '../../auth/services/auth.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-features-movies',
  imports: [DashboardNav, CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.css',
})
export class AppMoviesComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private authSerivce = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  categories = ['TRENDING', 'POPULAR', 'TOP_RATED', 'UPCOMING', 'NOW_PLAYING'];
  selectedCategory = 'POPULAR';
  isDropdownOpen = false;

  movies: MovieApi[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.isDropdownOpen = false;
    this.fetchMovies(category);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.authSerivce
      .refreshToken()
      .pipe(
        concatMap(() => {
          return this.moviesService.getMoviesByCategory(this.selectedCategory);
        }),
      )
      .subscribe({
        next: (movies) => {
          this.movies = movies;
          this.isLoading = false;
          this.cdr.detectChanges();
          console.log('Movies loaded', movies);
        },
        error: (err) => {
          console.error('Error fetching movies', err);
          this.errorMessage = err.message || 'Failed to load movies';
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      });
  }

  private fetchMovies(category: string) {
    this.isLoading = true;
    this.errorMessage = null;
    this.moviesService.getMoviesByCategory(category).subscribe({
      next: (movies) => {
        this.movies = movies;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching movies', err);
        this.errorMessage = 'Failed to load movies';
        this.isLoading = false;
      },
    });
  }
}
