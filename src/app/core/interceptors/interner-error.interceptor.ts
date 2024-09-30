import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const internerErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        // Client-side error (network error)
        errorMessage = `Network error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Server error: ${error.status} - ${error.message}`;
      }

      return throwError(errorMessage);
    })
  );
}