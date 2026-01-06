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
  ): Observable<SavedMovie[]> {
    return this.http
      .put<
        SavedMovie[]
      >(`${environment.apiURL}/users/${userId}/collections/${collectionId}/movies`, body)
      .pipe(
        catchError((error) => {
          console.error('Error when saving media', error);
          return throwError(() => error);
        }),
      );
  }
}
