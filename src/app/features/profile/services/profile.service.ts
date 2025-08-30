import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserProfile } from '../../../types/user.type';
import { AuthService } from '../../auth/services/auth.service';

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

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<UserProfile>(
        `https://intense-kamilah-personal-organization-adr-f5362332.koyeb.app/users?email=${email}`,
        { headers },
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching user profile', error);
          return throwError(() => error);
        }),
      );
  }
}
