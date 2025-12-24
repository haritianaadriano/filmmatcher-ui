import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import {
  CreateReview,
  InstantCrushReview,
  TmdbReview,
} from '../../../types/review.type';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);

  getTvShowReviews(tvShowId: string): Observable<TmdbReview[]> {
    return this.http
      .get<
        TmdbReview[]
      >(`${environment.apiURL}/tvshows/${tvShowId}/reviews?page=1`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching reviews', error);
          return throwError(() => error);
        }),
      );
  }

  getMovieReviews(movieId: string): Observable<TmdbReview[]> {
    return this.http
      .get<
        TmdbReview[]
      >(`${environment.apiURL}/movies/${movieId}/reviews?page=1`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching reviews', error);
          return throwError(() => error);
        }),
      );
  }

  getInstantCrushReviews(mediaId: string): Observable<InstantCrushReview[]> {
    return this.http
      .get<
        InstantCrushReview[]
      >(`${environment.apiURL}/medias/${mediaId}/instant-crush/reviews`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching reviews', error);
          return throwError(() => error);
        }),
      );
  }

  createInstantCrushReview(
    mediaId: string,
    body: CreateReview[],
  ): Observable<InstantCrushReview[]> {
    return this.http
      .put<
        InstantCrushReview[]
      >(`${environment.apiURL}/medias/${mediaId}/instant-crush/reviews`, body)
      .pipe(
        catchError((error) => {
          console.error('Error creating review', error);
          return throwError(() => error);
        }),
      );
  }
}
