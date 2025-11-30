import { Component, Input } from '@angular/core';
import { ReviewService } from './service/review.service';
import { InstantCrushReview, TmdbReview } from '../../types/review.type';

@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.html',
  styleUrl: './review.css',
})
export class ReviewComponent {
  @Input() mediaType!: 'movie' | 'show';
  reviews: TmdbReview[] = [];
  instantReviews: InstantCrushReview[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private reviewService: ReviewService) {}

  loadReviews(mediaId: string) {
    this.isLoading = true;
    this.errorMessage = '';

    let request$;

    if (this.mediaType === 'movie') {
      request$ = this.reviewService.getMovieReviews(mediaId);
    } else {
      request$ = this.reviewService.getTvShowReviews(mediaId);
    }

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

    this.reviewService.getInstantCrushReviews(mediaId).subscribe({
      next: (data) => {
        this.instantReviews = data;
      },
      error: (error) => {
        console.error('Failed to load Instant Crush reviews.', error);
      },
    });
  }
}
