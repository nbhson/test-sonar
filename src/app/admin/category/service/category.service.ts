import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoryApi } from 'src/api/category/category.api';
import { DD_MM_YYY_HH_MM } from 'src/constants/date';
import { TimeZoneService } from 'src/services/time-zone.service';
import { ProductService } from '../../product/service/product.service';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoriesMap: Map<string, Category>;
  constructor(private _categoryApi: CategoryApi, private _timezoneService: TimeZoneService) {
    this.categoriesMap = new Map<string, Category>();
  }

  getAllCategory(): Observable<Category[]> {
    this.categoriesMap.clear();

    return this._categoryApi.getAllCategory().pipe(
      map((categories) => {
        let _categories: Category[] = [];
        categories.forEach((_category) => {
          const displayCreatedAt = this._timezoneService.timestampToDate(_category.createdAt, DD_MM_YYY_HH_MM);
          const category = new Category(
            _category._id,
            _category.name,
            _category.image,
            _category.createdAt,
            _category.updatedAt,
            displayCreatedAt,
            0,
          );
          _categories.push(category);
          this.categoriesMap.set(category._id, category);
        });
        return _categories;
      }),
    );
  }

  add(category: Category): Observable<Category> {
    return this._categoryApi.add(category);
  }

  update(category: Category): Observable<Category> {
    return this._categoryApi.update(category);
  }

  delete(id: string): Observable<any> {
    return this._categoryApi.delete(id);
  }

  getCategoryMapById(id: string): Category {
    return this.categoriesMap.get(id)!;
  }
  getCategoryMap(): any {
    return this.categoriesMap;
  }
}
