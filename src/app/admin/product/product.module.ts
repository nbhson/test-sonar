import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { MaterialModule } from 'src/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShareModule } from 'src/modules/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableProductComponent } from './table-product/table-product.component';
import { DescriptionDetailComponent } from './popup/description-detail/description-detail.component';
import { ImageDetailComponent } from './popup/image-detail/image-detail.component';
import { AddProductComponent } from './popup/add-product/add-product.component';
import { UpdateProductComponent } from './popup/update-product/update-product.component';
import { DeleteProductComponent } from './popup/delete-product/delete-product.component';
import { FeatureComponent } from './feature/feature.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ShareModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    TableProductComponent,
    DescriptionDetailComponent,
    ImageDetailComponent,
    AddProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    FeatureComponent,
  ],
  exports: [TableProductComponent, FeatureComponent],
})
export class ProductModule {}
