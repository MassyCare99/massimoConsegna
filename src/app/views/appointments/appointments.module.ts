import { AppointmentsSelectDateComponent } from './components/appointments-select-date/appointments-select-date.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { LeafletComponent } from '../../shared/leaflet/leaflet.component';
import { MaterialModule } from './../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';

@NgModule({
  declarations: [
    AppointmentsComponent,
    LeafletComponent,
    AppointmentsListComponent,
    AppointmentsSelectDateComponent,
  ],
  imports: [CommonModule, AppointmentsRoutingModule, MaterialModule],
  exports: [MaterialModule],
})
export class AppointmentsModule {}
