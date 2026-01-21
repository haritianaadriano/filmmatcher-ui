import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserProfile } from '../../../types/user.type';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly USER_ID_KEY = 'connected_user_id';

  getUserProfileByEmail(email: string): Observable<UserProfile> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('User is not authenticated'));
    }

    return this.http
      .get<UserProfile>(`${environment.apiURL}/users?email=${email}`)
      .pipe(
        tap((user) => {
          // store once when fetched
          this.storeConnectedUserId(user.id);
        }),
        catchError((error) => {
          console.error('Error fetching user profile', error);
          return throwError(() => error);
        }),
      );
  }

  /** 🔒 PRIVATE: store connected user id */
  storeConnectedUserId(userId: string): void {
    localStorage.setItem(this.USER_ID_KEY, userId);
  }

  /** ✅ PUBLIC: get connected user id */
  getConnectedUserId(): string | null {
    return localStorage.getItem(this.USER_ID_KEY);
  }

  /** Optional: clear on logout */
  clearConnectedUser(): void {
    localStorage.removeItem(this.USER_ID_KEY);
  }
}
