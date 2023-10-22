import { Injectable } from '@angular/core';
import { concatMap, map, Observable } from 'rxjs';
import { AuthApi } from 'src/api/auth/auth.api';
import { AuthCookieService } from 'src/services/authentication-cookie.service';
import { UserService } from 'src/services/user.service';
import { UserDTO } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userLogged: UserDTO;
  private _isLogged: boolean;

  constructor(
    private _authApi: AuthApi,
    private _authCookieService: AuthCookieService,
    private _userService: UserService,
  ) {}

  get isLogged(): boolean {
    return this._isLogged;
  }
  get userLogged(): UserDTO {
    return this._userLogged;
  }

  register(user: UserDTO): Observable<UserDTO> {
    return this._authApi.register(user);
  }

  login(userName: string, password: string): Observable<any> {
    return this._authApi.login(userName, password).pipe(
      map((data) => {
        this._authCookieService.setJwToken(data.jwt, data.exp);
        return data;
      }),
      concatMap(() => this.info()),
    );
  }
  logout(): Observable<any> {
    return this._authApi.logout();
  }

  info() {
    return this._userService.getUser().pipe(
      map((user) => {
        this._isLogged = true;
        this._userLogged = user;
        return user;
      }),
    );
  }

  clear() {
    this._isLogged = false;
    this._authCookieService.clear();
  }
}
