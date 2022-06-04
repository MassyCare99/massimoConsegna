import { ValidatorsModule } from './../../shared/validators/validators.module';
import { FilterPipe } from './../../shared/pipe/filter.pipe';
import { ContactsComponent } from './../contacts/contacts.component';
import { ContactListComponent } from './../contacts/components/contact-list/contact-list.component';
import { ContactFormComponent } from './../contacts/components/contact-form/contact-form.component';
import { FormsModule, ValidationErrors } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';

@NgModule({
  declarations: [
    TransferComponent,
    ContactFormComponent,
    ContactListComponent,
    ContactsComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    MaterialModule,
    FormsModule,
    ValidatorsModule,
  ],
  exports: [MaterialModule],
})
export class TransferModule {}
