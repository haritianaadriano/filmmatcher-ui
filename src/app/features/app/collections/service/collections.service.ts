import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Collection,
  CreateCollection,
} from '../../../../types/collection.type';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private http = inject(HttpClient);

  createCollection(
    userId: string,
    body: CreateCollection,
  ): Observable<Collection[]> {
    return this.http
      .put<
        Collection[]
      >(`${environment.apiURL}/users/${userId}/collections`, body)
      .pipe(
        catchError((error) => {
          console.error('Error creating collections', error);
          return throwError(() => error);
        }),
      );
  }

  fetchUserCollections(userId: string): Observable<Collection[]> {
    return this.http
      .get<Collection[]>(`${environment.apiURL}/users/${userId}/collections`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching collections', error);
          return throwError(() => error);
        }),
      );
  }
}
