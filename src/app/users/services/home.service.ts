import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _logout$ = new Subject();
  public logout$ = this._logout$.asObservable();

  constructor() {}

  logout(reason?: any) {
    this._logout$.next(reason);
  }
}
