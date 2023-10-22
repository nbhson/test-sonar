import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/auth/model/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NotifyService } from 'src/services/notifier.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss'],
})
export class UserCartComponent implements OnInit {
  user: UserDTO;

  constructor(
    private _authService: AuthService,
    private _notifyService: NotifyService,
    private _router: Router,
    private _homeService: HomeService,
  ) {}

  ngOnInit() {
    this.user = this._authService.userLogged;
  }

  logout() {
    this._authService.logout().subscribe(
      () => {
        this._notifyService.success('Đăng xuất thành công!');
        this._authService.clear();
        this._router.navigate(['/']);
        this._homeService.logout();
      },
      (error) => {
        this._notifyService.error('Đã có lỗi xảy ra khi xử lí yêu cầu của bạn!');
      },
    );
  }
}
