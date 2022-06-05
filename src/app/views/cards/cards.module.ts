import { CardsFeature } from './store/cards.reducer';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardFormComponent } from './components/card-form/card-form.component';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './cards.component';
import { EffectsModule } from '@ngrx/effects';
import { CardsEffects } from './store/cards.effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [CardsComponent, CardFormComponent, CardListComponent],
  imports: [
    CommonModule,
    CardsRoutingModule,
    MaterialModule,
    FormsModule,
    StoreModule.forFeature(CardsFeature),
    EffectsModule.forFeature([CardsEffects]),
  ],
  exports: [MaterialModule],
})
export class CardsModule {}
