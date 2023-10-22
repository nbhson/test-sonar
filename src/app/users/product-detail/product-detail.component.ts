import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/admin/product/model/product.model';
import { ProductService } from 'src/app/admin/product/service/product.service';
import { NotifyService } from 'src/services/notifier.service';
import { NumberService } from 'src/services/number.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(
    private _productService: ProductService,
    private _activeRoute: ActivatedRoute,
    private _notifyService: NotifyService,
  ) {}

  ngOnInit(): void {
    let idParam = this._activeRoute.snapshot.params['id'];
    this.getProductInfo(idParam);
  }

  getProductInfo(id: string) {
    this._productService.getProductInfo(id).subscribe(
      (product) => {
        this.product = product;
      },
      (error) => {
        this._notifyService.error('Đã xảy ra lỗi khi tải thông tin sản phẩm!');
      },
    );
  }
  displayPrice(price: number) {
    return NumberService.formatCurrencyNumber(price);
  }
}
