import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthCookieService } from './authentication-cookie.service';
import { JwtInterceptorService } from './jwt-interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService {
  excludes = ['login', 'logout', 'user/info'];

  constructor(private _jwtInterceptorService: JwtInterceptorService, private _cookie: AuthCookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          if (this.isExclude(this.excludes, request.url)) {
            return throwError(error);
          } else {
            return this._handleCode401(request, next);
          }
        } else {
          return throwError(error);
        }
      }),
    );
  }

  private _handleCode401(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const _request = this._jwtInterceptorService.setHeader(request, this._cookie.jwToken);
    return next.handle(_request);
  }

  private isExclude(excludes: string[], url: string) {
    let isExclude = false;
    excludes.forEach((exclude) => {
      if (url.endsWith(exclude)) {
        isExclude = true;
        return;
      }
    });
    return isExclude;
  }
}
