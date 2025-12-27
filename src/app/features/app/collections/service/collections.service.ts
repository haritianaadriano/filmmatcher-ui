import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Collection,
  CreateCollection,
} from '../../../../types/collection.type';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private http = inject(HttpClient);

  createCollection(
    userId: string,
    body: CreateCollection,
  ): Observable<Collection[]> {
    return this.http
      .put<Collection[]>(`/users/${userId}/collections`, body)
      .pipe(
        catchError((error) => {
          console.error('Error creating review', error);
          return throwError(() => error);
        }),
      );
  }
}
