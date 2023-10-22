import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { JWT_TOKEN } from 'src/constants/token';
@Injectable({
  providedIn: 'root',
})
export class AuthCookieService {
  constructor(private cookie: CookieService) {}

  get jwToken() {
    return this.cookie.get(JWT_TOKEN);
  }

  setJwToken(token: string, expSeconds: number) {
    this.cookie.delete(JWT_TOKEN);
    this.cookie.set(JWT_TOKEN, token, this.expDate(expSeconds));
  }

  clear() {
    this.cookie.delete(JWT_TOKEN, '/');
  }

  private expDate(seconds: number) {
    const exp = new Date();
    exp.setSeconds(exp.getSeconds() + seconds);
    return exp;
  }
}
