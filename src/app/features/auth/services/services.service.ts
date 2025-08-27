import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  signup(data: any) {
    return this.http.post(
      'https://instantcrush-api-preprod.onrender.com/auth/signup',
      data,
    );
  }

  signin(data: any) {
    return this.http.post(
      'https://instantcrush-api-preprod.onrender.com/auth/signin',
      data,
    );
  }
}
