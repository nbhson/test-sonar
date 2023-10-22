import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TimeZoneService } from 'src/services/time-zone.service';
import { Category } from '../model/category.model';
import { AddCategoryComponent } from '../popup/add-category/add-category.component';
import { ChartDetailComponent } from '../popup/chart-detail/chart-detail.component';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FeatureComponent implements OnInit {
  @Output() addCategory = new EventEmitter<Category>();
  @Input() dataSource: MatTableDataSource<Category>;
  @Input() categoriesClone: Array<Category>;

  selectedFilter: string = 'all';

  startOfDay: number;
  startOfWeek: number;
  startOfMonth: number;

  constructor(private _dialog: MatDialog, private _timezoneService: TimeZoneService) {}

  ngOnChanges() {}

  ngOnInit() {
    this.startOfDay = this._timezoneService.startOfDay();
    this.startOfWeek = this._timezoneService.startOfWeek();
    this.startOfMonth = this._timezoneService.startOfMonth();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onToggleChange(event: MatButtonToggleChange) {
    this.dataSource.data = this.categoriesClone;
    this.selectedFilter = event.value;

    let limitTime: number = 0;

    switch (this.selectedFilter) {
      case 'toDay':
        limitTime = this.startOfDay;
        break;
      case 'thisWeek':
        limitTime = this.startOfWeek;
        break;
      case 'thisMonth':
        limitTime = this.startOfMonth;
        break;
    }

    this.dataSource.data = this.dataSource.data.filter((category) => {
      return category.createdAt >= limitTime;
    });
  }

  openAddDialog() {
    const dialogRef = this._dialog.open(AddCategoryComponent, {
      disableClose: true,
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.addCategory.emit(data);
    });
  }

  openPieChart() {
    this._dialog.open(ChartDetailComponent, {
      disableClose: true,
      width: '550px',
      data: this.dataSource.data,
    });
  }
}
