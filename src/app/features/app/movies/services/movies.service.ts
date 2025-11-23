import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MovieApi, MovieDetailsApi } from '../../../../types/movies-api.type';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);

  getMovieById(id: string): Observable<MovieDetailsApi> {
    return this.http
      .get<MovieDetailsApi>(`${environment.apiURL}/movies/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies', error);
          return throwError(() => error);
        }),
      );
  }

  getMoviesByGenre(
    genre: string,
    category: string,
    page: number,
    imdbToken: string,
  ): Observable<MovieApi[]> {
    return this.http
      .get<
        MovieApi[]
      >(`${environment.apiURL}/movies?genre=${genre}&category=${category}&page=${page}&page_size=20&imdb_token=${imdbToken}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies', error);
          return throwError(() => error);
        }),
      );
  }

  getMoviesByCategory(category: string, page: number): Observable<MovieApi[]> {
    return this.http
      .get<
        MovieApi[]
      >(`${environment.apiURL}/movies?category=${category}&page=${page}&page_size=20`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies', error);
          return throwError(() => error);
        }),
      );
  }
}
