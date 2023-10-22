import { Injectable, OnInit } from '@angular/core';
import { UserAbstractService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export abstract class UserAbstractComponent<VIEW_MODEL> implements OnInit {
  constructor(protected userAbstractService: UserAbstractService<VIEW_MODEL>) {}

  ngOnInit(): void {
    this.initObserver();
    this.getAllUser();
  }

  getAllUser() {
    this.userAbstractService.getAllUser();
  }

  initObserver() {
    this.userAbstractService.initObserver();
  }

  get users(): VIEW_MODEL {
    return this.userAbstractService.users;
  }

  get view$() {
    return this.userAbstractService.view;
  }
}
