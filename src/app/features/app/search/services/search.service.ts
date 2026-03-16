import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { catchError, throwError } from 'rxjs';
import { MovieApi } from '../../../../types/movies-api.type';
import { environment } from '../../../../../environments/environment';
import { TvShowApi } from '../../../../types/tvshow.type';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  searchMoviesByTitle(title: string) {
    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<
        MovieApi[]
      >(`${environment.apiURL}/movies?query=${title}&page=1`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies', error);
          return throwError(() => error);
        }),
      );
  }

  searchTvShowsByTitle(title: string) {
    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<
        TvShowApi[]
        // nous allons definir une categorie par defaut comme l'API ne marche pas sans mention de categorie
      >(
        `${environment.apiURL}/tvshows?query=${title}&page=1&category=TRENDING`,
        { headers },
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching shows', error);
          return throwError(() => error);
        }),
      );
  }

  searchMediaByTitle(title: string) {
    return forkJoin({
      movies: this.searchMoviesByTitle(title),
      shows: this.searchTvShowsByTitle(title),
    });
  }
}
