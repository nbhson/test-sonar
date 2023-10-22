import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../model/user.model';
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() dataSourceChanges = new EventEmitter<MatTableDataSource<User>>();
  @Input() users: User[];

  displayedColumns: string[] = ['userName', 'name', 'role', 'createdAt'];
  dataSource = new MatTableDataSource<User>();

  constructor() {}

  ngOnChanges(): void {
    this.dataSource.data = this.users;
    this.dataSourceChanges.emit(this.dataSource);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
