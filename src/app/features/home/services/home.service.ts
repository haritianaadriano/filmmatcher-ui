import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private http = inject(HttpClient);

  getImageUrls(): Observable<string[]> {
    return this.http
      .get<any>('https://api.imdbapi.dev/titles')
      .pipe(
        map((response: any) =>
          response.titles.map((t: any) => t.primaryImage.url),
        ),
      );
  }
}
