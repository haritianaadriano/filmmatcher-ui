import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../../types/movie.type';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      'https://instantcrush-api-latest.onrender.com/movies/free',
    );
  }

  getMoviesByTitle(title: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `https://instantcrush-api-latest.onrender.com/movies/free?query=${title}`,
    );
  }
}
