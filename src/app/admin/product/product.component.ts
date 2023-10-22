import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DD_MM_YYY_HH_MM } from 'src/constants/date';
import { NotifyService } from 'src/services/notifier.service';
import { NumberService } from 'src/services/number.service';
import { TimeZoneService } from 'src/services/time-zone.service';
import { Category } from '../category/model/category.model';
import { CategoryService } from '../category/service/category.service';
import { Product } from './model/product.model';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Array<Product>;
  categories: Array<Category>;
  productsClone: Array<Product>;
  errMsg: string;
  loading: boolean = false;
  triggerUpdateDataSource: boolean = false;
  dataSource: MatTableDataSource<Product>;

  constructor(
    private _productService: ProductService,
    private _notify: NotifyService,
    private _timezoneService: TimeZoneService,
    private _categoryService: CategoryService,
    private _cdref: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProduct();
  }

  ngAfterContentChecked() {
    this._cdref.detectChanges();
  }

  getAllProduct() {
    this.loading = true;
    this.errMsg = '';
    this._productService.getAllProduct().subscribe(
      (products) => {
        this.loading = false;
        this.errMsg = '';
        this.products = products;
        this.productsClone = products;
        this._notify.success('Hoàn tất tải thông tin sản phẩm!');
      },
      (error) => {
        this.loading = false;
        this.errMsg = 'Có lỗi khi tải thông tin sản phẩm!';
        this._notify.error(this.errMsg);
      },
    );
  }

  getAllCategory() {
    this.loading = true;
    this.errMsg = '';
    this._categoryService.getAllCategory().subscribe(
      (categories) => {
        this.loading = false;
        this.errMsg = '';
        this.categories = categories;
      },
      (error) => {
        this.loading = false;
        this.errMsg = 'Có lỗi khi tải thông tin danh mục!';
        this._notify.error(this.errMsg);
      },
    );
  }

  addProduct(product: any) {
    if (product) {
      const displayCreatedAt = this._timezoneService.timestampToDate(product.createdAt, DD_MM_YYY_HH_MM);
      const category = this._categoryService.getCategoryMapById(product.categoryId);
      const data = new Product(
        product._id,
        product.name,
        product.image,
        product.price,
        NumberService.formatCurrencyNumber(product.price),
        product.description,
        product.createdAt,
        product.updatedAt,
        displayCreatedAt,
        product.categoryId,
        category.name,
      );
      // this.products.unshift(data);
      this.productsClone.unshift(data);
      this.triggerUpdateDataSource = !this.triggerUpdateDataSource;
    }
  }

  dataSourceChanges(dataSource: any) {
    this.dataSource = dataSource;
  }
}
