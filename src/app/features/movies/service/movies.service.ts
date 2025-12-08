import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TitlesResponse } from '../../../types/movie.type';
import { SKIP_AUTH } from '../../../core/http-context';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);

  //TODO: Do not forget to change the URL with your own API

  getMovies(): Observable<TitlesResponse> {
    return this.http.get<TitlesResponse>('https://api.imdbapi.dev/titles', {
      context: new HttpContext().set(SKIP_AUTH, true),
    });
  }

  getMoviesByTitle(title: string): Observable<TitlesResponse> {
    return this.http.get<TitlesResponse>(
      `https://api.imdbapi.dev/search/titles?query=${title}`,
      {
        context: new HttpContext().set(SKIP_AUTH, true),
      },
    );
  }
}
