import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserApi } from 'src/api/user/user.api';
import { User } from '../model/user.model';
import { TimeZoneService } from 'src/services/time-zone.service';
import { DD_MM_YYY_HH_MM } from 'src/constants/date';
import { UserAbstractService } from '../abstract/user-service';
import { NotifyService } from 'src/services/notifier.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends UserAbstractService<User[]> {
  observerObj = {};

  constructor(private _userApi: UserApi, private _timezoneService: TimeZoneService, private _notify: NotifyService) {
    super();
  }

  override getAllUser() {
    this.generateLoading();
    this._userApi
      .getAllUser()
      .pipe(
        map((users) => {
          let _users: User[] = [];
          users.forEach((_user) => {
            const displayCreatedAt = this._timezoneService.timestampToDate(_user.createdAt, DD_MM_YYY_HH_MM);
            const user = new User(
              _user._id,
              _user.userName,
              _user.password,
              _user.name,
              _user.role,
              _user.avatar,
              _user.createdAt,
              _user.updatedAt,
              displayCreatedAt,
            );
            _users.push(user);
          });
          return _users;
        }),
      )
      .subscribe(this.observerObj);
  }

  override initObserver() {
    this.observerObj = {
      next: (users: User[]) => {
        this.users = users;
        this.generateData();
        this._notify.success('Hoàn tất tải thông tin người dùng!');
      },
      error: (error: any) => {
        this._notify.error('Có lỗi khi tải thông tin người dùng!');
        this.generateError(error);
      },
    };
  }
}
