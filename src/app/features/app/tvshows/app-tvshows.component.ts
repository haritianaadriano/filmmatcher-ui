import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TvshowsService } from './services/tvshows.service';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { TvShowApi } from '../../../types/tvshow.type';
import { Observable } from 'rxjs';
import { DashboardNav } from '../../../shared/dashboard-nav/dashboard-nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features-tvshows',
  imports: [DashboardNav, CommonModule],
  templateUrl: './tvshows.component.html',
  styleUrl: './tvshows.css',
})
export class AppTvShowComponent implements OnInit {
  private tvShowsService = inject(TvshowsService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  categories = ['TRENDING', 'POPULAR', 'TOP_RATED'];
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

  tvshows: TvShowApi[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.loadTvShows(this.selectedCategory, this.currentPage);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleGenreDropdown() {
    this.isGenreDropdownOpen = !this.isGenreDropdownOpen;
  }

  onSelectTvShow(tvshow: TvShowApi) {
    this.router.navigate(['/app/tvshows', tvshow.id]);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.isDropdownOpen = false;
    this.loadTvShows(category, this.currentPage);
  }

  selectGenre(genre: string) {
    this.selectedGenre = genre;
    this.currentPage = 1;
    this.isDropdownOpen = false;
    this.loadTvShowByGenre(genre, this.selectedCategory, this.currentPage, '');
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;

    if (this.selectedGenre) {
      // grab imdbToken from previous page's list

      // TODO: handle previous page with the previous page's token

      const imdbToken =
        this.tvshows.length > 0 ? this.tvshows[0].imdb_token : '';
      this.loadTvShowByGenre(
        this.selectedGenre,
        this.selectedCategory,
        this.currentPage,
        imdbToken,
      );
    } else {
      this.loadTvShows(this.selectedCategory, this.currentPage);
    }
  }

  private loadTvShowByGenre(
    genre: string,
    category: string,
    page: number,
    imdbToken: string,
  ) {
    this.loadData(() =>
      this.tvShowsService.getTvShowByGenre(genre, category, page, imdbToken),
    );
  }

  private loadTvShows(category: string, page: number) {
    this.loadData(() =>
      this.tvShowsService.getTvShowsByCategory(category, page),
    );
  }

  /**
   * Generic method to load data and handle loading / error state
   */
  private loadData<T>(apiCall: () => Observable<T>) {
    this.isLoading = true;
    this.errorMessage = null;
    this.tvshows = [];
    this.cdr.detectChanges();

    apiCall().subscribe({
      next: (data: T) => {
        this.tvshows = data as any; // cast if needed
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching data', err);
        this.errorMessage = err.message || 'Failed to load data';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
