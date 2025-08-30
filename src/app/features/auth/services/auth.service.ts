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

  private isBrowser(): boolean {
    return (
      typeof window !== 'undefined' && typeof sessionStorage !== 'undefined'
    );
  }

  public setToken(token: string): void {
    if (this.isBrowser()) {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  public getToken(): string | null {
    return this.isBrowser() ? sessionStorage.getItem(this.TOKEN_KEY) : null;
  }

  public clearToken(): void {
    if (this.isBrowser()) {
      sessionStorage.removeItem(this.TOKEN_KEY);
    }
  }

  public refreshToken(): Observable<Authenticated> {
    return this.http
      .get<Authenticated>(
        'https://intense-kamilah-personal-organization-adr-f5362332.koyeb.app/auth/whoami',
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
        'https://intense-kamilah-personal-organization-adr-f5362332.koyeb.app/auth/signup',
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
        'https://intense-kamilah-personal-organization-adr-f5362332.koyeb.app/auth/signin',
        data,
      )
      .pipe(
        tap((response) => {
          this.setToken(response.token);
        }),
      );
  }
}
