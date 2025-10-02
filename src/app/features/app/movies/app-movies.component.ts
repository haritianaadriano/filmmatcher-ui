import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DashboardNav } from '../../../shared/dashboard-nav/dashboard-nav.component';
import { CommonModule } from '@angular/common';
import { MoviesService } from './services/movies.service';
import { MovieApi } from '../../../types/movies-api.type';
import { AuthService } from '../../auth/services/auth.service';
import { concatMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-features-movies',
  imports: [DashboardNav, CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.css',
})
export class AppMoviesComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  categories = ['TRENDING', 'POPULAR', 'TOP_RATED', 'UPCOMING', 'NOW_PLAYING'];
  genres = [
    'Romance',
    'Action',
    'Comedy',
    'Horror',
    'Drama',
    'Sci-Fi',
    'Documentary',
    'Animation',
  ];
  selectedCategory = 'TRENDING';
  selectedGenre = '';
  currentPage = 1;
  totalPages = 50;
  isDropdownOpen = false;
  isGenreDropdownOpen = false;

  movies: MovieApi[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.loadMovies(this.selectedCategory, this.currentPage);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleGenreDropdown() {
    this.isGenreDropdownOpen = !this.isGenreDropdownOpen;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.isDropdownOpen = false;
    this.loadMovies(category, this.currentPage);
  }

  selectGenre(genre: string) {
    this.selectedGenre = genre;
    this.currentPage = 1;
    this.isDropdownOpen = false;
    this.loadMoviesByGenre(genre, this.selectedCategory, this.currentPage, '');
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    if (this.selectedGenre) {
      // grab imdbToken from previous page's list

      // TODO: handle previous page with the previous page's token

      const imdbToken = this.movies.length > 0 ? this.movies[0].imdb_token : '';
      this.loadMoviesByGenre(
        this.selectedGenre,
        this.selectedCategory,
        this.currentPage,
        imdbToken,
      );
    } else {
      this.loadMovies(this.selectedCategory, this.currentPage);
    }
  }

  onSelectMovie(movie: MovieApi) {
    this.router.navigate(['/app/movies', movie.id]);
  }

  private loadMoviesByGenre(
    genre: string,
    category: string,
    page: number,
    imdbToken: string,
  ) {
    this.isLoading = true;
    this.errorMessage = null;
    this.movies = [];
    this.cdr.detectChanges();

    // Toujours refresh token avant d'appeler l'API
    this.authService
      .refreshToken()
      .pipe(
        concatMap(() =>
          this.moviesService.getMoviesByGenre(
            genre,
            category,
            this.currentPage,
            imdbToken,
          ),
        ),
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

  private loadMovies(category: string, page: number) {
    this.isLoading = true;
    this.errorMessage = null;
    this.movies = [];
    this.cdr.detectChanges();

    // Toujours refresh token avant d'appeler l'API
    this.authService
      .refreshToken()
      .pipe(
        concatMap(() => this.moviesService.getMoviesByCategory(category, page)),
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
}
