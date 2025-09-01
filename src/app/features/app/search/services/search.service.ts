import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { catchError, throwError } from 'rxjs';
import { MovieApi } from '../../../../types/movies-api.type';

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
      >(`https://instantcrush-api-preprod.onrender.com/movies?query=${title}&page=1`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies', error);
          return throwError(() => error);
        }),
      );
  }
}
