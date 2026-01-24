import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CollectionService } from '../service/collections.service';
import { MovieApi } from '../../../../types/movies-api.type';
import { TvShowApi } from '../../../../types/tvshow.type';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../profile/services/profile.service';
import { DashboardNav } from '../../../../shared/dashboard-nav/dashboard-nav.component';

@Component({
  selector: 'app-collection-detail',
  standalone: true,
  imports: [CommonModule, DashboardNav],
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css'],
})
export class CollectionDetailComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  private collectionService = inject(CollectionService);
  private profileService = inject(ProfileService);

  private route = inject(ActivatedRoute);

  private userId!: string;
  private collectionId!: string;

  errorMessage: string | null = null;

  movies: MovieApi[] = [];
  tvshows: TvShowApi[] = [];
  name: string | null = null;
  genre: string | null = null;
  description: string | null = null;

  isLoadingMovies = false;
  isLoadingShows = false;

  activeTab: 'movies' | 'shows' = 'movies';

  ngOnInit(): void {
    // Get collectionId from route params
    const id = this.profileService.getConnectedUserId();
    if (!id) {
      this.errorMessage = 'User not connected';
      return;
    }
    this.userId = id;
    this.route.params.subscribe((params) => {
      this.collectionId = params['id'];
      if (this.collectionId) {
        this.loadMedias();
      }
    });
    this.route.queryParams.subscribe((queryObjects) => {
      this.name = queryObjects['name'];
      this.genre = queryObjects['genre'];
      this.description = queryObjects['description'];
    });
  }

  switchTab(tab: 'movies' | 'shows'): void {
    this.activeTab = tab;
  }

  private loadMovies(): void {
    this.isLoadingMovies = true;
    this.collectionService
      .fetchCollectionMedias(this.userId, this.collectionId, 'movie')
      .subscribe({
        next: (movies) => {
          this.movies = movies;
          this.isLoadingMovies = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage =
            err?.message ?? 'Failed to load collection movies';
          this.isLoadingMovies = false;
        },
      });
  }

  private loadShows(): void {
    this.isLoadingShows = true;
    this.collectionService
      .fetchCollectionMedias(this.userId, this.collectionId, 'show')
      .subscribe({
        next: (shows) => {
          this.tvshows = shows;
          this.isLoadingShows = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err?.message ?? 'Failed to load collection shows';
          this.isLoadingShows = false;
        },
      });
  }

  private loadMedias(): void {
    this.loadMovies();
    this.loadShows();
  }
}
