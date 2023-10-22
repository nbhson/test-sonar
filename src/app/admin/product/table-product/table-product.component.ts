import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NumberService } from 'src/services/number.service';
import { Category } from '../../category/model/category.model';
import { CategoryService } from '../../category/service/category.service';
import { Product } from '../model/product.model';
import { DeleteProductComponent } from '../popup/delete-product/delete-product.component';
import { DescriptionDetailComponent } from '../popup/description-detail/description-detail.component';
import { ImageDetailComponent } from '../popup/image-detail/image-detail.component';
import { UpdateProductComponent } from '../popup/update-product/update-product.component';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.scss'],
})
export class TableProductComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() dataSourceChanges = new EventEmitter<MatTableDataSource<Product>>();
  @Input() products: Array<Product>;
  @Input() categories: Array<Category>;
  @Input() loading: boolean;
  @Input() errMsg: string;
  @Input() triggerUpdateDataSource: boolean;

  displayedColumns: string[] = ['name', 'categoryName', 'image', 'price', 'description', 'createdAt', 'action'];
  dataSource = new MatTableDataSource<Product>();

  constructor(private _dialog: MatDialog, private _categoryService: CategoryService) {}

  ngOnChanges(): void {
    this.dataSource.data = this.products;
    this.dataSourceChanges.emit(this.dataSource);
    this.categoryUpdateChanges();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openImageDetail(product: Product) {
    this._dialog.open(ImageDetailComponent, {
      disableClose: true,
      width: '550px',
      data: product,
    });
  }

  openDescriptionDetail(product: Product) {
    this._dialog.open(DescriptionDetailComponent, {
      disableClose: true,
      width: '550px',
      data: product,
    });
  }

  openUpdateCategory(product: Product) {
    const dialogRef = this._dialog.open(UpdateProductComponent, {
      disableClose: true,
      width: '550px',
      data: {
        product: Object.assign({}, product),
        categories: this.categories,
      },
    });
    dialogRef.afterClosed().subscribe((product) => {
      const record = this.dataSource.data.find((_product) => _product._id === product._id);
      if (record) {
        const category = this._categoryService.getCategoryMapById(product.categoryId);

        record.name = product.name;
        record.image = product.image;
        record.price = product.price;
        record.priceDisplay = NumberService.formatCurrencyNumber(product.price);
        record.description = product.description;
        record.categoryId = product.categoryId;
        record.categoryName = category.name;
        record.createdAt = product.createdAt;
        record.updatedAt = product.updatedAt;
        this.categoryUpdateChanges();
      }
    });
  }

  openDeleteCategory(product: Product) {
    const dialogRef = this._dialog.open(DeleteProductComponent, {
      disableClose: true,
      width: '550px',
      data: product,
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'Successfully!') {
        const index = this.dataSource.data.indexOf(product);
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
}
