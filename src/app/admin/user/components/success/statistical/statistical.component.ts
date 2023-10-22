import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ADMIN } from 'src/constants/commons';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss'],
})
export class StatisticalComponent {
  @Input() dataSource: MatTableDataSource<User>;
  @Input() users: Array<User>;
  @Output() updateDadasource = new EventEmitter<Event>();
  admin: number = 0;
  user: number = 0;

  constructor() {}

  ngOnChanges(): void {
    if (this.users.length > 0) {
      this.admin = this.users.filter((user) => user.role === ADMIN).length;
      this.user = this.users.length - this.admin;
    }
  }

  applyFilter(event: Event) {
    this.updateDadasource.emit(event);
  }
}
