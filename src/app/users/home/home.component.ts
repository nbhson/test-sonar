import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Category } from 'src/app/admin/category/model/category.model';
import { CategoryService } from 'src/app/admin/category/service/category.service';
import { Product } from 'src/app/admin/product/model/product.model';
import { ProductService } from 'src/app/admin/product/service/product.service';
import { NotifyService } from 'src/services/notifier.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
