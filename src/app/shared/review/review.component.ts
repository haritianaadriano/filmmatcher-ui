import { Component, Input } from '@angular/core';
import { ReviewService } from './service/review.service';
import { InstantCrushReview, TmdbReview } from '../../types/review.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.css',
})
export class ReviewComponent {
  @Input() mediaType!: 'movie' | 'show';
  @Input() mediaId!: string;

  reviews: TmdbReview[] = [];
  instantReviews: InstantCrushReview[] = [];
  isLoading = false;
  errorMessage = '';
  showSidebar = false;

  constructor(private reviewService: ReviewService) {}

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;

    if (this.showSidebar) {
      this.loadReviews();
    }
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
      },
      error: (error) => {
        this.errorMessage = 'Failed to load reviews.';
        console.error(error);
        this.isLoading = false;
      },
    });

    this.reviewService.getInstantCrushReviews(this.mediaId).subscribe({
      next: (data) => {
        this.instantReviews = data;
      },
      error: (error) => {
        console.error('Failed to load Instant Crush reviews.', error);
      },
    });
  }
}
