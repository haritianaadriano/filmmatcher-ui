import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../features/auth/services/auth.service';
import { Authenticated } from '../types/authenticated.type';
import { SKIP_AUTH } from './http-context';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getToken(); // your method or localStorage
  let request = req;

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
      if (
        (error.status === 401 || error.status === 403) &&
        !request.url.includes('/auth/refresh')
      ) {
        return authService.refreshToken().pipe(
          switchMap((newToken: Authenticated) => {
            // Save new token
            authService.setToken(newToken.token, newToken.email);

            // Retry the original request with the new token
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken.token}`,
              },
            });

            return next(retryReq);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
