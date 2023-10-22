import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  opened: boolean = true;

  constructor() {}

  ngOnInit() {}

  openedChanges(opened: boolean) {
    this.opened = opened;
  }
}
