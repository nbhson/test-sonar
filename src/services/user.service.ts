import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApi } from 'src/api/user/user.api';
import { UserDTO } from 'src/app/auth/model/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private _userApi: UserApi) {}

  getUser(): Observable<UserDTO> {
    return this._userApi.getUserInfo();
  }
}
