import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TvshowsService } from './services/tvshows.service';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { TvShowApi } from '../../../types/tvshow.type';
import { concatMap } from 'rxjs';
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
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  categories = ['TRENDING', 'POPULAR', 'TOP_RATED', 'UPCOMING', 'NOW_PLAYING'];
  selectedCategory = 'TRENDING';
  currentPage = 1;
  totalPages = 50;
  isDropdownOpen = false;

  tvshows: TvShowApi[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.loadTvShows(this.selectedCategory, this.currentPage);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
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

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadTvShows(this.selectedCategory, this.currentPage);
  }

  private loadTvShows(category: string, page: number) {
    this.isLoading = true;
    this.errorMessage = null;
    this.tvshows = [];
    this.cdr.detectChanges();

    // Toujours refresh token avant d'appeler l'API
    this.authService
      .refreshToken()
      .pipe(
        concatMap(() =>
          this.tvShowsService.getTvShowsByCategory(category, page),
        ),
      )
      .subscribe({
        next: (tvshows) => {
          this.tvshows = tvshows;
          this.isLoading = false;
          this.cdr.detectChanges();
          console.log('TV shows loaded', tvshows);
        },
        error: (err) => {
          console.error('Error fetching tv shows', err);
          this.errorMessage = err.message || 'Failed to load tv shows';
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      });
  }
}
