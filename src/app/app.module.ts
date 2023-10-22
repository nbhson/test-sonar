import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotifyModule } from 'src/modules/notify.module';
import { MatIconModule } from '@angular/material/icon';
import { JwtInterceptorService } from 'src/services/jwt-interceptor.service';
import { ErrorInterceptorService } from 'src/services/error-interceptor.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { MaterialModule } from 'src/modules/material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    NotifyModule,
    MatIconModule,
    OverlayModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
    HttpClient,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
