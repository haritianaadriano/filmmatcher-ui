import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Navbar } from '../../../shared/navbar/navbar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../service/movies.service';
import { TitlesResponse, Title } from '../../../types/movie.type';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [Navbar, CommonModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  searchQuery = '';
  movies: Title[] = [];
  filteredMovies: Title[] = [];
  loading = true;
  moviesLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MoviesService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // écoute du query param
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['search'] || '';
      this.applyFilter();
    });

    // chargement initial de tous les films
    this.movieService.getMovies().subscribe({
      next: (response: TitlesResponse) => {
        this.movies = response.titles ?? [];
        this.applyFilter();
      },
      error: () => {
        this.movies = [];
        this.applyFilter();
      },
    });
  }

  applyFilter(): void {
    this.loading = true;
    this.moviesLoaded = false;
    this.filteredMovies = [];
    this.cdr.detectChanges(); // 👈 force la détection pour voir le skeleton immédiatement

    // met à jour le query param
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.searchQuery || null },
      queryParamsHandling: 'merge',
    });

    if (!this.searchQuery) {
      // pas de recherche → afficher tous les films
      this.filteredMovies = this.movies;
      this.handleMoviesLoaded();
      return;
    }

    // recherche par titre
    this.movieService.getMoviesByTitle(this.searchQuery).subscribe({
      next: (response: TitlesResponse) => {
        this.filteredMovies = response.titles ?? [];
        this.handleMoviesLoaded();
      },
      error: () => {
        this.filteredMovies = [];
        this.handleMoviesLoaded();
      },
    });
  }

  private handleMoviesLoaded(): void {
    this.loading = false;
    this.moviesLoaded = true;
    this.cdr.detectChanges();
  }
}
