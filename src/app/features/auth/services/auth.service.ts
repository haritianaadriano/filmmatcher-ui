import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { concatMap, Observable, tap } from 'rxjs';
import { Authenticated } from '../../../types/authenticated.type';
import { UserProfile } from '../../../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private TOKEN_KEY = 'auth_token';

  constructor() {}

  public setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  public clearToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  public refreshToken(): Observable<Authenticated> {
    return this.http
      .get<Authenticated>(
        'https://instantcrush-api-preprod.onrender.com/auth/whoami',
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        },
      )
      .pipe(
        tap((response) => {
          this.setToken(response.token);
        }),
      );
  }

  signup(data: any): Observable<Authenticated> {
    return this.http
      .post<UserProfile>(
        'https://instantcrush-api-preprod.onrender.com/auth/signup',
        data,
      )
      .pipe(
        concatMap(() =>
          this.signin({ email: data.email, password: data.password }),
        ),
      );
  }

  signin(data: any): Observable<Authenticated> {
    return this.http
      .post<Authenticated>(
        'https://instantcrush-api-preprod.onrender.com/auth/signin',
        data,
      )
      .pipe(
        tap((response) => {
          this.setToken(response.token);
        }),
      );
  }
}
