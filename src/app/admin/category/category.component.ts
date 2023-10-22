import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DD_MM_YYY_HH_MM } from 'src/constants/date';
import { NotifyService } from 'src/services/notifier.service';
import { TimeZoneService } from 'src/services/time-zone.service';
import { Product } from '../product/model/product.model';
import { ProductService } from '../product/service/product.service';
import { Category } from './model/category.model';
import { CategoryService } from './service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: Array<Category>;
  products: Array<Product>;
  categoriesClone: Array<Category>;
  errMsg: string;
  loading: boolean = false;
  triggerUpdateDataSource: boolean = false;
  dataSource: MatTableDataSource<Category>;

  constructor(
    private _categoryService: CategoryService,
    private _notify: NotifyService,
    private _timezoneService: TimeZoneService,
    private _productService: ProductService,
    private _cdref: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  ngAfterContentChecked() {
    this._cdref.detectChanges();
  }

  getAllCategory() {
    this.loading = true;
    this.errMsg = '';
    this._categoryService.getAllCategory().subscribe(
      (categories) => {
        categories.forEach((category) => {
          const products = this._productService.getProductMap(category._id);
          if (products) {
            category.couterProduct = products.length;
          } else {
            category.couterProduct = 0;
          }
        });

        this.loading = false;
        this.errMsg = '';
        this.categories = categories;
        this.categoriesClone = categories;
        this._notify.success('Hoàn tất tải thông tin danh mục!');
      },
      (error) => {
        this.loading = false;
        this.errMsg = 'Có lỗi khi tải thông tin danh mục!';
        this._notify.error(this.errMsg);
      },
    );
  }

  getAllProduct() {
    this.loading = true;
    this.errMsg = '';
    this._productService.getAllProduct().subscribe(
      (products) => {
        this.loading = false;
        this.errMsg = '';
        this.products = products;

        this.getAllCategory();
      },
      (error) => {
        this.loading = false;
        this.errMsg = 'Có lỗi khi tải thông tin sản phẩm!';
        this._notify.error(this.errMsg);
      },
    );
  }

  addCategory(category: any) {
    if (category) {
      const displayCreatedAt = this._timezoneService.timestampToDate(category.createdAt, DD_MM_YYY_HH_MM);

      const data = new Category(
        category._id,
        category.name,
        category.image,
        category.createdAt,
        category.updatedAt,
        displayCreatedAt,
        0,
      );
      // this.categories.unshift(data);
      this.categoriesClone.unshift(data);
      this.triggerUpdateDataSource = !this.triggerUpdateDataSource;
    }
  }

  dataSourceChanges(dataSource: any) {
    this.dataSource = dataSource;
  }
}
