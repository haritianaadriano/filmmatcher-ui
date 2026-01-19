import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from '../features/auth/services/auth.service';
import { RefreshTokenResponse } from '../types/authenticated.type';
import { SKIP_AUTH, SKIP_REFRESH } from './http-context';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getToken();

  let request = req;

  // skip explicit
  if (req.context.get(SKIP_AUTH) || req.context.get(SKIP_REFRESH)) {
    return next(req);
  }

  // attach access token
  if (accessToken) {
    request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // access token expired
      if (error.status === 401 || error.status === 403) {
        // prevent infinite refresh loop
        if (req.headers.get('X-Refresh-Attempt')) {
          authService.logout();
          return throwError(() => error);
        }

        return authService.refreshToken().pipe(
          switchMap((_response: RefreshTokenResponse) => {
            const newAccessToken = authService.getToken();

            if (!newAccessToken) {
              authService.logout();
              return throwError(() => error);
            }

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`,
                'X-Refresh-Attempt': 'true',
              },
            });

            return next(retryReq);
          }),
          catchError(() => {
            authService.logout();
            return throwError(() => error);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
