import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { GiveSavedMedia, SavedMovie } from '../../../types/SavedMovie.type';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SaveMediaService {
  private http = inject(HttpClient);

  saveMedia(
    userId: string,
    collectionId: string,
    body: GiveSavedMedia,
    mediaType: string,
  ): Observable<SavedMovie[]> {
    const url = mediaType === "movie" ? `${environment.apiURL}/users/${userId}/collections/${collectionId}/movies`
                : `${environment.apiURL}/users/${userId}/collections/${collectionId}/tvshows`
    return this.http
      .post<
        SavedMovie[]
      >(url, body)
      .pipe(
        catchError((error) => {
          console.error('Error when saving media', error);
          return throwError(() => error);
        }),
      );
  }
}
