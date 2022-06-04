import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { MaterialModule } from './../../../../shared/material/material.module';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, FormsModule, MaterialModule, SignInRoutingModule],
  exports: [CommonModule, FormsModule],
})
export class SignInModule {}
