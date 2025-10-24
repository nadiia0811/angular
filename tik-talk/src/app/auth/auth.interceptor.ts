import { inject } from "@angular/core";
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth";
import { 
  catchError,
  switchMap, 
  throwError, 
  BehaviorSubject,
  filter,
  tap
} from "rxjs";

let isRefreshing$ = new BehaviorSubject<boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (req: any, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) {
    return next(req);
  }

  if (isRefreshing$.value) {
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
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);

    return authService.refreshAuthToken()
      .pipe(
        switchMap((res) => {
          isRefreshing$.next(false);
          return next(addTokenToRequest(request, res.access_token))
          .pipe(
            tap(() => isRefreshing$.next(false))
          );
        })      
      );
  }

  if (request.url.includes("refresh")) {
    return next(addTokenToRequest(request, authService.token!));
  }

  return isRefreshing$.pipe(
    filter(isRefreshing => !isRefreshing),
    switchMap(
      response => {
        return next(addTokenToRequest(request, authService.token!));
      }
    )
  )
}

const addTokenToRequest = (req: HttpRequest<any>, token: string) => {
  const newRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  return newRequest;
}
