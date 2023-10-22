import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotifyService } from 'src/services/notifier.service';
import { TimeZoneService } from 'src/services/time-zone.service';
import { Category } from '../../category/model/category.model';
import { Product } from '../model/product.model';
import { AddProductComponent } from '../popup/add-product/add-product.component';

@Component({
  selector: 'app-feature-product',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FeatureComponent implements OnInit {
  @Output() addProduct = new EventEmitter<Product>();
  @Input() dataSource: MatTableDataSource<Product>;
  @Input() productClone: Array<Product>;
  @Input() categories: Array<Category>;

  selectedFilter: string = 'all';

  startOfDay: number;
  startOfWeek: number;
  startOfMonth: number;

  constructor(
    private _dialog: MatDialog,
    private _timezoneService: TimeZoneService,
    private _notifyService: NotifyService,
  ) {}

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
    this.dataSource.data = this.productClone;
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
    if (this.categories && this.categories.length > 0) {
      const dialogRef = this._dialog.open(AddProductComponent, {
        disableClose: true,
        width: '550px',
        data: { categories: this.categories },
      });

      dialogRef.afterClosed().subscribe((data) => {
        this.addProduct.emit(data);
      });
    } else {
      this._notifyService.error('Hãy thêm ít nhất một danh mục trước khi thêm sản phẩm');
    }
  }
}
