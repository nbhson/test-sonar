import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_PATH } from 'src/constants/domain';
import { ProductDTO } from './product.dto';
import { Product } from 'src/app/admin/product/model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  private readonly ALL_PATH = '/product/all';
  private readonly ALL_PATH_BY_CATEGORY = '/product/byCategory';
  private readonly PRODUCT_PATH = '/product/info';
  private readonly ADD_PATH = '/product/add';
  private readonly UPDATE_PATH = '/product/update';
  private readonly DELETE_PATH = '/product/delete';

  constructor(private _http: HttpClient) {}

  getAllProduct(): Observable<ProductDTO[]> {
    return this._http.get<ProductDTO[]>(`${BASE_PATH}${this.ALL_PATH}`);
  }

  getProductByCategoryId(id: string) {
    return this._http.post<ProductDTO[]>(`${BASE_PATH}${this.ALL_PATH_BY_CATEGORY}`, { id: id });
  }

  getProductInfo(id: string) {
    return this._http.post<ProductDTO>(`${BASE_PATH}${this.PRODUCT_PATH}`, {
      id: id,
    });
  }

  add(product: Product): Observable<Product> {
    return this._http.post<Product>(`${BASE_PATH}${this.ADD_PATH}`, product);
  }

  update(product: Product): Observable<Product> {
    return this._http.put<Product>(`${BASE_PATH}${this.UPDATE_PATH}`, product);
  }

  delete(id: string): Observable<any> {
    return this._http.delete<any>(`${BASE_PATH}${this.DELETE_PATH}/${id}`);
  }
}
