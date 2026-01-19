import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { concatMap, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { SKIP_AUTH } from '../../../core/http-context';
import { UserProfile } from '../../../types/user.type';
import { RefreshTokenResponse } from '../../../types/authenticated.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_email';

  /* ---------------- Utils ---------------- */

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!sessionStorage;
  }

  /* ---------------- Session ---------------- */

  private storeSession(response: RefreshTokenResponse, email?: string): void {
    if (!this.isBrowser()) return;

    sessionStorage.setItem(this.TOKEN_KEY, response.access_token);

    if (email) {
      sessionStorage.setItem(this.USER_KEY, email);
    }
  }

  getToken(): string | null {
    return this.isBrowser() ? sessionStorage.getItem(this.TOKEN_KEY) : null;
  }

  getUserEmail(): string | null {
    return this.isBrowser() ? sessionStorage.getItem(this.USER_KEY) : null;
  }

  clearSession(): void {
    if (!this.isBrowser()) return;

    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /* ---------------- API ---------------- */

  signup(data: any): Observable<RefreshTokenResponse> {
    return this.http
      .post<UserProfile>(`${environment.apiURL}/auth/signup`, data, {
        context: new HttpContext().set(SKIP_AUTH, true),
      })
      .pipe(
        concatMap(() =>
          this.signin({ email: data.email, password: data.password }),
        ),
      );
  }

  signin(data: any): Observable<RefreshTokenResponse> {
    return this.http
      .post<RefreshTokenResponse>(`${environment.apiURL}/auth/signin`, data, {
        context: new HttpContext().set(SKIP_AUTH, true),
        withCredentials: true, // refresh cookie
      })
      .pipe(
        tap((response) => {
          this.storeSession(response, data.email);
        }),
      );
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    return this.http
      .post<RefreshTokenResponse>(
        `${environment.apiURL}/auth/refresh`,
        {},
        {
          withCredentials: true, // cookie sent automatically
        },
      )
      .pipe(
        tap((response) => {
          this.storeSession(response);
        }),
      );
  }

  whoami(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.apiURL}/auth/whoami`);
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/auth/login']);
  }
}
