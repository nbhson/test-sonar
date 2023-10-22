import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/category.model';
import { DeleteCategoryComponent } from '../popup/delete-category/delete-category.component';
import { ImageDetailComponent } from '../popup/image-detail/image-detail.component';
import { UpdateCategoryComponent } from '../popup/update-category/update-category.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() dataSourceChanges = new EventEmitter<MatTableDataSource<Category>>();
  @Input() categories: Array<Category>;
  @Input() loading: boolean;
  @Input() errMsg: string;
  @Input() triggerUpdateDataSource: boolean;

  displayedColumns: string[] = ['name', 'image', 'couterProduct', 'createdAt', 'action'];
  dataSource = new MatTableDataSource<Category>();

  constructor(private _dialog: MatDialog) {}

  ngOnChanges(): void {
    this.dataSource.data = this.categories;
    this.dataSourceChanges.emit(this.dataSource);
    this.categoryUpdateChanges();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openImageDetail(category: Category) {
    this._dialog.open(ImageDetailComponent, {
      disableClose: true,
      width: '550px',
      data: category,
    });
  }

  openUpdateCategory(category: Category) {
    const dialogRef = this._dialog.open(UpdateCategoryComponent, {
      disableClose: true,
      width: '550px',
      data: category,
    });

    dialogRef.afterClosed().subscribe((category) => {
      const record = this.dataSource.data.find((_category) => _category._id === category._id);
      if (record) {
        record.name = category.name;
        record.image = category.image;
        record.createdAt = category.createdAt;
        record.updatedAt = category.updatedAt;
        this.categoryUpdateChanges();
      }
    });
  }

  openDeleteCategory(category: Category) {
    const dialogRef = this._dialog.open(DeleteCategoryComponent, {
      disableClose: true,
      width: '550px',
      data: category,
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'Successfully!') {
        const index = this.dataSource.data.indexOf(category);
        if (index >= 0) {
          this.dataSource.data.splice(index, 1);
          this.categoryUpdateChanges();
        }
      }
    });
  }

  categoryUpdateChanges() {
    this.dataSource._updateChangeSubscription();
    this.dataSourceChanges.emit(this.dataSource);
  }

  getColor(couter: number): string {
    if (couter >= 10) {
      return 'warn';
    } else if (couter >= 5 && couter < 9) {
      return 'primary';
    } else {
      return '';
    }
  }
}
