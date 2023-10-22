import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { BoxComponent } from '../share/box/box.component';
import { ErrorMessageComponent } from '../share/error-message/error-message.component';
import { PieChartComponent } from 'src/share/pie-chart/pie-chart.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MaterialModule, GoogleChartsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [BoxComponent, ErrorMessageComponent, PieChartComponent],
  exports: [BoxComponent, ErrorMessageComponent, PieChartComponent],
})
export class ShareModule {}
