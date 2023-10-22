import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/auth/model/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NotifyService } from 'src/services/notifier.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  @Input() opened: boolean;
  user: UserDTO;
  avatar: any;

  constructor(
    private _authService: AuthService,
    private _domSanitizer: DomSanitizer,
    private _notifyService: NotifyService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.user = this._authService.userLogged;
    this.avatar = this._domSanitizer.bypassSecurityTrustUrl(this.user.avatar);
  }

  submit() {
    this._authService.logout().subscribe(
      () => {
        this._notifyService.success('Đăng xuất thành công!');
        this._authService.clear();
        this._router.navigate(['/']);
      },
      (error) => {
        this._notifyService.error('Đã có lỗi xảy ra khi xử lí yêu cầu của bạn!');
      },
    );
  }
}
