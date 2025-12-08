import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TvShowApi, TvShowDetailsApi } from '../../../../types/tvshow.type';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TvshowsService {
  private http = inject(HttpClient);

  getTvShowsById(id: string): Observable<TvShowDetailsApi> {
    return this.http
      .get<TvShowDetailsApi>(`${environment.apiURL}/tvshows/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies', error);
          return throwError(() => error);
        }),
      );
  }

  getTvShowsByCategory(
    category: string,
    page: number,
  ): Observable<TvShowApi[]> {
    return this.http
      .get<
        TvShowApi[]
      >(`${environment.apiURL}/tvshows?page=${page}&category=${category}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies', error);
          return throwError(() => error);
        }),
      );
  }

  getTvShowByGenre(
    genre: string,
    category: string,
    page: number,
    imdbToken: string,
  ): Observable<TvShowApi[]> {
    return this.http
      .get<
        TvShowApi[]
      >(`${environment.apiURL}/tvshows?genre=${genre}&category=${category}&page=${page}&imdb_token=${imdbToken}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching tv shows', error);
          return throwError(() => error);
        }),
      );
  }
}
