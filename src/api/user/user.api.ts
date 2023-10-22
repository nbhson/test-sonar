import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/auth/model/user.model';
import { BASE_PATH } from 'src/constants/domain';
@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private readonly ALL_PATH = '/users';
  private readonly INFO_PATH = '/user/info';

  constructor(private _http: HttpClient) {}

  getAllUser(): Observable<UserDTO[]> {
    return this._http.get<UserDTO[]>(`${BASE_PATH}${this.ALL_PATH}`);
  }

  getUserInfo(): Observable<UserDTO> {
    return this._http.get<UserDTO>(`${BASE_PATH}${this.INFO_PATH}`);
  }
}
