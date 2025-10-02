import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { TvShowApi } from '../../../../types/tvshow.type';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TvshowsService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getTvShowsById(id: string): Observable<TvShowApi> {
    const token = this.authService.getToken();

    if (!token) {
      throw new Error('User is not authenticated');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<TvShowApi>(`${environment.apiURL}/tvshows/${id}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies', error);
          return throwError(() => error);
        }),
      );
  }

  getTvShows(page: number): Observable<TvShowApi[]> {
    const token = this.authService.getToken();

    if (!token) {
      throw new Error('User is not authenticated');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<
        TvShowApi[]
      >(`${environment.apiURL}/tvshows?page=${page}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies', error);
          return throwError(() => error);
        }),
      );
  }
}
