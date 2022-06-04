import { ValidatorsModule } from './../../shared/validators/validators.module';
import { SignInModule } from './components/sign-in/sign-in.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { RegisterModule } from './components/register/register.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule,
    RegisterModule,
    SignInModule,
    ValidatorsModule,
  ],
  exports: [CommonModule, MaterialModule, FormsModule],
})
export class LoginModule {}
