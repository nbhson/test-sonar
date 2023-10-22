import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/admin/product/model/product.model';
import { ProductService } from 'src/app/admin/product/service/product.service';
import { NotifyService } from 'src/services/notifier.service';
import { NumberService } from 'src/services/number.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Array<Product>;
  isProductsPage: boolean = false;
  idParam: string;

  constructor(
    private _productService: ProductService,
    private _notifyService: NotifyService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.idParam = this._activeRoute.snapshot.params['id'];

    if (this.idParam) {
      this.getProductByCategoryId(this.idParam);
    } else {
      this.getAllProduct();
    }

    this.showAllProducts();
  }

  getAllProduct() {
    return this._productService.getAllProduct().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        this._notifyService.error('Đã xảy ra lỗi khi tải thông tin sản phẩm!');
      },
    );
  }

  getProductByCategoryId(id: string) {
    return this._productService.getProductByCategoryId(id).subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        this._notifyService.error('Đã xảy ra lỗi khi tải thông tin sản phẩm!');
      },
    );
  }

  displayPrice(price: number) {
    return NumberService.formatCurrencyNumber(price);
  }

  navigate(id: string) {
    this._router.navigate([`product/${id}`]);
  }

  private showAllProducts() {
    if (this._router.url === '/products' || this.idParam) {
      this.isProductsPage = true;
    } else {
      this.isProductsPage = false;
    }
  }
}
