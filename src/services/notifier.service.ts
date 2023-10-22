import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({ providedIn: 'root' })
export class NotifyService {
  private _success: string = 'success';
  private _error: string = 'error';

  constructor(private _notifierService: NotifierService) {}

  notify(status: string, message: string) {
    this._notifierService.notify(status, message);
  }

  success(message: string) {
    this.notify(this._success, message);
  }

  error(message: string) {
    this.notify(this._error, message);
  }
}
