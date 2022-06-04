import { CardListComponent } from './components/card-list/card-list.component';
import { CardFormComponent } from './components/card-form/card-form.component';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './cards.component';

@NgModule({
  declarations: [CardsComponent, CardFormComponent, CardListComponent],
  imports: [CommonModule, CardsRoutingModule, MaterialModule, FormsModule],
  exports: [MaterialModule],
})
export class CardsModule {}
