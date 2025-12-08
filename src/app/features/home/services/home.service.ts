import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SKIP_AUTH } from '../../../core/http-context';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private http = inject(HttpClient);

  getImageUrls(): Observable<string[]> {
    return this.http
      .get<any>('https://api.imdbapi.dev/titles', {
        context: new HttpContext().set(SKIP_AUTH, true),
      })
      .pipe(
        map((response: any) =>
          response.titles.map((t: any) => t.primaryImage.url),
        ),
      );
  }
}
