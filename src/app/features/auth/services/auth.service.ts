import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { concatMap, Observable, tap } from 'rxjs';
import { Authenticated } from '../../../types/authenticated.type';
import { UserProfile } from '../../../types/user.type';
import { environment } from '../../../../environments/environment';
import { SKIP_AUTH } from '../../../core/http-context';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private TOKEN_KEY = 'auth_token';
  private USER_KEY = 'user_email';

  constructor() {}

  //TODO: use .env app to store api url, and not changing manually the url

  private isBrowser(): boolean {
    return (
      typeof window !== 'undefined' && typeof sessionStorage !== 'undefined'
    );
  }

  public setToken(token: string, email: string): void {
    if (this.isBrowser()) {
      sessionStorage.setItem(this.TOKEN_KEY, token);
      sessionStorage.setItem(this.USER_KEY, email);
    }
  }

  public getUserEmail() {
    return this.isBrowser() ? sessionStorage.getItem(this.USER_KEY) : null;
  }

  public getToken(): string | null {
    return this.isBrowser() ? sessionStorage.getItem(this.TOKEN_KEY) : null;
  }

  public clearToken(): void {
    if (this.isBrowser()) {
      sessionStorage.removeItem(this.TOKEN_KEY);
      sessionStorage.removeItem(this.USER_KEY);
    }
  }

  public refreshToken(): Observable<Authenticated> {
    return this.http
      .get<Authenticated>(`${environment.apiURL}/auth/whoami`)
      .pipe(
        tap((response) => {
          this.setToken(response.token, response.email);
        }),
      );
  }

  signup(data: any): Observable<Authenticated> {
    return this.http
      .post<UserProfile>(`${environment.apiURL}/auth/signup`, data, {
        context: new HttpContext().set(SKIP_AUTH, true), // <-- options
      })
      .pipe(
        concatMap(() =>
          this.signin({ email: data.email, password: data.password }),
        ),
      );
  }

  signin(data: any): Observable<Authenticated> {
    return this.http
      .post<Authenticated>(`${environment.apiURL}/auth/signin`, data, {
        context: new HttpContext().set(SKIP_AUTH, true),
      })
      .pipe(
        tap((response) => {
          this.setToken(response.token, response.email);
        }),
      );
  }
}
