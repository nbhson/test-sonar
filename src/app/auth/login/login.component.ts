import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ADMIN } from 'src/constants/commons';
import { ServerErrorHelper } from 'src/helpers/server-errors.helper';
import { UtilHelper } from 'src/helpers/util.helper';
import { NotifyService } from 'src/services/notifier.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput: ElementRef;

  form: FormGroup;
  rePassword: string = '';
  userName: string = '';
  password: string = '';
  errMsg: string = '';
  loading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _activeRouter: ActivatedRoute,
    private _notifyService: NotifyService,
    private _router: Router,
  ) {}

  ngOnInit() {
    this.initForm();
    this.initUser();
  }

  initForm() {
    this.form = this._formBuilder.group({
      userName: [this.userName, Validators.compose([Validators.required])],
      password: [this.password, Validators.compose([Validators.required])],
    });
  }

  initUser() {
    const userName = this._activeRouter.snapshot.params['userName'];
    if (userName && !UtilHelper.isEmptyString(userName)) {
      this.userName = userName;
    }
  }

  submit() {
    this.loading = true;
    this.errMsg = '';
    this.handleData();
    if (this.form.invalid) {
      this.loading = false;
      this.errMsg = '';
      return;
    }
    this._authService.login(this.userName, this.password).subscribe(
      () => {
        this.loading = false;
        this.errMsg = '';
        this._notifyService.success('Đăng nhập thành công!');
        if (this._authService.userLogged.role === ADMIN) {
          this._router.navigate(['dashboard/category']);
        } else {
          this._router.navigate(['/']);
        }
      },
      (error) => {
        this.loading = false;
        this.errMsg = ServerErrorHelper.getErrorMsg(error);
      },
    );
  }

  handleData() {
    this.userName = this.userName.trim();
    this.password = this.password.trim();

    if (UtilHelper.isEmptyString(this.userName)) {
      this.f['userName'].setErrors({ required: true });
    }
    if (UtilHelper.isEmptyString(this.password)) {
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
