import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-tool-bar',
  templateUrl: './toggle-tool-bar.component.html',
  styleUrls: ['./toggle-tool-bar.component.scss'],
})
export class ToggleToolBarComponent implements OnInit {
  @Output() openedChanges = new EventEmitter<boolean>();

  opened = true;

  constructor() {}

  ngOnInit(): void {
    this.openedChanges.emit(this.opened);
  }

  openedSide() {
    this.opened = !this.opened;
    this.openedChanges.emit(this.opened);
  }
}
