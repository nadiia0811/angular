import { inject } from "@angular/core";
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth";
import { catchError, switchMap, throwError } from "rxjs";


let isRefreshing = false;

export const authTokenInterceptor: HttpInterceptorFn = (req: any, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) {
    return next(req);
  }

  if (isRefreshing) {
    return refreshAndProceed(authService, req, next);
  }

  return next(addTokenToRequest(req, token))
    .pipe(
      catchError((error) => {
        if (error.status === 401 || error.status === 403) {
          return refreshAndProceed(authService, req, next);
        }
        return throwError(() => error);
      })
    );
};

const refreshAndProceed = (
  authService: AuthService,
  request: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  if (!isRefreshing) {
    isRefreshing = true;

    return authService.refreshAuthToken()
      .pipe(
        switchMap((res) => {
          isRefreshing = false;
          return next(addTokenToRequest(request, res.access_token));
        })      
      );
  }
  return next(addTokenToRequest(request, authService.token!));
}

const addTokenToRequest = (req: HttpRequest<any>, token: string) => {
  const newRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  return newRequest;
}
