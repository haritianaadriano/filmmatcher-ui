import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TitlesResponse } from '../../../types/movie.type';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);

  //TODO: Do not forget to change the URL with your own API

  getMovies(): Observable<TitlesResponse> {
    return this.http.get<TitlesResponse>('https://api.imdbapi.dev/titles');
  }

  getMoviesByTitle(title: string): Observable<TitlesResponse> {
    return this.http.get<TitlesResponse>(
      `https://api.imdbapi.dev/search/titles?query=${title}`,
    );
  }
}
