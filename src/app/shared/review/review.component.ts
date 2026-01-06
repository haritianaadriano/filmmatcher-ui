import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { ReviewService } from './service/review.service';
import {
  CreateReview,
  InstantCrushReview,
  TmdbReview,
} from '../../types/review.type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../features/profile/services/profile.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review.component.html',
  styleUrl: './review.css',
})
export class ReviewComponent {
  @Input() mediaType!: 'movie' | 'show';
  @Input() mediaId!: string;

  reviews: TmdbReview[] = [];
  instantReviews: InstantCrushReview[] = [];
  newInstantReview: CreateReview = new CreateReview();
  isLoading = false;
  errorMessage = '';
  showSidebar = false;
  activeTab: 'instant' | 'reviews' = 'reviews';
  isMobile = window.innerWidth < 640;

  constructor(
    private reviewService: ReviewService,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef,
  ) {}

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;

    if (this.showSidebar) {
      this.loadReviews();
    }
  }

  submitInstantReview() {
    if (!this.newInstantReview.content) {
      return;
    }

    const payload = {
      id: null,
      author: this.profileService.getConnectedUserId(),
      content: this.newInstantReview.content,
      created_at: null,
      updated_at: null,
      media_type: 'REVIEW',
    };

    this.reviewService
      .createInstantCrushReview(this.mediaId, [payload])
      .subscribe({
        next: (createdReviews) => {
          if (createdReviews?.length) {
            this.instantReviews.unshift(createdReviews[0]);
            this.cdr.detectChanges();
          }

          // reset input
          this.newInstantReview.content = '';
        },
        error: (err) => {
          console.error('Failed to create review', err);
        },
      });
  }

  private loadReviews() {
    this.isLoading = true;
    this.errorMessage = '';

    const request$ =
      this.mediaType === 'movie'
        ? this.reviewService.getMovieReviews(this.mediaId)
        : this.reviewService.getTvShowReviews(this.mediaId);

    request$.subscribe({
      next: (data) => {
        this.reviews = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = 'Failed to load reviews.';
        console.error(error);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });

    this.reviewService.getInstantCrushReviews(this.mediaId).subscribe({
      next: (data) => {
        this.instantReviews = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load Instant Crush reviews.', error);
      },
    });
  }
}
