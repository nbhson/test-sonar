import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/admin/category/model/category.model';
import { CategoryService } from 'src/app/admin/category/service/category.service';
import { NotifyService } from 'src/services/notifier.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: Array<Category>;
  isCategoriesPage: boolean = false;

  constructor(
    private _categoryService: CategoryService,
    private _notifyService: NotifyService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.showAllCategories();
  }

  navigate(id: string) {
    this._router.navigate([`category/${id}`]);
  }

  private getCategories() {
    return this._categoryService.getAllCategory().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        this._notifyService.error('Đã xảy ra lỗi khi tải thông tin danh mục!');
      },
    );
  }

  private showAllCategories() {
    if (this._router.url === '/categories') {
      this.isCategoriesPage = true;
    } else {
      this.isCategoriesPage = false;
    }
  }
}
