import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../features/auth/services/auth.service';
import { Authenticated } from '../types/authenticated.type';
import { SKIP_AUTH, SKIP_REFRESH } from './http-context';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getToken(); // your method or localStorage
  let request = req;

  if (req.context.get(SKIP_REFRESH)) {
    return next(req);
  }

  if (req.context.get(SKIP_AUTH)) {
    return next(req);
  }

  if (accessToken) {
    request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      //
      // handle access token expired
      //
      if (error.status === 401 || error.status === 403) {
        // Prevent multiple refresh loops
        if (req.headers.get('X-Refresh-Attempt')) {
          authService.logout(); // clear tokens & navigate
          return throwError(() => error);
        }

        return authService.refreshToken().pipe(
          switchMap((newToken: Authenticated) => {
            authService.setToken(newToken.token, newToken.email);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken.token}`,
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
