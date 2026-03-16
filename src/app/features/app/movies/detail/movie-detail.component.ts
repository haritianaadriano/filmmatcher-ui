import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { DashboardNav } from '../../../../shared/dashboard-nav/dashboard-nav.component';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { MovieDetailsApi } from '../../../../types/movies-api.type';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from '../../../../shared/review/review.component';
import { CollectionPickerComponent } from '../../../../shared/save-media/collection-picker.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    DashboardNav,
    CommonModule,
    ReviewComponent,
    CollectionPickerComponent,
  ],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MoviesService);
  private cdr = inject(ChangeDetectorRef);
  private sanitizer = inject(DomSanitizer);
  private authService = inject(AuthService);

  movie?: MovieDetailsApi; // plus besoin de `null`
  isLoading = true;
  productionCountriesStr = '';
  spokenLanguagesStr = '';
  id = '';
  safeStreamUrl!: SafeResourceUrl;
  isPlayerOpen = false;

  openPlayer() {
    this.isPlayerOpen = true;
  }

  closePlayer() {
    this.isPlayerOpen = false;
  }

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

  isLanguageModalOpen = false;

  openLanguageChoice() {
    this.isLanguageModalOpen = true;
  }

  closeLanguageChoice() {
    this.isLanguageModalOpen = false;
  }

  watchVO() {
    this.closeLanguageChoice();
    this.generateStreamUrl(); 
  }

  watchVF() {
    this.closeLanguageChoice();
    this.generateFrenchStreamUrl(); 
  }

  closePlayerModal() {
    this.safeStreamUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  generateFrenchStreamUrl() {
    const rawUrl = `https://frenchcloud.cam/movie/${this.movie?.imdb_id}`;
    this.safeStreamUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }

  generateStreamUrl() {
    const rawUrl = `https://vidlink.pro/movie/${this.id}?primaryColor=63b8bc&secondaryColor=a2a2a2&iconColor=eefdec&icons=default&player=jw&title=true&poster=true&autoplay=false&nextbutton=false`;
    this.safeStreamUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }

  //TODO: export and use as utils
  get formattedDuration(): string {
    return this.movie?.duration_seconds + ' minutes';
  }
}
