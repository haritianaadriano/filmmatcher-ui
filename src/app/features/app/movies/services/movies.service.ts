import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { MovieApi, MovieDetailsApi } from '../../../../types/movies-api.type';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getMovieById(id: string): Observable<MovieDetailsApi> {
    const token = this.authService.getToken();

    if (!token) {
      return throwError(() => new Error('User is not authenticated'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<MovieDetailsApi>(
        `https://instantcrush-api-preprod.onrender.com/movies/${id}`,
        { headers },
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies', error);
          return throwError(() => error);
        }),
      );
  }

  getMoviesByGenre(genre: string, page: number): Observable<MovieApi[]> {
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
      >(`https://instantcrush-api-preprod.onrender.com/movies?genre=${genre}&page=${page}&page_size=20`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies', error);
          return throwError(() => error);
        }),
      );
  }


  getMoviesByCategory(category: string, page: number): Observable<MovieApi[]> {
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
      >(`https://instantcrush-api-preprod.onrender.com/movies?category=${category}&page=${page}&page_size=20`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies', error);
          return throwError(() => error);
        }),
      );
  }
}
