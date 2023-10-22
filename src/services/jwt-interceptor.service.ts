import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_HEADER } from 'src/constants/token';
import { AuthCookieService } from 'src/services/authentication-cookie.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService {
  constructor(private _cookie: AuthCookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('/auth/login')) {
      return next.handle(request);
    } else {
      request = this.setHeader(request, this._cookie.jwToken);
    }
    return next.handle(request);
  }

  setHeader(request: HttpRequest<any>, token: string) {
    if (token) {
      token = `Bearer ${token}`;
    }
    return request.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  }
}
