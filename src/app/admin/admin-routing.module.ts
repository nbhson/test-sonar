import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: 'category',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./category/category.module').then((m) => m.CategoryModule),
      },
    ],
  },
  {
    path: 'product',
    component: AdminComponent,
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'user',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./user/user.module').then((m) => m.UsersModule),
      },
    ],
  },
  { path: '', component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
