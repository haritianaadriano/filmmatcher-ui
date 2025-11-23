import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserProfile } from '../../../types/user.type';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getUserProfileByEmail(email: string): Observable<UserProfile> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('User is not authenticated'));
    }

    return this.http
      .get<UserProfile>(`${environment.apiURL}/users?email=${email}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching user profile', error);
          return throwError(() => error);
        }),
      );
  }
}
