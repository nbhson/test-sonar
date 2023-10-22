import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerErrorHelper } from 'src/helpers/server-errors.helper';
import { UtilHelper } from 'src/helpers/util.helper';
import { NotifyService } from 'src/services/notifier.service';
import { UserDTO } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { validPassword } from '../validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput: ElementRef;

  form: FormGroup;
  user: UserDTO;
  rePassword: string = '';
  errMsg: string = '';
  loading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _notifyService: NotifyService,
  ) {}

  ngOnInit() {
    this.initUser();
    this.initForm();
  }

  initUser() {
    this.user = new UserDTO('', '', '', '', 'user', '', 0, 0);
  }

  initForm() {
    this.form = this._formBuilder.group(
      {
        userName: [
          this.user.userName,
          Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Za-z0-9_.]+$/)]),
        ],
        name: [this.user.name, Validators.compose([Validators.required, Validators.minLength(5)])],
        password: [this.user.password, Validators.compose([Validators.required, Validators.minLength(5)])],
        rePassword: [this.rePassword, Validators.compose([Validators.required, Validators.minLength(5)])],
      },
      {
        validators: [validPassword('password', 'rePassword')],
      },
    );
  }

  submit() {
    this.errMsg = '';
    this.loading = true;
    this.handleData();

    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    this._authService.register(this.user).subscribe(
      (data) => {
        this.loading = false;
        this.errMsg = '';
        this._notifyService.success('Đăng kí tài khoản thành công!');
        this._router.navigate([`/auth/login/${data.userName}`]);
      },
      (error) => {
        this.loading = false;
        this.errMsg = ServerErrorHelper.getErrorMsg(error);
      },
    );
  }

  handleData() {
    this.user.userName = this.user.userName.trim();
    this.user.name = this.user.name.trim();
    this.user.password = this.user.password.trim();

    if (UtilHelper.isEmptyString(this.user.userName)) {
      this.f['userName'].setErrors({ required: true });
    }
    if (UtilHelper.isEmptyString(this.user.name)) {
      this.f['name'].setErrors({ required: true });
    }
    if (UtilHelper.isEmptyString(this.user.password)) {
      this.f['password'].setErrors({ required: true });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.passwordInput.nativeElement.type = 'text';
    } else {
      this.passwordInput.nativeElement.type = 'password';
    }
  }

  get f() {
    return this.form.controls;
  }
}
