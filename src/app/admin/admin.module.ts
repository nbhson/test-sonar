import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { UsersModule } from './user/user.module';
import { ToolBarComponent } from './menu/tool-bar/tool-bar.component';
import { ToggleToolBarComponent } from './menu/toggle-tool-bar/toggle-tool-bar.component';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ViewContainerComponent } from '../base/view-container/view-container.component';

@NgModule({
  declarations: [
    ProductComponent,
    CategoryComponent,
    AdminComponent,
    ToolBarComponent,
    ToggleToolBarComponent,
    UserComponent,
    ViewContainerComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    UsersModule,
    CategoryModule,
    ProductModule,
  ],
})
export class AdminModule {}
