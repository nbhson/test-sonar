import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from 'src/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifyService } from 'src/services/notifier.service';
import { UserService } from 'src/services/user.service';
import { ShareModule } from 'src/modules/share.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ShareModule,
  ],
  declarations: [LoginComponent, RegisterComponent],
  providers: [NotifyService, UserService],
})
export class AuthModule {}
