import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCookieService } from 'src/services/authentication-cookie.service';
import { NotifyService } from 'src/services/notifier.service';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private _authService: AuthService,
    private _authCookieService: AuthCookieService,
    private _router: Router,
    private _notifyService: NotifyService,
  ) {}

  ngOnInit(): void {
    const token = this._authCookieService.jwToken;

    if (token) {
      this._authService.info().subscribe(
        (user) => {
          this._notifyService.success('Đăng nhập thành công!');

          if (user.role === 'admin') {
            // admin
            this._router.navigate(['dashboard/category']);
          } else {
            // user
            this._router.navigate(['/']);
          }
        },
        (error) => {
          this._notifyService.error('Đăng nhập thất bại!');
          this._router.navigate(['/']);
        },
      );
    } else {
      // this._router.navigate(['/']);
    }
  }
}
