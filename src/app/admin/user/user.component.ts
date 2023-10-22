import { ChangeDetectorRef, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserAbstractComponent } from './abstract/user-component';
import { User } from './model/user.model';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends UserAbstractComponent<User[]> {
  constructor(private _userService: UserService, private _cdref: ChangeDetectorRef) {
    super(_userService);
  }

  ngAfterViewInit(): void {
    this._cdref.detectChanges();
  }
}
