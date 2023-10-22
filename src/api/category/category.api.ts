import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDTO } from './category.dto';
import { BASE_PATH } from 'src/constants/domain';
import { Category } from 'src/app/admin/category/model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryApi {
  private readonly ALL_PATH = '/category/all';
  private readonly ADD_PATH = '/category/add';
  private readonly UPDATE_PATH = '/category/update';
  private readonly DELETE_PATH = '/category/delete';

  constructor(private _http: HttpClient) {}

  getAllCategory(): Observable<CategoryDTO[]> {
    return this._http.get<CategoryDTO[]>(`${BASE_PATH}${this.ALL_PATH}`);
  }

  add(category: Category): Observable<Category> {
    return this._http.post<Category>(`${BASE_PATH}${this.ADD_PATH}`, category);
  }

  update(category: Category): Observable<Category> {
    return this._http.put<Category>(`${BASE_PATH}${this.UPDATE_PATH}`, category);
  }

  delete(id: string): Observable<any> {
    return this._http.delete<any>(`${BASE_PATH}${this.DELETE_PATH}/${id}`);
  }
}
