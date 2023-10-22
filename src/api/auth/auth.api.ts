import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/auth/model/user.model';
import { BASE_PATH } from 'src/constants/domain';
@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private readonly REGISTER_PATH = '/auth/register';
  private readonly LOGIN_PATH = '/auth/login';
  private readonly LOGOUT_PATH = '/auth/logout';

  constructor(private _http: HttpClient) {}

  register(user: UserDTO): Observable<UserDTO> {
    return this._http.post<UserDTO>(`${BASE_PATH}${this.REGISTER_PATH}`, user);
  }
  login(userName: string, password: string): Observable<any> {
    return this._http.post<any>(`${BASE_PATH}${this.LOGIN_PATH}`, {
      userName: userName,
      password: password,
    });
  }
  logout(): Observable<any> {
    return this._http.post<UserDTO>(`${BASE_PATH}${this.LOGOUT_PATH}`, {});
  }
}
