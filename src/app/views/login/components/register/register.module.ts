import { ValidatorsModule } from './../../../../shared/validators/validators.module';
import { RegisterComponent } from './register.component';
import { MaterialModule } from './../../../../shared/material/material.module';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RegisterRoutingModule,
    ValidatorsModule,
  ],
  exports: [CommonModule, FormsModule],
})
export class RegisterModule {}
