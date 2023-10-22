import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { StatisticalComponent } from './components/success/statistical/statistical.component';
import { MaterialModule } from 'src/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShareModule } from 'src/modules/share.module';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';
import { UserTableComponent } from './components/success/user-table/user-table.component';
import { ContainerComponent } from './components/success/container/container.component';

@NgModule({
  imports: [CommonModule, UserRoutingModule, MaterialModule, FlexLayoutModule, ShareModule],
  declarations: [StatisticalComponent, UserTableComponent, LoadingComponent, ErrorComponent, ContainerComponent],
  exports: [StatisticalComponent, UserTableComponent, LoadingComponent, ErrorComponent, ContainerComponent],
})
export class UsersModule {}
