import { NavbarComponent } from '../../core/navbar/navbar.component';
import { MaterialModule } from '../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent, NavbarComponent],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule],
  exports: [MaterialModule],
})
export class DashboardModule {}
