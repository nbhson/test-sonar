import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductApi } from 'src/api/product/product.api';
import { DD_MM_YYY_HH_MM } from 'src/constants/date';
import { NumberService } from 'src/services/number.service';
import { TimeZoneService } from 'src/services/time-zone.service';
import { CategoryService } from '../../category/service/category.service';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsMap: Map<string, Product[]>;
  constructor(
    private _productApi: ProductApi,
    private _timezoneService: TimeZoneService,
    private _categoryService: CategoryService,
  ) {
    this.productsMap = new Map<string, Product[]>();
  }

  getAllProduct(): Observable<Product[]> {
    this.productsMap.clear();

    return this._productApi.getAllProduct().pipe(
      map((categories) => {
        let _products: Product[] = [];
        categories.forEach((_product) => {
          const displayCreatedAt = this._timezoneService.timestampToDate(_product.createdAt, DD_MM_YYY_HH_MM);
          const category = this._categoryService.getCategoryMapById(_product.categoryId);
          const product = new Product(
            _product._id,
            _product.name,
            _product.image,
            _product.price,
            NumberService.formatCurrencyNumber(_product.price),
            _product.description,
            _product.createdAt,
            _product.updatedAt,
            displayCreatedAt,
            _product.categoryId,
            category?.name,
          );
          _products.push(product);

          if (this.productsMap.get(_product.categoryId)) {
            this.productsMap.get(_product.categoryId)?.push(product);
          } else {
            this.productsMap.set(_product.categoryId, [product]);
          }
        });
        return _products;
      }),
    );
  }

  getProductByCategoryId(id: string) {
    return this._productApi.getProductByCategoryId(id).pipe(
      map((categories) => {
        let _products: Product[] = [];
        categories.forEach((_product) => {
          const displayCreatedAt = this._timezoneService.timestampToDate(_product.createdAt, DD_MM_YYY_HH_MM);
          const category = this._categoryService.getCategoryMapById(_product.categoryId);
          const product = new Product(
            _product._id,
            _product.name,
            _product.image,
            _product.price,
            NumberService.formatCurrencyNumber(_product.price),
            _product.description,
            _product.createdAt,
            _product.updatedAt,
            displayCreatedAt,
            _product.categoryId,
            category?.name,
          );
          _products.push(product);

          if (this.productsMap.get(_product.categoryId)) {
            this.productsMap.get(_product.categoryId)?.push(product);
          } else {
            this.productsMap.set(_product.categoryId, [product]);
          }
        });
        return _products;
      }),
    );
  }

  getProductInfo(id: string): Observable<Product> {
    return this._productApi.getProductInfo(id).pipe(
      map((_product) => {
        const displayCreatedAt = this._timezoneService.timestampToDate(_product.createdAt, DD_MM_YYY_HH_MM);
        const category = this._categoryService.getCategoryMapById(_product.categoryId);
        return new Product(
          _product._id,
          _product.name,
          _product.image,
          _product.price,
          NumberService.formatCurrencyNumber(_product.price),
          _product.description,
          _product.createdAt,
          _product.updatedAt,
          displayCreatedAt,
          _product.categoryId,
          category?.name,
        );
      }),
    );
  }

  add(product: Product): Observable<Product> {
    return this._productApi.add(product);
  }

  update(product: Product): Observable<Product> {
    return this._productApi.update(product);
  }

  delete(id: string): Observable<any> {
    return this._productApi.delete(id);
  }

  getProductMap(id: string): Product[] {
    return this.productsMap.get(id)!;
  }
}
