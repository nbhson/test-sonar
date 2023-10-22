import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { FooterComponent } from './footer/footer.component';
import { AuthLinkComponent } from './components/auth-link/auth-link.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';
import { ShareModule } from 'src/modules/share.module';
import { SlideShowComponent } from './components/slide-show/slide-show.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [
    UserComponent,
    NavBarComponent,
    CategoryComponent,
    ProductComponent,
    FooterComponent,
    AuthLinkComponent,
    UserCartComponent,
    SlideShowComponent,
    HomeComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ShareModule,
  ],
})
export class UserModule {}
