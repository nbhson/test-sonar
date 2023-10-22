import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  @Input() users: User[];
  dataSource: MatTableDataSource<User>;

  constructor() {}

  ngOnInit(): void {}

  updateDadasource(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchText.trim().toLowerCase();
  }

  dataSourceChanges(dataSource: any) {
    this.dataSource = dataSource;
  }
}
