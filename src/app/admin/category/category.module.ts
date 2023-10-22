import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MaterialModule } from 'src/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoryRoutingModule } from './category-routing.module';
import { ShareModule } from 'src/modules/share.module';
import { FeatureComponent } from './feature/feature.component';
import { AddCategoryComponent } from './popup/add-category/add-category.component';
import { UpdateCategoryComponent } from './popup/update-category/update-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteCategoryComponent } from './popup/delete-category/delete-category.component';
import { ImageDetailComponent } from './popup/image-detail/image-detail.component';
import { ChartDetailComponent } from './popup/chart-detail/chart-detail.component';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ShareModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    TableComponent,
    FeatureComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,
    ImageDetailComponent,
    ChartDetailComponent,
  ],
  exports: [TableComponent, FeatureComponent],
})
export class CategoryModule {}
